<script setup>
import { useIdeaStore } from '@/stores';
import { onBeforeMount, inject } from 'vue';

const ideaStore = useIdeaStore()
const axios = inject('axios')

onBeforeMount(() => {
    const endPoint = '/get-ideas'
    axios.get(endPoint)
    .then(response => {
        ideaStore.setIdeas(response.data.ideas)
    })
    .catch(error => {
        console.error(error)

        if (error.response.status === 404) {
            ideaStore.setIdeas(error.response.data.ideas)
        }
    })
})
</script>
<template>
    <v-container>
        <v-row>
            <v-col v-for="idea in ideaStore.ideas" :key="idea.id" cols="12">
                <v-card class="pa-4" :to="{ name: 'idea', params: { id: idea.id } }">
                    <v-card-title class="text-center">
                        {{ idea.name }}
                    </v-card-title>
                    <v-card-text>
                        {{ idea.description }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>