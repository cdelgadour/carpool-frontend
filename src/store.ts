import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        INCREMENT(state) {
            state.count++;
        }
    },
    actions: {
        incrementCount(state) : void {
            console.log('Calling from store!');
            state.commit('INCREMENT');
        }
    }
})