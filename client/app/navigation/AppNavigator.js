import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useNotifications from "../hooks/useNotifications";

import ArtikalEditScreen from "../screens/ArtikalEditScreen";
import ArtikalNavigator from "./ArtikalNavigator";
import navigation from "./rootNavigation";
import NewArtikalButton from "./NewArtikalButton";
import NewPrimanjaButton from "./NewPrimanjaButton";
import PrimanjaEditScreen from "../screens/PrimanjaEditScreen";
import PrimanjaNavigator from "./PrimanjaNavigator";
import routes from "./routes";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotifications();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Artikli"
        component={ArtikalNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ArtikalEdit"
        component={ArtikalEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewArtikalButton
              onPress={() => navigation.navigate(routes.ARTIKAL_EDIT)}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="PrimanjaEdit"
        component={PrimanjaEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewPrimanjaButton
              onPress={() => navigation.navigate(routes.PRIMANJA_EDIT)}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Primanja"
        component={PrimanjaNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cash-plus"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
