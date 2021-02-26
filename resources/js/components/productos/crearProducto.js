import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import {insertarProductoAction} from '../../redux/productoDuck'
import url from '../../url'
const CrearProductoStyled = styled.div`

`
export default function CrearProducto() {


    const dispatch = useDispatch()
    const [categoria, useCategoria] = useState([])
    const [error, setError] = useState("")

    const {register, errors, handleSubmit} = useForm();
    const productos = useSelector(store => store.productos.productos)

    const onSubmit = (data, e) => {
        let nombreExiste = productos.some(p => p.nombre == data.nombre)
        let codigoExiste = productos.some(p => p.codigo == data.codigo)
        setError("")
        if(nombreExiste){
            setError("El nombre ya existe")
            return;
        }
        setError("")
        if(codigoExiste){
            setError("El codigo ya existe")
            return;
        }


        dispatch(insertarProductoAction(data));
        // limpiar campos
        e.target.reset();
    }
    useEffect(() => {
         axios.get(`${url}/api/CategoriaProducto/`)
        .then(res => useCategoria(res.data))

    }, [])

    return (
        <CrearProductoStyled>

            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#crearProducto">
            nuevo producto
            </button>


            <div class="modal fade" id="crearProducto" tabIndex="-1" role="dialog" aria-labelledby="crearProductoLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Crear Producto</h5>

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
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'La descripcion es requerida'
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
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'La marca es requerida'
                                }
                             })}
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.marca?.message}
                            </span>
                            </div>

                            <div class="col">
                            <label>Precio</label>
                            <input type="number" class="form-control" placeholder="precio" name="precio"
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'El precio es requerido'
                                },
                                min: {
                                    value: 0,
                                    message: 'no puede ser negativo'
                                }
                             })}
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.precio?.message}
                            </span>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary" >Guardar</button>
                        {error && <div class="alert alert-danger" role="alert"> {error}</div>}
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>


        </CrearProductoStyled>
    )
}
