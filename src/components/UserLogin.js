import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { useAuthContext } from '../contexts/authContext'
import axios from 'axios'
import '../assets/UserLogin.css'



export default function ReactFinalFormDemo() {

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [logError, setLogError] = useState(false)
    const { login } = useAuthContext();
    const validate = (data) => {
        let errors = {};
        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }
        if (!data.password) {
            errors.password = 'Password is required.';
        }
        return errors;
    };
    const onSubmit = (data, form) => {
        setFormData(data);


    };
    useEffect(function () {
        sendData();

    }, [formData]);


    useEffect(() => {


        const timer = setTimeout(() => {
            setLogError(false)
        }, 4000);
        return () => clearTimeout(timer);


    }, [logError]);



    const sendData = async () => {

        if (formData !== null) {

            formData.email !== '' ? axios.post("https://backend.missingpets.art/user/login", formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: formData })
            }).then((res) => {

                if (res.data === 'invalid password' || res.data === 'No se encuentra el email') {

                    return setLogError(!logError)
                }
                if (res.data.token) {
                    login()
                    document.cookie = `token=${res.data.token}; max-age=${3600}; path=/; samesite-strict `
                    window.localStorage.setItem('authKey', res.data.token)
                    window.localStorage.setItem('id', res.data.dataUser.id);
                    window.localStorage.setItem('name', res.data.dataUser.nombre);
                    window.localStorage.setItem('lastName', res.data.dataUser.apellido);
                    window.localStorage.setItem('email', res.data.dataUser.email);
                    window.localStorage.setItem('avatar', res.data.dataUser.fotoPerfil);
                }



            }) : <p> </p>
        }

    }



    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus /></div>;


    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Bienvenido/a!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Calm Atencion Domiciliaria SRL {/* <b>{formData.name}</b> */} <br></br>Ahora puedes realizar todas tus gestiones desde nuetra web!{/*  <b>{formData.email}</b> */} {/*   */}
                    </p>
                </div>
            </Dialog>
            <div className="flex justify-content-center loginForm">
                <div className="formLogin">
                    <h5 className="text-center">Iniciar sesion</h5>
                    <Form onSubmit={onSubmit} initialValues={{ email: '', password: '' }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">

                            <Field name="email" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText onChange={(e) => setFormData(e.target.value)} id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Correo electr??nico</label>
                                    </span>
                                    {logError === true ? <p className='wrongCredentials'> Credenciales inv??lidas</p> : <p></p>}

                                </div>
                            )} />
                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password autoComplete="on" onChange={(e) => setFormData(e.target.value)} id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Contrase??a</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Button type="submit" label="Ingresar" className="mt-2 loginButton" />
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}

