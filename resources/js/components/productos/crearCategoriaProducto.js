import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {insertarCategoriaProductoAction} from '../../redux/productoDuck'
const CrearCategoriaProductoStyled = styled.div`

`
export default function CrearCategoriaProducto() {
    const dispatch = useDispatch()

    const {register, errors, handleSubmit} = useForm();
    const onSubmit = (data, e) => {
        console.log(data)
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
