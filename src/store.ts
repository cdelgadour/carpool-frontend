import { createStore, type ActionContext } from 'vuex'
import type { Brand, LoggedInUser, Model, VehicleWrite, VehicleRead, Rate, Payments, DriverRequests, NamedChoices, Trip, TripDetail } from './models/CommonModels';
import APIService from './service';
import DriverService from './services/vehicle.service';

const requestDecisions: NamedChoices[] = [
    {
        id: '1',
        name: 'Rechazado'
    },
    {
        id: '2',
        name: 'Aprobado'
    },
]

const TripStatus: NamedChoices[] = [
    {
        id: '1',
        name: 'Pendiente'
    },
    {
        id: '2',
        name: 'En curso'
    },
    {
        id: '3',
        name: 'Finalizado'
    },
    {
        id: '5',
        name: 'Cancelado'
    },
]

interface AppState {
    brands: Brand[],
    models: Model[],
    user: LoggedInUser,
    vehiclesWrite: VehicleWrite[],
    vehiclesRead: VehicleRead[],
    driverRates: Rate[],
    driverPayments: Payments[],
    driverRequests: DriverRequests[],
    driverDecisionChoices: NamedChoices[]
    interruptGet: boolean,
    trips: Trip[],
    loadedCreateRouteMap: boolean,
    tripDetail: TripDetail[],
    loading: boolean,
    showSuccessModal: boolean,
    successModalMessage: string,
    userTrips: Trip[],
    selectedUserTripDetail: any
}

