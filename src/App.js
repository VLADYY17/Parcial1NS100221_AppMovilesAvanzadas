import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pais, setPais] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [tiempoRestante, setTiempoRestante] = useState(10);

  const obtenerPais = async () => {
    try {
      const respuesta = await axios.get('https://restcountries.com/v3.1/all');
      const paisAleatorio = respuesta.data[Math.floor(Math.random() * respuesta.data.length)];
      setPais({
        nombre: paisAleatorio.translations.spa.common,
        poblacion: paisAleatorio.population.toLocaleString(),
        region: paisAleatorio.region,
        capital: paisAleatorio.capital ? paisAleatorio.capital[0] : 'N/A',
        bandera: paisAleatorio.flags.svg,
      });
      setError(null);
      setCargando(false);
    } catch (error) {
      console.error("Error al obtener datos:", error.message || error);
      setError('Error al obtener los datos. Intenta recargar la página.');
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPais();
    const intervalo = setInterval(() => {
      obtenerPais();
      setTiempoRestante(10);
    }, 10000);

    const cuentaRegresiva = setInterval(() => {
      setTiempoRestante(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => {
      clearInterval(intervalo);
      clearInterval(cuentaRegresiva);
    };
  }, []);

  if (cargando) return <p className="cargando">Cargando datos...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="app">
      <header className="header">
        <h1>Explorador de Países</h1>
      </header>
      <main className="main-content">
        {pais && (
          <div className="info-card">
            <img className="flag" src={pais.bandera} alt={`Bandera de ${pais.nombre}`} />
            <div className="info-details">
              <h2>{pais.nombre}</h2>
              <p><strong>Capital:</strong> {pais.capital}</p>
              <p><strong>Población:</strong> {pais.poblacion}</p>
              <p><strong>Región:</strong> {pais.region}</p>
            </div>
          </div>
        )}
        <footer className="footer">
          <p>Actualización en: {tiempoRestante} segundos</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
