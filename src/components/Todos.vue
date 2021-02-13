<template>
   <div>
       <div class="authorize" v-if="!isAuthorized">
            <div class="link">
                <a href="https://todoist.com/prefs/integrations" target="_blank">Get API Token</a>
            </div>
            <input type="text" name="apikey" v-model="apiTokenInput" placeholder="Todoist API-token" />
            <button @click="setToken(apiTokenInput)">Authorize</button>
       </div>
       <task v-for="task in allActiveTasks" :key="task.id" :title="task.content" :completed="task.completed" />
    </div> 
</template>
<script>
import Task from "./Task.vue";
export default {
    data(){
        return{
            allActiveTasks: {},
            apiTokenInput: "",
            isAuthorized: true
        }
    },
    components: {
        Task
    },
    methods:{
        setToken(token){
            localStorage.setItem('todoist_token', token);
            this.fetchTasks();
        },
        getToken(){
             return localStorage.getItem('todoist_token');
        },
        fetchTasks(){
            fetch('https://api.todoist.com/rest/v1/tasks?filter=today', {
               headers: new Headers({
                   'Authorization': `Bearer ${this.getToken()}`
               }) 
            }).then(res=> res.json()).then(res =>{
                this.isAuthorized = true;
                this.allActiveTasks = res;
            }).catch(()=>this.isAuthorized = false);
        }
    },
    mounted: function() {
        this.fetchTasks();
    }
}
</script>
<style scoped>
    .link{
        margin: 10px;
    }
    .authorize{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
</style>>
