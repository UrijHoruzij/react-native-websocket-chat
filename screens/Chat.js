import React, { useState, useEffect, useRef } from "react";
import { Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import Constants from "expo-constants";
import i18n from "i18n-js";
import COLORS from "../config";

const StatusBarHeight = Constants.statusBarHeight;

const Container = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight + 8}px;
  margin: 0 8px;
`;
const ScrollContainer = styled.ScrollView`
  padding: 8px;
  font-size: 18px;
  height: 44px;
`;

const Input = styled.TextInput`
  height: 40px;
  border: 1px solid ${COLORS.gray};
  border-radius: 4px;
  width: 100%;
  padding: 4px;
`;
const Message = styled.View`
  display: flex;
  flex-direction: row;
`;
const User = styled.Text`
  font-size: 15px;
  font-weight: 700;
  margin-right: 8px;
`;
const Text = styled.Text`
  font-size: 15px;
`;
const ButtonContainer = styled.TouchableOpacity`
  margin-top: 8px;
  height: 56px;
  border-radius: 4px;
  background-color: ${COLORS.active};
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${COLORS.white};
`;

const Chat = ({ route }) => {
  const { user } = route.params;
  const [textList, setTextList] = useState([]);
  const [input, setInput] = useState("");
  const url = useRef("ws://192.168.0.102:3000").current;
  const ws = useRef();
  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => {
      console.log("connection opened");
    };
    ws.current.onmessage = (event) => {
      onReceiveMessage(event.data);
    };
    ws.current.onerror = (e) => {
      console.log(e.message);
    };
  }, []);
  const onReceiveMessage = (data) => {
    const res = JSON.parse(data);
    setTextList((textList) => {
      return [...textList, { user: res.user, text: res.message }];
    });
  };
  const onTextInput = (input) => setInput(input);
  const onButtonPress = () => {
    if (input !== "") {
      if (ws.current)
        ws.current.send(JSON.stringify({ user: user, message: input }));
      setInput("");
      Keyboard.dismiss();
    }
  };
  const showMessage = (message, index) => (
    <Message key={index}>
      <User>{message.user}:</User>
      <Text>{message.text}</Text>
    </Message>
  );
  return (
    <Container>
      <StatusBar style="black" />
      <ScrollContainer>
        {textList.map((message, index) => showMessage(message, index))}
      </ScrollContainer>
      <Input
        onChangeText={(e) => onTextInput(e)}
        value={input}
        onSubmitEditing={() => onButtonPress()}
      />
      <ButtonContainer onPress={() => onButtonPress()} disabled={input === ""}>
        <ButtonText>{i18n.t("send")}</ButtonText>
      </ButtonContainer>
    </Container>
  );
};

export default Chat;
