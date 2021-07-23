import React from "react";
import {useHistory} from "react-router-dom";
import Swal from "sweetalert2";

//Redux
import {useDispatch} from "react-redux";

//Imports para usar el reducer
import {eliminarProucto, obtenerProductoEditar} from "../action/productoAction";

const Producto = ({producto}) => {
	//Creo dispatch
	const dispatch = useDispatch();

	//Creo variable para redireccionar pagina
	const history = useHistory();

	const {nombre, precio, id} = producto;

	//Funcion para eliminar
	const onClickEliminar = (id) => {
		//Pregunto si quiere eliminar el producto
		Swal.fire({
			title: "Esta seguro?",
			text: "Esta por eliminar un producto!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, eliminar!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(eliminarProucto(id));
			}
		});
	};

	//Funcion para redireccionar a pantalla editar
	const redireccionarEdicion = (producto) => {
		dispatch(obtenerProductoEditar(producto));
		history.push(`/producto/editar/${producto.id}`);
	};

	return (
		<tr>
			<td>{nombre}</td>
			<td>
				<span className="font-weight-bold">{precio}</span>
			</td>
			<td className="acciones">
				<button
					type="button"
					onClick={() => redireccionarEdicion(producto)}
					className="btn btn-primary mr-2"
				>
					Editar
				</button>

				<button
					className="btn btn-danger"
					type="button"
					onClick={() => onClickEliminar(id)}
				>
					Eliminar
				</button>
			</td>
		</tr>
	);
};

export default Producto;
