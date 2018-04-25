<template>
  <v-layout>
    <v-flex xs12 md4>
      <v-card>
        <v-card-title primary-title class="graph-card">
          <div id='chartdiv'></div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color='orange'>Share</v-btn>
          <v-btn flat color='orange'>Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
let AmCharts = require('amcharts')
export default {
  name: 'Dashboard',
  data: () => ({
    chart: null
  }),
  mounted () {
    this.chart = AmCharts.makeChart('chartdiv', {
      'type': 'serial',
      'theme': 'black',
      'marginRight': 70,
      'dataProvider': [{
        'country': 'USA',
        'visits': 3025,
        'color': '#FF0F00'
      }, {
        'country': 'China',
        'visits': 1882,
        'color': '#FF6600'
      }, {
        'country': 'Japan',
        'visits': 1809,
        'color': '#FF9E01'
      }, {
        'country': 'Germany',
        'visits': 1322,
        'color': '#FCD202'
      }, {
        'country': 'UK',
        'visits': 1122,
        'color': '#F8FF01'
      }, {
        'country': 'France',
        'visits': 1114,
        'color': '#B0DE09'
      }, {
        'country': 'India',
        'visits': 984,
        'color': '#04D215'
      }, {
        'country': 'Spain',
        'visits': 711,
        'color': '#0D8ECF'
      }, {
        'country': 'Netherlands',
        'visits': 665,
        'color': '#0D52D1'
      }, {
        'country': 'Russia',
        'visits': 580,
        'color': '#2A0CD0'
      }, {
        'country': 'South Korea',
        'visits': 443,
        'color': '#8A0CCF'
      }, {
        'country': 'Canada',
        'visits': 441,
        'color': '#CD0D74'
      }],
      'valueAxes': [{
        'axisAlpha': 0,
        'position': 'left',
        'title': 'Visitors from country'
      }],
      'startDuration': 1,
      'graphs': [{
        'balloonText': '<b>[[category]]: [[value]]</b>',
        'fillColorsField': 'color',
        'fillAlphas': 0.9,
        'lineAlpha': 0.2,
        'type': 'column',
        'valueField': 'visits'
      }],
      'chartCursor': {
        'categoryBalloonEnabled': false,
        'cursorAlpha': 0,
        'zoomable': false
      },
      'categoryField': 'country',
      'categoryAxis': {
        'gridPosition': 'start',
        'labelRotation': 45
      },
      'export': {
        'enabled': true
      }

    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.graph-card {
  padding: 0;
}

#chartdiv {
  width: 100%;
  height: 300px;
}

.amcharts-export-menu-top-right {
  top: 10px;
  right: 0;
}
</style>
