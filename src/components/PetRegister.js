import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import '../assets/PetRegister.css';
import AddAPhoto from '@mui/icons-material/AddAPhoto';
import { BottomNavigation } from '@mui/material';

export default function ReactFinalFormDemo() {

    const [uploaded, setUploaded] = useState(false);
    const [formData, setFormData] = useState(null);
    const [file, setFile] = useState(null)
    const [dataReady, setDataReady] = useState(false)
    const [state, setState] = useState({ base64Data: null })
  

    const petColor = [
        { label: 'Negro', value: 'Negro' },
        { label: 'Blanco', value: 'Blanco' },
        { label: 'Gris', value: 'Gris' },
        { label: 'Amarillo', value: 'Amarillo' },
        { label: 'Rojo', value: 'Rojo' },
        { label: 'Verde', value: 'Verde' },
        { label: 'Marron', value: 'Marron' },
        { label: 'Naranja', value: 'Naranja' }
    ];
    const petType = [
        { label: 'Perro', value: 'Perro' },
        { label: 'Gato', value: 'Gato' },
        { label: 'Ave', value: 'Ave' },
        { label: 'Otro', value: 'Otro' },
    ];
    const pesoAproximado = [
        { label: '1kg a 5kg ', value: '1kg/5kg' },
        { label: '5kg a 10kg ', value: '5kg/10kg' },
        { label: '10kg a 15kg ', value: '10kg/15kg' },
        { label: '15kg a 20kg ', value: '15kg/20kg' },
        { label: '20kg a 25kg ', value: '20kg/25kg' },
        { label: '25kg a 30kg ', value: '25kg/30kg' },
        { label: '30kg a 40kg ', value: '30kg/40kg' },
        { label: '40kg a 50kg ', value: '40kg/50kg' },
        { label: '50kg a 60kg ', value: '50kg/60kg' },
        { label: '60kg a 70kg ', value: '60kg/70kg' },
    ]
    const sendData = async () => {




        await axios.post("https://backend.missingpets.art/mascota/register", {
            file: state,
            formdata: formData
        },
            {
                /*    headers: formData */
            }
        ).then((response) => {
     
            if (response.status === 200) {
               
                
                setUploaded(true)
                return <BottomNavigation status={uploaded} />
            }
            else if (response.status !== 200) {
                console.log('error')
            }
        })
    }
    const handleReaderLoaded = e => {
  
        let binaryString = e.target.result;

        setState({
            base64Data:  btoa(binaryString)
        });
    
    };

    const handleFile = (e) => {

        let file = e.target.files[0];

        if (file.size > 5000000) {
          alert(`File too big max 5000kb`);
          return null;
        }
    
        if (file.size < 5000000) {
            const reader = new FileReader();
            reader.onload = handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }


        setFile(state)

    }



    const validate = (data) => {
        let errors = {};

        if (!data.nombre) {
            errors.name = 'Name is required.';
        }

        return errors;
    };

    const onSubmit = (data, form) => {
       
        let newData = {
            ...data,
            id: localStorage.id,
            file: file,
        }
        setFormData(newData);

        setDataReady(true)

        form.restart();
    };


    useEffect(function () {
        setFormData(formData)

        if (dataReady === true) {
            sendData()
        }

    }, [formData]);



    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };


    return (
        <div className="form-demo">
            <div className="flex justify-content-center">
                <div className="card">
                    {/*                 <h5 className="text-center">Registrar mascota</h5> */}
                    <Form onSubmit={onSubmit} initialValues={{ nombre: '', colorPrimario: '', colorSecundario: '', descripcionMascota: '', tipoMascota: null, }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid addNewPetForm">

                            <Field name="nombre" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="nombre" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="nombre" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Nombre</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="tipoMascota" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="tipoMascota" {...input} options={petType} optionLabel="label" />
                                        <label htmlFor="tipoMascota">Tipo de mascota</label>
                                    </span>
                                </div>
                            )} />
                            <Field name="pesoAproximado" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="pesoAproximado" {...input} options={pesoAproximado} optionLabel="label" />
                                        <label htmlFor="pesoAproximado">Peso aproximado de la mascota</label>
                                    </span>
                                </div>
                            )} />

                            <Field name="colorPrimario" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="colorPrimario" {...input} options={petColor} optionLabel="label" />
                                        <label htmlFor="colorPrimario">Color primario</label>
                                    </span>
                                </div>
                            )} />
                            <Field name="colorSecundario" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Dropdown id="colorSecundario" {...input} options={petColor} optionLabel="label" />
                                        <label htmlFor="colorSecundario">Color secundario</label>
                                    </span>
                                </div>
                            )} />
                            <Field name="descripcionMascota" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputTextarea maxLength={200} id="descripcionMascota" {...input} placeholder={'Descripcion precisa, 50 caracteres maximo'} />
                                        <label htmlFor="descripcionMascota">Descripcion de tu mascota</label>
                                    </span>
                                </div>
                            )} />
                            <Field name="fotoMascota" render={({ input }) => (
                                <div className="field">
                                    <input onChange={(e) => {
                                        handleFile(e)
                                    }} type='file' id="fotoMascota" name='file'></input>
                                    <label className='circle' htmlFor="fotoMascota" name='file' >
                                        <AddAPhoto className='iconPhotoUpload'  />
                                    </label>
                                    <p className='newPetText'>  Agrega una foto de tu mascota</p>
                                </div>
                            )} />


                            <Button type="submit" label="Agregar a mi mascota" className="mt-2 newPetButton" /* onClick={onSubmit} */ />
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}
