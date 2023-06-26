<template>
  <h1> <img src="../../images/title_1.gif" alt="国内新闻" /> </h1>
  <div class="side_list">
    <ul>
      <li v-for="chineseNew in chineseNews" :key="chineseNew.nid"><a href="javascript:void(0)" @click="goNewsRead(chineseNew.nid)"><b>{{ chineseNew.ntitle }}</b></a></li>
    </ul>
  </div>
  <h1> <img src="../../images/title_2.gif" alt="国际新闻" /> </h1>
  <div class="side_list">
    <ul>
      <li v-for="inteNew in inteNews" :key="inteNew.nid"><a href="javascript:void(0)" @click="goNewsRead(inteNew.nid)"><b>{{ inteNew.ntitle }}</b></a></li>
    </ul>
  </div>
  <h1> <img src="../../images/title_3.gif" alt="娱乐新闻" /> </h1>
  <div class="side_list">
    <ul>
      <li v-for="funNew in funNews" :key="funNew.nid"><a href="javascript:void(0)" @click="goNewsRead(funNew.nid)"><b>{{ funNew.ntitle }}</b></a></li>
    </ul>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { getHotNews } from '../../api/news';
import { useRouter } from 'vue-router';
// import router from '../../router';
//国内热点新闻
const chineseNews = ref([])
//国际热点新闻
const inteNews = ref([])
//娱乐热点新闻
const funNews = ref([])
const router = useRouter()

const goNewsRead = (nid) => {
    router.push({path:"/newsRead",query:{nid}})
}

onBeforeMount(()=>{
  getHotNews(1).then(res=>{
    chineseNews.value = res.data
  })
  getHotNews(2).then(res=>{
    inteNews.value = res.data
  })
  getHotNews(5).then(res=>{
    funNews.value = res.data
  })
  
})

</script>