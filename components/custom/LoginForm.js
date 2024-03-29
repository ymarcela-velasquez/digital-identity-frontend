"use client"

import { z } from "zod"
import { useRouter } from 'next/navigation'
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

const formSchema = z.object({
  email: z.string().email({message: "Debes agregar un email valido."}),
  password: z.string().min(7, {message: "La contraseña debe contener al menos 7 caracteres."}).max(15)
})

export const LoginForm = () => {

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter();
  function onSubmit(values) {
    // Hacer algo con los valores del formulario.
    console.log(values);
  
    // Redirigir al usuario al dashboard.
    router.push('/dashboard');
  }
  {
    return (
      <section>
        <h1>Inicie sesión en su cuenta</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                marginLeft: '90px',
                padding: '8px 16px',
                fontSize: '16px',
                backgroundColor: '#186077',
              }}
              type="submit"
            >
              Enviar
            </Button>
          </form>
        </Form>
      </section>
    )
  }
    
}
