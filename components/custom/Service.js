"use client"
import React from 'react'
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
import { Tooltip } from "@nextui-org/react"
import {
  ArchiveBoxXMarkIcon,FolderPlusIcon,
} from '@heroicons/react/24/outline';

export const Service = () => {
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
    { id: '1', name: 'archivo1.pdf', type: 'premium', },
    { id: '1', name: 'archivo1.pdf', type: 'basico', },
    { id: '1', name: 'archivo1.pdf', type: 'premium', },
    { id: '1', name: 'archivo1.pdf', type: 'basico', },
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
    <section style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
    <div>
    <Table style={{ width: '800px', overflowX: 'auto' }}>
      <TableHeader>
        <TableRow className="h-[50px]">
          <TableHead className="w-[300px]">Nombre</TableHead>
          <TableHead className="w-[400px]">Tipo</TableHead>
          <TableHead className="text-left w-[300px]">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockDocuments.map((document) => (
          <TableRow key={document.id} className="h-[50px]">
       <TableCell className="text-left">{document.name}</TableCell>
    <TableCell className="text-left">{document.type}</TableCell>
    <TableCell>
    <Tooltip content="Suscribirse">
    <button onClick={() => signDocument(document.id)}>
    <FolderPlusIcon className="h-5 " /> {/* Icono para la acción de edición */}
    </button>
    </Tooltip>
    <Tooltip content="Cancelar suscripción">
   <button data-tooltip-target="Agregar servicio" onClick={() => signDocument(document.id)}  >
    <ArchiveBoxXMarkIcon className="h-5 ml-4" /> {/* Icono para la acción de descarga */}
    </button>
    </Tooltip>
    </TableCell>
   
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
   
  </section>
  )
}
