<template>
   <div class="modal animate__animated animate__fadeIn" id="successModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
            </div>
            <div class="modal-body">
                <div style="" class="text-center">
                    <img style="width: 75px" src="~@/assets/success-35.png" alt="">
                    <p class="mt-3" style="font-size: 18px;"><strong>Fuiste añadido a este viaje!</strong></p>
                </div>
            </div>
            <div class="modal-footer">
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({})
</script>

<style>
.animate__animated.animate__fadeIn {
  --animate-duration: 1s;
}
</style>

<style scoped>
.modal-header {
    padding: 0 !important;
}
.modal-footer {
    padding: 0 !important;
}
</style>