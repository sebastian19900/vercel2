import React from 'react';
import Inventario from './componentes/Inventario';
import Proveedores from './componentes/Proveedores';
import Movimientos from './componentes/Movimientos';
import Informes from './componentes/Informes';
import './App.css'; // Importa los estilos globales

const App = () => {
    return (
        <div id="app-container"> {/* Contenedor principal */}
            <h1>Gestión de Inventario</h1>
            <div className="content">
                <Inventario />
                <Proveedores />
                <Movimientos />
                <Informes />
            </div>
        </div>
    );
};

export default App;
