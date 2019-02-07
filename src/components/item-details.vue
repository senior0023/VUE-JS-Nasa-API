<template>
  <div>
    <div class="back-to-list">
      <button @click="$router.push({path: '/'})">Back to list</button>
    </div>
    <div>
      <div class="title"><h1>{{nasa_details.data[0].title}}</h1>
      </div>
      <el-collapse >
        <el-collapse-item title="Keywords" name="Keywords">
          <div class="keywords-items" v-for="(item, index) in nasa_details.data[0].keywords">
            -<strong><i>{{item}}</i></strong>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Id" name="id">
          <div>{{nasa_details.data[0].nasa_id}}</div>
        </el-collapse-item>
        <el-collapse-item title="Center" name="Center">
          <div>{{nasa_details.data[0].center}}</div>
        </el-collapse-item>
        <el-collapse-item title="Photographer" name="Photographer">
          <div>{{nasa_details.data[0].photographer}}</div>
        </el-collapse-item>
        <el-collapse-item title="Date Created" name="Date">
          <div>{{nasa_details.data[0].date_created.split('T')[0]}}</div>
        </el-collapse-item>
        <el-collapse-item title="Location" name="Location">
          <div>{{nasa_details.data[0].location}}</div>
        </el-collapse-item>
        <el-collapse-item title="Description" name="Description">
          <div>{{nasa_details.data[0].description}}</div>
        </el-collapse-item>
      </el-collapse>

      <div class="block carouseli" v-if="images.length>0">
        <el-carousel indicator-position="none" autoplay=false trigger='click' height="350px" style="text-align:center">
          <el-carousel-item v-for="item in images" :key="item">
            <img :src="item" height="350px">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="href">Links:
        <div class="href-items" v-for="(item, index) in href_info" v-bind:class="{ table_odd_color :(index % 2 == 0)}">
          <a v-bind:href="item">{{item}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nasa_details: this.$store.state.nasa_details.data,
      images: [],
      href_info: null,
      visible: false
    }
  },
  mounted() {
    console.log('details item: ', this.nasa_details);
    console.log('params', this.$route.params)

    this.axios.get(this.nasa_details.data.href).then((response) => {

      this.href_info = response.data
      console.log('response on details',response.data);
      this.href_info.map((value, key) => {
        if (value.split('.')[value.split('.').length - 1] === 'png' || value.split('.')[value.split('.').length - 1] === 'jpg') {
          this.images.push(value);
        }
      })

    }).catch(error => {
      console.log(error)
      this.errored = true
    }).finally(() => {
      this.loading = false;
    })
  },
};

</script>
<style scoped>
.keywords {
  display: flex;
  flex-direction: column;
}

.carouseli {
  width: 400px;
  margin: 20px auto;
}

.href{
  margin: 20px 0;
}

.table_odd_color{
  background-color: #f5f5f5;
}
.href-items{
  padding: 5px 0;
}

.keywords-items {
  margin: 5px 20px;
  border-bottom: 1px solid #ddd;
  align-self: flex-start;
}

</style>
