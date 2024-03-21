import Image from "next/image";
import logo from '../public/assets/identidad.png';
import { LoginForm } from '@/components/custom/LoginForm';
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='App'>
         <div className="text-center mb-10">
          <Image src={logo} className='w-20 h-auto mx-auto' alt="logo" />
          <h1 className="text-[#186077] text-4xl font-bold">Identidad Digital</h1>
         </div>
          <LoginForm/> 
          <p>¿No tienes una cuenta? <Link href='/validate-user'>Regístrate aquí</Link></p>
      </div>
    </main>
  );
}
