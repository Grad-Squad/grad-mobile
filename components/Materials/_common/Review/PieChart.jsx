import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Text } from 'react-native-svg';

const PieChart = ({ data }) => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const total = data.reduce((prev, current) => prev + current.count, 0);
  const filledData = data.reduce((prev, current, i) => {
    const newItem = {
      ...current,
      percentage: (current.count / total) * 100,
      angle: (i === 0 ? 0 : prev[i - 1].angle) + (current.count / total) * 360,
    };
    newItem.strokeDashoffset =
      circleCircumference - (circleCircumference * newItem.percentage) / 100;
    prev.push(newItem);
    return prev;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="160" width="160" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            {total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="40"
              />
            ) : (
              filledData.map((item, i, arr) => (
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={item.color}
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={item.strokeDashoffset}
                  rotation={i === 0 ? 0 : arr[i - 1].angle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                  key={item.key}
                />
              ))
            )}
          </G>
        </Svg>
        <Text style={styles.label}>{total}€</Text>
      </View>
    </View>
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      key: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
PieChart.defaultProps = {};

export default PieChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
