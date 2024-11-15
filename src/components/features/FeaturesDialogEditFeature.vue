<script setup>
import { useGeneralStore, useFeatureStore } from '@/stores'
import { ref, inject } from 'vue'

const axios = inject('axios')
const form = ref(null)
const generalStore = useGeneralStore()
const featureStore = useFeatureStore()

function updateFeature() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const endPoint = '/update-feature'
            const formData = new FormData()
            formData.append('feature_id', featureStore.editedFeature.id)
            formData.append('idea_id', featureStore.editedFeature.idea_id)
            formData.append('feature_description', featureStore.editedFeatureDescription)
            axios.post(endPoint, formData)
                .then(response => {
                    console.log(response);
                    const editedFeature = {
                        id: featureStore.editedFeature.id,
                        idea_id: featureStore.editedFeature.idea_id,
                        description: featureStore.editedFeatureDescription
                    }
                    featureStore.updateFeature(editedFeature)
                    featureStore.setEditedFeatureDescription('')
                    featureStore.setEditedFeature({})
                    generalStore.setSnackbarMessage(response.data.message)
                    generalStore.setSnackbarColor('success')
                    featureStore.hideEditFeatureDialog()
                })
                .catch(error => {
                    console.error(error);
                    generalStore.setSnackbarMessage(error)
                    generalStore.setSnackbarColor('error')
                })
                .finally(() => {
                    generalStore.showSnackbar()
                })
        } else {
            return
        }
    })
}
</script>
<template>
    <v-dialog v-model="featureStore.editFeatureDialogVisibility">
        <v-card>
            <v-card-title class="text-center">Edit this feature</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="updateFeature">
                    <v-textarea v-model="featureStore.editedFeatureDescription" label="Describe the feature in detail*" 
                        :rules="[v => !!v || 'This field is required.']"    
                    />
                    <v-btn type="submit" block color="primary" prepend-icon="mdi-check">
                        Update
                    </v-btn>
                </v-form>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>