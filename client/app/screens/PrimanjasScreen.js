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
import Moment from "moment";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import primanjasApi from "../api/primanja";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";

// Begin: Fields for sorting-buttons
const fieldNames = [
  {
    id: "1",
    title: "D",
    value: "datum",
  },
  {
    id: "2",
    title: "T",
    value: "tip_primanje",
  },
  {
    id: "3",
    title: "I",
    value: "iznos",
  },
];
// End: Fields for sorting-buttons

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const initialPrimanja = [
  {
    primanja_id: 0,
    valuta_id: 9,
    vraboten_id: 0,
    iznos: 0,
    mesec: 0,
    tip_primanje: "prazno",
    datum: 0,
    odnossodem: 0,
    vobanka: 0,
    trans_id: 0,
    insdate: 0,
    insuser: 0,
    upddate: 0,
    upduser: 0,
    ime_vraboten: 0,
    ime_valuta: 0,
  },
];

function PrimanjasScreen({ navigation }) {
  const [primanjaData, setPrimanjaData] = useState(initialPrimanja);
  const [tipPrimanje, setTipPrimanje] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sortType, setSortType] = useState("datum");
  const [primanjaSorted, setPrimanjaSorted] = useState([]);
  const [isOldestFirst, setIsOldestFirst] = useState(false);

  useEffect(() => {
    console.log("1. useEffect");

    gettAllPrimanjas();

    console.log("sortType = " + sortType);

    console.log("2. useEffect");
  }, []);

  // const useSort = (someArray, initialSortKey) => {
  //   const [state, setState] = useState({
  //     isAscending: false,
  //     sortKey: initialSortKey,
  //   });

  //   // Let's pretend `makeSortComparator` exists for simplicity
  //   const comparator = makeSortComparator(state);
  //   const sortedData = someArray.slice().sort(comparator);
  //   return {
  //     ...state,
  //     sortedData,
  //     toggleAscending: () =>
  //       setState((state) => ({
  //         ...state,
  //         isAscending: !state.isAscending,
  //       })),
  //     setSortKey: (sortKey) => setState((state) => ({ ...state, sortKey })),
  //   };
  // };

  const gettAllPrimanjas = async () => {
    console.log("START gettAllPrimanjas-1");

    setLoading(true);
    const response = await primanjasApi.getPrimanjas();
    setLoading(false);

    setError(!response.ok);

    setPrimanjaData(response.data);

    console.log("END gettAllPrimanjas-1");
    return response;
  };

  const handleChange = async (text) => {
    console.log("START handleChange");
    setTipPrimanje(text);
    if (!text) {
      console.log("2. handleChange: text is empty");
      return;
    }

    console.log("tipPrimanje = " + tipPrimanje);
    console.log("text = " + text);

    setLoading(true);
    const response = await primanjasApi.getPrimanjasByTip(text);
    setLoading(false);

    setError(!response.ok);
    setPrimanjaData(response.data);

    // let primanjaData = primanjaData.map(primanje => {
    //   primanje.datum_locale = "01.01.2021";
    // });

    // console.log("primanjaData = " + JSON.stringify(primanjaData, null, 2));

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
          // console.log("2. renderItem, sortType = " + sortType);
          sortFlatList(item.value);
          // toggleSortDate(item.value);
        }}
        style={{ backgroundColor }}
      />
    );
  };
  {
    /* End: Process the tapping on sorting buttons */
  }

  // const sortByDate = () => {
  //   const { primanjaSorted } = primanjaData;
  //   let newPrimanjaSorted = primanjaSorted;
  //   if (isOldestFirst) {
  //     newPrimanjaSorted = primanjaSorted.sort((a, b) => a.datum > b.datum);
  //   } else {
  //     newPrimanjaSorted = primanjaSorted.sort((a, b) => a.datum < b.datum);
  //   }

  //   setIsOldestFirst(!isOldestFirst);
  //   setPrimanjaSorted(newPrimanjaSorted);
  // };

  // const toggleSortDate = () => {
  //   return sortByDate();
  // };

  // Begin: Sort by DATUM, TIP_PRIMANJE, VID
  const sortFlatList = (type) => {
    console.log("START sortFlatList, type=" + type);

    // const { sortedData, ...sortControls } = useSort(primanjaData, type);

    const types = {
      datum: "datum",
      tip_primanje: "tip_primanje",
      iznos: "iznos",
    };

    setSortType(type, console.log("2. sortType = " + sortType));
    // const sortProperty = types[type];
    // const sortProperty = fieldNames[type];
    // console.log("1. sortProperty = " + JSON.stringify(sortProperty));
    // console.log("1. type = " + type);
    // console.log("2. sortType = " + sortType);

    // console.log("3. primanjaData = " + JSON.stringify(primanjaData, null, 2));

    console.log("4. isOldestFirst = " + isOldestFirst);

    const sorted = [...primanjaData].sort((a, b) => {
      if (sortType === "datum") {
        if (isOldestFirst) {
          return a.datum > b.datum; // -> oldest first
        } else {
          return a.datum < b.datum; // -> newest first
        }
      } else if (type === "tip_primanje") {
        console.log("SORT BY TIP_PRIMANJE ASC");
        if (sortType !== "tip_primanja") {
          return a.tip_primanje.toUpperCase() > b.tip_primanje.toUpperCase();
        } else {
          return a.tip_primanje.toUpperCase() < b.tip_primanje.toUpperCase();
        }
      }

      // return a.datum < b.datum; // -> newest first
      // return a.datum > b.datum; // -> oldest first
      // return isOldestFirst ? a.datum > b.datum : a.datum > b.datum;
      // return b.iznos - a.iznos;
      // return b.tip_primanje - a.tip_primanje;
    });

    // console.log("4. sorted = " + JSON.stringify(sorted, null, 2));

    setPrimanjaData(sorted);

    setIsOldestFirst(!isOldestFirst);

    // console.log("5. primanjaData = " + JSON.stringify(primanjaData, null, 2));

    console.log("END sortFlatList");
  };
  // End: Sort by DATUM, TIP_PRIMANJE, VID

  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  function getTitle(primanja) {
    return primanja.tip_primanje;
  }

  function getSubTitle(primanja) {
    Moment.locale("de");
    var datumLocale = primanja.datum;
    // return(<View> {Moment(dt).format('d MMM YYYY')} </View>) //basically you can do all sorts of the formatting and others

    return `Iznos: ${primanja.iznos} ${primanja.ime_valuta}\nDatum: ${Moment(
      datumLocale
    ).format("DD.MM.YYYY")}\nVraboten: ${primanja.ime_vraboten}`;
  }

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Greshka!</AppText>
          <Button
            title="Povtori"
            // onPress={getArtikalsApi.request()}
            onPress={gettAllPrimanjas}
          ></Button>
        </>
      )}
      {/* Begin: Search by TIP_PRIMANJE */}
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={handleChange}
        value={tipPrimanje}
        placeholder={"Tip na Primanje"}
      />
      {/* End: Search by TIP_PRIMANJE */}

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
        // data={getArtikalsApi.data}
        data={primanjaData}
        // keyExtractor={(item, index) => item.primanja_id}
        // keyExtractor={(item, index) => {
        //   return item.primanja_id.toString();
        // }}
        // keyExtractor={(item) => item.primanja_id.toString()}
        keyExtractor={(item) => item.primanja_id.toString()}
        // keyExtractor={(item) => item[0].toString()}
        // keyExtractor={(item) => item[0]}
        // keyExtractor={(item) => item[0].datum}
        // keyExtractor={(item) => item.datum}
        renderItem={({ item }) => (
          <Card
            // ARTIKAL_ID     = item[0]
            // VID_ID         = item[1]
            // DATUM    = item[2]
            // TIP_PRIMANJE           = item[3]
            // STEUERRELEVANT = item[4]
            // INSDATE        = item[5]
            // INSUSER        = item[6]
            // UPDDATE        = item[7]
            // UPDUSER        = item[8]
            // key={item[0]}
            key={item.primanja_id}
            // title={`${item.tip_primanje}`}
            title={getTitle(item)}
            subTitle={getSubTitle(item)}
            onPress={() => navigation.navigate(routes.PRIMANJA_EDIT, item)}
            // onPress={() => navigation.navigate(routes.ARTIKAL_DETAILS, item)}
            // onPress={() =>
            //   console.log(
            //     convertUTCDateToLocalDate(new Date(item.datum)).toLocaleString()
            //   )
            // }
            // onPress={() => console.log(item[3])}
            // onPress={() => console.log(JSON.stringify(item).primanja_id)}
            // onPress={() => console.log(JSON.stringify(item))}
            // onPress={() => console.log(item.json({ "content": primanja_id }))}
            // onPress={() => console.log(item.primanja_id)}
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

export default PrimanjasScreen;
