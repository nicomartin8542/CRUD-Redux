import {combineReducers} from "redux";
import productoReducer from "./productoReducer";
import alertaReducer from "./alertaReducer";

export default combineReducers({
	productos: productoReducer,
	alerta: alertaReducer,
});
