import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {editarProducto} from "../action/productoAction";
import {mostrarAlerta} from "../action/alertaAction";

import {useDispatch, useSelector} from "react-redux";

const EditarProducto = () => {
	//Creo el state local
	const [prod, modificarProducto] = useState({
		nombre: "",
		precio: 0,
	});

	//Extraigo propiedades del state
	const {nombre, precio} = prod;

	//Creo dispatch
	const dispatch = useDispatch();

	//Creo variable para redireccionar
	const history = useHistory();

	//Extraigo los state del reducer
	const {edicionProducto} = useSelector((state) => state.productos);
	const {alerta} = useSelector((state) => state.alerta);

	//Valido que tenga cargado el state de productos
	if (!edicionProducto) history.push("/");

	//Cargo state local cuando este montado el components
	useEffect(() => {
		modificarProducto(edicionProducto);
	}, [edicionProducto]);

	//Capturar cambios realizados
	const handleChange = (e) => {
		modificarProducto({
			...prod,
			[e.target.name]: e.target.value,
		});
	};

	//Funcion para editar los campos
	const onSubmit = (e) => {
		e.preventDefault();

		//Valido datos del formaulario
		if (nombre.trim() === "" || precio < 1 || isNaN(precio)) {
			const mensaje = {
				msg: "Todos los campos son obligatorios",
				categoria: "alert alert-danger p2 mt-4 text-center",
			};
			dispatch(mostrarAlerta(mensaje));
			return;
		}

		//Cargo datos actualizados en el state
		dispatch(editarProducto(prod));

		//Reinicio state
		modificarProducto({
			nombre: "",
			precio: 0,
		});

		//Envio a listado de productos
		history.push("/");
	};

	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">
							Editar producto
						</h2>

						<form onSubmit={onSubmit}>
							{alerta ? (
								<div className={alerta.categoria}>{alerta.msg}</div>
							) : null}

							<div className="form-group">
								<label htmlFor="nombre">Nombre Producto</label>
								<input
									type="text"
									className="form-control"
									placeholder="Nombre Producto"
									name="nombre"
									value={nombre}
									onChange={(e) => handleChange(e)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="precio">Precio Producto</label>
								<input
									type="number"
									className="form-control"
									placeholder="Precio Producto"
									name="precio"
									value={precio}
									onChange={(e) => handleChange(e)}
								/>
							</div>

							<button
								type="submit"
								className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
							>
								Guardar cambios
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditarProducto;
