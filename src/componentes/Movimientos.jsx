import React, { useState } from 'react';
import axios from 'axios';

const Movimientos = () => {
    const [formData, setFormData] = useState({
        nombreProducto: '', // Campo para el nombre del producto
        cantidad: '',
        qr: '',
        precio: '',
        tipo: 'entrada', // Selección inicial: entrada
    });

    const [loading, setLoading] = useState(false); // Estado para manejar la carga

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Iniciar el proceso de carga

        try {
            // Determinar el endpoint según el tipo de movimiento
            const endpoint =
                formData.tipo === 'entrada'
                    ? 'http://localhost:8080/sm-app/entradas'
                    : 'http://localhost:8080/sm-app/salidas'; // Endpoint para entradas o salidas

            // Enviar los datos al backend
            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Verificar si la respuesta es satisfactoria
            if (response.status === 201 || response.status === 200) {
                alert(`Movimiento de ${formData.tipo} registrado con éxito.`);
                // Limpiar el formulario después de enviar
                setFormData({
                    nombreProducto: '',
                    cantidad: '',
                    qr: '',
                    precio: '',
                    tipo: 'entrada', // Restablecer a entrada
                });
            } else {
                console.error('Error inesperado:', response.data);
                alert('Hubo un error al registrar el movimiento. Verifique los datos.');
            }
        } catch (error) {
            console.error('Error al registrar el movimiento:', error.response || error);
            alert(
                `Error al registrar el movimiento: ${
                    error.response?.data?.message || error.message || 'Error desconocido'
                }`
            );
        } finally {
            setLoading(false); // Detener la carga
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '10vh',
                flexDirection: 'column',
                textAlign: 'center',
            }}
        >
            <h2>Movimientos</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                    maxWidth: '600px',
                    width: '100%',
                }}
            >
                <label>Nombre de Producto:</label>
                <input
                    type="text"
                    name="nombreProducto"
                    value={formData.nombreProducto}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', height: '40px' }}
                />

                <label>Cantidad:</label>
                <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', height: '40px' }}
                />

                <label>QR:</label>
                <input
                    type="text"
                    name="qr"
                    value={formData.qr}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', height: '40px' }}
                />

                <label>Precio:</label>
                <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                    style={{ padding: '10px', height: '40px' }}
                />

                <label>Tipo de Movimiento:</label>
                <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    style={{ padding: '10px', height: '40px' }}
                >
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                </select>

                <button
                    type="submit"
                    style={{ padding: '10px', height: '40px' }}
                    disabled={loading}
                >
                    {loading ? 'Registrando...' : 'Registrar Movimiento'}
                </button>
            </form>
        </div>
    );
};

export default Movimientos;
