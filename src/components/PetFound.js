import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import "../assets/PetRegister.css";
import AddAPhoto from "@mui/icons-material/AddAPhoto";
import { BottomNavigation } from "@mui/material";
import Map from "../components/WrapperMapFindPet";
import "../assets/PetFound.css";

export default function ReactFinalFormDemo() {
  const [uploaded, setUploaded] = useState(false);
  const [formData, setFormData] = useState(null);
  const [file, setFile] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [base64, setBase64] = useState({ base64Data: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // console.log(position);
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  const petColor = [
    { label: "Negro", value: "Negro" },
    { label: "Blanco", value: "Blanco" },
    { label: "Gris", value: "Gris" },
    { label: "Amarillo", value: "Amarillo" },
    { label: "Rojo", value: "Rojo" },
    { label: "Verde", value: "Verde" },
    { label: "Marron", value: "Marron" },
    { label: "Naranja", value: "Naranja" },
  ];
  const petType = [
    { label: "Perro", value: "Perro" },
    { label: "Gato", value: "Gato" },
    { label: "Ave", value: "Ave" },
    { label: "Otro", value: "Otro" },
  ];
  const pesoAproximado = [
    { label: "1kg a 5kg ", value: "1kg/5kg" },
    { label: "5kg a 10kg ", value: "5kg/10kg" },
    { label: "10kg a 15kg ", value: "10kg/15kg" },
    { label: "15kg a 20kg ", value: "15kg/20kg" },
    { label: "20kg a 25kg ", value: "20kg/25kg" },
    { label: "25kg a 30kg ", value: "25kg/30kg" },
    { label: "30kg a 40kg ", value: "30kg/40kg" },
    { label: "40kg a 50kg ", value: "40kg/50kg" },
    { label: "50kg a 60kg ", value: "50kg/60kg" },
    { label: "60kg a 70kg ", value: "60kg/70kg" },
  ];

  const validate = (data) => {
    let errors = {};

    if (!data.descripcionMascota) {
      errors.descripcionMascota = "Name is required.";
    } else if (!data.descripcionMascota) {
      errors.descripcionMascota = "Name is required.";
    }

    return errors;
  };

  const onSubmit = (data, form) => {
    console.log("data from petRegister", data);
    if (sendLocation.length > 0) {
      let newData = {
        ...data,
        id: localStorage.id,
        file: file,
        newLatitude: sendLocation[sendLocation.length - 1].latitude,
        newLongitude: sendLocation[sendLocation.length - 1].longitude,
      };
      setFormData(newData);

      setDataReady(true);

      /*       form.restart();
       */
    } else {
      let newData = {
        ...data,
        id: localStorage.id,
        file: file,
        initialLatitude: state.latitude,
        initialLongitude: state.longitude,
      };
      setFormData(newData);

      setDataReady(true);

      /*       form.restart();
       */
    }
  };
  const handleReaderLoaded = (e) => {
    let binaryString = e.target.result;

    setBase64({
      base64Data: btoa(binaryString),
    });
    /*     console.log('binary', binaryString)
            console.log('bota', btoa(binaryString)) */
  };

  const handleFile = (e) => {
    let file = e.target.files[0];

    if (file.size > 7000000) {
      alert(`El archivo no puede pesar mas de 7MB`);
      return null;
    }

    if (file.size < 7000000) {
      const reader = new FileReader();
      reader.onload = handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

    setBase64(state);
  };

  useEffect(
    function () {
      setFormData(formData);

      if (dataReady === true) {
        sendData();
      }
    },
    [formData]
  );

  const sendLocation = [];

  const locationUpdate = (g) => {
    /*         console.log('petFound', e)
     */ let data = {
      latitude: g.lat,
      longitude: g.lng,
    };
    sendLocation.push(data);
  };

  const sendData = async () => {
    const newData = {
      ...formData,
      id: localStorage.id,
      file: base64,
    };
    const finalData = new FormData();
    finalData.append("file", JSON.stringify(base64));
    finalData.append("formDatas", JSON.stringify(newData));
    await axios
      .post(
        "https://backend.missingpets.art/mascotas/nuevaMascotaPerdida",
        {
          file: base64,
          formDatas: newData,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setUploaded(true);
          return <BottomNavigation status={uploaded} />;
        } else if (response.status !== 200) {
          console.log("error");
        }
      });
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  return (
    <div className="form-demo formPetFound">
      <div className="flex justify-content-center bodyPetFound">
        <div className="card formPetRegister">
          <Map newLocation={locationUpdate} />
          <p className="tittleMap"> Indica donde encontraste la mascota</p>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              nombre: "",
              colorPrimario: "",
              colorSecundario: "",
              pesoAproximado: "",
              descripcionMascota: "",
              tipoMascota: null,
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid formPetFound">
                <Field
                  name="tipoMascota"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Dropdown
                          id="tipoMascota"
                          {...input}
                          options={petType}
                          optionLabel="label"
                        />
                        <label htmlFor="tipoMascota">Tipo de mascota</label>
                      </span>
                    </div>
                  )}
                />
                <Field
                  name="pesoAproximado"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Dropdown
                          id="pesoAproximado"
                          {...input}
                          options={pesoAproximado}
                          optionLabel="label"
                        />
                        <label htmlFor="pesoAproximado">
                          Peso aproximado de la mascota
                        </label>
                      </span>
                    </div>
                  )}
                />
                <Field
                  name="colorPrimario"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Dropdown
                          id="colorPrimario"
                          {...input}
                          options={petColor}
                          optionLabel="label"
                        />
                        <label htmlFor="colorPrimario">Color primario</label>
                      </span>
                    </div>
                  )}
                />

                <Field
                  name="colorSecundario"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Dropdown
                          id="colorSecundario"
                          {...input}
                          options={petColor}
                          optionLabel="label"
                        />
                        <label htmlFor="colorSecundario">
                          Color secundario
                        </label>
                      </span>
                    </div>
                  )}
                />
                <Field
                  name="descripcionMascota"
                  className="descripcionMascota"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputTextarea
                          className="descripcionMascota"
                          id="descripcionMascota"
                          maxLength={200}
                          {...input}
                          placeholder={"Descripcion precisa"}
                        />
                        <label
                          className="descripcionMascota"
                          htmlFor="descripcionMascota"
                        >
                          Descripcion de la mascota encontrada
                        </label>
                      </span>
                    </div>
                  )}
                />
                <p className="adTextPetFound">
                  Sube una foto de la mascota encontrada:
                </p>

                <Field
                  name="fotoMascota"
                  render={({ input }) => (
                    <div className="field">
                      <input
                        required
                        onChange={(e) => {
                          handleFile(e);
                        }}
                        type="file"
                        id="fotoMascota"
                        name="file"
                      ></input>
                      <label
                        className="circle"
                        htmlFor="fotoMascota"
                        name="file"
                      >
                        <AddAPhoto className="iconPhotoUpload petFoundPhotoIcon" />
                      </label>
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  label="Cargar mascota encontrada"
                  className="mt-2 submitFoundPet"
                />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
}
