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

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//Funciones para comunicarse con el reducer
export const crearProductoAction = (producto) => {
	return async (dispatch) => {
		dispatch(agregarProcuto());

		try {
			//insertar en la API
			await clienteAxios.post("/productos", producto);

			//Actualizo state por carga exitosa
			dispatch(agregarProcutoExito(producto));

			//Muestro alerta
			Swal.fire("correcto", "El producto se agrego correctamente", "success");
		} catch (error) {
			console.log(error);
			//Actualizo el state por carga erronea
			dispatch(agregarProcutoError(true));

			Swal.fire({
				icon: "error",
				title: "hubo un error",
				text: "Hubo un error intenta de nuevo",
			});
		}
	};
};

//Funcion que determina que se esta por agregar un producto
const agregarProcuto = () => ({type: AGREGAR_PRODUCTO, payload: true});

//Funcion para agegar producto exito
const agregarProcutoExito = (producto) => ({
	type: AGREGAR_PRODUCTO_EXITO,
	payload: producto,
});

//Agregar producto error
const agregarProcutoError = (error) => ({
	type: AGREGAR_PRODUCTO_ERROR,
	payload: error,
});

//GET: Dispatch para poder traer los productos creados
export const traerProductos = () => {
	return async (dispatch) => {
		//Comienza descarga de productos en la API
		dispatch(descargaProductos());
		try {
			//Realizo peticion en la API
			const respuesta = await clienteAxios.get("/productos");
			dispatch(descargaProductosExito(respuesta.data));
		} catch (error) {
			//Imprimo error por si no se ejecuto bien la peticion a la API
			console.log(error);
			dispatch(descargaProductosErro());
		}
	};
};

const descargaProductos = () => ({
	type: COMENZAR_DESCARGAS_PRODUCTOS,
	payload: true,
});

const descargaProductosExito = (productos) => ({
	type: COMENZAR_DESCARGAS_EXITO,
	payload: productos,
});

const descargaProductosErro = () => ({
	type: COMENZAR_DESCARGAS_ERROR,
	payload: true,
});

//DELETE: Seccion para eliminar un producto
export const eliminarProucto = (productoId) => {
	return async (dispatch) => {
		//Comienzo a eliminar producto
		dispatch(eliminoProducto(productoId));

		try {
			//Peticion a la API para eliminar producto
			await clienteAxios.delete(`/productos/${productoId}`);
			//Luego de eliminar el producto si todo salio bien modifico state
			dispatch(eliminoProductoExito(productoId));
			Swal.fire("Eliminado!", "El producto fue eliminado ", "success");
		} catch (error) {
			console.log(error);
			//Si no se pudo eliminar muestro error
			dispatch(eliminoProductoError());
		}
	};
};

const eliminoProducto = (id) => ({
	type: ELIMINAR_PRODUCTO,
	payload: id,
});

const eliminoProductoExito = (productoId) => ({
	type: ELIMINAR_PRODUCTO_EXITO,
	payload: productoId,
});

const eliminoProductoError = () => ({
	type: ELIMINAR_PRODUCTO_ERROR,
	payload: true,
});

//Poner producto para edicion.
export const obtenerProductoEditar = (producto) => {
	return (dispatch) => {
		dispatch(obtenerProducto(producto));
	};
};

const obtenerProducto = (producto) => ({
	type: OBTENER_PRODUCTO_EDITAR,
	payload: producto,
});

//Editar producto
export const editarProducto = (producto) => {
	return async (dispatch) => {
		dispatch(edicionProducto());

		try {
			const respuesta = await clienteAxios.put(
				`/productos/${producto.id}`,
				producto,
			);
			dispatch(edicionProductoExito(respuesta.data));
			Swal.fire("correcto", "El producto se modifico correctamente", "success");
		} catch (error) {
			console.log(error);
			dispatch(edicionProductoError());
		}
	};
};

const edicionProducto = () => ({
	type: EDITAR_PRODUCTO,
});

const edicionProductoExito = (producto) => ({
	type: EDITAR_PRODUCTO_EXITO,
	payload: producto,
});

const edicionProductoError = () => ({
	type: EDITAR_PRODUCTO_ERROR,
});
