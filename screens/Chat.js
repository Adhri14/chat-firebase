import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { View, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const queryDB = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(queryDB, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((item) => ({
          _id: item.id,
          createdAt: item?.data().createdAt.toDate(),
          text: item?.data().text,
          user: item?.data().user,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const onSend = useCallback((message = []) => {
    setMessages((oldMessage) => GiftedChat.append(oldMessage, message));
    const { _id, createdAt, text, user } = message[0];
    console.log("message", message);
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <View style={styles.page}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={(message) => onSend(message)}
        messagesContainerStyle={{
          backgroundColor: "#fff",
        }}
        textInputStyle={{
          backgroundColor: "#fff",
          borderRadius: 20,
        }}
        user={{
          _id: auth?.currentUser?.email,
          avatar: "https://i.pravatar.cc/300",
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
});
