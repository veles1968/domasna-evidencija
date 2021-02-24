import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PrimanjaEditScreen from "../screens/PrimanjaEditScreen";
import PrimanjasScreen from "../screens/PrimanjasScreen";

const Stack = createStackNavigator();

const PrimanjaNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Primanjas" component={PrimanjasScreen} />
    <Stack.Screen name="PrimanjaEdit" component={PrimanjaEditScreen} />
  </Stack.Navigator>
);

export default PrimanjaNavigator;
