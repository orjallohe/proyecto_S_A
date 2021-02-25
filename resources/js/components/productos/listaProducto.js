import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {
    Link,
    NavLink
  } from "react-router-dom";
// importamos la acción
import {obtenerProductoAction} from '../../redux/productoDuck'
import CrearProducto from './crearProducto';



const ListaProductoStyled = styled.div`
    padding:25px;
    h1{
        color:#37546b;
    }
    .btn-success{
        border-radius: 25px;
        padding: .4rem 30px;
        font-size: 1rem;
    }
    .btn-info{
        color:white;
    }

`
export default function ListaProducto() {
    const dispatch = useDispatch()

    const productos = useSelector(store => store.productos.productos)
    useEffect(() => {
        dispatch(obtenerProductoAction())

    }, [])
    return (
        <ListaProductoStyled>
            <div className="d-flex justify-content-between mb-3">
                <h1>Productos</h1>
                <CrearProducto />
            </div>
            <nav class="navbar navbar-light bg-light justify-content-between p-4">
                <a class="navbar-brand"></a>
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
            <table class="table table-light">

                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Codigo</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>

                    {productos.map(({nombre, id, codigo, descripcion, marca, categoria,precio}) =>{
                        return (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{codigo}</td>
                                <td>{nombre}</td>
                                <td>{descripcion}</td>
                                <td>{marca}</td>
                                <td>{categoria}</td>
                                <td>{precio}</td>
                                <th scope="row"><Link to={`editarProducto/${id}`} ><button className="btn btn-info btn-sm"
                                >Editar</button></Link></th>
                                <th scope="row"><button className="btn btn-danger btn-sm">Eliminar</button></th>

                            </tr>

                        )

                    })}


                </tbody>
                </table>


        </ListaProductoStyled>
    )
}

