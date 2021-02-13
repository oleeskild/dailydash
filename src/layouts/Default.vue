<template>
  <div class="layout">
    <header class="header">
     <div class="logo">
       <!-- <img class="circle" src="https://nb.gravatar.com/avatar/1dfe1530479b8cc71d2420fd12150220"/> -->
     </div> 
     <h1 class="white">&#x1F39B; Dashboard</h1>
      
    </header> 
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
  background-color: #1c2041;
}
.logo {
  margin-left: 10px;
}
h1 {
  font-size: 24px;
}
.white {
  color: #f9fcfe;
}
.circle {
  border-radius: 50%;
  width: 75%;
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
  background-color: #2c325e
}

.nav__link {
  margin-left: 20px;
}
</style>
