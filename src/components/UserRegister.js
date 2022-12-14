import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../assets/UserRegister.css";
import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { useAuthContext } from "../contexts/authContext";
import AddAPhoto from "@mui/icons-material/AddAPhoto";

export default function ReactFinalFormDemo() {
  const { login } = useAuthContext();
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState("");
  const [file, setFile] = useState("");
  const [state, setState] = useState({ base64Data: null });

  const handleReaderLoaded = (e) => {
    let binaryString = e.target.result;
    setState({
      base64Data: btoa(binaryString),
    });
  };

  const handleFile = (e) => {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

    setFile(state);
  };

  const validate = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = "Nombre es requerido.";
    }

    if (!data.telefono) {
      errors.telefono = "Número de telefono es requerido.";
    }

    if (!data.apellido) {
      errors.apellido = "Apellido es requerido.";
    }

    if (!data.email) {
      errors.email = "Email es requerido.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Email invalido, Ej:  ejemplo@email.com";
    }

    if (!data.password) {
      errors.password = "La contraseña es requerida.";
    }
    if (data.password !== data.confirmPassword){
      errors.password = 'Ambas contraseñas deben ser iguales.'
    }

    if (!data.accept) {
      errors.accept = "Debes aceptar los términos y condiciones.";
    }

    return errors;
  };
  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);

    form.restart();
  };

  useEffect(
    function (onSubmit) {
      /*  setFormData(formData) */
      /*     sendData() */
    },
    [onSubmit]
  );

  function firstLogin() {
    const sendData = async () => {
      if (formData === undefined) {
      } else if (formData !== "") {
        await axios
          .post("https://backend.missingpets.art/user/register", {
            /*        headers: 'Access-Control-Allow-Origin: http://localhost:3000', */
            formData: formData,
            file: state,
          })
          .then((response) => {
            if (response.data === "success") {
              axios
                .post("https://backend.missingpets.art/user/login", formData, {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ user: formData }),
                })
                .then((res) => {
                  if (res.data.token) {
                    login();
                    document.cookie = `token=${
                      res.data.token
                    }; max-age=${3600}; path=/; samesite-strict `;
                    window.localStorage.setItem("id", res.data.dataUser.id);
                    window.localStorage.setItem(
                      "name",
                      res.data.dataUser.nombre
                    );
                    window.localStorage.setItem(
                      "lastName",
                      res.data.dataUser.apellido
                    );
                    window.localStorage.setItem(
                      "email",
                      res.data.dataUser.email
                    );
                    window.localStorage.setItem(
                      "avatar",
                      res.data.dataUser.fotoPerfil
                    );
                  }
                });
            } else if (response.status !== 200) {
            }
          });
      }
    };
    sendData();
    setShowMessage(false);
  }

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={firstLogin}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll
            be valid next 30 days without activation. Please check{" "}
            <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="formRegister">
          <h5 className="text-center">Registrate</h5>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              name: "",
              email: "",
              password: "",
              date: null,
              apellido: "",
              telefono: "",
              country: null,
              accept: false,
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid formRegister">
                <Field
                  on
                  name="name"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="name"
                          {...input}
                          autoFocus
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="name"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Nombre*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  on
                  name="apellido"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="apellido"
                          {...input}
                          autoFocus
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="apellido"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Apellido*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  on
                  name="telefono"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="telefono"
                          {...input}
                          autoFocus
                          type="number"
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="telefono"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Telefono*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />

                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText
                          id="email"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="email"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Email*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="password"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Password
                          autoComplete="on"
                          id="password"
                          {...input}
                          toggleMask
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
                        />
                        <label
                          htmlFor="password"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Contraseña*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="confirmPassword"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Password
                          autoComplete="on"
                          id="confirmPassword"
                          {...input}
                          toggleMask
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
                        />
                        <label
                          htmlFor="confirmPassword"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Ingrese nuevamente su contraseña*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="fotoMascota"
                  render={({ input }) => (
                    <div className="field">
                      <input
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
                        <AddAPhoto className="iconPhotoUpload photoUploadUserRegister" />
                      </label>
                      <p className="newUserAvatarLabel">
                        Si quieres, puedes usar una foto para tu ávatar.
                      </p>
                    </div>
                  )}
                />

                <Field
                  name="accept"
                  type="checkbox"
                  render={({ input, meta }) => (
                    <div className="field-checkbox">
                      <Checkbox
                        inputId="accept"
                        {...input}
                        className="acceptTerms"
                      />
                      <label htmlFor="accept" className="checkBoxx">
                        Acepto los terminos y condiciones*
                      </label>
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  label="Registrarme"
                  className="mt-2 buttonRegister"
                />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
}
