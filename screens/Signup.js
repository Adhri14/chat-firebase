import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import Button from "../components/Button";
import Gap from "../components/Gap";
import TextInputCustom from "../components/TextInputCustom";
import TextLink from "../components/TextLink";
import { auth } from "../config/firebase";
import { AuthUserContext } from "../context/auth";

const initForm = {
  email: "",
  password: "",
};
const { width } = Dimensions.get("window");
export default function SignUp({ navigation }) {
  const { loading, setLoading } = useContext(AuthUserContext);
  const [form, setForm] = useState(initForm);
  const onSubmit = () => {
    setLoading(true);
    if (form.email !== "" && form.password !== "") {
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((res) => {
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
          Alert.alert("Login", err.message);
        });
    } else {
      setLoading(false);
      Alert.alert("Login", "Email or Password is not empty");
    }
  };

  return (
    <View style={styles.page}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require("../assets/back-image.png")}
        style={styles.background}
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Sign Up</Text>
          <Gap height={69} />
          <TextInputCustom
            value={form.email}
            onChangeText={(val) => setForm({ ...form, email: val })}
            placeholder="Email"
            iconLabel={require("../assets/email.png")}
          />
          <TextInputCustom
            value={form.password}
            onChangeText={(val) => setForm({ ...form, password: val })}
            placeholder="Password"
            iconLabel={require("../assets/key.png")}
            secureText
          />
          <Text style={styles.forgot}>Forgot password</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button title="Sign Up" onPress={onSubmit} />
          <Gap height={15} />
          <TextLink
            textLink="Login here"
            text="Do you have a account"
            onPress={() => {
              navigation.navigate("Login");
              setForm(initForm);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
  background: {
    width,
    height: 340,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: -60,
    borderTopLeftRadius: 60,
    paddingHorizontal: 32,
    paddingVertical: 30,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFA925",
    textAlign: "center",
    marginTop: 20,
  },
  forgot: {
    textAlign: "right",
    marginTop: -15,
    fontSize: 12,
    color: "#FFA925",
    fontWeight: "500",
  },
});
