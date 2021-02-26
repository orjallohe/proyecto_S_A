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

            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#crearCategoriaProducto">
            Nueva Categoria
            </button>


            <div className="modal fade" id="crearCategoriaProducto" tabIndex="-1" role="dialog" aria-labelledby="crearCategoriaProductoLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Crear categoría</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col">
                            <label>Codigo</label>
                            <input type="text" className="form-control" name="codigo" placeholder="Codigo"
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
                            <div className="col">
                            <label>Nombre</label>
                            <input type="text" className="form-control" name="nombre" placeholder="Nombre"
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
                        <div className="row mt-2">
                            <div className="col">
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

                        <div className="row mt-2">
                            <div className="form-group col-md-12">
                                <label htmlFor="inputState">Activo</label>
                                <select id="inputState" className="form-control" name="activo"
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

                        <button type="submit" className="btn btn-primary">Save changes</button>
                        {error && <div className="alert alert-danger" role="alert"> {error}</div>}

                    </form>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>


        </CrearCategoriaProductoStyled>
    )
}
