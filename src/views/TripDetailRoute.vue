<template>
    <div class="container">
        <h3>{{ readOnly ? 'Tu selección' : 'Confirmar selección'}}</h3>
        <div class="row">
            <div class="col-md-12">
                <div>
                    <div>
                        <!-- <h3>Viaje: {{ selectedTrip.id }}</h3> -->
                        <div class="container">
                            <div class="row px-0">
                                <p class="p-0 m-0 mb-0"><strong>Fecha y hora: </strong>{{ offsetDateTime }}</p>
                                <p class="p-0 m-0 mb-0"><strong>Estado: </strong>{{ selectedDecisionChoice }}</p>
                                <p v-if="!readOnly" class="p-0 m-0 mb-3"><strong>Asientos disponibles: </strong>{{ selectedTrip.available_seats }}</p>
                                <p v-if="!readOnly" class="p-0 m-0 mb-1"><strong>Selecciona el punto de encuentro</strong></p>
                                <p v-if="!readOnly" class="p-0 m-0 mb-2 text-danger">{{ showDistanceError ? 'Elige un punto más cercano a la ruta.' : '&nbsp;' }}</p>
                            </div>
                        </div>
                    </div>
                    <div id="container-map"></div>
                </div>
            </div> 
        </div>
        <div v-if="!readOnly" class="row">
            <div class="col-4">
                <button @click="goToMain" class="btn btn-danger mt-3">Cancelar</button>
            </div>
            <div class="col-4"></div>
            <div class="col-4">
                <button :disabled="!isCompleted" @click="showModal" class="btn btn-primary mt-3">Confirmar</button>
            </div>
        </div>
        <div v-else class="row">
            <div class="col-4">
                <button @click="goToMain" class="btn btn-danger mt-3">Cancelar</button>
            </div>
            <div class="col-4"></div>
            <div class="col-4">
                <button @click="goToUserTrips" class="btn btn-primary mt-3 w-100">Ir atrás</button>
            </div>
        </div>
        
        <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Confirmar</h5>
                </div>
                <div class="modal-body">
                    {{ routeConfirmModalMsg }}
                </div>
                <div class="modal-footer">
                    <button type="button" v-if="!routeCreationError" @click="hideModal" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    <button type="button" v-if="routeCreationError" @click="initialState" class="btn btn-primary">Confirmar</button>
                    <button type="button" v-if="!routeCreationError" @click="saveData" class="btn btn-primary">Confirmar</button>
                </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mapboxgl from 'mapbox-gl'
import nearestPoint from '@turf/nearest-point';
// import point from '@turf/helpers';
import { feature, featureCollection, lineString, point, type Feature, type Units } from '@turf/helpers';
import pointToLineDistance from '@turf/point-to-line-distance';
import along from '@turf/along'
import { getCoord } from '@turf/invariant'
import { mapGetters } from 'vuex';
import { Modal } from 'bootstrap';
import polyline from '@mapbox/polyline';
import type { AddressSuggestion, SelectedPoint, Route, Trip, NamedChoices } from '@/models/CommonModels';
import type { Point } from '@turf/helpers'

