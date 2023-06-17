import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from './components/Formulario';
import Header from './components/Header';
import Producto from './components/Producto';
import Cliente from './components/Cliente';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React, { Fragment, useEffect, useState } from 'react';


function App() {

  //Iniciamos nuestro local storage
  let clientesGuardados = JSON.parse(localStorage.getItem('clientes')); //le pido al navegador los clientes
  if(!clientesGuardados){ //si es null
    clientesGuardados = [] 
  };

  //Generar un hook de estado vacio con los diferentes clientes de la veterinaria
  const [clientes, editarClientes] = useState(clientesGuardados);

  // Hook useEffect: Sirve para ejecutar alguna funcionalidad cuando hay un cambio en alguna variable/hook/situacion
  useEffect(() => {
    //algo cambio
    clientesGuardados
    ? localStorage.setItem('clientes', JSON.stringify(clientes))
    : localStorage.setItem('clientes', JSON.stringify([]));
  }, [clientesGuardados]);


  // Funcion que toma el socio nuevo y lo mete en el array de clientes
  const agregarCliente = (socio) => {
    editarClientes([
      ...clientes,
      socio
    ])
  }

  const borrarCliente = (id) => {
    const nuevosClientes = clientes.filter(cliente => cliente.id !== id);
    editarClientes(nuevosClientes);
  }


  // creamos lista de productos
  const [productos, guardarProductos] = useState([
    {id:0, articulo:"Royal Canin 15kg", precio:30000},
    {id:1, articulo:"Triple Felina", precio:8000},
    {id:2, articulo:"Castracion", precio:10000},
    {id:3, articulo:"Ecografia", precio:6000},
  ])

  //creamos nuestro changuito
  const [changuito, agregarProducto] = useState([]);

  return (
    <div>
      <Fragment>
        <Header
          titulo="Tienda Veterinaria"/>
          <h1>Listado de productos</h1> 
          {
            productos.map( producto => (
              <Producto
                producto={producto}
                productos={productos}
                key = {producto.id}
                changuito={changuito}
                agregarProducto={agregarProducto}/>
            ))
          }
        <Container> 
          <Row>
            <Col><h1>Usuarios de la Veterinaria</h1></Col>
          </Row>
            <Col>
              <Formulario 
                agregarCliente = {agregarCliente}  // parametro = {funcion}
              />
            </Col>
            <Col>
              {
                clientes.length > 0
                ?<h3>Listado de usuario</h3>
                :<h3>No hay clientes</h3>
              }

              
              {
                clientes.map(cliente => 
                  <Cliente // componmente 
                    cliente={cliente} //propertie {cliente}
                    key={cliente.id}
                    borrarCliente={borrarCliente}
                  />
                  )
              }
            </Col>
        </Container>
      </Fragment>

    </div>
  );
}

export default App;
