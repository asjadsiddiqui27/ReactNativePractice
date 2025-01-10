// const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
// const data = [10,100]
const data = [50, 10, 40, 95, 85, 91, 35, 53, 23, 86];
const contentInset = { top: 20, bottom: 20 }

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MultipleLinesChartDecorator, { quadrupleLineChart } from './Charts'
import { LineChart, YAxis, Grid, XAxis ,AreaChart,StackedAreaChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import Svg, { Text as SvgText } from 'react-native-svg';

const Portfolio = () => {
    const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

    return (
        <View style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text> Portfolio Charts</Text>
            <View style={{
                height: 200,
                backgroundColor: "white",
                margin: 24,
                flexDirection: "row"
            }}
            >
                <YAxis
                    data={data}
                    // contentInset={{ top: 12, bottom:28 }}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={8}
                    scale={scale.scaleLinear}
                // formatLabel={(value) => `$${value}`}
                />
                <View style={{
                    width: "100%",
                    height: "100%",
                }}>
                    <LineChart
                        style={{ height: 200, marginLeft: 10, }}
                        data={quadrupleLineChart}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={contentInset}
                    // curve={shape.curveNatural}
                    >
                        <Grid />
                        <MultipleLinesChartDecorator combinedData={quadrupleLineChart} />
                    </LineChart>

                    {/* <AreaChart
                      style={{
                        position: 'absolute',
                        // flexDirection: 'row',
                        width: '100%',
                        height: 200, marginLeft: 10,
                      }}
                      data={data}
                      contentInset={{ top: 50, bottom: 0 }}
                      curve={shape.curveNatural}
                      numberOfTicks={5}
                      svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    /> 
                     */}
                    <XAxis
                        // style={{ height: 200 }}
                        data={data}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 16, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                        numberOfTicks={8}
                    />
                    {/* <Svg height="20" width="100%" style={styles.xAxisLabels}>
                        {xLabels.map((label, index) => {
                            const x = (index / (xLabels.length - 1)) * 100; // Calculate position based on the number of labels
                            return (
                                <SvgText
                                    key={index}
                                    x={`${x}%`} // Position the text relative to the width of the chart
                                    y="10"
                                    fontSize="12"
                                    fill="black"
                                    alignmentBaseline="middle"
                                    textAnchor="middle"
                                >
                                    {label}
                                </SvgText>
                            );
                        })}
                    </Svg> */}
                </View>
            </View>
        </View>
    )
}

export default Portfolio

const styles = StyleSheet.create({
    xAxisLabels: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
})