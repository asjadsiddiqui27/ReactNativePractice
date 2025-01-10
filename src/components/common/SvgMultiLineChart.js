import React, { useEffect, useState } from 'react';
import { View, Dimensions, PanResponder, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as d3 from 'd3-shape';
import * as scale from 'd3-scale';
import { ticks } from 'd3-array';

const generateRandomValues = (count = 10) => {
    return Array.from({ length: count }, (_, index) => ({
        x: index,
        y: Math.floor(Math.random() * 100) + 1 // Random number between 1 and 100
    }));
};

// Generate random values for three different datasets
const randomValues = generateRandomValues(50); // Generates 10 random data points
const randomValues2 = generateRandomValues(10);
const randomValues3 = generateRandomValues(10);

const data = [
    {
        key: 'Dataset 1',
        color: 'rgba(247, 147, 26, 1)',
        values: randomValues
    },
    {
        key: 'Dataset 2',
        color: 'rgba(107, 66, 155, 1)',
        values: randomValues2
    },
    {
        key: 'Dataset 3',
        color: 'rgba(07, 66, 155, 0.3)',
        values: randomValues3
    },
];

const SvgMultiLineChart = () => {
    const [pointerIndex, setPointerIndex] = useState(null);
    const [pointerPosition, setPointerPosition] = useState(null);

    const { width } = Dimensions.get('window');
    const height = 300;

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const allKeys = data.map(d => d.key);

    // Create scales
    const xScale = scale
        .scaleLinear()
        .domain([0, data[0].values.length - 1])
        .range([0, innerWidth]);

    const yScale = scale
        .scaleLinear()
        .domain([
            0,
            Math.max(...data.flatMap(d => d.values.map(v => v.y))),
        ])
        .range([innerHeight, 0]);

    // Generate paths
    const lineGenerator = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d.y))
        .curve(d3.curveLinear);

    const areaGenerator = d3.area()
        .x((d, i) => xScale(i))
        .y0(yScale(0))
        .y1(d => yScale(d.y))
        .curve(d3.curveLinear);

    // PanResponder for detecting touch
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            const xPos = Math.max(
                0,
                Math.min(innerWidth, gestureState.moveX - margin.left)
            );
            const closestIndex = Math.round(xScale.invert(xPos));
            setPointerIndex(closestIndex);
            setPointerPosition(xPos);
        },
        onPanResponderRelease: () => {
            setPointerIndex(null);
            setPointerPosition(null);
        },
    });



    // Calculate tooltip position
    const tooltipPosition = pointerPosition + margin.left;
    const isTooltipOnRight = tooltipPosition + 150 > width;
    const tooltipOffset = isTooltipOnRight ? -100 : 10;
    // const tooltipOffset = isTooltipOnRight ? -dimen(100) : dimen(10);  for plus

    // Calculate the number of ticks (max 10)
    const maxTicks = 6;
    const totalPoints = data[0].values.length;
    const numTicks = Math.min(maxTicks, totalPoints); // Ensure no more than 10 ticks

    // Generate xTickIndices dynamically based on the number of ticks
    const xTickIndices = ticks(0, totalPoints - 1, numTicks - 1).map(index =>
        Math.min(index, totalPoints - 1)
    );

      useEffect(() => {
        console.log("svg chart");
      },[])
    

    return (
        <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
            <View style={{ backgroundColor: "#242426", marginHorizontal: 24 }}>
                <View {...panResponder.panHandlers} style={{}}>
                    <Svg style={{}} width={width} height={height}>
                        <G x={margin.left} y={margin.top}>
                            {/* Render Y Axis */}
                            {yScale.ticks(5).map(tickValue => (
                                <G key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
                                    <Line
                                        x1={0}
                                        x2={innerWidth}
                                        stroke="#322F2F"
                                        strokeWidth={1}
                                    />
                                    <SvgText
                                        x={-10}
                                        y={5}
                                        fontSize={10}
                                        fill="#666"
                                        textAnchor="end"
                                    >
                                        {tickValue}
                                    </SvgText>
                                </G>
                            ))}
                            {/* Render X Axis */}
                            {/* {data[0].values.map((d, i) => (
                                <G key={i} transform={`translate(${xScale(i)}, ${innerHeight})`}>
                                    <Line
                                        y1={0}
                                        y2={-innerHeight}
                                        stroke="red"
                                        strokeDasharray="3 3"
                                        strokeWidth={0}
                                    />
                                    <SvgText
                                        y={15}
                                        fontSize={10}
                                        fill="#666"
                                        textAnchor="middle"
                                    >
                                        {d.x}
                                    </SvgText>
                                </G>
                            ))} */}
                            {/* Render X Axis limited */}

                            {xTickIndices.map((tickIndex, i) => (
                                <G key={i} transform={`translate(${xScale(tickIndex)}, ${innerHeight})`}>
                                    {/* Optional: Draw vertical grid lines */}
                                    {/*  <Line
                                        y1={0}
                                        y2={-innerHeight}
                                        stroke="red"
                                        strokeDasharray="3 3"
                                        strokeWidth={0}
                                    /> */}
                                    {/* X-Axis Label */}
                                    <SvgText
                                        y={15}
                                        fontSize={10}
                                        fill="#666"
                                        textAnchor="middle"
                                    >
                                        {data[0].values[tickIndex].x} {/* Display the corresponding x value */}
                                    </SvgText>
                                </G>
                            ))}


                            <Defs>
                                {/* Generate Gradients Dynamically */}
                                {data.map((dataset, idx) => {
                                    const gradientId = `gradient${idx}`;
                                    return (
                                        <LinearGradient key={gradientId} id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                            {/* Use dynamic stops based on data */}
                                            <Stop offset="0%" stopColor={dataset.color} stopOpacity="1" />
                                            <Stop offset="100%" stopColor={dataset.color} stopOpacity="0.01" />
                                        </LinearGradient>
                                    );
                                })}
                            </Defs>
                            {/* Render each line and area */}
                            {data.map((dataset, idx) => (
                                <React.Fragment key={dataset.key}>
                                    {/* Area */}
                                    <Path
                                        d={areaGenerator(dataset.values)}
                                        // fill={dataset.color}
                                        fill={`url(#gradient${idx})`}
                                        opacity={1}
                                    // fill={`url(#gradient-${dataset.key})`}  // Reference the unique gradient for this dataset

                                    />
                                    {/* Line */}
                                    <Path
                                        d={lineGenerator(dataset.values)}
                                        fill="none"
                                        stroke={dataset.color}
                                        strokeWidth={2}
                                    />
                                </React.Fragment>
                            ))}
                            {/* Pointer */}
                            {pointerIndex !== null && (
                                <G>
                                    {/* Vertical line */}
                                    {/* <Path
                                        d={`M${pointerPosition} 0 L${pointerPosition} ${innerHeight}`}
                                        stroke="#888"
                                        strokeWidth={1}
                                        strokeDasharray="4 4"
                                    /> */}
                                    {/* Pointers */}
                                    {data.map(dataset => {
                                        const point = dataset.values[pointerIndex];
                                        return (
                                            <Circle
                                                key={`${dataset.key}-point`}
                                                cx={xScale(pointerIndex)}
                                                cy={yScale(point.y)}
                                                r={5}
                                                fill={dataset.color}
                                            />
                                        );
                                    })}
                                </G>
                            )}
                        </G>
                    </Svg>
                    {/* Tooltip */}
                    {pointerIndex !== null && (
                        <View style={{
                            backgroundColor: "#1B1B1C",
                            position: 'absolute',
                            borderRadius: 5,
                            left: tooltipPosition + tooltipOffset,
                            top: 10,
                            //  top: margin.top, 
                            //  left: pointerPosition + margin.left

                        }}>

                            <View style={{ margin: 10,width:120 }}>

                                {data.map(dataset => {
                                    const point = dataset.values[pointerIndex];
                                    return (
                                        <Text key={dataset.key} style={{ color: 'white', fontSize: 12, }}>
                                            {dataset.key}: {point.y} {point.x} dfgdfgdfgdfgdfg
                                        </Text>
                                    );
                                })}
                            </View>
                        </View>

                    )}
                </View>
            </View>
        </View>
    );
};

export default SvgMultiLineChart;

const styles = StyleSheet.create({
    tooltip: {
        position: 'absolute',
        padding: 5,
        backgroundColor: 'white',
    },
});