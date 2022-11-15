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
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { useAuthContext } from '../contexts/authContext'



export default function ReactFinalFormDemo() {
    const { login } = useAuthContext();
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [user, setUser] = useState(null);

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
        login(formData)
    }, [onSubmit]);

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
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Correo electrónico</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password autoComplete="on" onChange={(e) => setFormData(e.target.value)} id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })}  />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Contraseña</label>
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

