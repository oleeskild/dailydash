<template>
    <a href="/dash"><h1>Dash</h1></a>
</template>
<script>
export default {
    mounted(){
       if(window){
           window.location = "/dash";
       } 
    }
}
</script>