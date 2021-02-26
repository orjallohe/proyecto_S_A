import axios from 'axios';
import url from '../url';
// constantes
const dataInicial = {
    productos: [],
    categoriaProducto:[],
    idEliminar: null,
    idCategoria:null
}

// types
const GET_PRODUCTO_SUCCESS = 'GET_PRODUCTO_SUCCESS'
const INSERT_PRODUCTO_SUCCESS = 'INSERT_PRODUCTO_SUCCESS'
const INSERT_CATEGORIA_PRODUCTO_SUCCESS = 'INSERT_CATEGORIA_PRODUCTO_SUCCESS'
const UPDATE_PRODUCTO_SUCCESS = 'UPDATE_PRODUCTO_SUCCESS'
const UPDATE_CATEGORIA_PRODUCTO_SUCCESS = 'UPDATE_CATEGORIA_PRODUCTO_SUCCESS'
const GET_CATEGORIA_PRODUCTO_SUCCESS = 'GET_CATEGORIA_PRODUCTO_SUCCESS'
const GET_ID_ELIMINAR = 'GET_ID_ELIMINAR'
const GET_ID_CATEGORIA = 'GET_ID_CATEGORIA'
const ELIMINAR_PRODUCTO_SUCCESS = 'ELIMINAR_PRODUCTO_SUCCESS'
const ELIMINAR_CATEGORIA_PRODUCTO_SUCCESS = 'ELIMINAR_CATEGORIA_PRODUCTO_SUCCESS'
const FILTRAR_PRODUCTO_SUCCESS = 'FILTRAR_PRODUCTO_SUCCESS'


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

        case GET_ID_CATEGORIA:
            return {...state, idCategoria: action.payload}

        case ELIMINAR_PRODUCTO_SUCCESS:
            return {...state, productos: action.payload}

        case ELIMINAR_CATEGORIA_PRODUCTO_SUCCESS:
            return {...state, categoriaProducto: action.payload}
        case FILTRAR_PRODUCTO_SUCCESS:
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

export const getIdCategoria = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ID_CATEGORIA,
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

export const eliminarCategoriaProductoAction = (id) => async (dispatch, getState) => {
    try {
        const res = await axios.delete(`${url}/api/CategoriaProducto/${id}`)
        dispatch({
            type: ELIMINAR_CATEGORIA_PRODUCTO_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const filtrarProductoAction = (data) => async (dispatch, getState) => {
    try {
        const productos = getState().productos.productos
        const productosFiltrados = productos.filter(producto => producto.nombre.startsWith(data))
        dispatch({
            type: FILTRAR_PRODUCTO_SUCCESS,
            payload: productosFiltrados
        })
    } catch (error) {
        console.log(error)
    }
}
