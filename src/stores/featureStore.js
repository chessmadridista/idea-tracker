import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFeatureStore = defineStore('featureStore', () => {
    const features = ref([])
    const editFeatureDialogVisibility = ref(false)
    const editedFeature = ref({})
    const editedFeatureDescription = ref('')

    function setFeatures(newFeatures) {
        features.value = newFeatures
    }

    function showEditFeatureDialog() {
        editFeatureDialogVisibility.value = true
    }

    function hideEditFeatureDialog() {
        editFeatureDialogVisibility.value = false
    }

    function setEditedFeature(feature) {
        editedFeature.value = feature
    }

    function setEditedFeatureDescription(description) {
        editedFeatureDescription.value = description
    }

    return {
        features,
        editFeatureDialogVisibility,
        editedFeatureDescription,
        editedFeature,
        setFeatures,
        setEditedFeature,
        showEditFeatureDialog,
        hideEditFeatureDialog,
        setEditedFeatureDescription,
    }
})