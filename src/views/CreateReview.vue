<template>
    <h1>Reseña Viaje #1</h1>
    <h3>Conductor: Pedro Jiménez</h3>
    <p><strong>Fecha:</strong> 13/07/2023</p>
    <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
            <p class="text-center mt-3"><strong>Qué tal te pareció tu viaje?</strong></p>
            <div class="text-center mb-4"><StarRating v-model:rating="rating"></StarRating></div>
            <textarea class="form-control" placeholder="Escribe un comentario (opcional)" id="floatingTextarea2" style="height: 200px"></textarea>
        </div>
        <div class="col-1"></div>
    </div>
    <div class="row mt-3">
        <div class="col-4">
            <button class="btn btn-danger mt-3">Cancelar</button>
        </div>
        <div class="col-4"></div>
        <div class="col-4">
            <button class="btn btn-primary mt-3">Confirmar</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import StarRating from 'vue-star-rating'

export default defineComponent({
    components: {
        StarRating
    },
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            rating: null
        }
    },
})
</script>