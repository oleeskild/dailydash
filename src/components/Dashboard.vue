<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <card :title="'Total tid søvn'">
          <sleep-summary :sleepData="sleepData" />
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <card :title="'Søvnmønster'">
          <SleepBlock :sleepData="sleepData" />
        </card>
      </div>
        <div class="col-6">
          <card :title="'TODOs'">
            <Todos />
          </card>
        </div>
      </div>
  </Layout>
</template>

<script>
import SleepBlock from "../components/SleepBlock.vue";
import Card from "../components/Card.vue";
import Todos from "../components/Todos.vue";
import Transactions from "../components/Transactions.vue";
import SleepSummary from "../components/SleepSummary.vue";
import {
  retrieveTokenFromUrl,
  getToken,
  getSleepData,
} from "../helpers/fitBit";

export default {
  components: {
    SleepBlock,
    Card,
    Todos,
    SleepSummary,
  },
  metaInfo: {
    title: "Overview",
  },
  data() {
    return {
      sleepData: {},
    };
  },
  mounted: function() {
    if (localStorage.getItem("access_token") == null) {
      this.getToken();
    }

    this.getSleepData();
  },
  methods: {
    getSleepData() {
      getSleepData().then((sleepData) => {
        this.sleepData = sleepData.sleep[0];
      });
    },
    getToken() {
      retrieveTokenFromUrl();
    },
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
.col-6 {
  width: 50%;
}
.col-12 {
  width: 100%;
}
.row {
  display: flex;
  justify-content: space-around;
  margin: 0 20px;
}

@media (max-width: 700px){
  .col-6{
    width: 100%;
  }
  .row {
    flex-direction: column;
  }
}
</style>
