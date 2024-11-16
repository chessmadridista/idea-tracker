<script setup>
import { useUserStore } from '@/stores';
import { useIdeaStore } from '@/stores'

const ideaStore = useIdeaStore()
const userStore = useUserStore()

function addNewIdea() {
    ideaStore.showAddNewIdeaDialog()
}
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <p class="text-grey-darken-2">
                    Hi there 👋 <span class="text-primary">@{{ userStore.username }}</span>
                </p>
            </v-col>
            <v-col class="text-right">
                <v-btn @click="addNewIdea" color="#007bff" prepend-icon="mdi-plus">
                    Add new idea
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>