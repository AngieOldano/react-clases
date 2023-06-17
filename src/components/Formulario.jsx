import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuid} from 'uuid';

const Formulario = ({agregarCliente}) => {

    //Creo un socio vacio y lo inicializo con un Hook de estado
    const [socio, editarSocio] = useState({
        nombre:"",
        dni:""
    });

    //Extraer los valores
    const {nombre,dni} = socio;

    //Creo otro hook de estado para manejar el error
    const [error, setError] = useState(false);

    //Recogemos lo que el usuario escribe en el formulario
    const handleChange = (e) => {
        editarSocio({
            ...socio,
            [e.target.name] : e.target.value
        })
        console.log("Tomo los datos...");
    };

    //Cuando se envia el formulario se ejecuta esta funcion
    const submitForm = (e) => {
        e.preventDefault();
        console.log("Enviado")

        // validar el formulario
        if (nombre.trim() === '' || dni.trim() === ''){
            setError(true);
            return;
        }
        // mensaje de error (quitar el mensaje)
        setError(false);


        // poner n id
        // npm install uuid
        socio.id = uuid();
        console.log(socio);

        // guardar el socio
        agregarCliente(socio);

        // limpiar el formulario
        editarSocio({
            nombre: "",
            dni: ""
        })
    }

    return (
        <Fragment>
            <Form onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre completo" name="nombre" onChange={handleChange} value={nombre}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type="text" placeholder="Sin puntos y espacios" name="dni" onChange={handleChange} value={dni}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
            </Form>

            {
                error
                ? <h4>Completá todos los campos</h4>
                : null
            }
        </Fragment>
    );
}

export default Formulario;