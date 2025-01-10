
import React from 'react';
import { View } from 'react-native';
import { PieChart as PieChartGraph } from 'react-native-gifted-charts';


const PieChart = () => {
    const pieData = [
        { value: 54, color: '#177AD5', text: '54%' },
        { value: 30, color: '#79D2DE', text: '30%' },
        { value: 26, color: '#ED6665', text: '26%' },
    ];
    return (
        <View style={{ backgroundColor: "white", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <PieChartGraph
                donut
                isAnimated={true}
                showText
                textColor="black"
                // innerRadius={70}
                showTextBackground
                textBackgroundColor="white"
                textBackgroundRadius={22}
                data={pieData}
                // tooltipBackgroundColor={'#1B1B1C'}
                // focusOnPress
                showTooltip={true}
                persistTooltip={true}
                // tooltipWidth={50}
                // tooltipComponent={() => {
                //     return (
                //         <View style={{
                //             width: 100,
                //             height: 100,
                //             backgroundColor: "red"
                //         }}>
                //         </View>
                //     )
                // }}
                // tooltipVerticalShift={100}
                // tooltipHorizontalShift={100}
                showValuesAsTooltipText
                externalLabelComponent={(item,index)=>{
console.log("item",item)
                }}
                // labelsPosition="inward"
            />
        </View>
    );
};

export default PieChart;