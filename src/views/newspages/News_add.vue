<template>
  <title>添加主题--管理后台</title>

  <body>
    <HeaderBox></HeaderBox>
    <div id="main">
      <Left></Left>
      <div id="opt_area">
        <h1 id="opt_type"> 添加新闻： </h1>
        <form>
          <p>
            <label> 主题 </label>
            <el-select v-model="news.ntid" class="m-2" placeholder="Select">
              <el-option v-for="item in topics" :key="item.tid" :label="item.tname" :value="item.tid"/>
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
            <el-input type="text" :rows="4" v-model="news.nsummary" placeholder="在此处输入摘要" 
              :maxlength="50" :show-word-limit="false" >
            </el-input>
          
          <p>
            <label> 内容 </label>
            <el-input type="textarea" :rows="10" v-model="news.ncontent" placeholder="文章内容" 
              :maxlength="2000" :show-word-limit="false" :autosize="{ minRows: 2, maxRows: 30}">
            </el-input>
            
          </p>
          <el-button type="success" size="medium" @click="addNewsBtn">提交</el-button>
        </form>
      </div>
    </div>
    <div id="footer">
      <Bottom></Bottom>
    </div>
  </body>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { getTopicList } from '../../api/topic';
import { addNews } from '../../api/news';
import HeaderBox from '../../components/HeaderBox.vue';
import Bottom from '../console_element/Bottom.vue';
import Left from '../console_element/Left.vue';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

const addNewsBtn = ()=>{
  addNews(news).then(res=>{
    ElMessage({
      message: res.data,
      type: 'success'
    })
    useRouter().push('/admin')
  })
}
const news = reactive({
  ntid: 1,
  ntitle: '',
  nauthor: '',
  npicpath: '',
  ncontent: '',
  nsummary: ''
})
const topics = ref([])
onBeforeMount(()=>{
  getTopicList().then(res=>{
    topics.value = res.data
  })
})
</script>