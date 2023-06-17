import React from 'react';

const Producto = ({producto,productos,agregarProducto,changuito}) => {

    //Extraigo los valores
    const {id, articulo, precio} = producto;

    // Funcion para comprar un producto
    const seleccionarProducto = (id) => {
        const producto = productos.filter(
            producto => producto.id === id
        )[0];
        agregarProducto([...changuito, producto]);
        console.log(changuito); 
    };

    return ( 
        <>
            {id} | {articulo} | {precio} 
            <br></br>
            <button
                type="button"
                onClick={ () => seleccionarProducto(id)}>
                    Comprar                
            </button>
            <br/>
        </>
     );
}
 
export default Producto;