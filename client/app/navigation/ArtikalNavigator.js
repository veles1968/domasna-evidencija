import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ArtikalDetailsScreen from "../screens/ArtikalDetailsScreen";
import ArtikalEditScreen from "../screens/ArtikalEditScreen";
import ArtikalsScreen from "../screens/ArtikalsScreen";

const Stack = createStackNavigator();

const ArtikalNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Artikals" component={ArtikalsScreen} />
    <Stack.Screen name="ArtikalDetails" component={ArtikalDetailsScreen} />
    <Stack.Screen name="ArtikalEdit" component={ArtikalEditScreen} />
  </Stack.Navigator>
);

export default ArtikalNavigator;
