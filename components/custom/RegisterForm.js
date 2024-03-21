"use client"

import { z } from "zod"
import { useState, useEffect } from 'react';
import axios from 'axios'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Image from "next/image";
import logo from '@/public/assets/identidad.png'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


const formSchema = z.object({
  identification: z.number().min(4).max(10, {message: "La identificación debe ser numérica y tener máximo 10 caracteres"}),
  identificationType: z.string(),
  fullName: z.string(),
  address: z.string(),
  email: z.string().email({message: "Debes agregar un email válido."}),
  password: z.string().min(7, {message: "La contraseña debe contener al menos 7 caracteres."}).max(15),
  phone: z.number().min(4).max(10)
})

export const RegisterForm = ({onSubmit}) => {
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identification: "",
      identificationType: "",
      fullName: "",
      address: "",
      email: "",
      password: "",
      phone: ""
    },
  })

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      identification: form.getValues("identification"),
      identificationType: form.getValues("identificationType"),
      fullName: form.getValues("fullName"),
      address: form.getValues("address"),
      email: form.getValues("email"),
      password: form.getValues("password"),
      phone: form.getValues("phone"), 
      status: "ALIVE"
    }
    
    try {
      const response = await axios.post('http://34.118.205.255:8080/broker-intermediary/citizen', formData, {
        timeout: 5000,
      })
      if (response.status === 201) {
        setAlert({ show: true, message: "Su registro fue exitoso", type: "success" })
        setTimeout(() => {
          router.push('/dashboard')
        }, 5000)
      }
    } catch (error) {
      setAlert({ show: true, message: "Hubo un error en el registro", type: "error" })
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ show: false, message: "", type: "" })
    }, 5000)
    return () => clearTimeout(timer)
  }, [alert])

  {
    return (
      <section>
        {alert.show && (
          <div className={`alert ${alert.type}`}>
            <Alert>
              <AlertTitle>
                {alert.type === 'success'
                  ? 'Éxito'
                  : alert.type === 'warning'
                  ? 'Advertencia'
                  : 'Error'}
              </AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          </div>
        )}
        <div className="mb-2 flex h-auto items-center justify-start p-4 gap-4">
          <Link href="/">
            <Image src={logo} className="h-12 w-auto" alt="logo" />
          </Link>
          <div>
            <span className="text-[#186077] font-bold text-lg leading-1">
              Identidad Digital
            </span>
          </div>
        </div>
        <h1>Complete el siguiente formulario</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="identification"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Identificación</FormLabel>
                  <FormControl>
                    <Input placeholder="Identification" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="identificationType"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tipo de identificación</FormLabel>
                  <FormControl>
                    <Input placeholder="identificationType" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nombres y Apellidos</FormLabel>
                  <FormControl>
                    <Input placeholder="FullName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              style={{
                marginLeft: '60px',
                padding: '8px 16px',
                fontSize: '16px',
                backgroundColor: '#186077',
              }}
              onClick={handleFormSubmit}
              type="submit"
            >
              Registrarse
            </Button>
          </form>
        </Form>
      </section>
    )
  }
}
