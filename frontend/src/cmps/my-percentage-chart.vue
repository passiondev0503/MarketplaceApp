<script>
import { Pie, mixins } from "vue-chartjs";

export default {
  extends: Pie,
  data(){
    return {
      newLabels:[],
      newData:[],
      newColor:[]
    }
  },
  props: {
    chartData:Object
    },
  mixins: [mixins.reactiveProp],
created() {

    this.newLabels=Object.keys(this.chartData)
    this.newLabels.forEach(label => {
      this.newData.push(this.chartData[label])
      this.newColor.push('rgba('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+',0.6)')
    });
},
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels:this.newLabels,
      datasets: [
        {
          label: "Income from each stay",
          backgroundColor: "#f87979",

          data:this.newData,
                  backgroundColor: this.newColor
        },
      ],
    });
  },
  
};
</script>

<style></style>
