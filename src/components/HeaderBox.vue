<template>
    <div id="header">
        <div id="welcome">欢迎使用新闻管理系统！</div>

        <div id="nav">
            <div id="logo"><img src="../images/logo.jpg" alt="新闻中国" /></div>
            <LoginBox v-if="!store.isLogin"></LoginBox>
            <WelcomeBox v-if="store.isLogin"></WelcomeBox>
            <div id="a_b01"><img src="../images/a_b01.gif" alt="" /></div>
        </div>
    </div>
</template>

<script setup>
import LoginBox from './LoginBox.vue';
import WelcomeBox from './WelcomeBox.vue';
import { useUserStore } from '../stores/userStore';
const store = useUserStore()
</script>