"use client"

import { z } from "zod"
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
import Link from 'next/link';
import Image from "next/image";
import logo from '@/public/assets/identidad.png';

const formSchema = z.object({
  identification: z.number().min(4).max(10, {message: "La identificación debe ser numérica y tener máximo 10 caracteres"}),
  identificationType: z.string(),
  firstName: z.string(),
  secondName: z.string(),
  lastName: z.string(),
  secondLastName: z.string(),
  address: z.string(),
  email: z.string().email({message: "Debes agregar un email válido."}),
  password: z.string().min(7, {message: "La contraseña debe contener al menos 7 caracteres."}).max(15)
})


export const RegisterForm = ({onSubmit}) => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identification: "",
      identificationType: "",
      firstName: "",
      secondName: "",
      lastName: "",
      secondLastName: "",
      address: "",
      email: "",
      password: ""
    },
  })
 
  // Define a submit handler.
  function handleOnSubmit(data) {    
    console.log(data)
    onSubmit(data)
  }
  
  {
    return (
      <section>
        <div className="mb-2 flex h-auto items-center justify-start p-4 gap-4">
          <Link href="/">
            <Image src={logo} className='h-12 w-auto' alt="logo" />
          </Link>
          <div>
            <span className='text-[#186077] font-bold text-lg leading-1'>
              Identidad Digital
            </span>
          </div>
        </div>
        <h1>Complete el siguiente formulario</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-8">
          <FormField
              control={form.control}
              name="Identification"
              render={({ field }) => (
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
              render={({ field }) => (
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primer nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="FirstName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segundo Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="SecondName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primer apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="LastName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondLastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segundo apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="SecondLastName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
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
              render={({ field }) => (
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Registrarse</Button>
          </form>
        </Form>
      </section>
    )
  }
}
