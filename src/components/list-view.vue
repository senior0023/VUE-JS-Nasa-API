<template>
  <div class="list-container flexbox align-start">
    <div class="flex1 pointer item-list-box" v-bind:class="{ flex2: view_details }">
      <div class="search-row flexbox">
        <div class="block">
          <span class="demonstration">Sart Year</span>
          <el-date-picker v-model="params.year_start" type="year" placeholder="Pick a year">
          </el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">End Year</span>
          <el-date-picker v-model="params.year_end" type="year" placeholder="Pick a year">
          </el-date-picker>
        </div>
        <el-button type="primary" v-on:click="getDataByYears" icon="el-icon-search" :loading="loading">Search</el-button>
      </div>
      <div class="item-list" v-for="item in info" v-if="!loading" v-on:click="view_details = item">
        <div class="data-list" v-for="data in item.data">
          {{data.title}}
        </div>
      </div>
      <!-- test table -->
      <div style="width:930px" v-if="false">
        <el-table :data="tableData3" style="width: 100%" height="250">
          <el-table-column fixed prop="date" label="Date" width="150">
          </el-table-column>
          <el-table-column prop="name" label="Name" width="120">
          </el-table-column>
          <el-table-column prop="state" label="State" width="120">
          </el-table-column>
          <el-table-column prop="city" label="City" width="120">
          </el-table-column>
          <el-table-column prop="address" label="Address" width="300">
          </el-table-column>
          <el-table-column prop="zip" label="Zip" width="120">
          </el-table-column>
        </el-table>
      </div>
      <div class="justify-center f-s-25">
        <i class="el-icon-circle-plus-outline" v-on:click="change_year" v-if="info.length > 0 && !loading_bottom"></i>
        <i class="el-icon-loading" style="color: #67C23A" v-if="loading_bottom"></i>
      </div>
    </div>
    <div v-if="view_details" class=" p-a-5" v-bind:class="{ flex1: view_details }">
      <div class="fixed fadeInRight animated details-view">
        <div class="p-a-5">
          <h1>{{view_details.data[0].title}}</h1>
          <div>
            {{view_details.data[0].description}}
          </div>
          <div>
            <img v-if="view_details.links && view_details.links[0].render === 'image'" v-bind:src="view_details.links[0].href" height="250px">
          </div>
            <div class="more-details">
              <button @click="gotoDetails(view_details)">Click here for more details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      info: [],
      loading: false,
      loading_bottom: false,
      loading_value: 0,
      view_details: null,
      params: {
        year_start: null,
        year_end: null
      }
    };
  },
  methods: {
    gotoDetails(item) {
      this.$store.state.nasa_details = {
        data: item,
        params: this.params
      };
      this.$router.push({
        name: 'details',
        params: {
          nasa_details: item,
          params: this.params
        }
      })
    },
    change_year() {
      this.loading_bottom = true
      this.params.year_start = this.moment(this.params.year_start).format('YYYY')
      let year_end = this.moment(this.params.year_end).format('YYYY')
      this.params.year_end = this.moment(this.params.year_end, "YYYY").add('years', 1).format('YYYY');
      this.axios.get('https://images-api.nasa.gov/search', { params: this.params }).then((response) => {
        response.data.collection.items.map(value => {
          this.info.push(value)
        })

      }).catch(error => {
        console.log(error)
        this.errored = true
      }).finally(() => {
        this.loading_bottom = false;
      })
    },
    getDataByYears() {
      this.loading = true;
      let params = {
        year_start: this.moment(this.params.year_start).format('YYYY'),
        year_end: this.moment(this.params.year_end).format('YYYY')
      }

      this.axios.get('https://images-api.nasa.gov/search', { params: params }).then((response) => {
        response.data.collection.items.map(value => {
          this.info.push(value)
        })

        this.$store.state.nasa_details = response.data.collection.items

      }).catch(error => {
        console.log(error)
        this.errored = true
      }).finally(() => {
        this.loading = false;
      })
    }
  },
  computed: {

  },
  mounted() {
    if (this.$store.state.nasa_details) {
      this.params = this.$store.state.nasa_details.params
      this.getDataByYears()
    }

  },

};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-container {
  padding: 5px;
}

.plus-icon {
  padding: 0 5px;
  border: 1px solid #f00;
  border-radius: 25px;
  color: #f00;
}

.fixed {
  position: fixed;
  top: 10px;
}

.f-s-25 {
  font-size: 25px;
}

.details-view {
  box-shadow: 1px 0px 10px #ddd;
  min-width: 33.3%
}

</style>
