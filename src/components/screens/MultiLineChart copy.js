import React from 'react';
import {View,Text} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import { DataSet } from 'gifted-charts-core';
const MultiLineChart = () => {
    const d1 = [
      {value: 110},
      {value: 90},
      {value: 100},
      {value: 120},
      {value: 100, label: '2005', showXAxisIndex: true},
      {value: -80},
      {value: 90},
      {value: 110},
      {value: 120},
      {value: 100, label: '2010', showXAxisIndex: true},
      {value: 90},
      {value: 100},
      {value: 88},
      {value: 80},
      {value: 120, label: '2015', showXAxisIndex: true},
      {value: 76},
      {value: 104},
      {value: 112},
    ];
    const d2 = [
        {value: 110},
        {value: 90},
        {value: 100},
        {value: 120},
        {value: 100, label: '2005', showXAxisIndex: true},
        {value: -80},
        {value: 90},
        {value: 110},
        {value: 120},
        {value: 100, label: '2010', showXAxisIndex: true},
        {value: 90},
        {value: 100},
        {value: 88},
        {value: 80},
        {value: 120, label: '2015', showXAxisIndex: true},
        {value: 76},
        {value: 104},
        {value: 112},
    ];

    const dataSet = [
      {
        data: d1,
        color: 'orange',
        dataPointsColor: 'red',
        textColor: 'green',
      },
      {
        data: d2,
        color: 'orange',
        dataPointsColor: 'red',
        textColor: 'green',
      },
    
    ];
  
    return (
      <View style={{borderWidth:1}}>
        <LineChart
          dataSet={dataSet}
          maxValue={140}
          noOfSections={7}
          spacing={15}
          hideDataPoints
          // hideRules
          color="orange"
          yAxisColor={'orange'}
          showYAxisIndices
          yAxisIndicesColor={'orange'}
          yAxisIndicesWidth={10}
          // secondaryData={d2.map(v => ({value: v}))}
          secondaryLineConfig={{color: 'blue'}}
          secondaryYAxis={{
            maxValue: .2,
            noOfSections: 4,
            showFractionalValues: true,
            roundToDigits: 3,
            yAxisColor: 'blue',
            yAxisIndicesColor: 'blue',
          }}
          xAxisLabelTextStyle={{width: 80, marginLeft: -36}}
          xAxisIndicesHeight={10}
          xAxisIndicesWidth={2}
        //   pointerConfig={{
        //     pointerLabelComponent: ((items1,items2,index)=>{
        //       console.log('items1...',items1)
        //       console.log('items2...',items2)
        //       console.log('index...',index)
        //       return(
        //         <View />
        //       )
        //     })
        //   }}

        pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            strokeDashArray: [2, 5],
            pointerColor: 'lightgray',
            radius: 4,
            pointerLabelWidth: 100,
            pointerLabelHeight: 120,
            pointerLabelComponent: (items1,items2,index) => {
               {console.log("items:::::",items1)}
               {console.log("items:::::",items2)}
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
                  <Text style={{color: 'lightgray', fontSize: 12}}>{2018}</Text>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    {'items[0]'}
                  </Text>
                  <Text style={{color: 'lightgray', fontSize: 12, marginTop: 12}}>
                    {2019}
                  </Text>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    {'items[1]'}
                  </Text>
                </View>
              );
            },
          }}
        />
      </View>
    );
  };
  
  export default MultiLineChart;
  