'use client'

import {z} from 'zod'
import axios from 'axios'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {Button} from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/assets/identidad.png'
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'

const formSchema = z.object({
  identification: z
    .number()
    .min(4)
    .max(10, {
      message:
        'La identificación debe ser numérica y tener máximo 10 caracteres',
    }),
})

export const ValidateUserForm = ({onSubmit}) => {
  const [alert, setAlert] = useState({show: false, message: '', type: ''})
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identification: '',
    },
  })

  const handleFormSubmit = async event => {
    event.preventDefault()
    const formData = {
      identification: form.getValues('identification'),
    }
    const response = await axios.get(
      `https://govcarpeta-21868b7e9dd3.herokuapp.com/apis/validateCitizen/${formData?.identification}`,
      {
        timeout: 5000,
      },
    )
    if (response.status === 200) {
      setAlert({show: true, message: `${response?.data}`, type: 'success'})
    } else if (response.status === 204) {
      setAlert({
        show: true,
        message: `El ciudadano con id: ${formData?.identification} no se encuentra registrado en ningún operador`,
        type: 'warning',
      })
      setTimeout(() => {
        router.push('/register')
      }, 5000)
    } else {
      setAlert({
        show: true,
        message: 'Hubo un error en el registro',
        type: 'error',
      })
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({show: false, message: '', type: ''})
    }, 5000)
    return () => clearTimeout(timer)
  }, [alert])

  return (
    <section>
      {alert.show && (
        <div className={`alert ${alert.type}`}>
          <Alert>
            <AlertTitle>
              {alert.type === 'success'
                ? 'Proceso exitoso'
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
      <h1>Validación de registro. Ingrese su número de identificación.</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="identification"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Identification" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            style={{
              marginLeft: '150px',
              padding: '8px 16px',
              fontSize: '16px',
              backgroundColor: '#186077',
            }}
            onClick={handleFormSubmit}
            type="submit"
          >
            Validar
          </Button>
        </form>
      </Form>
    </section>
  )
}
