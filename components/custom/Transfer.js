'use client'

import {useState, useEffect} from 'react'
import axios from 'axios'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import {
  ArrowDownOnSquareIcon,
  PencilSquareIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline'

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
import { FormSelect } from "@/components/custom/FormSelect"

const formSchema = z.object({
  operator: z.string()
})

export const Transfer = ({operators}) => {
  // const [operators, setOperators] = useState([])
  // const router = useRouter();
  const [userData, setUserData] = useState(null) 
  // const [selectedOperator, setSelectedOperator] = useState('') 

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData)
    }
  }, [])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      operator: "",
    },
  })

  async function onSubmit(values) {
    // Hacer algo con los valores del formulario.
    const response = await axios.post('http://34.136.184.165:8080/api-gateway/transfers', {
      operator_id: values.operator,
      email: userData.email,
      identification: userData.identification
    })
    console.log('response', response)
  
    // Redirigir al usuario al dashboard.
    // router.push('/dashboard');
  }

  return (

    <div className="container flex">
      <div className="w-1/2">
        <h2>Aquí puedes solicitar traslado a otro operador</h2>
        <hr className="my-5"/>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="operator"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Selecciona un operador</FormLabel>
                  <FormSelect {...field}
                    options={operators}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          
            <Button
              className="bg-[#186077] rounded text-white"
              type="submit"
            >
              Enviar
            </Button>
          </form>
        </Form>
      </div>      
    </div>
  )
}
