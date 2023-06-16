<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div>
                    <div>
                        <div class="container">
                            <div class="row px-0">
                                <p class="p-0 m-0 mb-2"><strong>Fecha y hora</strong></p>
                                <VueDatePicker
                                    class="p-0 mb-3"
                                    prevent-min-max-navigation
                                    disable-month-year-select
                                    :min-date="todayDate"
                                    :max-date="limitDate"
                                    v-model="chosenDate"
                                    ></VueDatePicker>
                                <div class="col-6 p-0">
                                    
                                </div>
                            </div>
                        </div>
                        
                        <!-- <input class="p-1 w-100" v-model="originPointText" type="text" placeholder="Escribir punto de origen"> -->
                        <!-- <div class="address-container" v-if="showSelectedSuggestion">
                        <div class="p-2 d-flex align-items-center">
                                <div class="col-10">
                                    <p class="name mb-0"><strong>{{ selectedSuggestion.text }}</strong></p>
                                    <p class="mb-0">{{ selectedSuggestion.place_name }}</p>
                                </div>
                                <div class="col-2 text-center">
                                    <button @click="removeSelectedPlace" type="button" class="btn-close" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="address-container" v-else>
                            <div @click="selectPlace(suggestion)" class="p-2 suggestion" v-for="suggestion in tempData" :key="suggestion.mapbox_id">
                                <p class="name mb-0"><strong>{{ suggestion.text }}</strong></p>
                                <p>{{ suggestion.place_name }}</p>
                                <hr class="m-0">
                            </div>
                        </div> -->
                        <!-- <input class="p-1 w-100" v-model="destinationPointText" disabled type="text" placeholder="Escribir punto de origen"> -->
                        <!-- <button @click="getUniversityCoordinates" class="w-100 btn btn-primary mb-2 p-2">Hacia la UNPHU</button> -->
                        <!-- <button class="w-100 btn btn-primary p-2">Desde la UNPHU </button> -->
                    </div>
                    <p><strong>Origen y Destino</strong></p>
                    <div id="container-map"></div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import mapboxgl from 'mapbox-gl'
// import MapboxDirections from '@mapbox/mapbox-gl-directions'
import axios from 'axios'
import type { AddressSuggestion } from '@/models/CommonModels';

