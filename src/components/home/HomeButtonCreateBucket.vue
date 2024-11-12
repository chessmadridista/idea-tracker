<script setup>
import { useBucketListStore } from '@/stores'

const bucketListStore = useBucketListStore()

function createNewBucket() {
    bucketListStore.showCreateNewBucketDialog()
}
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-btn @click="createNewBucket" block color="primary" prepend-icon="mdi-plus">
                    Create new bucket
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>