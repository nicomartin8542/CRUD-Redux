import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Producto from "../components/Producto";

//Action para producto/reducer
import {traerProductos} from "../action/productoAction";

const Productos = () => {
	//Creo Dispatch
	const dispatch = useDispatch();

	//Agrego al dispatch funcion para se ejecutada desde este componente
	const listarProductos = () => dispatch(traerProductos());

	//Extraigo productos de la api una vez que se haya montado el componente
	useEffect(() => {
		listarProductos();
	}, []);

	//Extraigo state del reducer
	const {loading, error, productos} = useSelector((state) => state.productos);

	if (productos.length === 0)
		return <p className="font-weight-bold text-center">Sin productos</p>;

	return (
		<Fragment>
			<h2 className="text-center my-5">Listado de Producto</h2>

			{loading ? <p>Cargando....</p> : null}
			{error ? (
				<p className="font-weight-bold alert alert-danger p2 mt-4 text-center">
					Ocurrio un error
				</p>
			) : null}

			<table className="table table-striped">
				<thead className="bg-primary table-dark">
					<tr>
						<th scope="col">Nombre</th>
						<th scope="col">Precio</th>
						<th scope="col">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{productos.map((p) => (
						<Producto key={p.id || null} producto={p} />
					))}
				</tbody>
			</table>
		</Fragment>
	);
};

export default Productos;
