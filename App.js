import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { auth } from "./config/firebase";
import AuthUserProvider, { AuthUserContext } from "./context/auth";
import Chat from "./screens/Chat";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/Signup";

const { Navigator, Screen } = createStackNavigator();

const MainApp = () => {
  const { setLoading } = useContext(AuthUserContext);
  const onLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert("Warning", error.message);
    }
    setLoading(false);
  };
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => {
            return (
              <Text
                style={{ marginRight: 20, color: "red" }}
                onPress={onLogout}
              >
                Logout
              </Text>
            );
          },
        }}
      />
      <Screen name="Chat" component={Chat} />
    </Navigator>
  );
};

const AuthApp = () => {
  return (
    <Navigator screenOptions={{ header: () => null }}>
      <Screen name="Login" component={Login} />
      <Screen name="Signup" component={SignUp} />
    </Navigator>
  );
};

function RootApp() {
  const { user, setUser, loading, setLoading } = useContext(AuthUserContext);
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(
      auth,
      async (userLog) => {
        setUser(userLog);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFA925" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user || user === null ? <AuthApp /> : <MainApp />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthUserProvider>
      <RootApp />
    </AuthUserProvider>
  );
}
