import axios from 'axios';
import url from '../url';
// constantes
const dataInicial = {
    productos: [],
    categoriaProducto:[]
}

// types
const GET_PRODUCTO_SUCCESS = 'GET_PRODUCTO_SUCCESS'
const INSERT_PRODUCTO_SUCCESS = 'INSERT_PRODUCTO_SUCCESS'
const GET_CATEGORIA_PRODUCTO_SUCCESS = 'GET_CATEGORIA_PRODUCTO_SUCCESS'


// reducer
export default function productoReducer(state = dataInicial, action){
    switch(action.type){
        case GET_PRODUCTO_SUCCESS:
            return {...state, productos: action.payload}
        case GET_CATEGORIA_PRODUCTO_SUCCESS:
            return {...state, categoriaProducto: action.payload}
        case INSERT_PRODUCTO_SUCCESS:

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
