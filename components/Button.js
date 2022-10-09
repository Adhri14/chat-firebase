import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

const defaultProps = {
  title: "",
  onPress: () => {},
};

const Button = (props) => {
  const { title, onPress } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.textButton}>{title}</Text>
    </Pressable>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 58,
    borderRadius: 10,
    backgroundColor: "#FFA925",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
