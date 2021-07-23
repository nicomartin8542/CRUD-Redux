import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from "../types/index";

export const mostrarAlerta = (alerta) => {
	return (dispatch) => {
		dispatch(muestroAlerta(alerta));

		setTimeout(() => {
			dispatch(ocultarAlerta());
		}, 2500);
	};
};

const muestroAlerta = (alerta) => ({
	type: MOSTRAR_ALERTA,
	payload: alerta,
});

const ocultarAlerta = () => ({
	type: OCULTAR_ALERTA,
});
