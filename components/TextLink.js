import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const propTypes = {
  text: PropTypes.string,
  textLink: PropTypes.string,
  onPress: PropTypes.func,
};

const defaultProps = {
  text: "",
  textLink: "",
  onPress: () => {},
};

const TextLink = (props) => {
  const { text, textLink, onPress } = props;
  return (
    <Text style={styles.text}>
      {text}?{" "}
      <Text style={styles.link} onPress={onPress}>
        {textLink}
      </Text>
    </Text>
  );
};

TextLink.propTypes = propTypes;
TextLink.defaultProps = defaultProps;

export default TextLink;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: "#262626",
    fontWeight: "500",
    textAlign: "center",
  },
  link: {
    color: "#FFA925",
  },
});
