import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const propTypes = {
  placeholder: PropTypes.string,
  iconLabel: PropTypes.string,
  secureText: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeText: PropTypes.func,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
};

const defaultProps = {
  placeholder: "",
  secureText: false,
  iconLabel: "",
  value: "",
  onChangeText: (val) => val,
  keyboardType: "default",
  returnKeyType: "done",
};

function TextInputCustom(props) {
  const {
    placeholder,
    iconLabel,
    secureText,
    onChangeText,
    value,
    keyboardType,
    returnKeyType,
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  const [showHidePass, setShowHidePass] = useState(true);
  return (
    <View
      style={[
        styles.container,
        { borderColor: !isFocus ? "#F5F5F5" : "#FFA925" },
      ]}
    >
      <Image source={iconLabel} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={(val) => onChangeText(val)}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#E5E5E5"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        secureTextEntry={secureText && showHidePass ? true : false}
        underlineColorAndroid="transparent"
        spellCheck={false}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        autoCapitalize="none"
      />
      {secureText && (
        <Pressable onPress={() => setShowHidePass(!showHidePass)}>
          <Image
            source={require("../assets/hidden-password.png")}
            style={styles.icon}
          />
        </Pressable>
      )}
    </View>
  );
}

TextInputCustom.propTypes = propTypes;
TextInputCustom.defaultProps = defaultProps;

export default TextInputCustom;

const styles = StyleSheet.create({
  container: {
    height: 58,
    borderRadius: 10,
    backgroundColor: "#F6F7FB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 2,
    marginBottom: 24,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#262626",
  },
});
