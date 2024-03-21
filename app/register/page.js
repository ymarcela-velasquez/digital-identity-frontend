"use client"
import { useState } from 'react';
import axios from 'axios'
import { RegisterForm } from '@/components/custom/RegisterForm';

export default function RegisterPage() {
  // const [user, setUser] = useState([])
  const registerUser = async (formData) => {
    console.log('entra registerUser', formData);
    try {
      const user = await axios.post('http://localhost:8080/broker-intermediary/citizen', formData, {
        timeout: 5000,
      })
      console.log('user: ', user);
    } catch (error) {
      console.log('error: ', error);
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='App'>
        <RegisterForm onSubmit={registerUser} />
      </div>
    </main>
  );
}
