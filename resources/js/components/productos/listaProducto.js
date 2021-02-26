import React,{useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import { useForm } from 'react-hook-form'
import url from '../../url'
import axios from 'axios';
import {
    Link,
    NavLink
  } from "react-router-dom";
// importamos la acción
import {obtenerProductoAction, updateProductoAction, getIdEliminar,filtrarProductoAction} from '../../redux/productoDuck'
import CrearProducto from './crearProducto';
import EliminarProducto from './eliminarProducto'


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
    const {register, errors, handleSubmit} = useForm();
    const dispatch = useDispatch()
    const [categoria, useCategoria] = useState([])
    const unmounted = useRef(false);
    const [busquedaProducto, setBusquedaProducto] = React.useState('')
    const [dataForm,setDataForm] = useState({
        id: '',
        codigo: '',
        nombre: '',
        descripcion:'',
        marca:'',
        categoria:'',
        precio:''

    });

    const productos = useSelector(store => store.productos.productos)

    useEffect(() => {
        dispatch(obtenerProductoAction())

    }, [])

    const handelChangeInput = (e) =>{
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    const handleMostrarDatosInput = (registro) =>{
        setDataForm(registro)
    }
    const handleChangeBusqueda = (e) =>{
        setBusquedaProducto(e.target.value)
        if(e.target.value.length > 0){
            dispatch(filtrarProductoAction(e.target.value))

        }else{
            dispatch(obtenerProductoAction())
        }
    }

    const onSubmit = (data, e) => {
        console.log(data)
        dispatch(updateProductoAction(data, data.id));
        e.target.reset();
    }

    useEffect(() => {
        axios.get(`${url}/api/CategoriaProducto/`)
       .then(res => useCategoria(res.data))
       return () => { unmounted.current = true }
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
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChangeBusqueda }/>
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
                                <th scope="row">
                                <button className="btn btn-info btn-sm" data-toggle="modal" data-target="#editarProducto" onClick={ () => handleMostrarDatosInput({
                                    id:id,
                                    codigo,
                                    nombre,
                                    descripcion,
                                    categoria,
                                    marca,
                                    precio
                                })}
                                >Editar</button>
                                </th>
                                <th scope="row"><button className="btn btn-danger btn-sm"  data-toggle="modal" data-target="#exampleModal"
                                onClick={() => dispatch(getIdEliminar(id))}
                                >Eliminar</button></th>

                            </tr>

                        )

                    })}


                </tbody>
                </table>

                {/* ---------modal--------- */}
                <EliminarProducto />

                {/* ---------modal--------- */}
                <div class="modal fade" id="editarProducto" tabIndex="-1" role="dialog" aria-labelledby="editarProductoLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editarProductoLabel">Editar Categoria</h5>
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
                                        message: 'El codigo es requerido'
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'No más de 10 carácteres!'
                                        },
                                    minLength: {
                                        value: 4,
                                        message: 'Mínimo 4 carácteres'
                                    },
                                    pattern:{
                                        value: /^[a-zA-Z0-9\_\-]{4,16}$/,
                                        message: 'No se aceptan esos caracteres'
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
                                        message: 'El nombre es requerido'
                                    },
                                    minLength: {
                                        value: 4,
                                        message: 'Mínimo 4 carácteres'
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
                            </div>

                        </div>
                         <div class="row mt-2">
                            <div class="form-group col-md-12">
                                <label htmlFor="inputState">Categoria</label>
                                <select id="inputState" class="form-control" name="categoria_productos_id"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: 'categoria es requerido'
                                    }
                                 })}
                                >
                                    {categoria.map(data =>{

                                      return <option key={data.id} value={data.id}>{data.nombre}</option>
                                    })}
                                </select>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                            <label>Marca</label>
                            <input type="text" class="form-control" name="marca" placeholder="Marca"
                            onChange={handelChangeInput}
                            value={dataForm.marca}
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'Marca es requerido'
                                }
                             })}
                            />
                            </div>
                            <div class="col">
                            <label>Precio</label>
                            <input type="number" class="form-control" placeholder="precio" name="precio"
                            onChange={handelChangeInput}
                            value={dataForm.precio}
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'precio es requerido'
                                }
                             })}
                            />


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
        </ListaProductoStyled>
    )
}

