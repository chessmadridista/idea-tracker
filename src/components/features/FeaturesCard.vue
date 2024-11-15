<script setup>
import { useFeatureStore } from '@/stores';
import { onBeforeMount, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios')
const featureStore = useFeatureStore()
const features = ref([])
const newFeatureInputFieldVisibility = ref(false)
const router = useRouter()

function getFeatures() {
    const ideaId = router.currentRoute.value.params.id
    const endPoint = `/get-features?idea_id=${ideaId}`
    axios.get(endPoint)
    .then(response => {
        features.value = response.data.features
    })
    .catch(error => {
        console.error(error)
    })
}

function showAddNewFeatureInputField() {
    newFeatureInputFieldVisibility.value = true
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
                        <v-icon color="primary" v-if="features.length > 0">mdi-pencil</v-icon>
                    </v-card-title>
                    <v-card-text v-for="feature in features" :key="feature.id">
                        {{ feature.description }}
                    </v-card-text>
                    <v-card-text v-if="newFeatureInputFieldVisibility">
                        <v-text-field 
                            color="primary"
                            label="Describe the feature in detail*"
                        />
                    </v-card-text>
                    <v-card-actions>
                        <v-btn variant="elevated" color="primary" prepend-icon="mdi-plus" @click="showAddNewFeatureInputField">
                            Add new feature
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>