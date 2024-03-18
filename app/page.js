"use client"
import Image from "next/image";
import { useState } from 'react';
import logo from '../public/assets/identidad.png';
import { RegisterForm } from './components/RegisterForm';
import { Login } from './components/Login';
import { Home } from './components/Home';
import './App.css';
import SideNav from "./components/SideNav";
// import { SideNavigation } from './components/SideNavigation';

// import { Transfer } from '../components/Transfer';
// import { Service } from '../components/Service';
// import { Contest } from '../components/Contest';
// import { Document } from '../components/Document';

export default function HomePage() {
  const [user, setUser] = useState([])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='App'>
        <header className='App-header'>
          <Image src={logo} className='App-logo' alt="logo" />
          <p style={{ color: '#186077', fontSize: '36px', fontWeight: 'bold' }}>Identidad Digital</p>
          {
            !user.length > 0 ? ( <> <Login setUser={setUser}/> 
            <p>¿No tienes una cuenta? <a href="#" onClick={() => setUser('register')}>Regístrate aquí</a></p>
            </>) : (
              // <p>Login exitoso</p>
              <>
              <Home user={user} setUser={setUser}/>
              <SideNav/>
              </>

            )
          }        
          {user === 'register' && <RegisterForm setUser={setUser} />}
        </header>
      </div>
    </main>
  );
}
