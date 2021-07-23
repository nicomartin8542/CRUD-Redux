import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

//Configuracion para que la pagina funcion en cualquier navegador sin importar que tenga la extencion reduce devtoolls instalada
const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  })
		: compose;

//compose
const enhancer = composeEnhancers(applyMiddleware(thunk));

//Creo store para poner en APP.jsx
const store = createStore(reducer, enhancer);

export default store;
