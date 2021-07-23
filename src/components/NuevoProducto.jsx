import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

//Action para producto/reducer
import {crearProductoAction} from "../action/productoAction";
import {mostrarAlerta} from "../action/alertaAction";

const NuevoProducto = ({history}) => {
	//utilizar useDispatch y te crea una funcion
	const dispatch = useDispatch();

	//manda a llamar a la funcion del action
	const agregarProcuto = () => dispatch(crearProductoAction(producto));

	//Accedo al state del reducer
	const {loading, error} = useSelector((state) => state.productos);
	const {alerta} = useSelector((state) => state.alerta);

	//Creo state para nuevo producto
	const [producto, cargarProducto] = useState({
		nombre: "",
		precio: 0,
	});

	//Extraigo datos del state
	const {nombre, precio} = producto;

	//Hanlde de submit de form
	const onSubmit = async (e) => {
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

		//Creo producto
		agregarProcuto();

		//Limpiar el state local
		cargarProducto({
			nombre: "",
			precio: 0,
		});

		//Rediceccionar al home
		history.push("/");
	};

	const handleChange = (e) => {
		cargarProducto({
			...producto,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">
							Agregar nuevo producto
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
								Agregar Producto
							</button>
						</form>
						{loading ? <p>Cargando...</p> : null}
						{error ? (
							<p className="alert alert-danger p2 mt-4 text-center">
								Error al cargar el producto
							</p>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NuevoProducto;
