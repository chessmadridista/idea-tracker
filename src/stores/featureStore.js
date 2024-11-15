import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFeatureStore = defineStore('featureStore', () => {
    const editFeatureDialogVisibility = ref(false)
    const editedFeature = ref({})
    const editedFeatureDescription = ref('')

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
        editFeatureDialogVisibility,
        editedFeatureDescription,
        editedFeature,
        setEditedFeature,
        showEditFeatureDialog,
        hideEditFeatureDialog,
        setEditedFeatureDescription,
    }
})