import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBucketListStore = defineStore('bucketListStore', () => {
    const bucketLists = ref([]);
    const bucket = ref(false);
    const createNewBucketDialog = ref(false);
    const selectedBucketList = ref([]);
    const selectedBucketListTasks = ref([]);

    function setBucketListItems(lists) {
        bucketLists.value = lists
    }

    function showBucket() {
        bucket.value = true;
    }

    function setSelectedBucketList(list) {
        selectedBucketList.value = list
    }

    function setSelectedBucketListTasks(list) {
        selectedBucketListTasks.value = list
    }

    function showCreateNewBucketDialog() {
        createNewBucketDialog.value = true
    }

    function hideCreateNewBucketDialog() {
        createNewBucketDialog.value = false
    }

    return {
        bucketLists,
        bucket,
        selectedBucketList,
        selectedBucketListTasks,
        createNewBucketDialog,
        showCreateNewBucketDialog,
        hideCreateNewBucketDialog,
        setBucketListItems,
        setSelectedBucketList,
        setSelectedBucketListTasks,
        showBucket,
    }
})