import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { TextInput } from "react-native";
import Moment from "moment";
import * as Yup from "yup";

import {
  DeleteButton,
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import {
  convertUTCDateToLocalDate,
  formatDateTime,
} from "../services/Format/Date";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import Card from "../components/Card";
import CategoryPickerItem from "../components/CategoryPickerItem";
import colors from "../config/colors";
import primanjasApi from "../api/primanja";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import UploadScreen from "./UploadScreen";
import valutasApi from "../api/valutas";
import vrabotensApi from "../api/vrabotens";

const validationSchema = Yup.object().shape({
  primanja_id: Yup.string().label("ID"),
  vraboten: Yup.object()
    .required("Vraboten e obavezno da se vnese")
    .nullable()
    .label("primanja.vraboten_id"),
  tip_primanje: Yup.string().required().min(1).label("Tip na Primanje"),
  datum: Yup.string().required().min(1).label("Datum"),
  valuta: Yup.object()
    .required("Valuta e obavezno da se vnese")
    .nullable()
    .label("primanja.valuta_id"),
});

function PrimanjaEditScreen({ route }) {
  const [vrabotenData, setVrabotenData] = useState([]);
  const [valutaData, setValutaData] = useState([]);
  const [defaultCurrency, setDefaultCurrency] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  Moment.locale("de");

  let isAddMode = true;
  const primanja = route.params;
  if (primanja !== undefined) {
    const { id } = route.params.primanja_id;

    // console.log("primanja = " + JSON.stringify(primanja, null, 2));
    // console.log("primanja.ime_primanja = " + primanja.ime_primanja);
    console.log("id = " + id);

    isAddMode = !primanja.primanja_id;
    // setIdArtikal(primanja.primanja_id);
    console.log("isAddMode = " + isAddMode);
    console.log("primanja.primanja_id = " + primanja.primanja_id);
    console.log("primanja.valuta_id = " + primanja.valuta_id);
    console.log("primanja.vraboten_id = " + primanja.vraboten_id);
  } else {
    // setIsEnabled(false);
  }

  useEffect(() => {
    console.log("START *********** useEffect ***********");

    let mounted = true;
    getAllVrabotens(mounted);
    getAllValutas(mounted);

    if (route.params) {
      // artikal.steuerrelevant ? setIsEnabled(true) : setIsEnabled(false);
      // console.log("setImeArtikal");
    }

    console.log("END ************ useEffect ************");

    return () => (mounted = false);
  }, []);

  const getAllVrabotens = async (mounted) => {
    console.log("START getAllVrabotens-1");

    setLoading(true);
    const response = await vrabotensApi.getVrabotens();
    setLoading(false);

    setError(!response.ok);

    // console.log("5. vidData: " + JSON.stringify(response.data));
    if (mounted) {
      setVrabotenData(response.data);
    }
    // console.log("6. response.data: " + JSON.stringify(response.data[0]));
    // console.log("7. response.data: " + JSON.stringify(response.data, null, 2));
    // console.log("8. vidData: " + JSON.stringify(vidData, null, 2));

    console.log("END getAllVrabotens-1");
    return response;
  };

  const getAllValutas = async (mounted) => {
    console.log("START getAllValutas-1");

    setLoading(true);
    const response = await valutasApi.getValutas();
    setLoading(false);

    setError(!response.ok);

    // console.log("5. vidData: " + JSON.stringify(response.data));
    if (mounted) {
      setValutaData(response.data);
    }
    // console.log("6. response.data: " + JSON.stringify(response.data[0]));
    // console.log("7. response.data: " + JSON.stringify(response.data, null, 2));
    // console.log("8. vidData: " + JSON.stringify(vidData, null, 2));

    console.log("END getAllValutas-1");
    return response;
  };

  const getInsDate = () => {
    console.log("START getInsDate");

    // return artikal.ime_artikal;
    if (isAddMode) {
      // console.log("IME_ARTIKAL = <>");

      return "";
    } else {
      console.log("END getInsDate");
      // var datumLocale = primanja.insdate;
      // return(<View> {Moment(dt).format('d MMM YYYY')} </View>) //basically you can do all sorts of the formatting and others

      return Moment(primanja.insdate).format("DD.MM.YYYY");
    }
  };

  const getTransId = () => {
    console.log("START getTransId");

    if (isAddMode) {
      return "";
    } else {
      console.log("END getTransId");
      if (primanja.trans_id) {
        return primanja.trans_id.toString();
      } else {
        return "";
      }
    }
  };

  const getDatum = () => {
    console.log("START getDatum");

    if (isAddMode) {
      // console.log("IME_ARTIKAL = <>");

      return "";
    } else {
      console.log("END getDatum");
      // return(<View> {Moment(dt).format('d MMM YYYY')} </View>) //basically you can do all sorts of the formatting and others
      return Moment(primanja.datum).format("DD.MM.YYYY");
    }
  };
  const getOdnosoSoDEM = () => {
    console.log("START getOdnsoSoDEM");

    if (isAddMode) {
      return "";
    } else {
      if (primanja.trans_id) {
        return primanja.odnossodem.toString();
      } else {
        return "";
      }
    }
  };

  const getMesec = () => {
    console.log("START getMesec");

    if (isAddMode) {
      return "";
    } else {
      console.log("END getMesec");
      // return(<View> {Moment(dt).format('d MMM YYYY')} </View>) //basically you can do all sorts of the formatting and others
      return Moment(primanja.mesec).format("DD.MM.YYYY");
    }
  };

  const getVoBanka = () => {
    console.log("START getVoBanka");

    if (isAddMode) {
      return "";
    } else {
      console.log("END getVoBanka");
      if (primanja.vobanka) {
        return primanja.vobanka.toString();
      } else {
        return "";
      }
    }
  };

  const handleDelete = () => {
    console.log("handleDelete");
  };

  const handleSubmit = async (primanja2, { resetForm }) => {
    console.log("START handleSubmit");

    console.log("1. primanja2 = " + JSON.stringify(primanja2, null, 2));
    // primanja2.artikal_id = artikal.artikal_id;
    // primanja2.vid_id = artikal.vid_id;
    // console.log("idArtikal = " + idArtikal);
    console.log("primanja2.vraboten_id = " + primanja2.vraboten_id);
    console.log("3. primanja2 = " + JSON.stringify(primanja2, null, 2));

    setProgress(0);
    setUploadVisible(true);
    console.log("");

    var result;

    if (isAddMode) {
      result = await primanjasApi.addPrimanja({ ...primanja2 }, (progress) =>
        setProgress(progress)
      );
    } else {
      result = await primanjasApi.updatePrimanjas(
        { ...primanja2 },
        (progress) => setProgress(progress)
      );
    }

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the primanja");
    }

    if (isAddMode) {
      resetForm();
    } //-DT-20210203: Causes the changed field name to get the old value again

    console.log("END handleSubmit");
  };

  return (
    <Screen style={styles.screen}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />

      <Form
        initialValues={{
          primanja_id: isAddMode ? "" : primanja.primanja_id.toString(),
          vraboten: {
            label: isAddMode
              ? // ? "Vnesi Vraboten"
                "BILJANA TUMBOVA"
              : primanja.ime_vraboten.toString(),
            value: isAddMode ? "2" : primanja.vraboten_id,
          },

          tip_primanje: isAddMode ? "" : primanja.tip_primanje.toString(),
          iznos: isAddMode ? "" : primanja.iznos.toString(),
          valuta: {
            label: isAddMode ? "EUR" : primanja.ime_valuta.toString(),
            value: isAddMode ? "9" : primanja.valuta_id,
          },
          mesec: isAddMode ? "" : getMesec(),
          valuta_id: isAddMode ? "" : primanja.valuta_id.toString(),
          datum: isAddMode ? "" : getDatum(),
          odnossodem: isAddMode ? "0" : getOdnosoSoDEM(),
          vobanka: isAddMode ? 0 : getVoBanka(),
          trans_id: isAddMode ? "" : getTransId(),
          insdate: isAddMode ? "" : getInsDate(),
          insuser: isAddMode ? "" : primanja.insuser,
        }}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        validationSchema={validationSchema}
      >
        <Picker
          items={vrabotenData}
          name="vraboten"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Vraboten"
          width="100%"
        />

        <FormField
          maxLength={200}
          multiline={true}
          name="tip_primanje"
          placeholder="Tip na Primanje"
        />
        <FormField
          maxLength={255}
          name="datum"
          keyboardType="numeric"
          placeholder="Datum"
        />
        <FormField
          keyboardType="numeric"
          maxLength={10}
          name="iznos"
          placeholder="Iznos"
          width="100%"
        />
        <Picker
          items={valutaData}
          name="valuta"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Valutan"
          width="100%"
        />
        <FormField
          keyboardType="numeric"
          maxLength={10}
          name="insdate"
          placeholder="Datum na vnes"
          width="100%"
          editable={false}
        />
        <FormField
          maxLength={50}
          name="insuser"
          placeholder="Od"
          width="100%"
          editable={false}
        />

        <SubmitButton title="Save" />
        {isAddMode ? (
          false
        ) : (
          <DeleteButton title="Delete" onPress={handleDelete} />
        )}
      </Form>
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

export default PrimanjaEditScreen;
