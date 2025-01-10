const data1 = [
    {value: 70},
    {value: 36},
    {value: 50},
    {value: 40},
    {value: 18},
    {value: 38},
    {value: 70},
    {value: 36},
    {value: 50},
    {value: 40},
    {value: 18},
    {value: 38},
    {value: 70},
    {value: 36},
    {value: 50},
    {value: 40},
    {value: 18},
    {value: 38},
  ];
  const data2 = [
    {value: 50},
    {value: 10},
    {value: 45},
    {value: 30},
    {value: 45},
    {value: 18},
    {value: 50},
    {value: 10},
    {value: 45},
    {value: 50},
    {value: 10},
    {value: 45},
    {value: 30},
    {value: 45},
    {value: 18},
    {value: 30},
    {value: 45},
    {value: 18},
  ];
  const data3 = [
    {value: 52},
    {value: 65},
    {value: 28},
    {value: 41},
    {value: 59},
    {value: 33},
    {value: 62},
    {value: 75},
    {value: 12},
    {value: 47},
    {value: 53},
    {value: 23},
    {value: 71},
    {value: 49},
    {value: 34},
    {value: 27},
    {value: 68},
    {value: 51},
  ];
  
  const data4 = [
    {value: 37},
    {value: 29},
    {value: 48},
    {value: 61},
    {value: 14},
    {value: 69},
    {value: 28},
    {value: 34},
    {value: 54},
    {value: 32},
    {value: 19},
    {value: 56},
    {value: 43},
    {value: 38},
    {value: 25},
    {value: 66},
    {value: 21},
    {value: 40},
  ];
  
  const data5 = [
    {value: 61},
    {value: 35},
    {value: 42},
    {value: 18},
    {value: 72},
    {value: 24},
    {value: 19},
    {value: 63},
    {value: 45},
    {value: 59},
    {value: 50},
    {value: 37},
    {value: 23},
    {value: 30},
    {value: 29},
    {value: 47},
    {value: 60},
    {value: 26},
  ];
  const data6 = [
    {value: 41},
    {value: 57},
    {value: 33},
    {value: 22},
    {value: 68},
    {value: 53},
    {value: 28},
    {value: 74},
    {value: 15},
    {value: 39},
    {value: 60},
    {value: 45},
    {value: 19},
    {value: 36},
    {value: 63},
    {value: 54},
    {value: 12},
    {value: 70},
  ];
  
  const data7 = [
    {value: 18},
    {value: 62},
    {value: 29},
    {value: 37},
    {value: 51},
    {value: 46},
    {value: 58},
    {value: 25},
    {value: 49},
    {value: 64},
    {value: 52},
    {value: 16},
    {value: 69},
    {value: 40},
    {value: 27},
    {value: 60},
    {value: 34},
    {value: 31},
  ];
  
  const data8 = [
    {value: 55},
    {value: 20},
    {value: 41},
    {value: 12},
    {value: 48},
    {value: 39},
    {value: 67},
    {value: 28},
    {value: 53},
    {value: 44},
    {value: 32},
    {value: 19},
    {value: 50},
    {value: 61},
    {value: 36},
    {value: 23},
    {value: 42},
    {value: 65},
  ];
    

  const dataSet = [
    {
      data: data1,
      color: 'skyblue',
      dataPointsColor: 'blue',
      textColor: 'green',
      startFillColor: "#FF5733", endFillColor: "#C70039"
    },
    {
      data: data2,
      color: 'orange',
      dataPointsColor: 'red',
      textColor: 'purple',
      startFillColor: "#3498DB", endFillColor: "#2ECC71"
    },
    {
      data: data3,
      color: 'lightgreen',
      dataPointsColor: 'darkgreen',
      textColor: 'brown',
      startFillColor: "#9B59B6", endFillColor: "#F39C12"

    },
    {
      data: data4,
      color: 'yellow',
      dataPointsColor: 'darkorange',
      textColor: 'black',
      startFillColor: "#1ABC9C", endFillColor: "#F1C40F"

    },
    {
      data: data5,
      color: 'pink',
      dataPointsColor: 'purple',
      textColor: 'gray',
      showArrow:true,
      startFillColor: "#E74C3C", endFillColor: "#8E44AD"

    },
    // {
    //   data: data6,
    //   color: 'lightcoral',
    //   dataPointsColor: 'darkred',
    //   textColor: 'navy',
    // },
    // {
    //   data: data7,
    //   color: 'lightblue',
    //   dataPointsColor: 'blue',
    //   textColor: 'black',
    // },
    // {
    //   data: data8,
    //   color: 'lightyellow',
    //   dataPointsColor: 'gold',
    //   textColor: 'darkgreen',
    // },
  ];
  


  import { StyleSheet, Text, View } from 'react-native'
  import React from 'react'
import { LineChart } from 'react-native-gifted-charts';
  
  const MultiLineChart = () => {
     return (
    <View
      style={{
        // paddingVertical: 100,
        justifyContent:"center",
        padding:20,
        flex:1,
        // paddingLeft: 20,
        backgroundColor: '#1C1C1C',
      }}>
      <LineChart
        areaChart
        isAnimated
        curved
        // dataSet={dataSet}
        
        data={data1}
        stepChart
        data2={data2}
        // data3={data3}
        // data4={data4}
        // data5={data5}
        // data6={data5}
        // hideDataPoints
        // spacing={68}
        color1="#8a56ce"
        color2="#56acce"
        // startFillColor1="#8a56ce"
        // startFillColor2="#56acce"
        // endFillColor1="#8a56ce"
        // endFillColor2="#56acce"
        startOpacity={0.5}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={8}
        // yAxisColor="white"
        yAxisThickness={0}
        rulesType="solid"
        rulesColor="gray"
        yAxisTextStyle={{color: 'gray'}}
        yAxisLabelPrefix='$'
        xAxisColor="lightgray"
        // xAxisLabelTexts={}
        hidePointers={false}
        pointerConfig={{
            // pointerStripUptoDataPoint: true,
            // pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            strokeDashArray: [2, 5],
            // pointerColor: 'lightgray',
            // radius: 4,
            pointerLabelWidth: 100,
            pointerLabelHeight: 120,
            // pointerComponent
            pointerLabelComponent: items => {
              console.log("kjdl")
              return (
                <View
                  style={{
                    height: 120,
                    width: 100,
                    backgroundColor: '#282C3E',
                    borderRadius: 4,
                    justifyContent: 'center',
                    paddingLeft: 16,
                  }}>
                  {/* Dynamically render data for each dataset */ }
                  {items.map((item, index) => (
                    <View key={index}>
                      <Text style={{ color: 'lightgray', fontSize: 12 }}>
                        {`Data ${index + 1}`}
                      </Text>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        {item.value}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            },
          }}
      />
    </View>
  );
}

  export default MultiLineChart


  const styles = StyleSheet.create({})
