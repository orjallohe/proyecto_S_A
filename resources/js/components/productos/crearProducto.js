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

    const {register, errors, handleSubmit} = useForm();
    const onSubmit = (data, e) => {
        console.log(data)
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
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="row">
                            <div class="col">
                            <label>Codigo</label>
                            <input type="number" class="form-control" name="codigo" placeholder="Codigo"
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
                            ref={register({
                                required: {
                                    value: true,
                                    message: 'nombre es requerido'
                                }
                            })}
                            />
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                            <label>Descripción</label>
                            <textarea name="textarea" rows="4" cols="55" name="descripcion"
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


        </CrearProductoStyled>
    )
}
