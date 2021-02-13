<template>
    <div>
    </div>
</template>
<script>
import {retrieveToken, getSrToken} from "../helpers/srBank"
export default {
   computed: {
       
   },
   mounted: function() {
       if(getSrToken() == null){
            retrieveToken(function(){
                console.log(getSrToken());
            });
       }
   }
}
</script>