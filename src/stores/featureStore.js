import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFeatureStore = defineStore('featureStore', () => {
    const editFeatureDialogVisibility = ref(false)
    const editedFeatureDescription = ref('')

    function showEditFeatureDialog() {
        editFeatureDialogVisibility.value = true
    }

    function hideEditFeatureDialog() {
        editFeatureDialogVisibility.value = false
    }

    function setEditedFeatureDescription(description) {
        editedFeatureDescription.value = description
    }

    return {
        editFeatureDialogVisibility,
        editedFeatureDescription,
        showEditFeatureDialog,
        hideEditFeatureDialog,
        setEditedFeatureDescription,
    }
})