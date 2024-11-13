import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useIdeaStore = defineStore('ideaStore', () => {
    const ideas = ref([]);
    const addNewIdeaDialogVisibility = ref(false);

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

    return {
        ideas,
        addNewIdeaDialogVisibility,
        setIdeas,
        addIdea,
        showAddNewIdeaDialog,
        hideAddNewIdeaDialog,
    }
})