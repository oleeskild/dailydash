<template>
  <div v-if="this.sleepData.startTime" class="sleep-summary">
    <div class="white sleep-stat">
      <div>
        <ClientOnly>
          <apexchart
            type="radialBar"
            height="300"
            :options="chartOptions"
            :series="[Math.floor((totalSleepInMin / (8 * 60)) * 100)]"
          />
        </ClientOnly>
      </div>
      <div>
        <div>{{ totalSleep }}</div>
        <div>{{ fellAsleep }}</div>
        <div>{{ wokeUp }}</div>
      </div>
    </div>
    <div class="white sleep-stages">
      <div>&#x1F4A4; {{ deepSleep }}</div>
      <div>&#x1F634; {{ lightSleep }}</div>
      <div>&#x1F440; {{ remSleep }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sleepData"],
  data() {
    return {
      chartOptions: {
        colors: ["#90ee90"],
        labels: ["Mål: 8 timer"],
        chart: {
          foreColor: "white",
          toolbar: {
            show: false,
          },
        },
      },
    };
  },
  components: {
    apexchart: () => import('vue-apexcharts')
  },
  computed: {
    fellAsleep: function() {
      if (!this.sleepData.startTime) {
        return "";
      }
      let time = new Date(this.sleepData.startTime);
      return `Sovnet: ${time.getHours()}:${time
        .getMinutes()
        .toString()
        .padStart(2, 0)}`;
    },
    wokeUp: function() {
      if (!this.sleepData.endTime) {
        return "";
      }
      let time = new Date(this.sleepData.endTime);
      return `Sto opp: ${time.getHours()}:${time
        .getMinutes()
        .toString()
        .padStart(2, 0)}`;
    },
    sleepLevels: function(){
      if(!this.sleepData.levels){
        return {};
      }
      return this.sleepData.levels;
    },
    deepSleep: function() {
      if (!this.sleepLevels.summary) {
        return "";
      }
      return `Dyp: ${this.sleepLevels.summary.deep.minutes} minutter 
      (Siste 30 dager: ${this.sleepLevels.summary.deep.thirtyDayAvgMinutes})`;
    },
    lightSleep: function() {
      if (!this.sleepLevels.summary) {
        return "";
      }
      return `Lett: ${this.sleepLevels.summary.light.minutes} minutter
      (Siste 30 dager: ${this.sleepLevels.summary.light.thirtyDayAvgMinutes})`;
    },
    remSleep: function() {
      if (!this.sleepLevels.summary) {
        return "";
      }
      return `REM: ${this.sleepLevels.summary.rem.minutes} minutter
      (Siste 30 dager: ${this.sleepLevels.summary.rem.thirtyDayAvgMinutes})`;
    },
    totalSleep: function() {
      let sum = this.totalSleepInMin;
      return `${Math.floor(sum / 60)} timer og ${sum % 60} minutter`;
    },
    totalSleepInMin: function() {
      if (!this.sleepLevels) {
        return 0;
      }
      let summary = this.sleepLevels.summary;
      if(!summary){
        return 0;
      }
      let sum =
        summary.deep.minutes + summary.light.minutes + summary.rem.minutes;
      return sum;
    },
  },
};
</script>
<style scoped>
.sleep-summary{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sleep-stat {
  font-size: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.sleep-stages {
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 20px;
}
</style>