export default defineComponent({
    data() {
        return {
            chosenDate: null,
            userSelectedMarker: {} as mapboxgl.Marker,
            userSelectedPoint: {} as Feature,
            constructedRoute: {} as Route,
            map: {} as mapboxgl.Map,
            originPointText: '',
            sessionToken: '5a057974-f75c-47e1-912e-75f5d0832626',
            accessToken: 'pk.eyJ1IjoiY2RlbGdhZG91bnBodSIsImEiOiJjbGVhcmV1eDgwOXU0M3BvZDB6b3UwaW5kIn0.9AuJG-JNVlHwoSH9C8Pr2A',
            direction: {},
            modalInstance: null as Modal | null,
            routeConfirmModalMsg: '¿Deseas confirmar tu punto de encuentro?',
            routeCreationError: false,
            readOnly: false,
            dummy: {"type":"Feature","geometry":{"type":"Point","coordinates":[-69.95846109686937,18.468832583600875]},"properties":{"featureIndex":50,"distanceToPoint":0.07576463364933643}}
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUserData',
            trips: 'getDriverTrips',
            tripStatusList: 'getTripStatus',
            userPickup: 'getUserTripDetail'
        }),
        showDistanceError() {
            if (this.userSelectedPoint && Object.keys(this.userSelectedPoint).length) {
                let value = this.userSelectedPoint?.properties?.distanceToPoint.toFixed(2);
                return value > 0.15;
            }
            return false
        },
        selectedDecisionChoice() {
          if (this.selectedTrip) return this.tripStatusList.find((r: NamedChoices) => r.id == this.selectedTrip.status).name;
          return 'Pendiente'
        },
        selectedTrip() {
            const selectedId = this.$route.params.id;
            const readOnly = this.$route.query['readOnly']
            this.readOnly = readOnly ? true : false
            // new mapboxgl.Marker()
            //     .setLngLat([this.dummy.geometry.coordinates[0], this.dummy.geometry.coordinates[1]])
            //     .addTo(this.map);
            if (this.trips) return this.trips.find((trip: Trip) => trip.id.toString() == selectedId)
            return []
        },
        todayDate() {
            return new Date();
        },
        limitDate() {
            return new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))
        },
        isCompleted() {
            return Object.keys(this.userSelectedPoint).length > 0 && !this.showDistanceError;
        },
        offsetDateTime() {
            if (this.selectedTrip && Object.keys(this.selectedTrip).length) {
                return this.selectedTrip.scheduled_date.replace('T', ' ').replace('Z', '')
            }
            return ''
        }
    },
    watch: {
        trips(value: Trip[]) {
            if (value.length) {
                const selectedId = this.$route.params.id;
                this.selectedTrip = this.trips.filter((t: Trip) => t.id.toString() == selectedId)[0]
            }
        },
        userSelectedMarker(value) {
            this.calculateMarkerToNearestPoint();
        }
    },
    methods:{
        getOriginDestinationPoints() {
            if (this.selectedTrip && Object.keys(this.map).length) {
                const steps = this.selectedTrip.route[0].legs[0].steps;
                const origin = steps[0];
                const destination = steps[steps.length - 1];
                const data = {
                    origin: origin.intersections[0].location,
                    destination: destination.intersections[0].location
                }
                this.loadMarkers(data);
                return data
            }
            return null
        },
        loadMarkers(data: any) {
            new mapboxgl.Marker()
                .setLngLat([data.origin[0], data.origin[1]])
                .addTo(this.map);

            new mapboxgl.Marker()
                .setLngLat([data.destination[0], data.destination[1]])
                .addTo(this.map);
        },
        addLayer() {
            this.map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: polyline.toGeoJSON(this.selectedTrip.route[0].geometry)
                },
                paint: {
                    "line-width": 3,
                    "line-color": "#449441"
                }
            })
            const points = this.selectedTrip.route[0].legs[0].steps.map((step: any) => {
                return step.maneuver.location
            })
            const el = document.createElement('div');
            el.className = "black-dot";

            for (let point of points) {
                new mapboxgl.Marker({ element: el })
                .setLngLat([point[0], point[1]])
                .addTo(this.map);
            }
            if (this.userPickup) {
                new mapboxgl.Marker()
                .setLngLat([this.dummy.geometry.coordinates[0], this.dummy.geometry.coordinates[1]])
                .addTo(this.map);
            }
        },
        initialState() {
            this.routeConfirmModalMsg = '¿Deseas confirmar tu punto de partida?';
            this.routeCreationError = false;
            this.hideModal()
        },
        loadMap() {
            const readOnly = this.$route.query['readOnly']
            mapboxgl.accessToken = 'pk.eyJ1IjoiY2RlbGdhZG91bnBodSIsImEiOiJjbGVhcmV1eDgwOXU0M3BvZDB6b3UwaW5kIn0.9AuJG-JNVlHwoSH9C8Pr2A';
            this.map = new mapboxgl.Map({
                container: 'container-map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-69.95, 18.47],
                zoom: 13,
            });

            this.map.on('load', () => {
                this.addLayer()
                this.getOriginDestinationPoints()
            })

            this.map.on('click', (e) => {
                if (Object.keys(this.userSelectedMarker).length) this.userSelectedMarker.remove();
                if (!readOnly) {
                    this.userSelectedMarker = new mapboxgl.Marker()
                                            .setLngLat([e.lngLat.lng, e.lngLat.lat])
                                            .addTo(this.map);
                }
            })
        },
        calculateMarkerToNearestPoint() {
            let pointCollection = this.selectedTrip.route[0].legs[0].steps.map((step: any) => {
                return step.maneuver.location
            })

            const ls = lineString(pointCollection)
            const distance = this.selectedTrip.route[0].distance
            const options = { units: 'meters' as Units};
            const points = []
            for (let i = 50; i < distance; i = i + 50) {
                points.push(point(along(ls, i, options).geometry.coordinates))
            }
            const pointCol = featureCollection<Point>(points)

            let pointCoordinates = this.userSelectedMarker.getLngLat()
            let markerPoint = point([pointCoordinates.lng, pointCoordinates.lat])
            this.userSelectedPoint = nearestPoint(markerPoint, pointCol);
        },
        updateRoute(routes: { route: Route }) {
            this.constructedRoute = routes.route
        },
        showModal() {
            this.modalInstance?.show()
        },
        goToUserTrips() {
            this.$router.push({ name: 'DriverRouteList' })
        },
        hideModal() {
            const modalElement = document.getElementById('confirmModal');
            this.modalInstance?.hide()
        },
        obtainCurrentLocation() {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position)
            }, err => {
                console.log(err);
            });
        },
        getUniversityCoordinates() {
            return
            const searchText = 'Universidad Pedro Henríquez Ureña';
            const endpoint = 'mapbox.places'
            const api_url = `https://api.mapbox.com/geocoding/v5/${endpoint}/${searchText}.json?access_token=pk.eyJ1IjoiY2RlbGdhZG91bnBodSIsImEiOiJjbGVhcmV1eDgwOXU0M3BvZDB6b3UwaW5kIn0.9AuJG-JNVlHwoSH9C8Pr2A`;            
        },
        saveData() {
            const data = {
                trip: this.selectedTrip.id,
                pickup_place: this.userSelectedPoint,
                user: this.user.id
            }

            this.$store.dispatch('createTripDetail', data)
                .then(success => {
                    console.log(success);
                    if (success) {
                        this.hideModal()
                        this.$store.commit('SET_SUCCESS_MODAL', true);
                        setTimeout(() => this.$router.push({name: 'MainView'}), 2000)
                    } else {
                        this.routeConfirmModalMsg = 'Ocurrió un error al guardar el viaje.'
                        this.routeCreationError = true;
                    }
                })
        },
        goToMain() {
            this.$router.push({name: 'SearchRouteList'});
        }
    },
    mounted() {
        // this.$store.commit('SET_IS_LOADING', true);
        const modalElement = document.getElementById('confirmModal');
        if (modalElement && modalElement instanceof Element) {
            this.modalInstance = new Modal(modalElement)
        }
        
        this.loadMap();
    }
})
</script>

<style scoped>
input {
    border-radius: 5px;
}

#container-map {
    width: 100%;
    height: 60vh;
}

.address-container {
    max-height: 40vh;
    overflow: scroll
    ;
    border: 1px solid rgb(213, 208, 208);
    font-size: 0.7rem;
}

.address-container :deep(.name) {
    font-size: 0.9rem;
}

.suggestion {
    background-color: white;
}
.suggestion:hover {
    background-color: #0d6efd;
    color: white;
}

select {
    min-width: 140px;
}

.black-dot {
  height: 10px;
  width: 10px;
  border: 1px solid black;
  background-color: white;
  border-radius: 50%;
}

</style>