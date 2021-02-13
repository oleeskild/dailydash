<template>
  <div style="text-align:center">
    <ClientOnly>
      <a v-if="!series.length" :href="url">Autoriser FitBit</a>
      <apexchart v-else type="line" :options="chartOptions" :series="series"></apexchart>
    </ClientOnly>
  </div>
</template>
<script>
import {retrieveTokenFromUrl, getToken, getSleepData} from '../helpers/fitBit';
export default {
    props: [
        'sleepData'
    ],
  data() {
    return {
      isAuthorized: true,
      stages: ["Dyp", "Lett", "REM", "Våken"],
      chartOptions: {
          colors: ['#90ee90'],
        width: '100%',
        stroke: {
          curve: "stepline",
          show: true,
          width: 2,
        },
        dataLabels: {
          enabled: false,
          style: {
                colors: ['lightgreen']
            }
        },
        xaxis: {
          type: "datetime",
          tickAmount: 6
        },
        yaxis: {
          labels: {
            formatter: value => {
              return this.stages[value];
            }
          }
        },
        tooltip: {
          x: {
            format: "HH:mm"
          }
        },
        chart: {
            foreColor: 'white',
            toolbar: {
                show: false
            }
        },
        

      },
      url:
        "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22BB9N&redirect_uri=http%3A%2F%2Flocalhost%3A8080&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&expires_in=604800"
    };
  },
  mounted: function(){
    this.checkAuthorized();
  },
  methods:{
    checkAuthorized(){
      this.isAuthorized = !!localStorage.getItem("access_token");
    }
  },
  components: {
    apexchart: () => import('vue-apexcharts')
  },
  computed: {
    series: function() {
      if (!this.sleepData.levels) {
        return [];
      }
      let dataPoints = this.sleepData.levels.data.map(x => {
        if (x.level == "wake") {
          return [new Date(x.dateTime).getTime(), 3];
        }
        if (x.level == "rem") {
          return [new Date(x.dateTime).getTime(), 2];
        }
        if (x.level == "light") {
          return [new Date(x.dateTime).getTime(), 1];
        }
        return [new Date(x.dateTime).getTime(), 0];
      });
      return [
        {
          name: "Søvn nivå",
          data: dataPoints
        }
      ];
    }
  },
};
</script>
<style scoped>
  a {
    text-decoration: none;
    color: deepskyblue;
    padding: 5px;
    border-bottom: deepskyblue 3px solid;
  }
</style>