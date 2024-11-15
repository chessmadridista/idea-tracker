<script setup>
import { useIdeaStore, useGeneralStore } from '@/stores'
import { ref, inject } from 'vue'

const axios = inject('axios')
const form = ref(null)
const generalStore = useGeneralStore()
const ideaStore = useIdeaStore()

function updateIdea() {
    form.value.validate().then((response) => {
        if (response.valid) {
            const endPoint = '/update-idea'
            const formData = new FormData()
            formData.append('idea_id', ideaStore.selectedIdea.id)
            formData.append('idea_name', ideaStore.selectedIdea.name)
            formData.append('idea_description', ideaStore.selectedIdea.description)
            axios.post(endPoint, formData)
                .then(response => {
                    ideaStore.selectedIdeaName = ideaStore.selectedIdea.name
                    ideaStore.selectedIdeaDescription = ideaStore.selectedIdea.description
                    generalStore.setSnackbarMessage(response.data.message)
                    generalStore.setSnackbarColor('success')
                    ideaStore.hideEditIdeaDialog()
                })
                .catch(error => {
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
    <v-dialog v-model="ideaStore.editIdeaDialogVisibility">
        <v-card>
            <v-card-title class="text-center">Edit this idea</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit.prevent="updateIdea">
                    <v-text-field 
                        label="What is your app idea?*" 
                        v-model="ideaStore.selectedIdea.name" 
                        :rules="[v => !!v || 'This field is required.']"
                    />
                    <v-text-field v-model="ideaStore.selectedIdea.description" label="Describe the idea in more detail" />
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