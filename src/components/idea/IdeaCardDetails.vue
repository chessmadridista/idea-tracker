<script setup>
import { useGeneralStore } from '@/stores';
import { inject, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const axios = inject('axios')
const router = useRouter()
const idea = ref({})
const generalStore = useGeneralStore()

function getIdea() {
    const endPoint = '/get-idea'
    const idea_id = router.currentRoute.value.params.id
    const formData = new FormData()
    formData.append('idea_id', idea_id)
    axios.post(endPoint, formData)
        .then(response => {
            idea.value = response.data.idea
        })
        .catch(error => {
            generalStore.setSnackbarMessage(error.response.data.message)
            generalStore.setSnackbarColor('error')
            generalStore.showSnackbar()
        })
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