<template>
    <head>
        <title>新闻中国</title>
    </head>

    <body>
        <div id="header">
            <div id="top_login">
                <form>
                    <LoginBox v-if="!store.isLogin"></LoginBox>
                    <WelcomeBox v-if="store.isLogin"></WelcomeBox>
                    <label id="error"> </label>
                    <RouterLink to="/admin">点此进入管理系统</RouterLink>
                    <img src="../images/friend_logo.gif" alt="Google" id="friend_logo" />
                </form>
            </div>
            <div id="nav">
                <div id="logo"> <img src="../images/logo.jpg" alt="新闻中国" /> </div>
                <div id="a_b01"> <img src="../images/a_b01.gif"></div>
                <!--mainnav end-->
            </div>
        </div>
        <div id="container">
            <div class="sidebar">
                <!-- 容纳左侧最新消息的容器 -->
                <index_sidebar></index_sidebar>
            </div>

            <div class="main">
                <div class="class_type"> <img src="../images/class_type.gif" alt="新闻中心" /> </div>
                <div class="content">
                    <ul class="class_date">
                        <!-- 新闻主题链接区域 -->
                        <li id='class_month'><a href="javascript:void(0)" @click="changeTopic(-1)"><b>全部</b></a></li>
                        <li v-for="topic in topics" id='class_month' :key="topic.tid"><a href="javascript:void(0)"
                                @click="changeTopic(topic.tid)"><b>{{ topic.tname }}</b></a></li>
                    </ul>
                    <ul class="classlist">
                        <!-- 分页显示新闻区域 -->
                        <li v-for="newsTitle in newsTitles" :key="newsTitle.nid">
                            <a href="javascript:void(0)" @click="goNewsRead(newsTitle.nid)">{{ newsTitle.ntitle }}</a>
                            <span>{{ newsTitle.ncreatedate }}</span>
                        </li>
                    </ul>
                    <div class="demo-pagination-block">
                        <el-pagination v-model:current-page="query.current" v-model:page-size="query.size" :small="small"
                            :disabled="disabled" :background="background" layout="prev, pager, next, jumper" :total="total"
                            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                    </div>
                </div>
            </div>
        </div>
        <Index_rightbar></Index_rightbar>
        <Index_bottom></Index_bottom>
    </body>
</template>

<script setup>
import LoginBox from '../components/LoginBox.vue';
import WelcomeBox from '../components/WelcomeBox.vue';
import Index_bottom from '../components/index-elements/Index_bottom.vue';
import Index_rightbar from '../components/index-elements/Index_rightbar.vue';
import index_sidebar from '../components/index-elements/index_sidebar.vue';
import { getNewsPage } from '../api/news'
import { getTopicList } from '../api/topic';
import { onBeforeMount, reactive, ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import router from '../router';


const store = useUserStore()
const query = reactive({
    current: 1,
    size: 30,
    topicId: -1,
    keyword: ''
})
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const newsTitles = ref([])
const topics = ref([])
const total = ref(100)

//进入详情页面
const goNewsRead = (nid) => {
    console.log("goNewsRead")
    router.push({path:"/newsRead",query:{nid}})
}
const changeTopic = (topicid) => {
    query.topicId = topicid
    query.current = 1
    console.log(query)
    getNewsPage(query).then(res => {
        newsTitles.value = res.data.records
        total.value = res.data.total
    })
}
const handleCurrentChange = (val) => {
    query.current = val
    getNewsPage(query).then(res => {
        newsTitles.value = res.data.records
        total.value = res.data.total
    })
}
onBeforeMount(() => {
    getTopicList().then(res => {
        topics.value = res.data
    })
    getNewsPage(query).then(res => {
        newsTitles.value = res.data.records
        total.value = res.data.total
    })
})
</script>