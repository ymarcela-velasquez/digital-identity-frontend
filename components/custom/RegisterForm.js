"use client"
import axios from 'axios'
import { useState } from 'react';

export const RegisterForm = ({ setUser }) => {
  const [formData, setFormData] = useState({
    identification: '',
    identificationType: '',
    firstName: '',
    secondName: '',
    lastName: '',
    secondLastName: '',
    address: '',
    email: ''
  });
  const [error, setError] = useState(false)
  const [identificationError, setIdentificationError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const validateIdentification = () => {
    if (!/^\d{1,10}$/.test(formData.identification)) {
      setIdentificationError(true)
    } else {
      setIdentificationError(false)
    }
  }

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmailError(!emailRegex.test(formData.email))
  }

  const registerUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/citizens', formData)
      console.log('Usuario registrado:', response.data)
      // Aquí podrías realizar cualquier otra acción necesaria, como redireccionar al usuario a otra página
    } catch (error) {
      console.error('Error al registrar usuario:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (
        !formData.identification ||
        !formData.identificationType ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.address ||
        !formData.email
      ) {
        setError(true)
        return
      }
      await registerUser()
      console.log('Datos del formulario:', formData)      
    } catch (error) {
      console.log('error en formulario registro');
      setError(false)      
    }
  }

  return (
    <form className='Register-form' onSubmit={handleSubmit}>
      <input
        type="text"
        name="identification"
        value={formData.identification}
        onChange={handleChange}
        onBlur={validateIdentification}
        placeholder="Identificación"
      />
      {identificationError && (
      <p className="Error-message">
        La identificación debe ser numérica y tener máximo 10 caracteres
      </p>)}
      <input
        type="text"
        name="identificationType"
        value={formData.identificationType}
        onChange={handleChange}
        placeholder="Tipo de Identificación"
      />
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Primer Nombre"
      />
      <input
        type="text"
        name="secondName"
        value={formData.secondName}
        onChange={handleChange}
        placeholder="Segundo Nombre (opcional)"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Primer Apellido"
      />
      <input
        type="text"
        name="secondLastName"
        value={formData.secondLastName}
        onChange={handleChange}
        placeholder="Segundo Apellido (opcional)"
      />
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Dirección"
      ></textarea>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={validateEmail}
        placeholder="E-mail"
      />
      {emailError && (<p className="Error-message">
        Por favor ingrese un email válido</p>)}
      {error && <p className="Error-message">Todos los campos son obligatorios, excepto Segundo Nombre y Segundo Apellido</p>}
      <button type="submit">Registrarse</button>
    </form>
  )
}
