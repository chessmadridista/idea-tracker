<script setup>
import { useIdeaStore } from '@/stores'

const ideaStore = useIdeaStore()

function addNewIdea() {
    ideaStore.showAddNewIdeaDialog()
}
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-btn @click="addNewIdea" block color="primary" prepend-icon="mdi-plus">
                    Add new idea
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>