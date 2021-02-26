import React from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {
    Link,
    NavLink
  } from "react-router-dom";
import {eliminarCategoriaProductoAction} from '../../redux/productoDuck'
const EliminarCategoriaProductoStyled = styled.div`

`
export default function EliminarCategoriaProducto() {
    const getIdCategoria = useSelector(store => store.productos.idCategoria)
    const dispatch = useDispatch()

    return (
        <EliminarCategoriaProductoStyled>

            <div class="modal fade" id="eliminarCategoriaProducto" tabIndex="-1" role="dialog" aria-labelledby="eliminarCategoriaProductoLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="eliminarCategoriaProductoLabel">Eliminar Categoria</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h2>¿Esta seguro que desea eliminar esta categoria?</h2>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal"
                        onClick={() => dispatch(eliminarCategoriaProductoAction(getIdCategoria))}
                    >Aceptar</button>
                </div>
                </div>
            </div>
            </div>
        </EliminarCategoriaProductoStyled>
    )
}
