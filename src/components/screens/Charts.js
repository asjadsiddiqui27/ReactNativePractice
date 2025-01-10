const data9 = [13, 4, 91, 67, 42, 27, 10, 20]
const data10 = [40, 83, 60, 30, 75, 90, 27, 52]
const data11 = [80, 60, 25, 48, 24, 67, 51, 12]
const data12 = [10, 20, 41, 4, 50, 33, 21, 47]
const data13 = [7, 50, 51, 45, 55, 23, 91, 70]

export const quadrupleLineChart = [
    {
        data: data9,
        svg: {
            stroke: 'red',
            strokeWidth: 1,
        },
    },
    {
        data: data10,
        svg: {
            stroke: 'blue',
            strokeWidth: 1,
        },
    },
    {
        data: data11,
        svg: {
            stroke: 'orange',
            strokeWidth: 1,
        },
    },
    {
        data: data12,
        svg: {
            stroke: 'green',
            strokeWidth: 1,
        },
    },
    {
        data: data13,
        svg: {
            stroke: 'grey',
            strokeWidth: 1,
        },
    },
]


import React from 'react';
import { LineChart, Grid } from 'react-native-svg-charts';
import Svg, { Circle } from 'react-native-svg';

const MultipleLinesChartDecorator = (props) => {
    const { x, y, combinedData } = props;

    return (
        <>
            {combinedData &&
                combinedData.map((item, dataIndex) => (
                    <Svg key={`line-${dataIndex}`}>
                        {item.data.map((value, index) => (
                            <Circle
                                key={`circle-${dataIndex}-${index}`}
                                cx={x(index)} // Calculate x position
                                cy={y(value)} // Calculate y position
                                r={2.5}
                                stroke={item.svg.stroke || 'rgb(0, 0, 0)'}
                                fill="white"
                            />
                        ))}
                    </Svg>
                ))}
        </>
    );
};

export default MultipleLinesChartDecorator;
