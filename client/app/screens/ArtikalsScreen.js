import React, { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native";
import axios from "axios";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import artikalsApi from "../api/artikals";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";

// Begin: Fields for sorting-buttons
const fieldNames = [
  {
    id: "1",
    title: "A",
    value: "ime_artikal",
  },
  {
    id: "2",
    title: "C",
    value: "cena",
  },
  {
    id: "3",
    title: "V",
    value: "Vid",
  },
];
// End: Fields for sorting-buttons

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

function ArtikalsScreen({ navigation }) {
  const [artikalData, setArtikalData] = useState([]);
  const [imeArtikal, setImeArtikal] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sortType, setSortType] = useState("ime_artikal");

  useEffect(() => {
    console.log("1. useEffect");

    getAllArtikals();

    console.log("sortType = " + sortType);

    // sortFlatList(sortType);

    console.log("2. useEffect");
    // }, [sortType]);
  }, []);

  var flattenObject = function flattenObject(ob) {
    const toReturn = {};

    Object.keys(ob).map((i) => {
      if (typeof ob[i] === "object" && ob[i] !== null) {
        const flatObject = flattenObject(ob[i]);
        Object.keys(flatObject).map((x) => {
          toReturn[`${i}.${x}`] = flatObject[x];
          return x;
        });
      } else {
        toReturn[i] = ob[i];
      }
      return i;
    });
    return toReturn;
  };

  const getAllArtikals = async () => {
    console.log("START getAllArtikals-1");

    setLoading(true);
    const response = await artikalsApi.getArtikals();
    setLoading(false);

    setError(!response.ok);

    // console.log("5. artikalData: " + JSON.stringify(response.data));
    // console.log("6. response.data: " + JSON.stringify(response.data[0]));
    setArtikalData(response.data);

    console.log("END getAllArtikals-1");
    return response;
  };

  const handleChange = async (text) => {
    console.log("START handleChange");
    setImeArtikal(text);
    if (!text) {
      console.log("2. handleChange: text is empty");
      return;
    }

    console.log("imeArtikal = " + imeArtikal);
    console.log("text = " + text);

    setLoading(true);
    const response = await artikalsApi.getArtikalsByIme(text);
    setLoading(false);

    setError(!response.ok);
    setArtikalData(response.data);

    console.log("error = " + error);

    console.log("END  handleChange");
  };

  {
    /* Begin: Process the tapping on sorting buttons */
  }
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

    return (
      <Item
        item={item}
        key={item.id}
        onPress={() => {
          setSelectedId(item.id);
          console.log("1. renderItem, item.value = " + item.value);
          // setSortType(...item.value);
          // setSortType(item);
          console.log("2. renderItem, sortType = " + sortType);
          sortFlatList(item.value);
        }}
        style={{ backgroundColor }}
      />
    );
  };
  {
    /* End: Process the tapping on sorting buttons */
  }

  // Begin: Sort by IME_ARTIKAL, CENA, VID
  const sortFlatList = (type) => {
    console.log("START sortFlatList");

    const types = {
      ime_artikal: "ime_artikal",
      cena: "cena",
      vid_id: "vid_id",
    };

    setSortType(type);
    // const sortProperty = types[type];
    // const sortProperty = fieldNames[type];
    // console.log("1. sortProperty = " + JSON.stringify(sortProperty));
    console.log("1. type = " + type);
    console.log("2. sortType = " + sortType);

    // console.log("3. artikalData = " + JSON.stringify(artikalData, null, 2));

    const sorted = [...artikalData].sort((a, b) => {
      if (type === "ime_artikal") {
        if (sortType !== "ime_artikal") {
          console.log("SORT BY IME_ARTIKAL ASC");
          var fieldA = a.ime_artikal.toUpperCase();
          var fieldB = b.ime_artikal.toUpperCase();
        } else {
          console.log("SORT BY IME_ARTIKAL DESC");
          var fieldA = b.ime_artikal.toUpperCase();
          var fieldB = a.ime_artikal.toUpperCase();
          setSortType("");
        }
      } else if (type === "cena") {
        console.log("SORT BY CENA");
        var fieldA = a.cena;
        var fieldB = b.cena;
      } else {
        console.log("NO SORT");
        return 0;
      }

      if (fieldA < fieldB) {
        return -1;
      }
      if (fieldA > fieldB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    // const sorted = [artikalData].sort();

    // console.log("4. sorted = " + JSON.stringify(sorted, null, 2));

    setArtikalData(sorted);

    // console.log("5. artikalData = " + JSON.stringify(artikalData, null, 2));

    console.log("END sortFlatList");
  };
  // End: Sort by IME_ARTIKAL, CENA, VID

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Greshka!</AppText>
          <Button title="Povtori" onPress={getAllArtikals}></Button>
        </>
      )}
      {/* Begin: Search by IME_ARTIKAL */}
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={handleChange}
        value={imeArtikal}
        placeholder={"Ime na Artikal"}
      />
      {/* End: Search by IME_ARTIKAL */}

      {/* Begin: Sorting buttons on the top of the screen above the data-flat list */}
      <FlatList
        data={fieldNames}
        contentContainerStyle={{ flexDirection: "row" }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      {/* End: Sorting buttons on the top of the screen above the data-flat list */}

      <FlatList
        data={artikalData}
        keyExtractor={(item) => item.artikal_id.toString()}
        renderItem={({ item }) => (
          <Card
            // ARTIKAL_ID     = item[0]
            // VID_ID         = item[1]
            // IME_ARTIKAL    = item[2]
            // CENA           = item[3]
            // STEUERRELEVANT = item[4]
            // INSDATE        = item[5]
            // INSUSER        = item[6]
            // UPDDATE        = item[7]
            // UPDUSER        = item[8]
            // key={item[0]}
            key={item.artikal_id}
            title={`${item.ime_artikal} \nID: ${item.artikal_id}`}
            subTitle={`Cena: ${item.cena}\nVid: ${item.ime_vid}\nID: ${item.vid_id}\nDanok: ${item.steuerrelevant}`}
            onPress={() => navigation.navigate(routes.ARTIKAL_EDIT, item)}
            // onPress={() => navigation.navigate(routes.ARTIKAL_DETAILS, item)}
            // onPress={() => console.log(item[3])}
            // onPress={() => console.log(item[3])}
            // onPress={() => console.log(JSON.stringify(item).artikal_id)}
            // onPress={() => console.log(JSON.stringify(item))}
            // onPress={() => console.log(item.json({ "content": artikal_id }))}
            // onPress={() => console.log(item.artikal_id)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ArtikalsScreen;
