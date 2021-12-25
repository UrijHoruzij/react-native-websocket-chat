import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import COLORS from "./config";

import Home from "./screens/Home";
import Chat from "./screens/Chat";

const Stack = createNativeStackNavigator();

i18n.translations = {
  en: { name: "Chat", send: "Send", join: "Join", inputUser: "User name" },
  ru: {
    name: "Чат",
    send: "Отправить",
    join: "Присоединиться",
    inputUser: "Имя пользователя",
  },
};
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.active,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          options={{
            title: "",
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{
            title: i18n.t("name"),
          }}
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
