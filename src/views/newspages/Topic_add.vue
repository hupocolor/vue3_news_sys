<template>
  <head>
    <title>添加主题--管理后台</title>
  </head>

  <body>
    <HeaderBox></HeaderBox>
    <div id="main">
      <Left></Left>
      <div id="opt_area">
        <h1 id="opt_type"> 添加主题： </h1>
        <form>
          <p>
            <label> 主题名称 </label>
            <input name="tname" type="text" class="opt_input" id="tname" v-model="topic.tname" clearable/>
          </p>
          <input type="button" id="addTopicSubmit" value="提交" class="opt_sub" @click="addTopicBtn"/>
          <input type="reset" value="重置" class="opt_sub" />
        </form>
      </div>
    </div>
    <div id="footer">
      <Bottom></Bottom>
    </div>
  </body>
</template>

<script setup>
import { reactive } from 'vue';
import HeaderBox from '../../components/HeaderBox.vue';
import Bottom from '../console_element/Bottom.vue';
import { addTopic } from '../../api/topic';
import Left from '../console_element/Left.vue';
import { ElMessage } from 'element-plus';
const topic = reactive({
  tname: ''
})
const addTopicBtn = ()=>{
  addTopic(topic).then(res=>{
    ElMessage({
      message: res.data,
      type: 'success'
    })
  })
}
</script>
