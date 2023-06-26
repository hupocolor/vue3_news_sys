<template>
    <div class="topicsBox">
        <el-tag v-for="topic in topics" :key="topic.tid" class="mx-1" type="success" effect="light" style="margin:5px;">
            {{ topic.tname }}
        </el-tag>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { getTopicList } from '../api/topic'

const topics = ref([])
onBeforeMount(() => {
    getTopicList().then(res => {
        topics.value = res.data
    })
})
</script>

<style scoped>
.topicsBox {
    display: inline-flex;
}
</style>
