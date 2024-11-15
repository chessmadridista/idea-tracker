<script setup>
import { useGeneralStore, useIdeaStore } from '@/stores';
import { inject, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios')
const router = useRouter()
const generalStore = useGeneralStore()
const ideaStore = useIdeaStore()

function getIdea() {
    const endPoint = '/get-idea'
    const idea_id = router.currentRoute.value.params.id
    const formData = new FormData()
    formData.append('idea_id', idea_id)
    axios.post(endPoint, formData)
        .then(response => {
            ideaStore.selectedIdeaName = response.data.idea.name
            ideaStore.selectedIdeaDescription = response.data.idea.description
            ideaStore.setSelectedIdea(response.data.idea)
        })
        .catch(error => {
            generalStore.setSnackbarMessage(error.response.data.message)
            generalStore.setSnackbarColor('error')
            generalStore.showSnackbar()
        })
}

function editIdea() {
    const idea = {
        id: ideaStore.selectedIdea.id,
        name: ideaStore.selectedIdeaName,
        description: ideaStore.selectedIdeaDescription,
    }
    ideaStore.setSelectedIdea(idea)
    ideaStore.showEditIdeaDialog()
}

function deleteIdea() {
    ideaStore.showDeleteIdeaDialog()
}

onBeforeMount(() => {
    getIdea()
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        {{ ideaStore.selectedIdeaName }}
                    </v-card-title>
                    <v-card-text>
                        {{ ideaStore.selectedIdeaDescription }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="error" variant="elevated" @click="deleteIdea">Delete</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" variant="elevated" @click="editIdea">Edit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>