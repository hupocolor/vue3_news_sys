<template>
	<HeaderBox></HeaderBox>
	<div id="main">
		<Left></Left>
		<div id="opt_area">
			<ul class="classlist">
				<!-- 分页显示主题区域 -->
				<el-row v-for="topic in topics" :key="topic.tid" style="margin-top: 10px ;">
					<el-input v-model="topic.tname" size="small" clearable @change="" ></el-input>
					<span style="margin-top: 10px;">
						<el-button type="warning" size="small" @click="eidtTopicBtn(topic)">修改</el-button>
						<el-button type="danger" size="small" @click="delTopicBtn(topic.tid)">删除</el-button>
					</span>
				</el-row>
			</ul>
			<p align="center">
				<el-pagination layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" :page-size="query.size"/>
			</p>
		</div>
	</div>
	<Bottom></Bottom>
</template>

<script setup>
import Bottom from '../console_element/Bottom.vue';
import HeaderBox from '../../components/HeaderBox.vue';
import Left from '../console_element/Left.vue';
import { getTopicPage } from '../../api/topic';
import { onBeforeMount, reactive, ref } from 'vue';
import { delTopic,updateTopic } from '../../api/topic'
import { ElMessage } from 'element-plus';
const query = reactive({
	current: 1,
	size: 5
})
const topics = ref([])
const total = ref(0)
const handleCurrentChange = (val) => {
	query.current = val
	getTopicPage(query).then(res => {
		topics.value = res.data.records
		total.value = res.data.total
	})
}
const delTopicBtn = (id)=>{
	delTopic(id).then(res=>{
		ElMessage({
			message: res.data,
			type: 'success'
		})
	})
	getTopicPage(query).then(res => {
		topics.value = res.data.records
		total.value = res.data.total
	})
}
const eidtTopicBtn=(topic)=>{
	updateTopic(topic).then(res=>{
		ElMessage({
			message: res.data,
			type: 'success'
		})
	})
}
onBeforeMount(() => {
	getTopicPage(query).then(res => {
		topics.value = res.data.records
		total.value = res.data.total
	})
})
</script>
