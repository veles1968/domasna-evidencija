import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import { convertUTCDateToLocalDate } from "../services/Format/Date";
// import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function ArtikalDetailsScreen({ route }) {
  const artikal = route.params;
  console.log("START ArtikalDetailsScreen");
  console.log("artikal: " + artikal);
  console.log("artikal.ime_artikal " + artikal.ime_artikal);

  var createdAtLocaliz = convertUTCDateToLocalDate(new Date(artikal.insdate));
  var updatedAtLocaliz = convertUTCDateToLocalDate(new Date(artikal.upddate));

  // function convertUTCDateToLocalDate(date) {
  //   var newDate = new Date(
  //     date.getTime() + date.getTimezoneOffset() * 60 * 1000
  //   );

  //   var offset = date.getTimezoneOffset() / 60;
  //   var hours = date.getHours();

  //   newDate.setHours(hours - offset);

  //   return newDate;
  // }

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        style={styles.image}
        // preview={{ uri: artikal.images[0].thumbnailUrl }}
        tint="light"
        // uri={artikal.images[0].url}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.ime_artikal}>{artikal.ime_artikal}</Text>
        <Text style={styles.cena}>Cena: {artikal.cena}</Text>
        <Text style={styles.cena}>Vid Id: {artikal.vid_id}</Text>
        <Text style={styles.cena}>SteRe: {artikal.steuerrelevant}</Text>
        {/* <Text style={styles.cena}>Creation Date: {artikal[5]}</Text> */}
        <Text style={styles.cena}>
          Vnesen Na: {createdAtLocaliz.toLocaleString()}
        </Text>
        <Text style={styles.cena}>Od: {artikal.insuser}</Text>
        <Text style={styles.cena}>
          Promena Na: {updatedAtLocaliz.toLocaleString()}
        </Text>
        <Text style={styles.cena}>Od: {artikal.upduser}</Text>
        {/* <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            ime_artikal="Mosh Hamedani"
            subTitle="5 Artikals"
          />
        </View> */}
        {/* <ContactSellerForm artikal={artikal} /> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  cena: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  ime_artikal: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ArtikalDetailsScreen;
