<script setup>
import { inject, ref, onBeforeMount } from 'vue';

const axios = inject('axios')
const partnerUsername = ref('')

function getPartnerUsername() {
    const endPoint = '/get-partner-username'
    axios.post(endPoint)
        .then(response => {
            partnerUsername.value = response.data.partner_username
        })
        .catch(error => {
            console.error(error);
        })
}

onBeforeMount(() => {
    getPartnerUsername()
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center">
                        <v-icon color="primary">mdi-bucket</v-icon> Your bucket lists with {{ partnerUsername }}
                        <v-icon color="primary">mdi-bucket</v-icon>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>