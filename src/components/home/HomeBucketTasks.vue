<script setup>
import { inject, ref } from 'vue'
import { useBucketListStore, useGeneralStore } from '@/stores'

const generalStore = useGeneralStore()
const bucketListStore = useBucketListStore()
const axios = inject('axios')
const newBucketListTask = ref('');

function addNewTask() {
    console.log("Here is the selected bucket list", bucketListStore.selectedBucketList);
    const endPoint = '/bucket-list/create-bucket-list-task'
    const formData = new FormData()
    formData.append('title', newBucketListTask.value)
    formData.append('bucket_id', bucketListStore.selectedBucketList[0])
    axios.post(endPoint, formData)
        .then(response => {
            console.log(response);
            generalStore.setSnackbarMessage("The task has been added successfully.")
            generalStore.setSnackbarColor('success')
            newBucketListTask.value = ""
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

function changeTaskStatus(task) {
    const taskId = task[0]
    const formData = new FormData();
    formData.append('task_id', taskId);
    const endPoint = '/modify-task-status'
    axios.post(endPoint, formData)
        .then(response => {
            console.log(response);
            generalStore.setSnackbarMessage("The task status has been changed successfully.")
            generalStore.setSnackbarColor('success')
            task[4] = response.data.tast_status
        })
        .catch(error => {
            generalStore.setSnackbarMessage(error)
            generalStore.setSnackbarColor('error')
            console.error(error);
        })
        .finally(() => {
            generalStore.showSnackbar()
        })
}

function updateTask(task) {
    const taskId = task[0]
    const taskTitle = task[2]
    const formData = new FormData();
    formData.append('task_id', taskId);
    formData.append('title', taskTitle);
    const endPoint = '/update-task'
    axios.post(endPoint, formData)
        .then(response => {
            console.log(response);
            generalStore.setSnackbarMessage("The task has been updated successfully.")
            generalStore.setSnackbarColor('success')
        })
        .catch(error => {
            generalStore.setSnackbarMessage(error)
            generalStore.setSnackbarColor('error')
            console.error(error);
        })
        .finally(() => {
            generalStore.showSnackbar()
        })
}

function deleteTask(task) {
    const taskId = task[0]
    const formData = new FormData();
    formData.append('task_id', taskId);
    const endPoint = '/delete-task'
    axios.post(endPoint, formData)
        .then(response => {
            console.log(response);
            generalStore.setSnackbarMessage("The task has been deleted successfully.")
            generalStore.setSnackbarColor('success')
        })
        .catch(error => {
            generalStore.setSnackbarMessage(error)
            generalStore.setSnackbarColor('error')
            console.error(error);
        })
        .finally(() => {
            generalStore.showSnackbar()
        })
}
</script>
<template>
    <v-dialog v-model="bucketListStore.bucket">
        <v-card>
            <v-card-title class="text-center">
                {{ bucketListStore.selectedBucketList[2] }}
            </v-card-title>
            <v-card-text>
                <v-list>
                    <v-list-item v-for="task in bucketListStore.selectedBucketListTasks">
                        <span v-if="task[4]">
                            <s>
                                <v-text-field density="compact" v-model="task[2]" append-icon="mdi-delete"
                                    variant="plain" append-inner-icon="mdi-update"
                                    prepend-inner-icon="mdi-check-circle-outline" @click:append="deleteTask(task)"
                                    @click:append-inner="updateTask(task)"
                                    @click:prepend-inner="changeTaskStatus(task)" />
                            </s>
                        </span>
                        <span v-else>
                            <v-text-field density="compact" v-model="task[2]" append-icon="mdi-delete" variant="plain"
                                append-inner-icon="mdi-update" prepend-inner-icon="mdi-check-circle-outline"
                                @click:append="deleteTask(task)" @click:append-inner="updateTask(task)"
                                @click:prepend-inner="changeTaskStatus(task)" />
                        </span>
                    </v-list-item>
                    <v-form>
                        <v-text-field v-model="newBucketListTask" label="Add a new task" density="compact"
                            append-icon="mdi-check" @click:append="addNewTask" />
                    </v-form>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>