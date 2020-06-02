import React from 'react';

import './assets/css/App.css';

//Importar componentes


//import SeccionPruebas from './components/SeccionPruebas';
//import Peliculas from './components/Peliculas';
import Router from './Router';




//Se pueden insertar componentes dentro de otros componentes

function App() {
  return (
    <div className="App">
        <Router />
    </div>  
  );
}

export default App;
