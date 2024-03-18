import React from 'react'

export const Home = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser([])
  }
  return (
    <div>
      <h2>{user} Bienvenido a Identidad Digital</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}
