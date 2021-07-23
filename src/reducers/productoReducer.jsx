import {
	AGREGAR_PRODUCTO,
	AGREGAR_PRODUCTO_EXITO,
	AGREGAR_PRODUCTO_ERROR,
	COMENZAR_DESCARGAS_PRODUCTOS,
	COMENZAR_DESCARGAS_EXITO,
	COMENZAR_DESCARGAS_ERROR,
	ELIMINAR_PRODUCTO,
	ELIMINAR_PRODUCTO_EXITO,
	ELIMINAR_PRODUCTO_ERROR,
	OBTENER_PRODUCTO_EDITAR,
	EDITAR_PRODUCTO,
	EDITAR_PRODUCTO_EXITO,
	EDITAR_PRODUCTO_ERROR,
} from "../types/index";

//Cada reducer tiene su propio state
const initialState = {
	productos: [],
	error: null,
	loading: false,
	productoEliminar: null,
	edicionProducto: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case COMENZAR_DESCARGAS_PRODUCTOS:
		case AGREGAR_PRODUCTO:
		case EDITAR_PRODUCTO:
			return {
				...state,
				loading: action.payload,
			};

		case EDITAR_PRODUCTO_EXITO:
			return {
				...state,
				productos: state.productos.map((p) =>
					p.id === action.payload.id ? action.payload : p,
				),
				edicionProducto: null,
			};

		case ELIMINAR_PRODUCTO:
			return {
				...state,
				productoEliminar: action.payload,
			};

		case OBTENER_PRODUCTO_EDITAR:
			return {
				...state,
				edicionProducto: action.payload,
			};

		case AGREGAR_PRODUCTO_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				productos: [...state.productos, action.payload],
				edicionProducto: null,
			};

		case ELIMINAR_PRODUCTO_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				productos: state.productos.filter((p) => p.id !== action.payload),
				productoEliminar: null,
			};

		case COMENZAR_DESCARGAS_EXITO:
			return {
				...state,
				loading: false,
				error: false,
				edicionProducto: null,
				productos: action.payload,
			};

		case COMENZAR_DESCARGAS_ERROR:
		case EDITAR_PRODUCTO_ERROR:
		case ELIMINAR_PRODUCTO_ERROR:
		case AGREGAR_PRODUCTO_ERROR:
			return {
				...state,
				loading: false,
				edicionProducto: null,
				error: action.payload,
			};

		default:
			return state;
	}
}
