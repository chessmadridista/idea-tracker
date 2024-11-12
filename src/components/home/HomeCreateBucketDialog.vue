<script setup>
import { useBucketListStore, useGeneralStore } from '@/stores'
import { ref, inject } from 'vue'

const axios = inject('axios')
const title = ref('')
const generalStore = useGeneralStore()
const bucketListStore = useBucketListStore()

function createNewTask() {
    const endPoint = '/bucket-list/create-bucket-list'
    const formData = new FormData()
    formData.append('title', title.value)
    axios.post(endPoint, formData)
        .then(response => {
            console.log(response);
            generalStore.setSnackbarMessage(response.data.message)
            generalStore.setSnackbarColor('success')
            bucketListStore.hideCreateNewBucketDialog()
            title.value = ''
        })
        .catch(error => {
            console.error(error);
            generalStore.setSnackbarMessage(error)
            generalStore.setSnackbarColor('error')
        })
        .finally(() => {
            generalStore.showSnackbar()
        })
}
</script>
<template>
    <v-dialog v-model="bucketListStore.createNewBucketDialog">
        <v-card>
            <v-card-title>Create new bucket</v-card-title>
            <v-card-text>
                <v-text-field v-model="title" label="Title" />
                <v-btn @click="createNewTask" block color="primary" prepend-icon="mdi-check">
                    Create
                </v-btn>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>