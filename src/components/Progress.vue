<template>
  <div class="mp">
    <div class="label">
      {{val}}<span v-if="percent">%</span>
    </div>
    <div class="pie_wrap" ref="pie">
    </div>
    <h3>{{title}}</h3>
  </div>
</template>

<script>
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

  export default {
    name: "mp",
    props: {
      title: { type:String, required: true },
      val: { type:Number, required: true },
      percent: { type:Boolean, required: true, default: false },
    },
    data() {
      //选项  / 数据
      return {}
    },
    methods: {
      //事件处理
      //初始化图形
      initCircle() {
        let data = [];
        if(this.percent) {
          data.push({ value: this.val, name: ''});
          data.push({ value: 100 - this.val, name: ''});
        }else {
          data.push({ value: 0, name: ''});
          data.push({ value: 100, name: ''});
        }

        let myChart = echarts.init(this.$refs.pie);
        // 绘制图表
        myChart.setOption({
        color: ["rgb(102,200,113)","rgb(223,223,223)"],
        series: [
            {
                name: this.title,
                type:'pie',
                radius: ['95%', '100%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data
            }
        ]
    });
      }
    },
    watch: {
      val: function() {
        this.initCircle();
      }
    },
    components: {
      //定义组件
    },
    mounted() {
      this.initCircle()
    }
  }
</script>

<style lang="scss" scoped>
@import '../../src/assets/style/main.scss';
@mixin hwwrap {
  width: px2rem(175);
  height: px2rem(175);
}

.mp {
  position: relative;
  text-align: center;
  color: #000;
  .label {
    position: absolute;
    line-height: px2rem(175);
    @include hwwrap;
    left: 0;
    top: 0;
    font-size: px2rem(48);
    span {
      vertical-align: super;
      font-size: $text-size-small;
    }
  }
  h3 {
    font-size: $text-size;
    padding: px2rem(27) 0 px2rem(52);
    line-height: $text-size;
  }
  .pie_wrap {
    @include hwwrap;
  }
}

</style>
