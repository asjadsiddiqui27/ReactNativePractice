import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  LayoutAnimation
} from "react-native";


import { LineChart } from "react-native-charts-wrapper";
import Home from "./Home";

const greenBlue = "rgb(26, 182, 151)";
const petrel = "rgb(59, 145, 153)";
const dataSet = [
  {
    values: [
      { y: 65, x: 0, marker: "65 kg" },
      { y: 77, x: 1, marker: "77 kg" },
      { y: 76, x: 2, marker: "76 kg" },
      { y: 74, x: 3, marker: "74 kg" },
      { y: 76, x: 4, marker: "76 kg" },
      { y: 65, x: 5, marker: "Today: 65 kg" }
    ],
    label: "Dataset 1",
    config: {
      mode: "LINEAR",
      drawValues: false,
      lineWidth: 2,
      drawCircles: false,
      circleColor: processColor("#3498db"),
      drawCircleHole: false,
      circleRadius: 5,
      highlightColor: processColor("transparent"),
      color: processColor("#3498db"),
      drawFilled: true,
      fillGradient: {
        colors: [processColor("rgba(52, 152, 219, 0.3)"), processColor("rgba(133, 193, 233, 0.3)")],
        positions: [0, 0.5],
        angle: 90,
        orientation: "TOP_BOTTOM"
      },
      fillAlpha: 1000,
      valueTextSize: 15
    }
  },
  {
    values: [
      { y: 50, x: 0, marker: "50 kg" },
      { y: 60, x: 1, marker: "60 kg" },
      { y: 55, x: 2, marker: "55 kg" },
      { y: 70, x: 3, marker: "70 kg" },
      { y: 65, x: 4, marker: "65 kg" },
      { y: 62, x: 5, marker: "Today: 62 kg" }
    ],
    label: "Dataset 2",
    config: {
      mode: "LINEAR",
      drawValues: false,
      lineWidth: 2,
      drawCircles: false,
      circleColor: processColor("#e74c3c"),
      drawCircleHole: false,
      circleRadius: 5,
      highlightColor: processColor("transparent"),
      color: processColor("#e74c3c"),
      drawFilled: true,
      fillGradient: {
        colors: [processColor("rgba(231, 76, 60, 0.3)"), processColor("rgba(241, 148, 138, 0.3)")],
        positions: [0, 0.5],
        angle: 90,
        orientation: "TOP_BOTTOM"
      },
      fillAlpha: 1000,
      valueTextSize: 15
    }
  },
  {
    values: [
      { y: 80, x: 0, marker: "80 kg" },
      { y: 70, x: 1, marker: "70 kg" },
      { y: 75, x: 2, marker: "75 kg" },
      { y: 78, x: 3, marker: "78 kg" },
      { y: 82, x: 4, marker: "82 kg" },
      { y: 85, x: 5, marker: "Today: 85 kg" }
    ],
    label: "Dataset 3",
    config: {
      mode: "LINEAR",
      drawValues: false,
      lineWidth: 2,
      drawCircles: false,
      circleColor: processColor("#2ecc71"),
      drawCircleHole: false,
      circleRadius: 5,
      highlightColor: processColor("transparent"),
      color: processColor("#2ecc71"),
      drawFilled: true,
      fillGradient: {
        colors: [processColor("rgba(46, 204, 113, 0.3)"), processColor("rgba(88, 214, 141, 0.3)")],
        positions: [0, 0.5],
        angle: 90,
        orientation: "TOP_BOTTOM"
      },
      fillAlpha: 1000,
      valueTextSize: 15
    }
  },
  {
    values: [
      { y: 40, x: 0, marker: "40 kg" },
      { y: 42, x: 1, marker: "42 kg" },
      { y: 38, x: 2, marker: "38 kg" },
      { y: 45, x: 3, marker: "45 kg" },
      { y: 47, x: 4, marker: "47 kg" },
      { y: 43, x: 5, marker: "Today: 43 kg" }
    ],
    label: "Dataset 4",
    config: {
      mode: "LINEAR",
      drawValues: false,
      lineWidth: 2,
      drawCircles: false,
      circleColor: processColor("#9b59b6"),
      drawCircleHole: false,
      circleRadius: 5,
      highlightColor: processColor("transparent"),
      color: processColor("#9b59b6"),
      drawFilled: true,
      fillGradient: {
        colors: [processColor("rgba(155, 89, 182, 0.3)"), processColor("rgba(195, 155, 211, 0.3)")],
        positions: [0, 0.5],
        angle: 90,
        orientation: "TOP_BOTTOM"
      },
      fillAlpha: 1000,
      valueTextSize: 15
    }
  },
  {
    values: [
      { y: 20, x: 0, marker: "20 kg" },
      { y: 22, x: 1, marker: "22 kg" },
      { y: 25, x: 2, marker: "25 kg" },
      { y: 30, x: 3, marker: "30 kg" },
      { y: 28, x: 4, marker: "28 kg" },
      { y: 26, x: 5, marker: "Today: 26 kg" }
    ],
    label: "Dataset 5",
    config: {
      mode: "LINEAR",
      drawValues: false,
      lineWidth: 2,
      drawCircles: false,
      circleColor: processColor("#f1c40f"),
      drawCircleHole: false,
      circleRadius: 5,
      highlightColor: processColor("transparent"),
      color: processColor("#f1c40f"),
      drawFilled: true,
      fillGradient: {
        colors: [processColor("rgba(241, 196, 15, 0.3)"), processColor("rgba(247, 220, 111, 0.3)")],
        positions: [0, 0.5],
        angle: 90,
        orientation: "TOP_BOTTOM"
      },
      fillAlpha: 1000,
      valueTextSize: 15
    }
  },
  {
    values: [
      { y: 90, x: 0, marker: "90 kg" },
      { y: 85, x: 1, marker: "85 kg" },
      { y: 88, x: 2, marker: "88 kg" },
      { y: 92, x: 3, marker: "92 kg" },
      { y: 95, x: 4, marker: "95 kg" },
      { y: 98, x: 5, marker: "Today: 98 kg" }
    ],
    label: "Dataset 6",
    config: {
      mode: "LINEAR",
      drawValues: false,
      lineWidth: 2,
      drawCircles: false,
      circleColor: processColor("#e67e22"),
      drawCircleHole: false,
      circleRadius: 5,
      highlightColor: processColor("transparent"),
      color: processColor("#e67e22"),
      drawFilled: true,
      fillGradient: {
        colors: [processColor("rgba(230, 126, 34, 0.3)"), processColor("rgba(240, 178, 122, 0.3)")],
        positions: [0, 0.5],
        angle: 90,
        orientation: "TOP_BOTTOM"
      },
      fillAlpha: 1000,
      valueTextSize: 15
    }
  },
  {
    values: [
      { y: 30, x: 0, marker: "30 kg" },
      { y: 28, x: 1, marker: "28 kg" },
      { y: 32, x: 2, marker: "32 kg" },
      { y: 35, x: 3, marker: "35 kg" },
      { y: 34, x: 4, marker: "34 kg" },
      { y: 36, x: 5, marker: "Today: 36 kg" }
    ],
    label: "Dataset 7",
    config: {
      mode: "LINEAR",
      drawValues: false,
      lineWidth: 2,
      drawCircles: false,
      circleColor: processColor("#34495e"),
      drawCircleHole: false,
      circleRadius: 5,
      highlightColor: processColor("transparent"),
      color: processColor("#34495e"),
      drawFilled: true,
      fillGradient: {
        colors: [processColor("rgba(52, 73, 94, 0.3)"), processColor("rgba(93, 109, 126, 0.3)")],
        positions: [0, 0.5],
        angle: 90,
        orientation: "TOP_BOTTOM"
      },
      fillAlpha: 1000,
      valueTextSize: 15
    }
  },
  {
    values: [
      { y: 18, x: 0, marker: "18 kg" },
      { y: 22, x: 1, marker: "22 kg" },
      { y: 19, x: 2, marker: "19 kg" },
      { y: 16, x: 3, marker: "16 kg" },
      { y: 17, x: 4, marker: "17 kg" },
      { y: 15, x: 5, marker: "Today: 15 kg" }
    ],
    label: "Dataset 8",
    config: {
      mode: "LINEAR",
      drawValues: false,
      lineWidth: 2,
      drawCircles: false,
      circleColor: processColor("#2ecc71"),
      drawCircleHole: false,
      circleRadius: 5,
      highlightColor: processColor("transparent"),
      color: processColor("#2ecc71"),
      drawFilled: true,
      fillGradient: {
        colors: [processColor("rgba(46, 204, 113, 0.3)"), processColor("rgba(0, 255, 100, 0.3)")],
        positions: [0, 0.5],
        angle: 90,
        orientation: "TOP_BOTTOM"
      },
      fillAlpha: 1000,
      valueTextSize: 15
    }
  },
]

