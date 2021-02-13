<template>
<div class="task white">
    <div class="checkbox">
        <font-awesome-icon v-if="completed" icon="check-square" />
        <font-awesome-icon v-else icon="square" />
    </div>
    {{title}}
</div>
</template>
<script>
export default {
    props: [
        'title',
        'completed'
    ]
}
</script>
<style scoped>
.task {
    display: flex;
    justify-content: flex-start;
}
.checkbox {
    margin-right: 10px;
    font-size: 16px;
}
</style>