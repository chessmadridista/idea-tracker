<script setup>
import { useFeatureStore, useGeneralStore } from '@/stores';
import { onBeforeMount, inject, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios')
const featureStore = useFeatureStore()
const generalStore = useGeneralStore()
const newFeatureInputFieldVisibility = ref(false)
const router = useRouter()
const form = ref(null)
const newFeatureTextAreaRef = ref(null)
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
                featureStore.addFeature(feature)
                newFeature.value = ''
                newFeatureInputFieldVisibility.value = false
                generalStore.setSnackbarMessage(response.data.message)
                generalStore.setSnackbarColor('success')
                generalStore.showSnackbar()
            })
            .catch(error => {
            })
        }
    })
}

function editFeature(feature) {
    featureStore.setEditedFeatureDescription(feature.description)
    featureStore.setEditedFeature(feature)
    featureStore.showEditFeatureDialog()
}

function deleteFeature(feature) {
    const endPoint = '/delete-feature'
    const ideaId = router.currentRoute.value.params.id
    const formData = new FormData()
    formData.append('feature_id', feature.id)
    formData.append('idea_id', ideaId)
    axios.post(endPoint, formData)
    .then(response => {
        generalStore.setSnackbarMessage(response.data.message)
        generalStore.setSnackbarColor('success')
        featureStore.deleteFeature(feature)
        generalStore.showSnackbar()
    })
    .catch(error => {
    })
}

function getFeatures() {
    const ideaId = router.currentRoute.value.params.id
    const endPoint = `/get-features?idea_id=${ideaId}`
    axios.get(endPoint)
    .then(response => {
        featureStore.setFeatures(response.data.features)
    })
    .catch(error => {
        featureStore.setFeatures(error.response.data.features)
    })
}

function showNewFeatureInputField() {
    newFeatureInputFieldVisibility.value = true
    nextTick(() => {
        if (newFeatureTextAreaRef.value) {
            newFeatureTextAreaRef.value.focus();
        }
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
                <v-card class="pa-4 rounded-xl elevation-4">
                    <v-card-title class="text-center">
                        Brainstorm your features
                    </v-card-title>
                    <v-card-text v-if="featureStore.features.length > 0">
                        <p class="text-pre-wrap" v-for="feature in featureStore.features" :key="feature.id">
                            <v-icon color="secondary">mdi-circle</v-icon> <v-icon color="primary" @click="editFeature(feature)">mdi-pencil</v-icon> {{ feature.description }} <v-icon @click="deleteFeature(feature)" color="error">mdi-delete</v-icon>
                        </p>
                    </v-card-text>
                    <v-card-text v-if="newFeatureInputFieldVisibility">
                        <v-form ref="form" @submit.prevent="addNewFeature">
                            <v-textarea 
                                ref="newFeatureTextAreaRef"
                                color="primary"
                                label="Describe the feature in detail*"
                                v-model="newFeature"
                                :rules="[(v) => !!v || 'This field is required.']"
                            />
                            <div class="text-right">
                                <v-btn class="rounded-pill" type="submit" variant="elevated" color="primary" prepend-icon="mdi-check">
                                    Add this feature
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                    <v-card-actions v-else class="d-flex justify-end">
                        <v-btn variant="elevated" color="primary" @click="showNewFeatureInputField" prepend-icon="mdi-plus" class="rounded-pill">
                            Create new feature
                        </v-btn>
                    </v-card-actions>
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