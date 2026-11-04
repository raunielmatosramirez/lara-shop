export const EVENTO_ABRIR_TARIFAS = "larashoping:tarifas";
export const EVENTO_ABRIR_RECOGIDA = "larashoping:recogida";

export function abrirTarifas() {
  window.dispatchEvent(new Event(EVENTO_ABRIR_TARIFAS));
}

export function abrirRecogida() {
  window.dispatchEvent(new Event(EVENTO_ABRIR_RECOGIDA));
}
