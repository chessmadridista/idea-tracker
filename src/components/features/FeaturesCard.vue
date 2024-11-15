<script setup>
import { onBeforeMount, inject, ref } from 'vue';

const axios = inject('axios')
const features = ref([])

function getFeatures() {
    const endPoint = '/get-features'
    axios.get(endPoint)
    .then(response => {
        features.value = response.data.features
    })
    .catch(error => {
        console.error(error)
    })
}

onBeforeMount(() => {
    getFeatures()
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Features
                    </v-card-title>
                    <v-card-text v-for="feature in features" :key="feature.id">
                        {{ feature.description }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn variant="elevated" color="primary" @click="addNewFeature">
                            Add new feature
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>