<script setup>
import { RouterView, useRouter } from 'vue-router'
import AppSnackbar from '@/components/app/AppSnackbar.vue'
import AppHeader from '@/components/app/AppHeader.vue'

const router = useRouter()

function showHeader() {
  const currentRouteName = router.currentRoute.value.name
  if (currentRouteName === "login" || currentRouteName === "signup") {
    return false;
  } else {
    return true;
  }
}

</script>
<template>
  <v-app>
    <AppSnackbar />
    <AppHeader v-if="showHeader()" />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>