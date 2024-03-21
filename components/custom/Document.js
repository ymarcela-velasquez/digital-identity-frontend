"use client"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@nextui-org/react"
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

export const DocumentManager = ({user}) => {
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para cargar los documentos del usuario
  const loadDocuments = async () => {
    // try {
    //   const response = await axios.get(`/documentos/${user}`);
    //   setDocuments(response.data);
    // } catch (error) {
    //   console.error('Error al cargar los documentos:', error);
    // }


    setDocuments(mockDocuments);
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
            <TableRow className="h-[50px]">
              <TableHead className="w-[300px]">Documento</TableHead>
              <TableHead className="w-[400px]">Url</TableHead>
              <TableHead className="text-left w-[300px]">
                Fecha de actualización
              </TableHead>
              <TableHead className="text-left w-[300px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDocuments.map(document => (
              <TableRow key={document.id} className="h-[50px]">
                <TableCell className="text-left">{document.title}</TableCell>
                <TableCell className="text-left">{document.url}</TableCell>
                <TableCell className="text-left">
                  {document.updatedAt}
                </TableCell>
                <TableCell>
                  <Tooltip content="Firmar">
                    <button onClick={() => signDocument(document.id)}>
                      <PencilSquareIcon className="h-5" />{' '}
                      {/* Icono para la acción de edición */}
                    </button>
                  </Tooltip>
                  <Tooltip content="Descargar">
                    <button onClick={() => downloadDocument(document.id)}>
                      <ArrowDownOnSquareIcon className="h-5 ml-4" />{' '}
                      {/* Icono para la acción de descarga */}
                    </button>
                  </Tooltip>
                  <Tooltip content="Eliminar">
                    <button onClick={() => downloadDocument(document.id)}>
                      <ArchiveBoxXMarkIcon className="h-5 ml-4" />{' '}
                      {/* Icono para la acción de descarga */}
                    </button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div
        style={{
          marginTop: '2%',
          backgroundColor: '#f2f2f2',
          padding: '20px',
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <h3 style={{marginBottom: '10px', color: '#333', fontWeight: 'bold'}}>
          Agregar nuevo documento
        </h3>
        <label style={{color: '#333', marginBottom: '10px'}}>
          Se aceptan archivos PDF, .doc, .docx
        </label>
        <div>
          <label
            htmlFor="fileInput"
            style={{
              cursor: 'pointer',
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#fff',
              color: '#333',
            }}
          >
            Elegir archivo
          </label>
          <input
            id="fileInput"
            type="file"
            style={{display: 'none'}}
            onChange={e => setNewDocument(e.target.files[0])}
            accept=".pdf,.doc,.docx"
          />
          <Button
            style={{
              marginLeft: '20px',
              padding: '8px 16px',
              fontSize: '16px',
              backgroundColor: '#186077',
            }}
            onClick={handleFileUpload}
            disabled={loading || !newDocument}
          >
            {loading ? 'Cargando...' : 'Enviar archivo'}
          </Button>
        </div>
      </div>
    </section>
  )
}
