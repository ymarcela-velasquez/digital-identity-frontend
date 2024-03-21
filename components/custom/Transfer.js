"use client"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  ArrowDownOnSquareIcon,PencilSquareIcon,ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';

export const Transfer = ({user}) => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const operadores = [
    {
      "OperatorId": "65ca0a00d833e984e2608756",
      "OperatorName": "Operador 123",
      "transferAPIURL": "http://mioperador.com/api/transferCitizen"
    },
    {
      "OperatorId": "65ca0a00d833e984e2608758",
      "OperatorName": "Operador 456",
      "transferAPIURL": "http://mioperador.com/api/transferCitizen"
    },
    {
      "OperatorId": "65ca0a00d833e984e2608761",
      "OperatorName": "Operador 789",
      "transferAPIURL": "http://mioperador.com/api/transferCitizen"
    }
  ]

  const getOperators = async () => {
    try {
      const operators = await axios.get(`https://govcarpeta-21868b7e9dd3.herokuapp.com/apis/getOperators`)
      // Update the documents list after signing
      console.log('operators: ', operators);
    } catch (error) {
      console.error('Error al obtener operadores:', error)
    }
  }

  
 
  const mockDocuments = [ 
    { id: '1', title: 'archivo1.pdf', url: 'url.com', updatedAt: '2024-03-20'},
    { id: '2', title: 'archivo1.pdf', url: 'url', updatedAt: '2024-03-20'},
    { id: '3', title: 'archivo1.pdf', url: 'url', updatedAt: '2024-03-20'},
    { id: '4', title: 'archivo1.pdf', url: 'url', updatedAt: '2024-03-20'},
   ]
  const signDocument = async (documentId) => {
    try {
      await axios.post(`/documents/sign`, { documentId })
      // Update the documents list after signing
      loadDocuments()
    } catch (error) {
      console.error('Error al firmar el documento:', error)
    }
  };

  // Función para cargar un nuevo documento
  const handleFileUpload = async () => {
    if (!newDocument) return
    setLoading(true)
    try {
      await axios.post(`/documents`, { file: newDocument })    
      // Update the documents list after uploading a new document
      loadDocuments()
    } catch (error) {
      console.error('Error al cargar el nuevo documento:', error)
    } finally {
      setLoading(false);
      // Clean the new document state
      setNewDocument(null)
    }
  }

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <div>
        <Table style={{width: '800px', overflowX: 'auto'}}>
          <TableHeader>
            <TableRow className="h-[70px]">
              <TableHead className="w-[500px]">Solicitar Traslado</TableHead>
              <TableHead className="w-[500px]">
                Consultar estado del traslado
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow key={document.id} className="h-[50px]">
              <TableCell style={{verticalAlign: 'top', textAlign: 'left'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <label style={{marginBottom: '10px'}}>
                    Aquí debes seleccionar a qué operador quieres ser
                    trasladado:
                  </label>
                  <select
                    style={{
                      marginBottom: '10px',
                      padding: '8px 16px',
                      fontSize: '16px',
                    }}
                  >
                    {operadores.map(operador => (
                      <option
                        key={operador.OperatorId}
                        value={operador.OperatorId}
                      >
                        {operador.OperatorName}
                      </option>
                    ))}
                  </select>
                </div>
              </TableCell>
              <TableCell style={{verticalAlign: 'top', textAlign: 'left'}}>
                <label>Aquí puedes consultar el estado de tu solicitud</label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{verticalAlign: 'top', textAlign: 'center'}}>
                <Button
                  style={{
                    padding: '8px 16px',
                    fontSize: '16px',
                    backgroundColor: '#186077',
                    display: 'block',
                    margin: '0 auto',
                  }}
                  onClick={handleFileUpload}
                  disabled={loading || !newDocument}
                >
                  Solicitar
                </Button>
              </TableCell>
              <TableCell style={{verticalAlign: 'top', textAlign: 'center'}}>
                <Button
                  style={{
                    padding: '8px 16px',
                    fontSize: '16px',
                    backgroundColor: '#186077',
                    display: 'block',
                    margin: '0 auto',
                  }}
                  onClick={handleFileUpload}
                  disabled={loading || !newDocument}
                >
                  Consultar
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
