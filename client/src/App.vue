<template>
  <div id="app">
    <div class="header">
      <h1 class="header-title">大屏数据可视化DEMO</h1>
    </div>
    <div class="wrapper">
      <div class="content">
        <div class="col col-l">
          <div class="xpanel-wrapper xpanel-wrapper-40">
            <div class="xpanel xpanel-l-t">
              <div class="title">{{ title1 }}</div>
              <div ref="panel1" id="panel1">panel1</div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-60">
            <div class="xpanel xpanel-l-b">
              <div class="title">{{ title2 }}</div>
            </div>
          </div>
        </div>
        <div class="col col-c">
          <div class="xpanel-wrapper xpanel-wrapper-75">
            <div class="xpanel no-bg"></div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-25">
            <div class="xpanel xpanel-c-b">
              <div class="title title-long"></div>
            </div>
          </div>
        </div>
        <div class="col col-r">
          <div class="xpanel-wrapper xpanel-wrapper-25">
            <div class="xpanel xpanel-r-t">
              <div class="title">{{ title3 }}</div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-30">
            <div class="xpanel xpanel-r-m">
              <div class="title">{{ title4 }}</div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-45">
            <div class="xpanel xpanel-r-b">
              <div class="title">{{ title5 }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import echarts from "echarts";
import opt1 from "./charts/multipleLines";
export default {
  data() {
    return {
      title1: "电压/电流数据1",
      title2: "电压/电流数据2",
      title3: "电压/电流数据3",
      title4: "电压/电流数据4",
      title5: "电压/电流数据5",
      data1: {
        time: ["1", "2"],
        voltage: [380, 370],
        current: [100, 110],
      },
    };
  },
  created() {},
  mounted() {
    // console.log(this.$refs['panel1'])
    const myChart1 = this.$echarts.init(this.$refs.panel1);
    myChart1.setOption(opt1(this.data1));

    const io = this.$io();
    io.on("connect", function () {
      console.log("connect");
    });

    io.on("msg", (data) => {
      this.data1.time.push(this.$dayjs(data.voltage.update).format("HH:mm:ss"));
      this.data1.voltage.push(data.voltage.value);
      this.data1.current.push(data.current.value);
      if (this.data1.time.length > 5) {
        this.data1.time.shift();
        this.data1.voltage.shift();
        this.data1.current.shift();
      }
      myChart1.setOption(opt1(this.data1));
    });
  },
};
</script>
<style lang="scss">
#panel1 {
  width: 100%;
  height: 100%;
  // color:white;
}
</style>
