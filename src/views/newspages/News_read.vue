<template>
	<head>
		<title>新闻中国</title>
	</head>

	<body>
		<div id="header">
			<div id="top_login">
				<LoginBox v-if="!store.isLogin"></LoginBox>
				<WelcomeBox v-if="store.isLogin"></WelcomeBox><label id="error">
				</label> <a href="/" class="login_link">返回首页</a> <img src="../../images/friend_logo.gif" alt="Google"
					id="friend_logo" />
			</div>
			<div id="nav">
				<div id="logo">
					<img src="../../images/logo.jpg" alt="新闻中国" />
				</div>
				<div id="a_b01">
					<img src="../../images/a_b01.gif" alt="" />
				</div>
				<!--mainnav end-->
			</div>
		</div>
		<div id="container">
			<div class="sidebar">
				<index_sidebar></index_sidebar>
			</div>
			<div class="main">
				<div class="class_type">
					<img src="../../images/class_type.gif" alt="新闻中心" />
				</div>
				<div class="content">
					<div style="margin: 0px auto; width: 80%">
						<table>
							<tr>
								<td colspan="2" align="center">
									<h2>{{ newsDeails.ntitle }}</h2>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<hr />
								</td>
							</tr>
							<tr>
								<td align="center">
									作者：{{ newsDeails.nauthor
									}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								</td>
								<td align="left">发布时间：{{ newsDeails.ncreatedate }}</td>
							</tr>
							<tr>
								<td colspan="2" align="center"></td>
							</tr>
							<tr>
								<td colspan="2" v-html="newsDeails.ncontent">
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<hr />
								</td>
							</tr>
						</table>
						<table width="100%" v-for="comment in comments" :key="comment.cid">
							<tr>
								<td>留言人：</td>
								<td>{{ comment.cauthor }}</td>
								<td>IP：</td>
								<td>{{ comment.cip }}</td>
								<td>留言时间：</td>
								<td>{{ comment.cdate }}</td>
							</tr>
							<tr>
								<td colspan="6">{{ comment.ccontent }}</td>
							</tr>
							<tr>
								<td colspan="6">
									<hr />
								</td>
							</tr>

						</table>
						<div class="comment-page">
							<el-pagination v-model:current-page="query.current" v-model:page-size="query.size" small
								layout="prev, pager, next, jumper" :total="total"
								@current-change="handleCurrentChange" />
							</div>


						<form action="" method="post">
							
							<input type="hidden" id="nid" name="nid" value="${news.nid}" />
							<table width="100%">
								<tr>
									<td>评 论</td>
								</tr>
								<tr>
									<td>用户名: {{ store.uname }}</td>
									<td>
										权限类型: {{ role }}
										IP地址: <input name="cip" id="cip" v-model="localAdd" style="border: 0px;" />
									</td>
								</tr>
								<tr>
									<td colspan="2"><textarea style="width: 100%" name="ccontent" id="ccontent"
											rows="10" v-model="commentText"></textarea></td>
								</tr>
								<tr>
									<td><input id="commentSubmit" name="submit" value="发  表" type="button" @click="addCommentBtn"/>
									</td>
								</tr>
							</table>
						</form>
					</div>
				</div>
			</div>
		</div>
		<Index_bottom></Index_bottom>
	</body>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import Index_bottom from '../../components/index-elements/Index_bottom.vue';
import index_sidebar from '../../components/index-elements/index_sidebar.vue';
import { onActivated, onBeforeMount, reactive, ref, watch } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { getRoleNow } from '../../api/role'
import LoginBox from '../../components/LoginBox.vue';
import WelcomeBox from '../../components/WelcomeBox.vue';
import { getNewsById } from '../../api/news';
import { getComments,addComment } from '../../api/comment'
import { ElMessage } from 'element-plus';

const comments = ref([])
const route = useRoute()
const router = useRouter()
const newsDeails = ref({
		nauthor: '',
		ntitle: '',
		ncreatedate: '',
		ncontent: ''
	})
const store = useUserStore()
const role = ref('')
const query = reactive({
	current: 1,
	size: 5,
	newsId: 0
})
const total = ref(0);
const handleCurrentChange=(val)=>{
	query.current = val
	getComments(query).then(res=>{
		comments.value = res.data.records
	})
}
const commentText = ref('')
const localAdd = ref('127.0.0.1')
const addCommentBtn = () =>{
	addComment({
		cnid: query.newsId,
		ccontent: commentText.value,
		cip: localAdd.value,
		cauthor: store.uname
	}).then(res=>{
		ElMessage({
			message: res.data,
			type: 'success'
		})
	})
}

//路由监听判断是否获取新query值
watch(() => route.query.nid, (newValue, oldValue) => {
	//路由获取query值搜索评论
	query.newsId = route.query.nid
	getNewsById(route.query.nid).then(res => {
		newsDeails.value = res.data
	})
	getRoleNow().then(res => {
		role.value = res.data.roleName
	})
	getComments(query).then(res=>{
		comments.value = res.data.records
		total.value = res.data.total
	})
}, { immediate: true })
</script>
