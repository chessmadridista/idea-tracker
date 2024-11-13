<script setup>
import { useUserStore } from '@/stores';

const userStore = useUserStore()
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-center">
                        Welcome @{{ userStore.username }} 👋 
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>