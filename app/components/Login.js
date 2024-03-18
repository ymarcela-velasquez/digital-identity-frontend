"use client"
import React from 'react'
import { useState } from 'react'
import '../App.css'

export const Login = ({ setUser }) => {
  const [identification, setIdentification] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const handleChangeIdentification = (event) => {
    // Validate that identification is numerical and its length doesn't exceed 10 characters
    const value = event.target.value    
    if (!isNaN(value) && value.length <= 10) {
      setIdentification(value)
      setShowWarning(false)
    } else {
      setShowWarning(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (identification === '' || email === '') {
        setError(true)
        return
      }    
      setUser([identification])
    } catch (error) {
      console.log('error en login')
      setError(false)
    }
  }
  const handleChangeEmail = (event) => {
    const value = event.target.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setEmail(value);
    setEmailError(!emailPattern.test(value))
  }
  return (
    <section>
      <h1>Inicie sesión en su cuenta</h1>
      <form className="Login" onSubmit={handleSubmit}>
        <input
          type="text"
          value={identification}
          onChange={handleChangeIdentification}
          placeholder="Documento de identidad"
        />
        {showWarning && (
          <p className='Error-message'>
            La identificación debe ser numérica y tener máximo 10 caracteres
          </p>
        )}
        <input
          type="text"
          value={email}
          onChange={handleChangeEmail}
          placeholder="Email"
        />
        {emailError && ( 
          <p className='Error-message'>Por favor ingrese un email válido</p>
        )}
        <button>Ingresar</button>
      </form>
      {error && (
        <p className='Error-message'>
          Todos los campos son obligatorios
        </p>
      )}
    </section>
  )
}
