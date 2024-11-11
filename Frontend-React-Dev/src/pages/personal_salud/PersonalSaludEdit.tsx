import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../personal_salud/style/personal_saludEdit.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PersonalSaludFormProps {
  isEditing: boolean;
}

const PersonalSaludEdit: React.FC<PersonalSaludFormProps> = ({ isEditing }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    primer_apellido: '',
    segundo_apellido: '',
    ci: '',
    telefono: '',
    matricula_profesional: '',
    correo_electronico: '',
    especialidad: '',
    genero: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log("ID:", id, "isEditing:", isEditing); // Verifica valores
  if (isEditing && id) {
    fetch(`http://localhost:3000/personal-salud/${id}`)
      .then(response => response.json())
      .then(data => setFormData(data))
      .catch(() => setErrorMessage('No se pudo cargar los datos del personal de salud'));
  }
}, [isEditing, id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = isEditing ? `http://localhost:3000/personal-salud/${id}` : 'http://localhost:3000/personal-salud';
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar los datos');
        }
        setSuccessMessage(isEditing ? 'Personal de salud actualizado correctamente' : 'Personal de salud creado correctamente');
        setTimeout(() => navigate('/personal-salud'), 1500);
      })
      .catch(() => setErrorMessage('Error al guardar los datos'));
  };

  return (
  <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
  <h2 className="text-center" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>{isEditing ? 'Editar Personal de Salud' : 'Registrar Personal de Salud'}</h2>
  {errorMessage && <div className="alert alert-danger" style={{ marginBottom: '15px', color: '#721c24', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '4px', border: '1px solid #f5c6cb' }}>{errorMessage}</div>}
  {successMessage && <div className="alert alert-success" style={{ marginBottom: '15px', color: '#155724', backgroundColor: '#d4edda', padding: '10px', borderRadius: '4px', border: '1px solid #c3e6cb' }}>{successMessage}</div>}
  <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '800px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label htmlFor="nombres" style={{ fontWeight: 'bold', color: '#555' }}>Nombres:</label>
        <input
          type="text"
          id="nombres"
          name="nombres"
          value={formData.nombres}
          onChange={handleInputChange}
          className="form-control"
          style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label htmlFor="ci" style={{ fontWeight: 'bold', color: '#555' }}>C.I.:</label>
        <input
          type="text"
          id="ci"
          name="ci"
          value={formData.ci}
          onChange={handleInputChange}
          className="form-control"
          style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label htmlFor="primer_apellido" style={{ fontWeight: 'bold', color: '#555' }}>Primer Apellido:</label>
        <input
          type="text"
          id="primer_apellido"
          name="primer_apellido"
          value={formData.primer_apellido}
          onChange={handleInputChange}
          className="form-control"
          style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label htmlFor="segundo_apellido" style={{ fontWeight: 'bold', color: '#555' }}>Segundo Apellido:</label>
        <input
          type="text"
          id="segundo_apellido"
          name="segundo_apellido"
          value={formData.segundo_apellido}
          onChange={handleInputChange}
          className="form-control"
          style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label htmlFor="correo_electronico" style={{ fontWeight: 'bold', color: '#555' }}>Correo Electrónico:</label>
        <input
          type="email"
          id="correo_electronico"
          name="correo_electronico"
          value={formData.correo_electronico}
          onChange={handleInputChange}
          className="form-control"
          style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label htmlFor="telefono" style={{ fontWeight: 'bold', color: '#555' }}>Teléfono:</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          className="form-control"
          style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label htmlFor="matricula_profesional" style={{ fontWeight: 'bold', color: '#555' }}>Matrícula Profesional:</label>
        <input
          type="text"
          id="matricula_profesional"
          name="matricula_profesional"
          value={formData.matricula_profesional}
          onChange={handleInputChange}
          className="form-control"
          style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label htmlFor="especialidad" style={{ fontWeight: 'bold', color: '#555' }}>Especialidad:</label>
        <select
          id="especialidad"
          name="especialidad"
          value={formData.especialidad}
          onChange={handleInputChange}
          className="form-control"
          style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Seleccione una opción</option>
          <option value="oftalmologia">Oftalmología</option>
          <option value="cardiologia">Cardiología</option>
          <option value="pediatria">Pediatría</option>
        </select>
      </div>

      <div className="form-group" style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: 'bold', color: '#555' }}>Género:</label>
        <div className="gender-options" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="radio"
              id="generoM"
              name="genero"
              value="M"
              checked={formData.genero === 'M'}
              onChange={handleInputChange}
              style={{ marginRight: '5px' }}
            />
            <label htmlFor="generoM" style={{ color: '#555' }}>Masculino</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="radio"
              id="generoF"
              name="genero"
              value="F"
              checked={formData.genero === 'F'}
              onChange={handleInputChange}
              style={{ marginRight: '5px' }}
            />
            <label htmlFor="generoF" style={{ color: '#555' }}>Femenino</label>
          </div>
        </div>
      </div>
    </div>

    <div className="button-group" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <button type="submit" className="btn-primary" style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}>
        {isEditing ? 'Actualizar' : 'Registrar'}
      </button>
      <button type="reset" className="btn-secondary" style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#6c757d', color: '#fff', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5a6268')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6c757d')}>
        Limpiar
      </button>
      <button type="button" className="btn-danger" style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.3s' }}
        onClick={() => navigate('/personal-salud')}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}>
        Cancelar
      </button>
    </div>
  </form>
</div>

  );
};

export default PersonalSaludEdit;









// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// //import '../personal_salud/style/personal_saludEdit.css'

