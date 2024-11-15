<script setup>
import { useFeatureStore, useGeneralStore } from '@/stores';
import { onBeforeMount, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios')
const featureStore = useFeatureStore()
const generalStore = useGeneralStore()
const features = ref([])
const newFeatureInputFieldVisibility = ref(false)
const router = useRouter()
const form = ref(null)
const newFeature = ref('')

function addNewFeature() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const ideaId = router.currentRoute.value.params.id
            const endPoint = "/create-feature"
            const formData = new FormData()
            formData.append('idea_id', ideaId)
            formData.append('feature_description', newFeature.value)
            axios.post(endPoint, formData)
            .then(response => {
                const feature = {
                    id: response.data.feature_id,
                    idea_id: ideaId,
                    description: newFeature.value,
                }
                features.value.push(feature)
                newFeature.value = ''
                generalStore.setSnackbarMessage(response.data.message)
                generalStore.setSnackbarColor('success')
                generalStore.showSnackbar()
            })
            .catch(error => {
                console.error(error)
            })
        }
    })
}

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
                        Brainstorm your features
                    </v-card-title>
                    <v-card-text v-if="features.length > 0">
                        <p class="text-pre-wrap" v-for="feature in features" :key="feature.id">
                            <v-icon color="secondary">mdi-circle</v-icon> {{ feature.description }}
                        </p>
                    </v-card-text>
                    <v-card-text>
                        <v-form ref="form" @submit.prevent="addNewFeature">
                            <v-textarea 
                                color="primary"
                                label="Describe the feature in detail*"
                                v-model="newFeature"
                                :rules="[(v) => !!v || 'This field is required.']"
                            />
                            <v-btn type="submit" variant="elevated" color="primary" prepend-icon="mdi-check" @click="showAddNewFeatureInputField">
                                Add this feature
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
.text-pre-wrap {
    white-space: pre-wrap;
}
</style>