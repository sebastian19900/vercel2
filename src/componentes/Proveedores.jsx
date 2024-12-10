import React, { useState } from "react";
import axios from "axios";

function Proveedores() {
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    articulo: "",
  });

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.contacto || !formData.articulo) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/sm-app/proveedores", // Asegúrate de que la URL sea correcta
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        alert("Proveedor registrado con éxito");
        setFormData({ nombre: "", contacto: "", articulo: "" });
      } else {
        alert("Error al registrar el proveedor. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al guardar el proveedor:", error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error al conectar con el servidor. Verifica la conexión.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <h2>Registrar Proveedor</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <label htmlFor="nombre">Nombre del Proveedor:</label>
        <input
          type="text"
          id="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          required
          style={{ padding: "10px", height: "40px" }}
        />

        <label htmlFor="contacto">Contacto:</label>
        <input
          type="text"
          id="contacto"
          value={formData.contacto}
          onChange={handleInputChange}
          required
          style={{ padding: "10px", height: "40px" }}
        />

        <label htmlFor="articulo">Artículo:</label>
        <input
          type="text"
          id="articulo"
          value={formData.articulo}
          onChange={handleInputChange}
          required
          style={{ padding: "10px", height: "40px" }}
        />

        <button type="submit" style={{ padding: "10px", height: "40px" }}>
          Añadir Proveedor
        </button>
      </form>
    </div>
  );
}

export default Proveedores;
