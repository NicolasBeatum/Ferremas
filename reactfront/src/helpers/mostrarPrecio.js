import { useMoneda } from '../context/MonedaContext';

export default function useMostrarPrecio() {
  const { moneda, valorDolar } = useMoneda();
  return (precioCLP) => {
    if (moneda === "USD") {
      return `$${(precioCLP / valorDolar).toFixed(2)} USD`;
    }
    return `$${precioCLP} CLP`;
  };
}