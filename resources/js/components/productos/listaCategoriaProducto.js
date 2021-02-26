import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import { useForm } from 'react-hook-form'
import {
    Link,
    NavLink
  } from "react-router-dom";
import {obtenerCategoriaProductoAction,updateCategoriaProductoAction,getIdCategoria} from '../../redux/productoDuck'
import CrearCategoriaProducto from './crearCategoriaProducto';
import EliminarCategoriaProducto from './eliminarCategoriaProducto';

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
    const {register, errors, handleSubmit} = useForm();
    const [dataForm,setDataForm] = useState({
        id: '',
        codigo: '',
        nombre: '',
        descripcion:'',
        activo: '1'

    });
    const handelChangeInput = (e) =>{
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }
    const handleMostrarDatosInput = (registro) =>{
        setDataForm(registro)
    }
    useEffect(() => {
        dispatch(obtenerCategoriaProductoAction())

    }, [])
    const onSubmit = (data, e) => {
        console.log(data)
        dispatch(updateCategoriaProductoAction(data, data.id));
        e.target.reset();
    }

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
                                <th scope="row"><button className="btn btn-info btn-sm" data-toggle="modal" data-target="#editarCategoriaProducto"
                                onClick={ () => handleMostrarDatosInput({
                                    id:id,
                                    codigo,
                                    nombre,
                                    descripcion,
                                    activo
                                })}
                                >Editar</button></th>
                                <th scope="row"><button className="btn btn-danger btn-sm" data-toggle="modal" data-target="#eliminarCategoriaProducto"
                                onClick={() => dispatch(getIdCategoria(id))}
                                >Eliminar</button></th>

                            </tr>

                        )

                    })}


                </tbody>
            </table>
        {/* ---------modal--------- */}
        <EliminarCategoriaProducto />
        {/* ---------modal--------- */}
        <div class="modal fade" id="editarCategoriaProducto" tabIndex="-1" role="dialog" aria-labelledby="editarCategoriaProductoLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editarCategoriaProductoLabel">Editar Categoria</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div class="row">
                            <div class="col">
                                <label>Codigo</label>
                                <input type="text" class="form-control" name="codigo" placeholder="Codigo"
                                onChange={handelChangeInput}
                                value={dataForm.codigo}
                                ref={register({
                                    required: {
                                        value: true,
                                        message: 'Codigo es requerido'
                                    }
                                })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors?.codigo?.message}
                                </span>
                            </div>
                            <div class="col">
                                <label>Nombre</label>
                                <input type="text" class="form-control" name="nombre" placeholder="Nombre"
                                onChange={handelChangeInput}
                                value={dataForm.nombre}
                                ref={register({
                                    required: {
                                        value: true,
                                        message: 'nombre es requerido'
                                    }
                                })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors?.nombre?.message}
                                </span>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                            <label>Descripción</label>
                            <textarea name="textarea" rows="4" cols="55" name="descripcion"
                            onChange={handelChangeInput}
                            value={dataForm.descripcion}
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'textarea es requerido'
                                }
                             })}
                            ></textarea>
                            <span className="text-danger text-small d-block mb-2">
                                    {errors?.descripcion?.message}
                            </span>
                            </div>

                        </div>

                        <div class="row mt-2">
                            <div class="form-group col-md-12">
                                <label htmlFor="inputState">Activo</label>
                                <select id="inputState" class="form-control" name="activo"
                                onChange={handelChangeInput}
                                value={dataForm.activo}
                                ref={register({
                                    required: {
                                        value: true,
                                        message: 'Activo es requerido'
                                    }
                                 })}
                                >
                                    <option value="1">si</option>
                                    <option value="0">no</option>

                                </select>
                            </div>

                        </div>

                        <div class="row">
                            <div>
                            <input type="hidden" class="form-control" placeholder="id" name="id"
                            onChange={handelChangeInput}
                            value={dataForm.id}
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'precio es requerido'
                                }
                             })}
                            />
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">Save changes</button>


                    </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>


        </ListaCategoriaProductoStyled>
    )
}
