# PRACTICA REDUX 

para esta sección construiremos dos mini proyectos que serviran para entender mejor redux.

## Repaso
Redux es un patron de diseño para el manejo del estado de la aplicación, evitando un flujo de arbol como lo hacemos con los states de react, y teniendo como unidad de estado un store global para todos los componentes.

![](https://github.com/daandradec/redux_ingsoft_II/blob/master/ideas_principales.png)

![](https://github.com/daandradec/redux_ingsoft_II/blob/master/terminologia.png)

## Basicos de Redux

Para esta primera parte crearemos un codigo sencillo usando redux bajo un proyecto de Node

0. Actualiza Node y npm

```
$ npm update npm
$ nvm install node
```

1. Crear una carpeta llamada basicos_redux_node
2. Pararse en esta carpeta
3. Ejecutar ```npm init```
4. Por facilidad solo insertar campos como : author y description (opcional), para lo demas solo oprimir enter
5. una vez creado ejecutar ```npm install --save redux```
6. Crear en la raiz de basicos_redux_node el archivo basicos_redux.js
7. Copiar el siguiente codigo


```
// REDUX BASICOS

// comando para ejecutarlo parados en el raiz de la carpeta de este archivo: node basicos_redux.js


const redux = require('redux');

const createStore = redux.createStore;

// state inicial
const stateInicial = {
    usuarios: []
}

// Reducer
// state y accion
const reducerPrincipal = (state = stateInicial, action) => {
    if(action.type === 'AGREGAR_USUARIO'){
        return {
            ...state, // copia del state original (contenido que tiene dentro)
            usuarios : action.nombre // modifica unicamente esta llave
        }
    }else if(action.type === 'MOSTRAR_USUARIOS'){
        return {
            ...state
        }
    }

    return state; // returna como nuevo state, el state original
}

// create store, y store (contiene el state de la aplicación)
// 3 parametros, reducer, state inicial, applymiddleware
const store = createStore(reducerPrincipal);

// Suscribe o suscripción
// Se llama cuando el store, para alguna acción utiliza el dispatch o cuando
// el state cambia
store.subscribe(() => {
    console.log('Algo cambio...', store.getState());
})

// Dispatch: es la forma de cambiar el state (ejecuta una acción que modificara el state)
//console.log(store.getState());
store.dispatch({type:'AGREGAR_USUARIO', nombre: 'Juan'} /* Este json es un action formado por un type y un payload*/);
//console.log(store.getState());
store.dispatch({type:'MOSTRAR_USUARIOS'} /* Este json es un action formado por un type y un payload */);
//console.log(store.getState());
```

8. Atender a la explicación en clase

9. Por ultimo ejecutar en la terminal (parados en la raiz donde esta este archivo)

```
$ node basicos_redux.js
```

## REACT Redux

Segundo proyecto para entender redux, pero esta vez unido con un proyecto de react.

1. clona el repositorio https://github.com/jhriverasa/borrame, y si quieres, renombra la carpeta a carrito_redux
2. si no actualizaste npm y nvm ejecuta

```
$ npm update npm
$ nvm install node
```

3. modificar el package.json con 

```
{
  "name": "redux-example",
  "version": "0.1.0",
  "private": true,
  "devDependencies": {
    "react-scripts": "0.8.5"
  },
  "dependencies": {
    "react": "^15.4.2",
    "react-bootstrap": "^0.30.7",
    "react-dom": "^15.4.2",
    "redux": "^4.0.1",
    "react-redux": "^5.0.7"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}

```

4. ejecuta ```npm install```, y como al ya estar redux y react-redux en el package.json, entonces deberia de instalarse, sino entonces ejecuta ```npm install redux react-redux```
5. Despues de darle una revisada al codigo (probar que funcione con npm start) entonces es hora de modificarlo un poco
6. parados en /src junto al App.js, el index.js y el store.js crear el archivo ActionCreators.js y copiar el siguiente codigo

```
const addToCart = product => {
    return {
        type: "ADD_TO_CART",
        product
    }
}

const removeFromCart = product => {
    return {
        type: "REMOVE_FROM_CART",
        product
    }
}

export {addToCart, removeFromCart}
```

6. ahora como usamos react-redux, la idea es no tener que hacer importaciones del store en nuestros componentes sino que este disponible asi que remplazamos el App.js por


```
import React, { Component } from 'react';
import { Navbar, Grid, Row, Col } from 'react-bootstrap';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import store from './store';
import { Provider } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar inverse staticTop>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Ecommerce</a>
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>

          <Grid>
            <Row>
              <Col sm={8}>
                <ProductList />
              </Col>
              <Col sm={4}>
                <ShoppingCart />
              </Col>
            </Row>
          </Grid>
        </div>
      </Provider>
    );
  }
}

export default App;

```

7. Por ultimo modificaremos el ShoppingCart.js para utilizar otra de las funcionalidades de react-redux

```
import React, { Component } from 'react';
import { Panel, Table, Button, Glyphicon } from 'react-bootstrap';
import {removeFromCart} from '../ActionCreators';
import { connect } from 'react-redux';

const styles = {
  footer: {
    fontWeight: 'bold'
  }
}

class ShoppingCart extends Component {
  

  render() {
    return (
      <Panel header="Shopping Cart">
        <Table fill>
          <tbody>
            {this.props.cart.map(product =>
              <tr key={product.id}>
                <td>{product.name}</td>
                <td className="text-right">${product.price}</td>
                <td className="text-right"><Button bsSize="xsmall" bsStyle="danger" onClick={() => this.props.removeFromCart(product)}><Glyphicon glyph="trash" /></Button></td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" style={styles.footer}>
                Total: ${this.props.cart.reduce((sum, product) => sum + product.price, 0)}
              </td>
            </tr>
          </tfoot>
        </Table>

      </Panel>
    )
  }

}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart(product) {
      dispatch(removeFromCart(product));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (ShoppingCart);

```

8. La explicación del codigo se hara durante la sesión de clase pero si no puedes asistir, puedes ver el tutorial de ayuda en 

```
https://www.youtube.com/watch?v=RZNNu2pO49g&list=PLxyfMWnjW2kuyePV1Gzn5W_gr3BGIZq8G&index=1
```