class LineChartScreen extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 80 }}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
          
            data={{
               dataSets : dataSet
            }}
            chartDescription={{ text: "this is test" }}
            legend={{
              enabled: false
            }}
            // marker={{
            //   enabled: true,
            //   markerColor: processColor("white"),
            //   textColor: processColor("black")
            // }}
            marker={{
              enabled: true,
               markerColor: processColor("white"),
              textColor: processColor("black"), // Hide default text
              custom:()=><Home/>,
            }}
            xAxis={{
              enabled: true,
              granularity: 1,
              drawLabels: true,
              position: "BOTTOM",
              drawAxisLine: true,
              drawGridLines: false,
              fontFamily: "HelveticaNeue-Medium",
              fontWeight: "bold",
              textSize: 12,
              textColor: processColor("gray"),
              valueFormatter: ["M", "T", "W", "T", "F", "S"]
            }}
            yAxis={{
              left: {
                enabled: false
              },
              right: {
                enabled: false
              }
            }}
            autoScaleMinMaxEnabled={true}
            animation={{
              durationX: 0,
              durationY: 1500,
              easingY: "EaseInOutQuart"
            }}
            drawGridBackground={false}
            drawBorders={false}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={false}
            scaleXEnabled={false}
            scaleYEnabled={false}
            pinchZoom={true}
            doubleTapToZoomEnabled={false}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            keepPositionOnRotation={false}
            onSelect={this.handleSelect.bind(this)}
            onChange={event => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 20
  },
  chart: {
    height: 250
  },
  markerContainer: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 4,
    borderColor: "#34495e",
    borderWidth: 1,
  },
  markerText: {
    color: "black",
    fontSize: 12,
  },
});

export default LineChartScreen;
