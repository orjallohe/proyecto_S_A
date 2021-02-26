import React from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {
    Link,
    NavLink
  } from "react-router-dom";
import {eliminarProductoAction} from '../../redux/productoDuck'
const EliminarProductoStyled = styled.div`

`
export default function EliminarProducto() {
    const getIdEliminar = useSelector(store => store.productos.idEliminar)
    const dispatch = useDispatch()

    return (
        <EliminarProductoStyled>

            <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Eliminar Producto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h2>¿Esta seguro que desea eliminar el producto?</h2>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal"
                        onClick={() => dispatch(eliminarProductoAction(getIdEliminar))}
                    >Aceptar</button>
                </div>
                </div>
            </div>
            </div>
        </EliminarProductoStyled>
    )
}
