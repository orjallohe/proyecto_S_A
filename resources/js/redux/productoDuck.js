import axios from 'axios';
import url from '../url';
// constantes
const dataInicial = {
    productos: [],
    categoriaProducto:[],
    idEliminar: null
}

// types
const GET_PRODUCTO_SUCCESS = 'GET_PRODUCTO_SUCCESS'
const INSERT_PRODUCTO_SUCCESS = 'INSERT_PRODUCTO_SUCCESS'
const INSERT_CATEGORIA_PRODUCTO_SUCCESS = 'INSERT_CATEGORIA_PRODUCTO_SUCCESS'
const UPDATE_PRODUCTO_SUCCESS = 'UPDATE_PRODUCTO_SUCCESS'
const UPDATE_CATEGORIA_PRODUCTO_SUCCESS = 'UPDATE_CATEGORIA_PRODUCTO_SUCCESS'
const GET_CATEGORIA_PRODUCTO_SUCCESS = 'GET_CATEGORIA_PRODUCTO_SUCCESS'
const GET_ID_ELIMINAR = 'GET_ID_ELIMINAR'
const ELIMINAR_PRODUCTO_SUCCESS = 'ELIMINAR_PRODUCTO_SUCCESS'


// reducer
export default function productoReducer(state = dataInicial, action){
    switch(action.type){
        case GET_PRODUCTO_SUCCESS:
            return {...state, productos: action.payload}
        case GET_CATEGORIA_PRODUCTO_SUCCESS:
            return {...state, categoriaProducto: action.payload}
        case INSERT_PRODUCTO_SUCCESS:
            return {...state, productos: action.payload}
        case INSERT_CATEGORIA_PRODUCTO_SUCCESS:
            return {...state, categoriaProducto: action.payload}
        case UPDATE_PRODUCTO_SUCCESS:
            return {...state, productos: action.payload}
        case UPDATE_CATEGORIA_PRODUCTO_SUCCESS:
            return {...state, categoriaProducto: action.payload}
        case GET_ID_ELIMINAR:
            return {...state, idEliminar: action.payload}
        case ELIMINAR_PRODUCTO_SUCCESS:
            return {...state, productos: action.payload}
        default:
            return state
    }
}

// actions
export const obtenerProductoAction = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(`${url}/api/productos/`)
        dispatch({
            type: GET_PRODUCTO_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const obtenerCategoriaProductoAction = () => async (dispatch, getState) => {
    try {
        const res = await axios.get(`${url}/api/CategoriaProducto/`)
        dispatch({
            type: GET_CATEGORIA_PRODUCTO_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const insertarProductoAction = (data) => async (dispatch, getState) => {
    try {
        const res = await axios.post(`${url}/api/productos/`, data);
        dispatch({
            type: INSERT_PRODUCTO_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const insertarCategoriaProductoAction = (data) => async (dispatch, getState) => {
    try {
        const res = await axios.post(`${url}/api/CategoriaProducto/`, data);
        dispatch({
            type: INSERT_CATEGORIA_PRODUCTO_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const getIdEliminar = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ID_ELIMINAR,
            payload: id
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProductoAction = (data, id) => async (dispatch, getState) => {
    try {
        const res = await axios.put(`${url}/api/productos/${id}`, data);
        dispatch({
            type: UPDATE_PRODUCTO_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateCategoriaProductoAction = (data, id) => async (dispatch, getState) => {
    try {
        const res = await axios.put(`${url}/api/CategoriaProducto/${id}`, data);
        dispatch({
            type: UPDATE_CATEGORIA_PRODUCTO_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const eliminarProductoAction = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`${url}/api/productos/${id}`)
        dispatch({
            type: ELIMINAR_PRODUCTO_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
