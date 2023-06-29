<template>
  <HeaderBox></HeaderBox>
  <div id="main">
    <!-- <%@include file="console_element/left.html" %> -->
    <Left></Left>
    <div id="opt_area">
      <h1 id="opt_type"> 编辑新闻： </h1>
      <form>
        <p>
          <label> 主题 </label>
          <el-select v-model="news.ntid" class="m-2" placeholder="Select">
            <el-option v-for="item in topics" :key="item.tid" :label="item.tname" :value="item.tid" />
          </el-select>
        </p>
        <p>
          <label> 标题 </label>
          <el-input v-model="news.ntitle" placeholder="请输入标题" size="normal" clearable @change=""></el-input>
        </p>
        <p>
          <label> 作者 </label>
          <el-input v-model="news.nauthor" placeholder="请输入文章作者名" size="normal" clearable @change=""></el-input>
        </p>

        <label> 摘要 </label>
        <el-input type="text" :rows="4" v-model="news.nsummary" placeholder="在此处输入摘要" :maxlength="50"
          :show-word-limit="false">
        </el-input>

        <p>
          <label> 内容 </label>
          <el-input type="textarea" :rows="10" v-model="news.ncontent" placeholder="文章内容" :maxlength="2000"
            :show-word-limit="false" :autosize="{ minRows: 2, maxRows: 30 }">
          </el-input>

        </p>
        <div class="uploadFiles">
          <el-upload action="api/upload"
                     :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <strong>点此上传文件</strong>
          </el-upload>
          <img v-if="news.npicpath" :src="news.npicpath" class="avatar" />
        </div>
        <el-button type="success" size="medium" @click="editNewsBtn">提交</el-button>
      </form>
      <!-- <h1 id="opt_type">
		修改新闻评论：
	</h1>
      <table width="80%" align="left">
    
       		<tr>
	          <td> 留言人： </td>
	          <td>小黑</td>
	          <td> IP： </td>
	          <td>192.168.11.110</td>
	          <td> 留言时间： </td>
	          <td>2020-01-01</td>
	          <td><a href="#">删除</a></td>
	        </tr>
	        <tr>
	          <td colspan="6">评论内容</td>
	        </tr>
	        <tr>
	          <td colspan="6"><hr />
	          </td>
	        </tr>
      </table> -->
    </div>
  </div>
  <Bottom></Bottom>
</template>

<script setup>
import { onBeforeMount, reactive, ref, watch } from 'vue';
import { getTopicList } from '../../api/topic';
import { getNewsById,updateNews } from '../../api/news';
import HeaderBox from '../../components/HeaderBox.vue';
import Bottom from '../console_element/Bottom.vue';
import Left from '../console_element/Left.vue';
import {ElMessage, ElMessageBox} from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const news = ref({
  nid: 0,
  ntid: 1,
  ntitle: '',
  nauthor: '',
  npicpath: '',
  ncontent: '',
  nsummary: ''
})
const topics = ref([])
onBeforeMount(() => {
  getTopicList().then(res => {
    topics.value = res.data
  })
  getNewsById(route.query.nid).then(res=>{
    news.value = res.data
  })
})
const editNewsBtn=()=>{
  updateNews(news.value).then(res=>{
    ElMessage({
      message: res.data,
      type: 'success'
    })
  })
}
const handleAvatarSuccess = (
    response,
    uploadFile
) => {
  news.value.npicpath = response
  ElMessageBox.alert("文件上传成功!")
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片必须为jpeg或者png!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图像大小不得超过2MB!')
    return false
  }
  return true
}
</script>