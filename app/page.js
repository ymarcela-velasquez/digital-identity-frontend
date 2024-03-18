"use client"
import Image from "next/image";
import { useState } from 'react';
import logo from '../public/assets/identidad.png';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';
import { Home } from './components/Home';
import './App.css';
import SideNav from "./components/SideNav";
import Link from 'next/link'
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
         <div className="text-center mb-10">
          <Image src={logo} className='w-20 h-auto mx-auto' alt="logo" />
          <h1 className="text-[#186077] text-4xl font-bold">Identidad Digital</h1>
         </div>
          {
            !user.length > 0 ? ( 
              <> 
                <LoginForm/> 
                <p>¿No tienes una cuenta? <Link href='/register'>Regístrate aquí</Link></p>
              </>
            ) : (
              <>
                <Home user={user} setUser={setUser}/>
                <SideNav/>
              </>
            )
          }        
          {/* {user === 'register' && <RegisterForm setUser={setUser} />} */}
      </div>
    </main>
  );
}
