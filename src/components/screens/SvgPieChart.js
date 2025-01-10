import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import * as d3Shape from 'd3-shape';

const { width } = Dimensions.get('window');

const SvgPieChart = () => {
  const [tooltip, setTooltip] = useState({ visible: false, label: '', value: '', x: 0, y: 0, color: "" });

  // Pie chart data
  const data = [
    { key: 1, value: "50", color: '#F7931A', label: 'Bitcoin' },
    { key: 2, value: "30", color: '#ACD92F', label: 'Solana' },
    { key: 3, value: 10, color: '#7B86CB', label: 'Avalanche' },
    { key: 4, value: 34, color: '#5BCA7F', label: 'Tether USD' },
    { key: 5, value: 56, color: '#0713FC', label: 'Base' },
    { key: 6, value: 73, color: '#E84142', label: 'Tron' },
    { key: 7, value: 12, color: '#6B429B', label: 'Jupiter' },
  ];

  // Calculate pie slices
  const pieData = d3Shape.pie().value((d) => d.value)(data);
  const radius = 120;

  const innerRadius = 80; // Define inner radius for the donut shape

  const handlePressIn = (slice, centroid) => {
    setTooltip({
      visible: true,
      label: slice.label,
      value: slice.value,
      color: slice?.color,
      x: centroid[0],
      y: centroid[1],
    });
  };

  const handlePressOut = () => {
    setTooltip({ visible: false, label: '', value: '', x: 0, y: 0 });
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Svg width={radius * 2} height={radius * 2}>
          <G x={radius} y={radius}>
            {pieData.map((slice, index) => {
              const path = d3Shape.arc()
                .outerRadius(radius)
                .innerRadius(innerRadius) // Add inner radius for the donut chart
                .startAngle(slice.startAngle)
                .endAngle(slice.endAngle)();

              const centroid = d3Shape
                .arc()
                // .outerRadius(radius - 20)
                // .innerRadius(radius - 20)
                .outerRadius((radius + innerRadius) / 2) // Adjust to place text in the middle of the slice
                .innerRadius((radius + innerRadius) / 2) // Adjust to place text in the middle of the slice

                .centroid(slice);

              return (
                <G
                  key={slice.data.key}
                  onPressIn={() => handlePressIn(slice.data, centroid)}
                  onPressOut={handlePressOut}
                >
                  <Path d={path} fill={slice.data.color} />
                  {/* Label inside slice */}
                  {/* <SvgText
                    fill="white"
                    fontSize="14"
                    x={centroid[0]}
                    y={centroid[1]}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {slice.data.value}
                  </SvgText> */}
                </G>
              );
            })}


            {/* Text in the middle of the donut */}
            <SvgText
              fill="gray"
              fontSize="14"
              fontWeight="bold"
              x="0"
              y="0"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              Total Assets
            </SvgText>
            <SvgText
              fill="white"
              fontSize="20"
              x="0"
              fontWeight="bold"
              y="20" // Slightly lower for a second line of text
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              7
            </SvgText>


          </G>
        </Svg>

        {/* Tooltip for hovered slice */}
        {tooltip.visible && (
          <View
            style={[
              styles.tooltip,
              {
                top: radius + tooltip.y - 10,
                left: radius + tooltip.x - 50,
              },
            ]}
          >
            <View style={{ ...styles.tooltipInnerView }}>
              <View style={{ ...styles.tooltipColorView, backgroundColor: tooltip?.color }} />
              <View>
                <Text style={styles.tooltipText}>{tooltip.label}</Text>
                <Text style={{ ...styles.tooltipText}}>
                  {tooltip.value} %
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  chartContainer: {
    position: 'relative', // Allows absolute positioning of the tooltip
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tooltipText: {
    color: '#fff',
    fontSize: 14,
  },
  tooltipInnerView: {
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
  },
  tooltipColorView: {
    width: 9,
    height: 9,
    marginRight: 5,
    marginTop:4
  }
});
export default SvgPieChart;
