"use client"
import { useState } from 'react';
import { RegisterForm } from '../components/RegisterForm';

export default function HomePage() {
  const [user, setUser] = useState([])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='App'>
        <RegisterForm setUser={setUser} />
      </div>
    </main>
  );
}
