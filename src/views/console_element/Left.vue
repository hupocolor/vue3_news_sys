<template>
  <div id="opt_list">
    <ul>
      <li><RouterLink to="/admin">新闻管理</RouterLink></li>
      <li><RouterLink to="/addNews">添加新闻</RouterLink></li>
      <li><RouterLink to="/addTopic">添加主题</RouterLink></li>
      <li><RouterLink to="/editTopic">编辑主题</RouterLink></li>
      <li><RouterLink to="/editUsers">用户管理</RouterLink></li>
    </ul>
  </div>
</template>

<style scoped>
#opt_list {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}

#opt_list ul {
  list-style-type: none;
  padding: 0;
}

#opt_list li {
  margin-bottom: 10px;
}

#opt_list li a {
  color: #333;
  text-decoration: none;
  display: block;
  padding: 8px 16px;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

#opt_list li a:hover {
  background-color: #e6e6e6;
}
</style>






