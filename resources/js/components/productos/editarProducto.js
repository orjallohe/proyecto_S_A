import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import url from '../../url'

const EditarProductoStyled = styled.div`


`
export default function EditarProducto() {
    let { codigo } = useParams();
    const [codigoState, setCodigo] = useState("")
    const [nombre, setNpmbre] = useState("")
    useEffect(() => {
        axios.get(`${url}/api/productos/${codigo}`)
        .then(res => {
            setCodigo(res.data.codigo)
        })

    },[])

    return (
        <EditarProductoStyled>
           <form>
               <input type="text"
               onChange={ (e) => setCodigo(e.target.value) }
               value={codigoState}/>
           </form>

        </EditarProductoStyled>
    )
}
