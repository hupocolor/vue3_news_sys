<template>
	<head>
		<title>添加主题--管理后台</title>
		<link href="../css/admin.css" rel="stylesheet" type="text/css" />
	</head>

	<body>
		<HeaderBox></HeaderBox>
		<div id="admin_bar">
			<div id="channel"> </div>
		</div>
		<div id="main">
			<Left></Left>
			<div id="msg"
				style="display: none; position: absolute; z-index: 5; background-color: pink; font-size: 16px; padding: 5px 20px;">
			</div>
			<div id="opt_area">
				<ul class="classlist">
					<!-- 分页显示新闻区域 -->
					<li v-for="newsTitle in newsTitles" :key="newsTitle.nid"><RouterLink :to="`/newsRead?nid=${newsTitle.nid}`">{{ newsTitle.ntitle
					}}</RouterLink><span>作者：{{ newsTitle.nauthor }}&nbsp;&nbsp;<RouterLink :to="`/editNews?nid=${newsTitle.nid}`">修改</RouterLink>&nbsp;&nbsp;<a
								href="javascript:void(0)" @click="delNewsBtn(newsTitle.nid)">删除</a></span></li>
				</ul>
				<p align="center">

					<el-pagination background layout="prev, pager, next" :total="total" :page-size="query.size"
						@current-change="handleCurrentChange" />


				</p>
			</div>
		</div>
		<div id="footer">
			<Bottom></Bottom>
		</div>
	</body>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import Left from '../console_element/Left.vue';
import Bottom from '../console_element/Bottom.vue';
import { getNewsPage,delNewsById } from '../../api/news'
import HeaderBox from '../../components/HeaderBox.vue';
import { ElMessage } from 'element-plus';
const query = reactive({
	current: 1,
	size: 30,
	topicId: -1,
	keyword: ''
})
const total = ref(0)

const newsTitles = ref([])
const delNewsBtn = (id)=>{
	delNewsById(id).then(res=>{
		ElMessage({
			message: res.data,
			type: 'success'
		})
		getNewsPage(query).then(res => {
		newsTitles.value = res.data.records
		total = res.data.total
	})
	})
}
const handleCurrentChange = (val) => {
	console.log(val)
	query.current = val
	getNewsPage(query).then(res => {
		newsTitles.value = res.data.records
		total = res.data.total
	})
}
onBeforeMount(() => {
	getNewsPage(query).then(res => {
		newsTitles.value = res.data.records
		total.value = res.data.total
	})
})
</script>