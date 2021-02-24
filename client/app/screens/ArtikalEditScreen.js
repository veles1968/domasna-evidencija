import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text } from "react-native";
import Moment from "moment";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import defaultStyles from "../config/styles";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import artikalsApi from "../api/artikals";
import vidsApi from "../api/vids";
// import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  artikal_id: Yup.string().label("ID"),
  ime_artikal: Yup.string().required().min(1).label("Ime na Artikal"),
  cena: Yup.number().required().min(1).max(10000).label("Cena"),
  steuerrelevant: Yup.string().label("Steuerrelevant"),
  vid: Yup.object()
    .required("Vid e obavezno da se vnese")
    .nullable()
    .label("artikal.ime_vid"),
  // images: Yup.array().min(1, "Please select at least one image."),
});

function ArtikalEditScreen({ route }) {
  console.log("START ArtikalEditScreen");

  // const [imeArtikal, setImeArtikal] = useState("");
  // const [idArtikal, setIdArtikal] = useState(artikal.artikal_id);

  // const location = useLocation();
  const [vidData, setVidData] = useState([]);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () =>
    setIsEnabled((previousState) => {
      if (!isAddMode) {
        previousState
          ? (artikal.steuerrelevant = 1)
          : (artikal.steuerrelevant = 0);
      }
      return !previousState;
    });

  let isAddMode = true;
  const artikal = route.params;
  if (artikal !== undefined) {
    const { id } = route.params.artikal_id;

    // console.log("artikal = " + JSON.stringify(artikal, null, 2));
    // console.log("artikal.ime_artikal = " + artikal.ime_artikal);
    console.log("id = " + id);

    isAddMode = !artikal.artikal_id;
    // setIdArtikal(artikal.artikal_id);
    console.log("isAddMode = " + isAddMode);
    console.log("artikal.artikal_id = " + artikal.artikal_id);
    console.log("artikal.cena = " + artikal.cena);
    console.log("artikal.vid_id = " + artikal.vid_id);
  } else {
    // setIsEnabled(false);
  }

  useEffect(() => {
    console.log("START *********** useEffect ***********");

    getAllVids();

    if (route.params) {
      artikal.steuerrelevant ? setIsEnabled(true) : setIsEnabled(false);
      console.log("setImeArtikal");
      // setImeArtikal(artikal.ime_artikal);
    }

    console.log("END ************ useEffect ************");
  }, []);

  const getAllVids = async () => {
    console.log("START getAllVids-1");

    setLoading(true);
    const response = await vidsApi.getVids();
    setLoading(false);

    setError(!response.ok);

    // console.log("5. vidData: " + JSON.stringify(response.data));
    setVidData(response.data);
    // console.log("6. response.data: " + JSON.stringify(response.data[0]));
    // console.log("7. response.data: " + JSON.stringify(response.data, null, 2));
    // console.log("8. vidData: " + JSON.stringify(vidData, null, 2));

    console.log("END getAllVids-1");
    return response;
  };

  const handleSubmit = async (artikal2, { resetForm }) => {
    console.log("START handleSubmit");

    console.log("1. artikal2 = " + JSON.stringify(artikal2, null, 2));
    // artikal2.artikal_id = artikal.artikal_id;
    // artikal2.vid_id = artikal.vid_id;
    console.log("2. artikal2.vid_id = " + artikal2.vid_id);
    // console.log("idArtikal = " + idArtikal);
    // console.log("id = " + id);
    console.log("3. artikal2 = " + JSON.stringify(artikal2, null, 2));

    isEnabled ? (artikal2.steuerrelevant = 1) : (artikal2.steuerrelevant = 0);
    console.log("4. artikal2.steuerrelevant = " + artikal2.steuerrelevant);

    setProgress(0);
    setUploadVisible(true);
    console.log("");

    var result;

    if (isAddMode) {
      result = await artikalsApi.addArtikal({ ...artikal2 }, (progress) =>
        setProgress(progress)
      );
    } else {
      result = await artikalsApi.updateArtikal({ ...artikal2 }, (progress) =>
        setProgress(progress)
      );
    }

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the artikal");
    }

    if (isAddMode) {
      resetForm();
      setIsEnabled(false);
    } //-DT-20210203: Causes the changed field name to get the old value again

    console.log("END handleSubmit");
  };

  const getImeArtikal = () => {
    console.log("START getImeArtikal");

    // return artikal.ime_artikal;
    if (isAddMode) {
      console.log("IME_ARTIKAL = <>");

      return "";
    } else {
      console.log("IME_ARTIKAL mora da bide popolneto");
      console.log("artikal.artikal_id = " + artikal.artikal_id);
      console.log("END getImeArtikal");
      return artikal.ime_artikal;
    }
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

      return Moment(artikal.insdate).format("DD.MM.YYYY");
    }
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          artikal_id: isAddMode ? "" : artikal.artikal_id.toString(),
          ime_artikal: isAddMode ? "" : getImeArtikal(),
          // ime_artikal: isAddMode ? "" : "abc123",
          cena: isAddMode ? "" : artikal.cena.toString(),
          steuerrelevant: isAddMode ? "0" : artikal.steuerrelevant.toString(),
          // vid_id: null,
          // vid: isAddMode ? "" : artikal.ime_vid},
          // vid: "Alkohol",
          // vid: selectedItem.label,
          // vid: vidData.label,
          // vid: artikal.ime_vid,
          vid: {
            label: isAddMode ? "Vnesi Vid" : artikal.ime_vid.toString(),
            // value: isAddMode ? "" : artikal.vid_id.toString(),
            value: isAddMode ? "" : artikal.vid_id.toString(),
          },
          vid2: isAddMode ? "" : artikal.ime_vid,
          insdate: isAddMode ? "" : getInsDate(),
          // images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* <FormImagePicker name="images" /> */}
        <FormField
          // defaultValue={getImeArtikal()}
          // defaultValue="aaa123"
          // isAddMode={isAddMode}
          maxLength={255}
          name="ime_artikal"
          // onChangeText={setFieldValue} //-DT-20210203
          placeholder="Ime na Artikal"
          // placeholder={getImeArtikal()}
          // setFieldValue={"aaaa"}
          // setFieldValue={getImeArtikal()}
          // value={getImeArtikal()}
          // value={defaultValue}
        />
        <FormField
          maxLength={255}
          name="vid2"
          placeholder="Vid2"
          width="100%"
          // defaultValue={isAddMode ? "" : artikal.cena.toString()}
        />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="cena"
          placeholder="Cena"
          width={120}
          // defaultValue={isAddMode ? "" : artikal.cena.toString()}
        />
        <Picker
          // items={vids}
          items={vidData}
          name="vid"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Vid"
          // placeholder={artikal.ime_vid} //+DT-20210202
          width="100%"
          // defaultValue={isAddMode ? "" : artikal.ime_vid} //+DT-20210202
          // value={artikal.ime_vid} //+DT-20210202
        />
        <Text style={styles.switch}>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          Danok
        </Text>
        {/* <Text>aaa</Text> */}

        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="steuerrelevant"
          placeholder="Danok?"
          width={120}
          // defaultValue={isAddMode ? "" : artikal.steuerrelevant.toString()}
        />
        <FormField
          keyboardType="numeric"
          maxLength={10}
          name="insdate"
          placeholder="Datum na vnes"
          width="100%"
        />
        <SubmitButton title="Save" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  switch: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "stretch",
  },
});

export default ArtikalEditScreen;