export default defineComponent({
    data() {
        return {
            chosenHour: null,
            chosenMinutes: null,
            chosenDate: null,
            routeAsPassanger: false,
            marker: {} as mapboxgl.Marker,
            originMarker: {} as mapboxgl.Marker,
            destinationMarker: {} as mapboxgl.Marker,
            map: {} as mapboxgl.Map,
            originPointText: '',
            destinationPointText: 'UNPHU',
            sessionToken: '5a057974-f75c-47e1-912e-75f5d0832626',
            accessToken: 'pk.eyJ1IjoiY2RlbGdhZG91bnBodSIsImEiOiJjbGVhcmV1eDgwOXU0M3BvZDB6b3UwaW5kIn0.9AuJG-JNVlHwoSH9C8Pr2A',
            address: '',
            UNPHU: {"id":"poi.498216230466","type":"Feature","place_type":["poi"],"relevance":0.8,"properties":{"foursquare":"4bec1ab861aca59364cb8500","landmark":true,"address":"Av.john f.kennedy KM 6 1/2","category":"college, university","maki":"college"},"text":"Universidad Nacional Pedro Henríquez Ureña (UNPHU)","place_name":"Universidad Nacional Pedro Henríquez Ureña (UNPHU), Av.john f.kennedy KM 6 1/2, Santo Domingo de Guzmán, Distrito Nacional, Dominican Republic","center":[-69.948492,18.484636],"geometry":{"coordinates":[-69.948492,18.484636],"type":"Point"},"context":[{"id":"locality.12413503","mapbox_id":"dXJuOm1ieHBsYzp2V28v","text":"Los Jardines"},{"id":"place.1116223","wikidata":"Q34820","mapbox_id":"dXJuOm1ieHBsYzpFUWcv","text":"Santo Domingo de Guzmán"},{"id":"region.197695","short_code":"DO-01","wikidata":"Q2499228","mapbox_id":"dXJuOm1ieHBsYzpBd1Ev","text":"Distrito Nacional"},{"id":"country.8767","short_code":"do","wikidata":"Q786","mapbox_id":"dXJuOm1ieHBsYzpJajg","text":"Dominican Republic"}]} as AddressSuggestion,
            selectedSuggestion: {} as AddressSuggestion,
            deferredAPICall: null as any,
            tempData: [] as AddressSuggestion[],
            direction: {}
        }
    },
    computed: {
        showSelectedSuggestion() {
            return Object.keys(this.selectedSuggestion).length;
        },
        hourList() {
            return Array.from({ length: 15 }, (_, i) => i + 6);
        },
        minuteList() {
            return Array.from({ length: 60 }, (_, i) => i);
        },
        todayDate() {
            return new Date();
        },
        limitDate() {
            return new Date().setDate(this.todayDate.getDate() + 7)
        }
    },
    watch: {
        originPointText(value: string) {
            if (!value) return;
            clearTimeout(this.deferredAPICall);
            value = value.replace("#", "");
            this.deferredAPICall = setTimeout(() => this.getSuggestions(value), 1000)
        }
    },
    methods:{
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

            this.map.addControl(this.direction, 'top-left' );
            this.direction.on('destination', this.testCalled);
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
            
            
            // console.log("Called");
        },
        obtainCurrentLocation() {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position)
            }, err => {
                console.log(err);
            });
        },
        getSuggestions(searchText: string) {
            // const endpoint = 'search/searchbox/v1/suggest';
            const endpoint = 'mapbox.places'
            const coordinates = "-69.95, 18.47";
            const params = {country: 'DO'};
            // const api_url = `https://api.mapbox.com/${endpoint}?q=${searchText}&access_token=${this.accessToken}&session_token=${this.sessionToken}&proximity=${coordinates}&country=DO`
            const api_url = `https://api.mapbox.com/geocoding/v5/${endpoint}/${searchText}.json?access_token=pk.eyJ1IjoiY2RlbGdhZG91bnBodSIsImEiOiJjbGVhcmV1eDgwOXU0M3BvZDB6b3UwaW5kIn0.9AuJG-JNVlHwoSH9C8Pr2A`
            
            axios.get(api_url, { params: params })
                .then(res => {
                    this.tempData = res.data['features'];
                })
            
        },
        getUniversityCoordinates() {
            const searchText = 'Universidad Pedro Henríquez Ureña';
            const endpoint = 'mapbox.places'
            const api_url = `https://api.mapbox.com/geocoding/v5/${endpoint}/${searchText}.json?access_token=pk.eyJ1IjoiY2RlbGdhZG91bnBodSIsImEiOiJjbGVhcmV1eDgwOXU0M3BvZDB6b3UwaW5kIn0.9AuJG-JNVlHwoSH9C8Pr2A`;

            // // #0f385a
            // axios.get(api_url)
            //     .then(res => {
            //         const suggestion = res.data['features'][0]
            //         this.originMarker = new mapboxgl.Marker({
            //                 color: "#449441",
            //                 draggable: false,
            //                 }).setLngLat([suggestion.center[0], suggestion.center[1]])
            //                 .addTo(this.map);
            //     })
            
        },
        addressChange(search: string, fn: Function) {
            if (!search) return;
            clearTimeout(this.deferredAPICall);
            this.deferredAPICall = setTimeout(() => this.getSuggestions(search), 1000)
        },
        selectPlace(suggestion: AddressSuggestion) {
            this.selectedSuggestion = suggestion

            this.marker = new mapboxgl.Marker({
                            color: "#0f385a",
                            draggable: true
                            }).setLngLat([suggestion.center[0], suggestion.center[1]])
                            .addTo(this.map);
            this.getDirections();
        },
        removeSelectedPlace() {
            this.selectedSuggestion = {} as AddressSuggestion;
        },
        getDirections() {
            const endpoint = 'mapbox/driving'
            const points = `${this.UNPHU.center[0]},${this.UNPHU.center[1]};${this.selectedSuggestion.center[0]},${this.selectedSuggestion.center[1]}`
            const params = { access_token: this.accessToken }
            const api_url = `https://api.mapbox.com/directions/v5/${endpoint}/${points}`

            axios.get(api_url, { params: params })
                .then(res => {
                    console.log(res);
                })
            
        }
    },
    mounted() {
        this.loadMap();
        this.getUniversityCoordinates();
    }
})
</script>

<style scoped>
input {
    border-radius: 5px;
}

#container-map {
    width: 100%;
    height: 70vh;
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