<template>
  <title>新闻发布系统管理后台</title>
  <link href="../css/admin.css" rel="stylesheet" type="text/css" />
  <div id="header">
    <div id="welcome">欢迎使用新闻管理系统！</div>
    <div id="nav">
      <div id="logo"><img src="../images/logo.jpg" alt="新闻中国" /></div>
      <div id="a_b01"><img src="../images/a_b01.gif" alt="" /></div>
    </div>
  </div>
  <div id="admin_bar">
    <LoginBox></LoginBox>
    <div id="channel"> </div>
  </div>
</template>

<script setup>
import LoginBox from '../../components/LoginBox.vue';
</script>