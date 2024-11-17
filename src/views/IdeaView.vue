<script setup>
import IdeaCardDetails from '@/components/idea/IdeaCardDetails.vue';
import IdeaDialogDeleteIdea from '@/components/idea/IdeaDialogDeleteIdea.vue';
import IdeaDialogEditIdea from '@/components/idea/IdeaDialogEditIdea.vue';
import FeaturesCard from '@/components/features/FeaturesCard.vue';
import FeaturesDialogEditFeature from '@/components/features/FeaturesDialogEditFeature.vue';
import JournalsCard from '@/components/journals/JournalsCard.vue';
import JournalsDialogEditJournal from '@/components/journals/JournalsDialogEditJournal.vue';
</script>
<template>
    <IdeaCardDetails />
    <IdeaDialogEditIdea />
    <IdeaDialogDeleteIdea />
    <FeaturesCard />
    <FeaturesDialogEditFeature />
    <JournalsCard />
    <JournalsDialogEditJournal />
</template>