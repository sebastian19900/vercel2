import React, { useState } from 'react';

const Informes = () => {
    const [informe, setInforme] = useState(''); // Estado para mostrar el informe generado

    const handleGenerateReport = (e) => {
        e.preventDefault();
        // Aquí puedes simular la generación de un informe o realizar una llamada a una API
        const generatedReport = 'Este es un informe generado. (Simulación)';
        setInforme(generatedReport);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Informes</h2>
            <form onSubmit={handleGenerateReport} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em' }}>
                <label>
                    Seleccione tipo de informe:
                    <select name="tipoInforme" style={{ width: '100%', padding: '0.5em' }} required>
                        <option value="inventario">Inventario</option>
                        <option value="movimientos">Movimientos</option>
                        <option value="proveedores">Proveedores</option>
                    </select>
                </label>
                <button type="submit" style={{ padding: '0.6em 1.2em', borderRadius: '5px', cursor: 'pointer' }}>
                    Generar Informe
                </button>
            </form>
            {informe && (
                <div style={{ marginTop: '1em', padding: '1em', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                    <h3>Informe Generado</h3>
                    <p>{informe}</p>
                </div>
            )}
        </div>
    );
};

export default Informes;
