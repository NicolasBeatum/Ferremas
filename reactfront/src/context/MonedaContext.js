import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const MonedaContext = createContext();

export const useMoneda = () => useContext(MonedaContext);

export const MonedaProvider = ({ children }) => {
  const [moneda, setMoneda] = useState("CLP");
  const [valorDolar, setValorDolar] = useState(1);

  useEffect(() => {
    const fetchDolar = async () => {
      try {
        const res = await axios.get("https://mindicador.cl/api/dolar");
        setValorDolar(res.data.serie[0].valor);
      } catch (e) {
        setValorDolar(900); // Valor de respaldo
      }
    };
    fetchDolar();
  }, []);

  return (
    <MonedaContext.Provider value={{ moneda, setMoneda, valorDolar }}>
      {children}
    </MonedaContext.Provider>
  );
};