const initialState = {
    brands: [],
    models: [],
    user: {} as LoggedInUser,
    vehiclesWrite: [],
    vehiclesRead: [],
    driverRates: [],
    driverPayments: [],
    driverRequests: [],
    driverDecisionChoices: requestDecisions,
    interruptGet: false,
    trips: [],
    loadedCreateRouteMap: false,
    tripDetail: [],
    loading: false,
    showSuccessModal: false,
    successModalMessage: 'Fuiste añadido a este viaje!',
    userTrips: [],
    selectedUserTripDetail: {"id":12,"created_at":"2023-07-15T06:51:19.864083Z","updated_at":"2023-07-16T07:20:29.332262Z","created_by":null,"updated_by":null,"trip_type":1,"available_seats":4,"status":2,"started_at":"2023-07-15T19:34:40Z","completed_at":"2023-07-15T19:34:41Z","user_input_point":{"type":"Feature","geometry":{"type":"Point","coordinates":[-69.952516,18.450979]},"properties":{"id":"origin","marker-symbol":"A"}},"route":{"0":{"legs":[{"steps":[{"mode":"driving","name":"Avenida José Núñez de Cáceres","weight":40.634,"distance":235.701,"duration":34.669,"geometry":"suroBfr}iLfCiA^O|DeBRI","maneuver":{"type":"depart","location":[-69.952516,18.450979],"instruction":"Drive southeast on Avenida José Núñez de Cáceres.","bearing_after":153,"bearing_before":0},"driving_side":"right","intersections":[{"out":0,"entry":[true],"weight":13.159,"bearings":[153],"duration":10.966,"is_urban":true,"location":[-69.952516,18.450979],"admin_index":0,"geometry_index":0,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":2,"out":0,"entry":[true,true,false],"weight":3.157,"bearings":[153,245,333],"duration":2.65,"is_urban":true,"location":[-69.952152,18.450299],"admin_index":0,"turn_duration":0.019,"geometry_index":1,"mapbox_streets_v8":{"class":"primary"}},{"in":2,"out":0,"entry":[true,false,false],"weight":19.938,"bearings":[153,234,333],"duration":16.635,"is_urban":true,"location":[-69.95207,18.450144],"admin_index":0,"turn_duration":0.019,"geometry_index":2,"mapbox_streets_v8":{"class":"primary"}},{"in":3,"out":1,"entry":[false,true,true,false],"bearings":[65,153,246,333],"is_urban":true,"location":[-69.951557,18.449187],"admin_index":0,"turn_weight":1.5,"turn_duration":2.019,"geometry_index":3,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}}]},{"mode":"driving","name":"Avenida José Núñez de Cáceres","weight":620.655,"distance":3652.264,"duration":520.247,"geometry":"yiroB|k}iLIWSHaCdAeChAcDvAOHqAj@cBt@yBbAaAb@QHuClAoBz@EBWLEBcAb@wEvB]Ng@TwB`Ac@PKDoFbC}EvBs@TUF}GpAq@LeCd@_BX_Dl@kB\\uAVsB`@yJhB{E|@yFdAc@H{Fz@C?QBWDuJvAgOvBeOxBg@FkAPsD^OB","maneuver":{"type":"continue","location":[-69.951505,18.449091],"modifier":"uturn","instruction":"Make a left U-turn at Avenida Sarasota to stay on Avenida José Núñez de Cáceres.","bearing_after":333,"bearing_before":153},"driving_side":"right","intersections":[{"in":3,"out":0,"entry":[true,true,false,false],"weight":16.532,"bearings":[66,153,245,333],"duration":10.512,"is_urban":true,"location":[-69.951505,18.449091],"admin_index":0,"turn_weight":12.5,"turn_duration":7.152,"geometry_index":4,"traffic_signal":true,"mapbox_streets_v8":{"class":"secondary"}},{"in":2,"out":3,"entry":[true,false,false,true],"weight":21.99,"bearings":[63,153,246,331],"duration":10.63,"is_urban":true,"location":[-69.951387,18.449142],"admin_index":0,"turn_weight":18.75,"turn_duration":7.93,"geometry_index":5,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[false,false,true,true],"weight":15.125,"bearings":[63,151,245,333],"duration":13.362,"is_urban":true,"location":[-69.951442,18.449238],"admin_index":0,"turn_weight":1.5,"turn_duration":2.008,"geometry_index":6,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":13.957,"bearings":[63,153,332],"duration":11.65,"is_urban":true,"location":[-69.951793,18.449893],"admin_index":0,"turn_duration":0.019,"geometry_index":7,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":16.948,"bearings":[70,152,333],"duration":14.131,"is_urban":true,"location":[-69.952161,18.450563],"admin_index":0,"turn_duration":0.008,"geometry_index":8,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,false,true],"weight":4.668,"bearings":[63,153,239,333],"duration":4.647,"is_urban":true,"location":[-69.952605,18.451378],"admin_index":0,"turn_weight":1.5,"turn_duration":2.007,"geometry_index":9,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[false,false,true,true],"weight":13.096,"bearings":[63,153,238,333],"duration":11.671,"is_urban":true,"location":[-69.952651,18.451463],"admin_index":0,"turn_weight":1.5,"turn_duration":2.007,"geometry_index":10,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,true,true],"weight":10.714,"bearings":[56,153,235,333],"duration":8.935,"is_urban":true,"location":[-69.952874,18.451874],"admin_index":0,"turn_duration":0.007,"geometry_index":11,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,true,true],"weight":13.86,"bearings":[53,153,231,333],"duration":11.557,"is_urban":true,"location":[-69.953144,18.452369],"admin_index":0,"turn_duration":0.007,"geometry_index":12,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":10.211,"bearings":[56,153,333],"duration":8.516,"is_urban":true,"location":[-69.953477,18.45298],"admin_index":0,"turn_duration":0.007,"geometry_index":13,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":20.088,"bearings":[61,153,333],"duration":16.747,"is_urban":true,"location":[-69.953705,18.453399],"admin_index":0,"turn_duration":0.007,"geometry_index":15,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":15.12,"bearings":[63,153,333],"duration":12.607,"is_urban":true,"location":[-69.954101,18.454148],"admin_index":0,"turn_duration":0.007,"geometry_index":16,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,false,true],"weight":2.997,"bearings":[61,153,242,331],"duration":2.851,"is_urban":true,"location":[-69.954402,18.454711],"admin_index":0,"turn_weight":2,"turn_duration":2.021,"geometry_index":17,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":0,"out":1,"entry":[false,true],"weight":6.12,"bearings":[151,330],"duration":5.1,"is_urban":true,"location":[-69.954416,18.454735],"admin_index":0,"geometry_index":18,"mapbox_streets_v8":{"class":"primary"}},{"in":0,"out":1,"entry":[false,true],"weight":0.563,"bearings":[150,330],"duration":0.47,"is_urban":true,"location":[-69.954495,18.454865],"admin_index":0,"geometry_index":19,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[false,false,true,true],"weight":7.629,"bearings":[58,150,241,333],"duration":6.699,"is_urban":true,"location":[-69.954509,18.454888],"admin_index":0,"turn_weight":2,"turn_duration":2.008,"geometry_index":20,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":17.804,"bearings":[63,153,332],"duration":14.855,"is_urban":true,"location":[-69.954694,18.455228],"admin_index":0,"turn_duration":0.019,"geometry_index":21,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[false,false,true,true],"weight":4.56,"bearings":[72,152,237,332],"duration":5.807,"is_urban":true,"location":[-69.955288,18.456307],"admin_index":0,"turn_duration":2.007,"geometry_index":22,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":4.32,"bearings":[65,152,333],"duration":3.608,"is_urban":true,"location":[-69.955372,18.45646],"admin_index":0,"turn_duration":0.008,"geometry_index":23,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":15.429,"bearings":[63,153,333],"duration":12.865,"is_urban":true,"location":[-69.955484,18.456665],"admin_index":0,"turn_duration":0.007,"geometry_index":24,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,false,true],"weight":6.821,"bearings":[68,153,241,335],"duration":7.692,"is_urban":true,"location":[-69.955808,18.457262],"admin_index":0,"turn_duration":2.008,"geometry_index":25,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[false,false,true],"weight":19.828,"bearings":[66,153,332],"duration":16.894,"is_urban":true,"location":[-69.955932,18.457501],"admin_index":0,"turn_duration":0.019,"geometry_index":27,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,true,true],"weight":27.999,"bearings":[72,152,241,333],"duration":23.836,"is_urban":true,"location":[-69.95659,18.458696],"admin_index":0,"turn_duration":0.008,"geometry_index":28,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,true,true],"weight":3.747,"bearings":[72,153,251,339],"duration":5.199,"is_urban":true,"location":[-69.957194,18.459808],"admin_index":0,"turn_duration":2.01,"geometry_index":29,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":21.513,"bearings":[75,159,341],"duration":18.316,"is_urban":true,"location":[-69.9573,18.460072],"admin_index":0,"turn_duration":0.008,"geometry_index":30,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":4.532,"bearings":[72,165,345],"duration":3.864,"is_urban":true,"location":[-69.95775,18.461608],"admin_index":0,"turn_duration":0.007,"geometry_index":32,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":15.51,"bearings":[75,165,345],"duration":13.207,"is_urban":true,"location":[-69.957823,18.461864],"admin_index":0,"turn_duration":0.007,"geometry_index":33,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,true,true],"weight":8.948,"bearings":[77,165,253,345],"duration":7.622,"is_urban":true,"location":[-69.958007,18.462529],"admin_index":0,"turn_duration":0.007,"geometry_index":34,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[false,false,true],"weight":15.13,"bearings":[68,165,345],"duration":12.884,"is_urban":true,"location":[-69.958143,18.463009],"admin_index":0,"turn_duration":0.007,"geometry_index":35,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":10.087,"bearings":[72,165,345],"duration":8.592,"is_urban":true,"location":[-69.958371,18.463813],"admin_index":0,"turn_duration":0.007,"geometry_index":36,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":8.135,"bearings":[70,165,345],"duration":6.93,"is_urban":true,"location":[-69.958522,18.464347],"admin_index":0,"turn_duration":0.007,"geometry_index":37,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,true,true],"weight":10.627,"bearings":[70,165,258,345],"duration":10.2,"is_urban":true,"location":[-69.958644,18.46478],"admin_index":0,"turn_weight":1,"turn_duration":2.007,"geometry_index":38,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":2,"entry":[true,false,true],"weight":24.267,"bearings":[70,165,345],"duration":20.66,"is_urban":true,"location":[-69.958806,18.465357],"admin_index":0,"turn_duration":0.007,"geometry_index":39,"mapbox_streets_v8":{"class":"primary"}},{"in":0,"out":2,"entry":[false,true,true],"weight":16.349,"bearings":[165,253,345],"duration":13.07,"is_urban":true,"location":[-69.959339,18.46725],"admin_index":0,"turn_weight":1,"turn_duration":0.007,"geometry_index":40,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,true,true],"weight":15.918,"bearings":[77,165,258,345],"duration":13.554,"is_urban":true,"location":[-69.95965,18.468353],"admin_index":0,"turn_duration":0.007,"geometry_index":41,"mapbox_streets_v8":{"class":"primary"}},{"in":0,"out":2,"entry":[false,true,true],"weight":28.797,"bearings":[165,256,345],"duration":24.515,"is_urban":true,"location":[-69.96,18.469596],"admin_index":0,"turn_duration":0.007,"geometry_index":42,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,true,true],"weight":33.688,"bearings":[77,168,258,347],"duration":27.261,"is_urban":true,"location":[-69.96037,18.471147],"admin_index":0,"turn_weight":1,"turn_duration":0.021,"geometry_index":46,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,true,true],"weight":36.535,"bearings":[77,168,258,348],"duration":30.453,"is_urban":true,"location":[-69.960835,18.473139],"admin_index":0,"turn_duration":0.007,"geometry_index":48,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,true,true],"weight":59.124,"bearings":[75,168,258,348],"duration":50.443,"is_urban":true,"location":[-69.961441,18.475737],"admin_index":0,"turn_weight":1,"turn_duration":2.007,"geometry_index":49,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":0,"out":2,"entry":[false,true,true],"weight":4.516,"bearings":[168,255,348],"duration":3.771,"is_urban":true,"location":[-69.962047,18.478334],"admin_index":0,"turn_duration":0.007,"geometry_index":50,"mapbox_streets_v8":{"class":"primary"}},{"in":0,"out":2,"entry":[false,true,true],"weight":8.444,"bearings":[168,246,348],"duration":7.043,"is_urban":true,"location":[-69.962093,18.478534],"admin_index":0,"turn_duration":0.007,"geometry_index":51,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":3,"entry":[true,false,true,true],"bearings":[77,168,258,350],"is_urban":true,"location":[-69.962181,18.478911],"admin_index":0,"turn_duration":0.008,"geometry_index":52,"mapbox_streets_v8":{"class":"primary"}}]},{"ref":"RD-1","mode":"driving","name":"Avenida John F. Kennedy","weight":72.015,"distance":525.232,"duration":51.763,"geometry":"ijxoBvo_jLCUIg@CQg@yDMkAUeBCUIi@Wq@Is@YoBMs@McAG_@CUQcA","maneuver":{"type":"turn","location":[-69.962358,18.47989],"modifier":"right","instruction":"Turn right onto Avenida John F. Kennedy/RD-1. Continue on RD-1.","bearing_after":77,"bearing_before":350},"driving_side":"right","intersections":[{"in":1,"out":0,"entry":[true,false,false,true],"weight":23.44,"bearings":[77,170,258,344],"duration":14.014,"is_urban":true,"location":[-69.962358,18.47989],"admin_index":0,"turn_weight":11.2,"turn_duration":3.814,"geometry_index":54,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":0,"entry":[true,false,false],"weight":12.444,"bearings":[77,257,275],"duration":9.556,"is_urban":true,"location":[-69.962045,18.479957],"admin_index":0,"turn_weight":1,"turn_duration":0.019,"geometry_index":56,"mapbox_streets_v8":{"class":"primary"}},{"in":2,"out":0,"entry":[true,true,false],"weight":6.253,"bearings":[77,165,258],"duration":5.23,"is_urban":true,"location":[-69.960649,18.480253],"admin_index":0,"turn_duration":0.019,"geometry_index":59,"mapbox_streets_v8":{"class":"primary"}},{"in":2,"out":0,"entry":[true,true,false],"weight":8.592,"bearings":[78,168,257],"duration":7.332,"is_urban":true,"location":[-69.960141,18.48036],"admin_index":0,"turn_duration":0.019,"geometry_index":60,"mapbox_streets_v8":{"class":"primary"}},{"in":2,"out":0,"entry":[true,true,false,false],"weight":9.845,"bearings":[79,168,242,266],"duration":5.847,"is_urban":true,"location":[-69.959567,18.480554],"admin_index":0,"turn_weight":3,"turn_duration":0.022,"geometry_index":63,"mapbox_streets_v8":{"class":"trunk"}},{"in":2,"out":0,"entry":[true,true,false],"weight":6.11,"bearings":[75,168,256],"duration":5.219,"is_urban":true,"location":[-69.958749,18.480729],"admin_index":0,"turn_duration":0.019,"geometry_index":65,"mapbox_streets_v8":{"class":"trunk"}},{"in":2,"out":0,"entry":[true,true,false],"weight":1.493,"bearings":[77,165,256],"duration":1.278,"is_urban":true,"location":[-69.958155,18.480871],"admin_index":0,"turn_duration":0.007,"geometry_index":67,"mapbox_streets_v8":{"class":"trunk"}},{"in":2,"out":0,"entry":[true,true,false],"bearings":[76,168,257],"is_urban":true,"location":[-69.957989,18.480908],"admin_index":0,"turn_duration":0.021,"geometry_index":68,"mapbox_streets_v8":{"class":"trunk"}}]},{"ref":"RD-1","mode":"driving","name":"Expreso John F. Kennedy","weight":92.541,"distance":1062.416,"duration":78.231,"geometry":"kqxoBrq~iLMWO{@c@_CWaBW_BU{AQeBKaBIiCKeCCgAKeEHqBEwAEoBAi@EyCE{AGoC","maneuver":{"type":"fork","location":[-69.957539,18.481022],"modifier":"slight left","instruction":"Keep left to take RD-1/Expreso John F. Kennedy.","bearing_after":64,"bearing_before":75},"driving_side":"right","intersections":[{"in":2,"out":0,"entry":[true,true,false],"weight":3.55,"bearings":[64,92,255],"duration":3.066,"is_urban":true,"location":[-69.957539,18.481022],"admin_index":0,"turn_duration":0.045,"geometry_index":70,"mapbox_streets_v8":{"class":"trunk"}},{"in":1,"out":0,"entry":[true,false],"weight":47.45,"bearings":[74,253],"duration":40.383,"is_urban":true,"location":[-69.957124,18.481174],"admin_index":0,"geometry_index":72,"mapbox_streets_v8":{"class":"trunk"}},{"in":1,"out":0,"entry":[true,false],"weight":12.463,"bearings":[86,266],"duration":10.607,"is_urban":true,"location":[-69.952325,18.481979],"admin_index":0,"geometry_index":81,"mapbox_streets_v8":{"class":"trunk"}},{"in":2,"out":0,"entry":[true,false,false],"weight":4.573,"bearings":[86,263,275],"duration":3.289,"is_urban":true,"location":[-69.950769,18.481992],"admin_index":0,"turn_weight":0.75,"turn_duration":0.036,"geometry_index":83,"mapbox_streets_v8":{"class":"trunk"}},{"in":2,"out":0,"entry":[true,true,false],"weight":5.093,"bearings":[87,175,266],"duration":4.342,"is_urban":true,"location":[-69.950329,18.482018],"admin_index":0,"turn_duration":0.007,"geometry_index":84,"mapbox_streets_v8":{"class":"trunk"}},{"in":2,"out":0,"entry":[true,true,false],"weight":1.899,"bearings":[88,180,267],"duration":1.624,"is_urban":true,"location":[-69.949773,18.48205],"admin_index":0,"turn_duration":0.008,"geometry_index":85,"mapbox_streets_v8":{"class":"trunk"}},{"in":2,"out":0,"entry":[true,true,false],"weight":11.083,"bearings":[88,177,268],"duration":9.44,"is_urban":true,"location":[-69.949565,18.482058],"admin_index":0,"turn_duration":0.008,"geometry_index":86,"mapbox_streets_v8":{"class":"trunk"}},{"in":2,"out":0,"entry":[true,true,false],"bearings":[86,176,266],"is_urban":true,"location":[-69.948326,18.482117],"admin_index":0,"turn_duration":0.007,"geometry_index":88,"mapbox_streets_v8":{"class":"trunk"}}]},{"ref":"RD-1","mode":"driving","name":"Expreso John F. Kennedy","weight":35.895,"distance":296.98,"duration":30.573,"geometry":"oxxoBps|iLGu@Aq@EeAKkBS{BMiAOkA","maneuver":{"type":"fork","location":[-69.947609,18.482159],"modifier":"slight left","instruction":"Keep left to stay on RD-1/Expreso John F. Kennedy.","bearing_after":82,"bearing_before":86},"driving_side":"right","intersections":[{"in":2,"out":0,"entry":[true,true,false],"bearings":[82,101,266],"is_urban":true,"location":[-69.947609,18.482159],"admin_index":0,"turn_duration":0.024,"geometry_index":89,"mapbox_streets_v8":{"class":"trunk"}}]},{"ref":"RD-1","mode":"driving","name":"Avenida John F. Kennedy","weight":156.804,"distance":495.011,"duration":133.971,"geometry":"}zxoBdb|iLEaACSOy@WgAS{@S{@S{@Ok@_@uAy@oCe@yAc@wAK]","maneuver":{"type":"turn","location":[-69.94483,18.482552],"modifier":"slight right","instruction":"Bear right onto Avenida John F. Kennedy/RD-1.","bearing_after":75,"bearing_before":77},"driving_side":"right","intersections":[{"in":2,"out":1,"entry":[true,true,false],"weight":8.883,"bearings":[72,86,257],"duration":12.612,"is_urban":true,"location":[-69.94483,18.482552],"admin_index":0,"turn_duration":0.012,"geometry_index":96,"mapbox_streets_v8":{"class":"primary_link"}},{"in":2,"out":0,"entry":[true,false,false],"weight":61.646,"bearings":[75,251,266],"duration":47.613,"is_urban":true,"location":[-69.944503,18.482576],"admin_index":0,"turn_weight":5.75,"turn_duration":0.041,"geometry_index":97,"mapbox_streets_v8":{"class":"primary"}},{"in":1,"out":0,"entry":[true,false],"weight":47.134,"bearings":[70,249],"duration":40.114,"is_urban":true,"location":[-69.942846,18.483104],"admin_index":0,"geometry_index":103,"mapbox_streets_v8":{"class":"primary"}},{"in":2,"out":0,"entry":[true,true,false],"weight":16.595,"bearings":[66,146,247],"duration":14.13,"is_urban":true,"location":[-69.941475,18.483633],"admin_index":0,"turn_duration":0.007,"geometry_index":106,"mapbox_streets_v8":{"class":"primary"}},{"in":2,"out":0,"entry":[true,true,false],"weight":15.409,"bearings":[67,77,246],"duration":13.122,"is_urban":true,"location":[-69.941032,18.48382],"admin_index":0,"turn_duration":0.008,"geometry_index":107,"mapbox_streets_v8":{"class":"primary"}},{"in":2,"out":0,"entry":[true,true,false,false],"bearings":[67,151,247,329],"is_urban":true,"location":[-69.940588,18.484002],"admin_index":0,"turn_weight":2,"turn_duration":2.008,"geometry_index":108,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}}]},{"mode":"driving","name":"Avenida Abraham Lincoln","weight":14.932,"distance":18.976,"duration":13.376,"geometry":"kdyoBvf{iL]P","maneuver":{"type":"turn","location":[-69.940438,18.484062],"modifier":"left","instruction":"Turn left onto Avenida Abraham Lincoln.","bearing_after":330,"bearing_before":67},"driving_side":"right","intersections":[{"in":2,"out":3,"entry":[true,false,false,true],"bearings":[75,153,247,330],"is_urban":true,"location":[-69.940438,18.484062],"admin_index":0,"turn_weight":8.75,"turn_duration":8.114,"geometry_index":109,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary"}}]},{"ref":"RD-1","mode":"driving","name":"Expreso John F. Kennedy","weight":102.089,"distance":615.424,"duration":65.975,"geometry":"ieyoBhg{iLJ\\f@zA`@pA|@pCXjBXnAP`ATlAHr@L|@D`@Ff@JjAZzC@F","maneuver":{"type":"turn","location":[-69.940529,18.484209],"modifier":"left","instruction":"Turn left to take the RD-1 ramp.","bearing_after":245,"bearing_before":330},"destinations":"RD-1","driving_side":"right","intersections":[{"in":0,"out":1,"entry":[false,true,true],"weight":2.271,"bearings":[150,248,334],"duration":9.707,"is_urban":true,"location":[-69.940529,18.484209],"admin_index":0,"turn_duration":6.486,"geometry_index":110,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary_link"}},{"in":0,"out":2,"entry":[false,true,true,false],"weight":29.919,"bearings":[68,149,245,332],"duration":21.102,"is_urban":true,"location":[-69.940681,18.484151],"admin_index":0,"turn_weight":7.5,"turn_duration":2.022,"geometry_index":111,"traffic_signal":true,"mapbox_streets_v8":{"class":"primary_link"}},{"in":1,"out":2,"entry":[false,false,true],"weight":13.965,"bearings":[42,65,246],"duration":11.467,"is_urban":true,"location":[-69.941141,18.483952],"admin_index":0,"turn_weight":0.5,"turn_duration":0.007,"geometry_index":112,"mapbox_streets_v8":{"class":"primary_link"}},{"in":1,"out":2,"entry":[false,false,true],"weight":33.136,"bearings":[68,75,252],"duration":4.904,"is_urban":true,"location":[-69.942821,18.483336],"admin_index":0,"turn_weight":27.4,"turn_duration":0.022,"geometry_index":115,"mapbox_streets_v8":{"class":"trunk"}},{"in":0,"out":2,"entry":[false,true,true],"weight":7.931,"bearings":[73,244,254],"duration":6.757,"is_urban":true,"location":[-69.943547,18.48312],"admin_index":0,"turn_duration":0.007,"geometry_index":117,"mapbox_streets_v8":{"class":"trunk"}},{"in":1,"out":2,"entry":[false,false,true],"weight":7.135,"bearings":[61,78,259],"duration":5.442,"is_urban":true,"location":[-69.944508,18.482893],"admin_index":0,"turn_weight":0.75,"turn_duration":0.008,"geometry_index":120,"mapbox_streets_v8":{"class":"trunk"}},{"in":1,"out":2,"entry":[true,false,true],"weight":7.251,"bearings":[1,79,259],"duration":6.178,"is_urban":true,"location":[-69.945255,18.482758],"admin_index":0,"turn_duration":0.007,"geometry_index":123,"mapbox_streets_v8":{"class":"trunk"}},{"in":1,"out":2,"entry":[true,false,true],"bearings":[0,79,262],"is_urban":true,"location":[-69.946037,18.482616],"admin_index":0,"turn_duration":0.008,"geometry_index":124,"mapbox_streets_v8":{"class":"trunk"}}]},{"ref":"RD-1","mode":"driving","name":"Avenida John F. Kennedy","weight":32.658,"distance":310.162,"duration":27.863,"geometry":"i{xoB~i|iLC^APBtADnBHdBNrCDvA","maneuver":{"type":"fork","location":[-69.946082,18.48261],"modifier":"slight right","instruction":"Keep right to take Avenida John F. Kennedy/RD-1.","bearing_after":278,"bearing_before":262},"driving_side":"right","intersections":[{"in":0,"out":2,"entry":[false,true,true],"weight":2.055,"bearings":[82,258,278],"duration":1.768,"is_urban":true,"location":[-69.946082,18.48261],"admin_index":0,"turn_duration":0.019,"geometry_index":125,"mapbox_streets_v8":{"class":"primary"}},{"in":0,"out":1,"entry":[false,true,false],"weight":13.778,"bearings":[98,272,358],"duration":11.756,"is_urban":true,"location":[-69.946242,18.482631],"admin_index":0,"turn_duration":0.03,"geometry_index":126,"mapbox_streets_v8":{"class":"primary"}},{"in":0,"out":1,"entry":[false,true,true],"bearings":[86,264,355],"is_urban":true,"location":[-69.947318,18.482589],"admin_index":0,"turn_duration":0.019,"geometry_index":129,"mapbox_streets_v8":{"class":"primary"}}]},{"mode":"driving","name":"","weight":433.15,"distance":49.599,"duration":19.417,"geometry":"ezxoBh||iLMBa@Fc@L","maneuver":{"type":"turn","location":[-69.949007,18.482425],"modifier":"right","instruction":"Turn right.","bearing_after":346,"bearing_before":264},"driving_side":"right","intersections":[{"in":0,"out":2,"entry":[false,true,true],"weight":83.384,"bearings":[84,262,346],"duration":4.272,"is_urban":true,"location":[-69.949007,18.482425],"admin_index":0,"turn_weight":80,"turn_duration":1.392,"geometry_index":132,"mapbox_streets_v8":{"class":"service"}},{"in":0,"out":1,"entry":[false,true],"weight":339.46,"bearings":[166,345],"duration":7.2,"is_urban":true,"location":[-69.949026,18.482497],"admin_index":0,"turn_weight":331,"geometry_index":133,"mapbox_streets_v8":{"class":"service"}},{"in":1,"out":2,"entry":[true,false,true],"bearings":[84,165,341],"is_urban":true,"location":[-69.949074,18.482669],"admin_index":0,"turn_weight":1,"turn_duration":0.024,"geometry_index":134,"mapbox_streets_v8":{"class":"service"}}]},{"mode":"driving","name":"","weight":13.28,"distance":31.541,"duration":13.601,"geometry":"y|xoBb}|iLC{@","maneuver":{"type":"turn","location":[-69.94914,18.482852],"modifier":"right","instruction":"Turn right.","bearing_after":86,"bearing_before":341},"driving_side":"right","intersections":[{"in":1,"out":0,"entry":[true,false,true],"bearings":[86,161,341],"is_urban":true,"location":[-69.94914,18.482852],"admin_index":0,"turn_weight":2,"turn_duration":4.001,"geometry_index":135,"mapbox_streets_v8":{"class":"service"}}]},{"mode":"driving","name":"","weight":88.743,"distance":241.637,"duration":72.203,"geometry":"}|xoBf{|iLg@@{@LG@GBy@v@GDK@{@E[EYGg@SYOQQ","maneuver":{"type":"turn","location":[-69.948842,18.482872],"modifier":"left","instruction":"Turn left.","bearing_after":357,"bearing_before":86},"driving_side":"right","intersections":[{"in":1,"out":2,"entry":[true,false,true],"weight":14.658,"bearings":[83,266,357],"duration":11.244,"is_urban":true,"location":[-69.948842,18.482872],"admin_index":0,"turn_weight":7.5,"turn_duration":5.152,"geometry_index":136,"mapbox_streets_v8":{"class":"service"}},{"in":1,"out":2,"entry":[true,false,true],"weight":31.261,"bearings":[86,177,348],"duration":25.789,"is_urban":true,"location":[-69.948853,18.483066],"admin_index":0,"turn_weight":1,"turn_duration":0.036,"geometry_index":137,"mapbox_streets_v8":{"class":"service"}},{"in":0,"out":1,"entry":[false,true],"bearings":[141,357],"is_urban":true,"location":[-69.949259,18.483778],"admin_index":0,"turn_weight":1.5,"geometry_index":142,"mapbox_streets_v8":{"class":"service"}}]},{"mode":"driving","name":"","weight":16.805,"distance":41.566,"duration":15.365,"geometry":"eiyoBr{|iLv@u@","maneuver":{"type":"turn","location":[-69.948897,18.484831],"modifier":"right","instruction":"Turn right.","bearing_after":138,"bearing_before":42},"driving_side":"right","intersections":[{"in":2,"out":1,"entry":[true,true,false],"bearings":[46,138,222],"is_urban":true,"location":[-69.948897,18.484831],"admin_index":0,"turn_weight":2,"turn_duration":2.765,"geometry_index":149,"mapbox_streets_v8":{"class":"service"}}]},{"mode":"driving","name":"","weight":15.359,"distance":14.863,"duration":7.359,"geometry":"mgyoB|y|iL?[","maneuver":{"type":"turn","location":[-69.948633,18.484554],"modifier":"left","instruction":"Turn left.","bearing_after":90,"bearing_before":138},"driving_side":"right","intersections":[{"in":2,"out":0,"entry":[true,true,false],"bearings":[90,144,318],"is_urban":true,"location":[-69.948633,18.484554],"admin_index":0,"turn_weight":7.5,"turn_duration":0.671,"geometry_index":150,"mapbox_streets_v8":{"class":"service"}}]},{"mode":"driving","name":"","weight":0,"distance":0,"duration":0,"geometry":"mgyoB`y|iL??","maneuver":{"type":"arrive","location":[-69.948492,18.484554],"modifier":"left","instruction":"Your destination is on the left.","bearing_after":0,"bearing_before":90},"driving_side":"right","intersections":[{"in":0,"entry":[true],"bearings":[270],"location":[-69.948492,18.484554],"admin_index":0,"geometry_index":151}]}],"admins":[{"iso_3166_1":"DO","iso_3166_1_alpha3":"DOM"}],"weight":1735.56,"summary":"Avenida José Núñez de Cáceres, RD-1","distance":7591.373,"duration":1084.611,"via_waypoints":[]}],"weight":1735.56,"distance":7591.373,"duration":1084.611,"geometry":"suroBfr}iLfCiA^O|DeBRIIWSHaCdAeChAcDvAOHqAj@cBt@yBbAaAb@QHuClAoBz@EBWLEBcAb@wEvB]Ng@TwB`Ac@PKDoFbC}EvBs@TUF}GpAq@LeCd@_BX_Dl@kB\\uAVsB`@yJhB{E|@yFdAc@H{Fz@C?QBWDuJvAgOvBeOxBg@FkAPsD^OBCUIg@CQg@yDMkAUeBCUIi@Wq@Is@YoBMs@McAG_@CUQcAMWO{@c@_CWaBW_BU{AQeBKaBIiCKeCCgAKeEHqBEwAEoBAi@EyCE{AGoCGu@Aq@EeAKkBS{BMiAOkAEaACSOy@WgAS{@S{@S{@Ok@_@uAy@oCe@yAc@wAK]]PJ\\f@zA`@pA|@pCXjBXnAP`ATlAHr@L|@D`@Ff@JjAZzC@FC^APBtADnBHdBNrCDvAMBa@Fc@LC{@g@@{@LG@GBy@v@GDK@{@E[EYGg@SYOQQv@u@?[","weight_name":"auto"}},"scheduled_date":"2023-07-15T18:00:00Z","driver":7},
    activeTrip: '',
    activeTripDetail: '',
} as AppState

const apiService = new APIService();
const driverService = new DriverService();

export default createStore({
    state() {
        return {...initialState}
    },
    getters: {
        getSuccessModal(state): Boolean {
            return state.showSuccessModal
        },
        getSuccessModalMessage(state): string {
            return state.successModalMessage
        },
        getUserTripDetail(state): any {
            return state.selectedUserTripDetail
        },
        getUserTrips(state): Trip[] {
            return state.userTrips
        },
        getVehicleBrands(state) : Brand[] {
            return state.brands
        },
        getIsLoading(state) : boolean {
            return state.loading;
        },
        getVehicleModels(state) : Model[] {
            return state.models
        },
        getUserVehicles(state) : VehicleRead[] {
            return state.vehiclesRead
        },
        getUserData(state) : LoggedInUser {
            return state.user
        },
        getDriverRates(state) : Rate[] {
            return state.driverRates
        },
        getDriverPayments(state) : Payments[] {
            return state.driverPayments
        },
        getDriverRequests(state) : DriverRequests[] {
            return state.driverRequests
        },
        getDriverDecisionChoices(state) : NamedChoices[] {
            return state.driverDecisionChoices
        },
        getDriverTrips(state) : Trip[] {
            return state.trips
        },
        getTripStatus() : NamedChoices[] {
            return TripStatus
        },
        getIsDriver(state) : boolean {
            return state.user.driver != "" 
        },
    },
    mutations: {
        RESET_STATE(state: AppState) {
            Object.assign(state, {...initialState})
        },
        SET_VEHICLE_BRANDS(state: AppState, data: Brand[]) {
            state.brands = data
        },
        SET_VEHICLE_MODELS(state: AppState, data: Model[]) {
            state.models = data
        },
        SET_LOADED_CREATE_ROUTE_MAP(state: AppState) {
            state.loadedCreateRouteMap = true;
        },
        GET_USER_VEHICLES(state: AppState, data: VehicleRead[]) {
            state.vehiclesRead = data
        },
        ADD_NEW_VEHICLE(state: AppState, data: VehicleWrite) {
            state.vehiclesWrite.push(data)
        },
        SET_TRIPS(state: AppState, data: Trip[]) {
            state.trips = data
        },
        ADD_NEW_TRIP(state: AppState, data: Trip) {
            state.trips.push(data)
        },
        SET_TRIP_DETAIL(state: AppState, data: TripDetail[]) {
            state.tripDetail = data
        },
        ADD_NEW_TRIP_DETAIL(state: AppState, data: TripDetail) {
            state.tripDetail.push(data)
        },
        DELETE_TRIP(state: AppState, id: number) {
            state.trips = state.trips.filter((x) => x.id != id)
        },
        UPDATE_VEHICLE(state: AppState, data: VehicleWrite) {
            state.vehiclesWrite.push(data)
        },
        DELETE_VEHICLE(state: AppState, data: string) {
            state.vehiclesWrite.filter((x) => x.id != data)
        },
        SET_USER_DATA(state: AppState, data: LoggedInUser) {
            state.user = data
        },
        GET_DRIVER_RATES(state: AppState, data: Rate[]) {
            state.driverRates = data
        },
        GET_DRIVER_PAYMENTS(state: AppState, data: Payments[]) {
            state.driverPayments = data
        },
        GET_DRIVER_REQUESTS(state: AppState, data: DriverRequests[]) {
            state.driverRequests = data
        },
        SET_INTERRUPT_LOAD(state: AppState) {
            state.interruptGet = !state.interruptGet
        },
        SET_IS_LOADING(state: AppState, data: boolean) {
            state.loading = data
        },
        SET_SUCCESS_MODAL(state: AppState, data: boolean) {
            state.showSuccessModal = data
        },
        SET_SUCCESS_MODAL_MESSAGE(state: AppState, data: string) {
            state.successModalMessage = data
        },
        SET_USER_TRIPS(state: AppState, data: Trip[]) {
            state.userTrips = data
        },
        SET_SELECTED_USER_TRIP_DETAIL(state: AppState, data: any) {
            state.selectedUserTripDetail = data
        },
    },
    actions: {
        async getUserData(context: ActionContext<AppState, AppState>) {
            try {
                const response = await apiService.get('api/me/');    
                context.commit('SET_USER_DATA', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getTwoFactor(context: ActionContext<AppState, AppState>) {
            try {
                const response = await apiService.post('api/users/two_factor/', {});    
                return response.data
            } catch (error) {
                console.log(error)
            }
        },
        async fetchBrands(context: ActionContext<AppState, AppState>) {
            try {
                const response = await apiService.get('api/vehicles/brands/');    
                context.commit('SET_VEHICLE_BRANDS', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchModels(context: ActionContext<AppState, AppState>) {
            try {
                const response = await apiService.get('api/vehicles/models/');    
                context.commit('SET_VEHICLE_MODELS', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getUserVehicles(context: ActionContext<AppState, AppState>) {
            const driverId = context.state.user.driver;

            try {
                let response = await apiService.get(`api/driver/${driverId}/vehicles/`)
                context.commit('GET_USER_VEHICLES', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async createVehicle(context: ActionContext<AppState, AppState>, data: VehicleWrite) {
            try {
                let response = await apiService.post('api/vehicles/', data)
                context.commit('ADD_NEW_VEHICLE', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async createTrip(context: ActionContext<AppState, AppState>, data: Trip) {
            try {
                let response = await apiService.post('api/trips/', data)
                context.commit('ADD_NEW_TRIP', response.data)
                return true
            } catch (error) {
                console.log(error)
                return false
            }            
        },
        async createTripDetail(context: ActionContext<AppState, AppState>, data: TripDetail) {
            try {
                let response = await apiService.post('api/trips-detail/', data)
                context.commit('ADD_NEW_TRIP_DETAIL', response.data)
                return true
            } catch (error) {
                console.log(error)
                return false
            }            
        },
        async updateVehicle(context: ActionContext<AppState, AppState>, data: VehicleWrite) {
            try {
                let response = await apiService.patch('api/vehicles/', data, data.id)
                context.commit('UPDATE_VEHICLE', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async deleteVehicle(context: ActionContext<AppState, AppState>, data: string) {
            try {
                let response = await apiService.delete('api/vehicles/', data)
                context.commit('DELETE_VEHICLE', data)

            } catch (error) {
                console.log(error)
            }
        },
        async requestAsDriver(context: ActionContext<AppState, AppState>, data: VehicleWrite) {
            const userId = context.state.user.id;

            try {
                let response = await apiService.get(`api/users/${userId}/driver_request/`)
            } catch (error) {
                console.log(error)
            }            
        },
        async getDriverRates(context: ActionContext<AppState, AppState>) {
            const driverId = context.state.user.driver;

            try {
                let response = await apiService.get(`api/driver/${driverId}/rates/`)
                context.commit('GET_DRIVER_RATES', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async getDriverPayments(context: ActionContext<AppState, AppState>) {
            const driverId = context.state.user.driver;
            
            try {
                let response = await apiService.get(`api/driver/${driverId}/payments/`)
                context.commit('GET_DRIVER_PAYMENTS', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async getDriverTrips(context: ActionContext<AppState, AppState>) {
            const driverId = context.state.user.driver;
            
            try {
                let response = await apiService.get(`api/trips/`)
                context.commit('SET_TRIPS', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async getUserTrips(context: ActionContext<AppState, AppState>) {
            const userId = context.state.user.id;
            
            try {
                let response = await apiService.get(`api/trips-detail/`)
                context.commit('SET_USER_TRIPS', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async getDriverRequests(context: ActionContext<AppState, AppState>) {
            try {
                let response = await apiService.get(`api/admin/driver-requests/`)
                context.commit('GET_DRIVER_REQUESTS', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async decideOnRequest(context: ActionContext<AppState, AppState>, data: { id: string, decision: string }) {
            try {
                let response = await apiService.patch(`api/admin/driver-requests/`, { decision: data.decision  }, data.id)
                const existingRequest = context.getters.getDriverRequests.filter((req: DriverRequests) => req.id != data.id);
                existingRequest.push(response.data);
                context.commit('GET_DRIVER_REQUESTS', existingRequest);
            } catch (error) {
                console.log(error)
            }            
        }
    }
})