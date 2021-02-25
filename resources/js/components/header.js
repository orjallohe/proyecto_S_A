import React from 'react'
import styled from 'styled-components'
import {
    Link,
    NavLink
  } from "react-router-dom";


const HeaderStyled = styled.div`



`
export default function Header() {


    return (
        <HeaderStyled>
           <nav class="navbar navbar-dark bg-dark justify-content-between">
                <Link to="/" className="btn btn-dark">Inicio</Link>
                <div>

                    <Link to="/producto" className="btn btn-dark">productos</Link>
                    <Link to="/categoriaProducto" className="btn btn-dark">Categoria Producto</Link>



                </div>


            </nav>
        </HeaderStyled>
    )
}
