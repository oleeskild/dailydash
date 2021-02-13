<template>
<div class="card">
    <div class="card-header white">
        {{title}}
    </div>
    <slot />
</div>
</template>
<script>
export default {
   props: [
       'title'
   ] 
}
</script>
<style scoped>
.card {
    background-color: #2c325e;
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
}
.card-header {
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-weight: 300;
}
</style>