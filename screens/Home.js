import React, { useState } from "react";
import { Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import i18n from "i18n-js";
import COLORS from "../config";

const StatusBarHeight = Constants.statusBarHeight;

const Container = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight + 8}px;
  margin: 0 8px;
`;
const Logo = styled.Text`
  text-align: center;
  font-size: 24px;
  margin: 8px;
  font-weight: 700;
  color: ${COLORS.active};
`;
const TextInput = styled.TextInput`
  height: 40px;
  border: 1px solid ${COLORS.gray};
  border-radius: 4px;
  width: 100%;
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
const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState("");

  const handleSubmit = () => {
    if (user !== "") {
      navigation.navigate("Chat", { user: user });
      setUser("");
      Keyboard.dismiss();
    }
  };

  return (
    <Container>
      <Logo>{i18n.t("name")}</Logo>
      <TextInput
        placeholder={i18n.t("inputUser")}
        value={user}
        onChangeText={(text) => setUser(text)}
        onSubmitEditing={() => handleSubmit()}
      />
      <ButtonContainer>
        <ButtonText onPress={() => handleSubmit()} disabled={user === ""}>
          {i18n.t("join")}
        </ButtonText>
      </ButtonContainer>
      <StatusBar style="black" />
    </Container>
  );
};

export default Home;
