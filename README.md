<!--
------------------------------------------------------------------------------
| PARCIAL #1 DESARROLLO DE APLICACIONES MOVILES AVANZADAS                    |
| ALUMNO: DENNYS VLADIMIR NAVARRETE SIBRIAN                                  |
| CARNET: NS100221                                                           |
| DOCENTE: WILFREDO BENJAMIN MAGAÑA MARTINEZ                                 |                                                          
| PROYECTO: API PAISES Y SU INFORMACION, https://restcountries.com/v3.1/all  |
------------------------------------------------------------------------------

1. Como primer punto empezamos con elegir de que sera nuestra app que en mi caso sera que me muestre informacion
   de un pais aleatorio.
   


2. Luego pasamos con la instalacion de los programas requeridos:

   -En este caso NODE.JS en el cual activaremos el NPM y el AXION que nos ayudará a hacer las solicitudes HTTP a la API.
   -Tambien nos descargamos el Visual Studio Code en el cual descargaremos la extencion de JavaScript.



3. Luego pasaremos a la creacion de nuestro proyecto desde la terminal o CMD y colocaremos lo siguiente:
   -npx create-react-app parcial1ns100221 y todo esto con letras minusculas para evitar errores.



4. Luego de esto se nos creara una carpeta con todo lo necesario para trabajar dentro de Visual Studio code asi que solo
   Procederemos a arrastrar esta carpeta al Visual Studio Code.



5. Luego trabajaremos en el apartado de Visual Studio Code en donde abriremos el archivo APP.JS y aca daremos lo que es la funcionalidad
   Aca trabajaremos el apartado de React que mostrara la informacion sobre un pais aleatorio obtenida de la API y que se actualiza automaticamente
   cada 10 segundos, aca dejo el codigo que utilice en el App.js:
   
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




6.  Luego tenemos que hacer el diseño el cual sera CSS entonces trabajaremos en el apartado APP.CSS en el cual agregamos estos diseños
aca dejo el codigo:

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
  align-items: center;
  justify-content: center;
}

.app {
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1200px;
}

.header {
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.main-content {
  background-color: white;
  border-radius: 0 0 8px 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

.info-card .flag {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.info-details {
  padding: 10px;
}

.info-details h2 {
  font-size: 1.8em;
  margin: 10px 0;
  color: #333;
}

.info-details p {
  font-size: 1.2em;
  margin: 5px 0;
  color: #555;
}

.footer {
  margin-top: 20px;
  font-size: 1.1em;
  color: #333;
}




7. Mi proyecto tambien cuenta con su debido manejo de errores de la siguiente manera:

- Captura de Errores: Utiliza un bloque try/catch en la función obtenerPais.
- Actualización de Estado: Si ocurre un error, actualiza el estado error con un mensaje y establece cargando en false.
- Mostrar Mensaje: Muestra el mensaje de error en la interfaz si error no es null.



8. Ya como los ultimos pasos guardamos todo y procedemos a abrir una nueva terminal dentro de nuestro proyecto en el cual colocaremos el siguiente comando:

npm start 

Y solo esperamos ya que nos direccionara a nuestro navegador en donde veremos todo el funcionamiento de nuestra app, aca dejo lo que encontraremos.

-Apartado de Explorador de paises
-Bandera del pais
-Nombre del pais
-Capital de este pais
-Poblacion de este pais
-Region de este pais
-Y la actualizacion que se realiza cada 10 segundos

-->

<!-- ESTO DE ACA ABAJO SE CREA AUTOMATICAMENTE AL CREAR LA CARPETA DESDE LA TERMINAL O CMD-->
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
