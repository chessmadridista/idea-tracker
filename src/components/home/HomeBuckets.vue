<script setup>
import { useBucketListStore } from '@/stores';
import { onBeforeMount } from 'vue';
import { inject } from 'vue';

const bucketListStore = useBucketListStore()
const axios = inject('axios')

function getBucketLists() {
    const endPoint = '/bucket-list/get-bucket-lists'
    axios.post(endPoint)
        .then(response => {
            console.log(response);
            bucketListStore.setBucketListItems(response.data.bucket_lists)
        })
        .catch(error => {
            console.error(error);
        });
}

function openSelectedBucket(list) {
    bucketListStore.setSelectedBucketList(list)
    bucketListStore.showBucket();
    const endPoint = '/bucket-list/get-bucket-list-tasks'
    const formData = new FormData();
    formData.append('bucket_list_id', bucketListStore.selectedBucketList[0])
    axios.post(endPoint, formData)
        .then(response => {
            bucketListStore.setSelectedBucketListTasks(response.data.tasks)
        })
        .catch(error => {
            console.error(error);
        })
}

onBeforeMount(() => {
    setTimeout(() => {
        getBucketLists()
    }, 1000)
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col v-for="list in bucketListStore.bucketLists">
                <v-card @click="openSelectedBucket(list)">
                    <v-card-title class="text-center">
                        {{ list[2] }}
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>