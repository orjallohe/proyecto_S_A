import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
import ListaProducto from './productos/listaProducto';
import ListaCategoriaProducto from './productos/listaCategoriaProducto';
import {Provider} from 'react-redux'
import generateStore from '../redux/store'
import CrearProducto from './productos/crearProducto';




function AppMain() {
    const store = generateStore()
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <ListaProducto />
                    </Route>
                    <Route path="/producto" exact>
                        <ListaProducto />
                    </Route>
                    <Route path="/CrearProducto">
                        <CrearProducto />
                    </Route>
                    <Route path="/categoriaProducto">
                        <ListaCategoriaProducto />
                    </Route>

                </Switch>
            </Router>
        </Provider>
    );
}

export default AppMain;

if (document.getElementById('AppMain')) {
    ReactDOM.render(<AppMain />, document.getElementById('AppMain'));
}
