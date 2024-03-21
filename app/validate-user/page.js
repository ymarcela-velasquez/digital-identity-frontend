"use client"
import { useState } from 'react';
import axios from 'axios'
import { ValidateUserForm } from '@/components/custom/ValidateUserForm';
// import { useRouter } from 'next/navigation'

export default function ValidateUserPage() {
  // const router = useRouter()
  // const [user, setUser] = useState([])
  // const registerUser = async (formData) => {
  //   console.log('entra registerUser', formData);
  //   try {
  //     const response = await axios.post('http://34.118.205.255:8080/broker-intermediary/citizen', formData, {
  //       timeout: 5000,
  //     })
  //     if (response.status === 201) {
  //       // 
  //     }
  //     console.log('response: ', response);
  //   } catch (error) {
  //     console.log('error: ', error);
  //   }
  // }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='App'>
        <ValidateUserForm  />
      </div>
    </main>
  );
}
