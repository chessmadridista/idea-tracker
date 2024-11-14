import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIdeaStore = defineStore('ideaStore', () => {
    const ideas = ref([]);
    const addNewIdeaDialogVisibility = ref(false);
    const deleteIdeaDialogVisibility = ref(false)

    function setIdeas(updatedIdeas) {
        ideas.value = updatedIdeas
    }

    function addIdea(idea) {
        ideas.value.push(idea)
    }

    function showAddNewIdeaDialog() {
        addNewIdeaDialogVisibility.value = true
    }

    function hideAddNewIdeaDialog() {
        addNewIdeaDialogVisibility.value = false
    }
    
    function showDeleteIdeaDialog() {
        deleteIdeaDialogVisibility.value = true
    }

    function hideDeleteIdeaDialog() {
        deleteIdeaDialogVisibility.value = false
    }

    return {
        ideas,
        addNewIdeaDialogVisibility,
        deleteIdeaDialogVisibility,
        setIdeas,
        addIdea,
        showAddNewIdeaDialog,
        hideAddNewIdeaDialog,
        showDeleteIdeaDialog,
        hideDeleteIdeaDialog,
    }
})