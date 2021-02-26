import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {insertarCategoriaProductoAction} from '../../redux/productoDuck'
const CrearCategoriaProductoStyled = styled.div`

`
export default function CrearCategoriaProducto() {
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const categoriaProducto = useSelector(store => store.productos.categoriaProducto)

    const {register, errors, handleSubmit} = useForm();

    const onSubmit = (data, e) => {
        let nombreExiste = categoriaProducto.some(c => c.nombre == data.nombre)
        let codigoExiste = categoriaProducto.some(c => c.codigo == data.codigo)
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

        dispatch(insertarCategoriaProductoAction(data));
        // limpiar campos
        e.target.reset();
    }

    return (
        <CrearCategoriaProductoStyled>

            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#crearCategoriaProducto">
            Nueva Categoria
            </button>


            <div class="modal fade" id="crearCategoriaProducto" tabIndex="-1" role="dialog" aria-labelledby="crearCategoriaProductoLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Categoria de producto</h5>
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
                                    value: 2,
                                    message: 'Mínimo 2 carácteres'
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
                                    message: 'la descripción es requerida'
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

                        <button type="submit" class="btn btn-primary">Save changes</button>
                        {error && <div class="alert alert-danger" role="alert"> {error}</div>}

                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>


        </CrearCategoriaProductoStyled>
    )
}
