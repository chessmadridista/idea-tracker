import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFeatureStore = defineStore('featureStore', () => {
    const addNewFeatureDialogVisibility = ref(false);

    function showAddFeatureDialog() {
        addNewFeatureDialogVisibility.value = true
    }

    return {
        addNewFeatureDialogVisibility,
        showAddFeatureDialog,
    }
})