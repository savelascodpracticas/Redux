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