<script setup>
import { useGeneralStore } from '@/stores';
import { inject } from 'vue';
import { useRouter } from 'vue-router'

const axios = inject('axios')
const generalStore = useGeneralStore()
const router = useRouter()

function logout() {
    const endPoint = '/logout'
    axios.post(endPoint)
        .then((response) => {
            console.log(response)
            generalStore.setSnackbarMessage(response.data.message)
            generalStore.setSnackbarColor('success')
            router.push('login')
        })
        .catch((error) => {
            console.error(error)
            generalStore.setSnackbarMessage(error.response.data.message)
            generalStore.setSnackbarColor('error')
        })
        .finally(() => {
            generalStore.showSnackbar()
        })
}
</script>
<template>
    <v-btn @click="logout">
        Logout
    </v-btn>
</template>