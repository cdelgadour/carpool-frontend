<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div>
                    <div>
                        <h3>Viaje: {{ selectedTrip.id }}</h3>
                        <div class="container">
                            <div class="row px-0">
                                <p class="p-0 m-0 mb-2"><strong>Fecha y hora: </strong>{{ offsetDateTime }}</p>
                            </div>
                        </div>
                    </div>
                    <div id="container-map"></div>
                </div>
            </div> 
        </div>
        <div class="row">
            <div class="col-4">
                <button @click="goToMain" class="btn btn-danger mt-3">Cancelar</button>
            </div>
            <div class="col-4"></div>
            <div class="col-4">
                <button :disabled="!isCompleted" @click="showModal" class="btn btn-primary mt-3">Confirmar</button>
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
import { mapGetters } from 'vuex';
import { Modal } from 'bootstrap';
import type { AddressSuggestion, SelectedPoint, Route, Trip } from '@/models/CommonModels';

export default defineComponent({
    data() {
        return {
            chosenDate: null,
            userSelectedPoint: {} as SelectedPoint,
            constructedRoute: {} as Route,
            map: {} as mapboxgl.Map,
            originPointText: '',
            sessionToken: '5a057974-f75c-47e1-912e-75f5d0832626',
            accessToken: 'pk.eyJ1IjoiY2RlbGdhZG91bnBodSIsImEiOiJjbGVhcmV1eDgwOXU0M3BvZDB6b3UwaW5kIn0.9AuJG-JNVlHwoSH9C8Pr2A',
            UNPHU: {"id":"poi.498216230466","type":"Feature","place_type":["poi"],"relevance":0.8,"properties":{"foursquare":"4bec1ab861aca59364cb8500","landmark":true,"address":"Av.john f.kennedy KM 6 1/2","category":"college, university","maki":"college"},"text":"Universidad Nacional Pedro Henríquez Ureña (UNPHU)","place_name":"Universidad Nacional Pedro Henríquez Ureña (UNPHU), Av.john f.kennedy KM 6 1/2, Santo Domingo de Guzmán, Distrito Nacional, Dominican Republic","center":[-69.948492,18.484636],"geometry":{"coordinates":[-69.948492,18.484636],"type":"Point"},"context":[{"id":"locality.12413503","mapbox_id":"dXJuOm1ieHBsYzp2V28v","text":"Los Jardines"},{"id":"place.1116223","wikidata":"Q34820","mapbox_id":"dXJuOm1ieHBsYzpFUWcv","text":"Santo Domingo de Guzmán"},{"id":"region.197695","short_code":"DO-01","wikidata":"Q2499228","mapbox_id":"dXJuOm1ieHBsYzpBd1Ev","text":"Distrito Nacional"},{"id":"country.8767","short_code":"do","wikidata":"Q786","mapbox_id":"dXJuOm1ieHBsYzpJajg","text":"Dominican Republic"}]} as AddressSuggestion,
            direction: {},
            modalInstance: null as Modal | null,
            routeConfirmModalMsg: '¿Deseas confirmar la ruta?',
            routeCreationError: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUserData',
            trips: 'getDriverTrips'
        }),
        selectedTrip() {
            const selectedId = this.$route.params.id;
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
            return (Object.keys(this.constructedRoute).length != 0 && 
                    Object.keys(this.userSelectedPoint).length != 0 && 
                    this.chosenDate)
        },
        offsetDateTime() {
            if (Object.keys(this.selectedTrip).length) {
                let date = new Date(this.selectedTrip.scheduled_date);
                let dateFormatted = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'America/New_York' // Or any other timezone that observes UTC-4
                }).format(date);

                return dateFormatted.replace(',', '')
            }
            return ''
        }
    },
    watch: {
        user: function(value) {
            console.log(value);
        },  
        trips(value: Trip[]) {
            console.log("Hello there");
            if (value.length) {
                console.log("Hello there");
                const selectedId = this.$route.params.id;
                this.selectedTrip = this.trips.filter((t: Trip) => t.id.toString() == selectedId)[0]
            }
        }
    },
    methods:{
        initialState() {
            this.routeConfirmModalMsg = '¿Deseas confirmar la ruta?';
            this.routeCreationError = false;
            this.hideModal()
        },
        loadMap() {
            mapboxgl.accessToken = 'pk.eyJ1IjoiY2RlbGdhZG91bnBodSIsImEiOiJjbGVhcmV1eDgwOXU0M3BvZDB6b3UwaW5kIn0.9AuJG-JNVlHwoSH9C8Pr2A';
            this.map = new mapboxgl.Map({
                container: 'container-map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-69.95, 18.47],
                zoom: 12
            });

            this.direction = new MapboxDirections({ 
                accessToken: mapboxgl.accessToken,
                profile: 'mapbox/driving',
                controls: {
                    instructions: false,
                    profileSwitcher: false
                }
            });

            this.map.addControl(<any>(this.direction), 'top-left' );
            this.direction.on('destination', this.testCalled);
            this.direction.on('origin', this.setUserSelectedPoint);
            this.direction.on('route', this.updateRoute);
            this.direction.setDestination('Universidad Nacional Pedro Henriquez Urena');
            // this.direction.setOrigin([-69.952775,18.450854])
        },
        testCalled({ feature }) {
            if (feature && feature.geometry) {
                if (feature.geometry.coordinates[0] != this.UNPHU.center[0] || feature.geometry.coordinates[0] != this.UNPHU.center[0]) {
                    this.direction.setDestination('Universidad Nacional Pedro Henriquez Urena');
                    // this.direction.setDestination([this.UNPHU.center[0],this.UNPHU.center[1]]);
                }
            }
        },
        setUserSelectedPoint(data: { feature: SelectedPoint }) {
            this.userSelectedPoint = data.feature;
        },
        updateRoute(routes: { route: Route }) {
            this.constructedRoute = routes.route
        },
        showModal() {
            this.modalInstance?.show()
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
                route: {...this.constructedRoute},
                user_input_point: {...this.userSelectedPoint},
                scheduled_data: this.chosenDate,
                available_seats: 4,
                status: 1,
                trip_type: 1, // Hacer variable para manejar viaje de ida y de vuelta
                driver: this.user.driver
            }

            this.$store.dispatch('createTrip', data)
                .then(success => {
                    console.log(success);
                    if (success) {
                        this.$router.push({name: 'MainView'});
                    } else {
                        this.routeConfirmModalMsg = 'Ocurrió un error al guardar el viaje.'
                        this.routeCreationError = true;
                    }
                })
        },
        goToMain() {
            this.$router.push({name: 'DriverRouteList'});
        }
    },
    mounted() {
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
</style>