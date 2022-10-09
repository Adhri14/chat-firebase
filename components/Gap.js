import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

const propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default function Gap(props = propTypes) {
  const { width, height } = props;
  return <View style={{ width, height }} />;
}