// interface PersonalSaludFormProps {
//   isEditing: boolean;
// }

// const PersonalSaludEdit: React.FC<PersonalSaludFormProps> = ({ isEditing }) => {
//   const [formData, setFormData] = useState({
//     nombres: '',
//     primer_apellido: '',
//     segundo_apellido: '',
//     nacionalidad: '',
//     ci: '',
//     telefono: '',
//     matricula_profesional: '',
//     correo_electronico: '',
//     especialidad: '',
//     genero: '',
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>(); // Para obtener el ID del personal a editar

//   useEffect(() => {
//     if (isEditing && id) {
//       // Cargar los datos existentes para editar
//       fetch(`http://localhost:3000/personal-salud/${id}`)
//         .then(response => response.json())
//         .then(data => setFormData(data))
//         .catch(() => setErrorMessage('No se pudo cargar los datos del personal de salud'));
//     }
//   }, [isEditing, id]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const url = isEditing ? `http://localhost:3000/personal-salud/${id}` : 'http://localhost:3000/personal-salud';
//     const method = isEditing ? 'PUT' : 'POST';

//     fetch(url, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Error al guardar los datos');
//         }
//         setSuccessMessage(isEditing ? 'Personal de salud actualizado correctamente' : 'Personal de salud creado correctamente');
//         setTimeout(() => navigate('/personal-salud'), 1500); // Redirigir después de 1.5 segundos
//       })
//       .catch(() => setErrorMessage('Error al guardar los datos'));
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">{isEditing ? 'Editar Personal de Salud' : 'Registrar Personal de Salud'}</h2>
//       {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
//       {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
//       <form onSubmit={handleSubmit} className="needs-validation">
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label htmlFor="nombres" className="form-label">Nombres:</label>
//             <input
//               type="text"
//               id="nombres"
//               name="nombres"
//               value={formData.nombres}
//               onChange={handleInputChange}
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="ci" className="form-label">C.I.:</label>
//             <input
//               type="text"
//               id="ci"
//               name="ci"
//               value={formData.ci}
//               onChange={handleInputChange}
//               className="form-control"
//               required
//             />
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label htmlFor="primer_apellido" className="form-label">Primer Apellido:</label>
//             <input
//               type="text"
//               id="primer_apellido"
//               name="primer_apellido"
//               value={formData.primer_apellido}
//               onChange={handleInputChange}
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="segundo_apellido" className="form-label">Segundo Apellido:</label>
//             <input
//               type="text"
//               id="segundo_apellido"
//               name="segundo_apellido"
//               value={formData.segundo_apellido}
//               onChange={handleInputChange}
//               className="form-control"
//             />
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label htmlFor="correo_electronico" className="form-label">Correo Electrónico:</label>
//             <input
//               type="email"
//               id="correo_electronico"
//               name="correo_electronico"
//               value={formData.correo_electronico}
//               onChange={handleInputChange}
//               className="form-control"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label htmlFor="telefono" className="form-label">Teléfono:</label>
//             <input
//               type="tel"
//               id="telefono"
//               name="telefono"
//               value={formData.telefono}
//               onChange={handleInputChange}
//               className="form-control"
//             />
//           </div>
//         </div>
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label htmlFor="matricula_profesional" className="form-label">Matrícula Profesional:</label>
//             <input
//               type="text"
//               id="matricula_profesional"
//               name="matricula_profesional"
//               value={formData.matricula_profesional}
//               onChange={handleInputChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="especialidad" className="form-label">Especialidad:</label>
//             <select
//               id="especialidad"
//               name="especialidad"
//               value={formData.especialidad}
//               onChange={handleInputChange}
//               className="form-select"
//             >
//               <option value="">Seleccione una opción</option>
//               <option value="oftalmologia">Oftalmología</option>
//               <option value="cardiologia">Cardiología</option>
//               <option value="pediatria">Pediatría</option>
//               {/* Agregar más opciones según sea necesario */}
//             </select>
//           </div>
//         </div>
//         <div className="row mb-3">
          
//           <div className="col-md-6">
//             <label className="form-label">Género:</label>
//             <div className="d-flex align-items-center">
//               <div className="form-check me-3">
//                 <input
//                   type="radio"
//                   name="genero"
//                   value="M"
//                   checked={formData.genero === 'M'}
//                   onChange={handleInputChange}
//                   className="form-check-input"
//                   id="generoM"
//                 />
//                 <label htmlFor="generoM" className="form-check-label">Masculino</label>
//               </div>
//               <div className="form-check">
//                 <input
//                   type="radio"
//                   name="genero"
//                   value="F"
//                   checked={formData.genero === 'F'}
//                   onChange={handleInputChange}
//                   className="form-check-input"
//                   id="generoF"
//                 />
//                 <label htmlFor="generoF" className="form-check-label">Femenino</label>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="d-flex justify-content-between mt-4">
//           <button type="submit" className="btn btn-primary">
//             {isEditing ? 'Actualizar' : 'Registrar'}
//           </button>
//           <button type="button" className="btn btn-secondary" onClick={() => setFormData({
//             nombres: '',
//             primer_apellido: '',
//             segundo_apellido: '',
//             nacionalidad: '',
//             ci: '',
//             telefono: '',
//             matricula_profesional: '',
//             correo_electronico: '',
//             especialidad: '',
//             genero: '',
//           })}>
//             Limpiar
//           </button>
//           <button type="button" className="btn btn-danger" onClick={() => navigate('/personal-salud')}>
//             Cancelar
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PersonalSaludEdit;
