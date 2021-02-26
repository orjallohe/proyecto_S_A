import React, {useEffect} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {
    Link,
    NavLink
  } from "react-router-dom";
import {obtenerCategoriaProductoAction} from '../../redux/productoDuck'
import CrearCategoriaProducto from './crearCategoriaProducto';

const ListaCategoriaProductoStyled = styled.div`
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
export default function ListaCategoriaProducto() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(obtenerCategoriaProductoAction())

    }, [])

    const categoriaProducto = useSelector(store => store.productos.categoriaProducto)

    return (
        <ListaCategoriaProductoStyled>
            <div className="d-flex justify-content-between mb-3">
                <h1>Categorias</h1>
                <CrearCategoriaProducto />
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
                    <th scope="col">Activo</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Eliminar</th>

                    </tr>
                </thead>
                <tbody>

                    {categoriaProducto.map(({nombre, id, codigo, descripcion,activo}) =>{
                        return (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <th scope="row">{codigo}</th>
                                <th scope="row">{nombre}</th>
                                <th scope="row">{descripcion}</th>
                                <th scope="row">{activo}</th>
                                <th scope="row"><button className="btn btn-info btn-sm">Editar</button></th>
                                <th scope="row"><button className="btn btn-danger btn-sm">Eliminar</button></th>

                            </tr>

                        )

                    })}


                </tbody>
            </table>


        </ListaCategoriaProductoStyled>
    )
}
