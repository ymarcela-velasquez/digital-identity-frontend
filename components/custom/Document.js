'use client'
import {Button} from '@/components/ui/button'
import {Tooltip} from '@nextui-org/react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  ArrowDownOnSquareIcon,
  PencilSquareIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline'

export const DocumentManager = ({user}) => {
  const [documents, setDocuments] = useState([])
  const [newDocument, setNewDocument] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState('')
  const maxFileSizeMB = 1
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setUserData(parsedData)
    }
  }, [])

  console.log('storedData: ', storedData)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `http://34.136.184.165:8080/api-gateway/documents/${storedData.email}`,
        )
        setDocuments(response.data)
      } catch (error) {
        console.error('Error fetching operators:', error)
      }
    }
    fetchDocuments()
  }, [])

  // Function to get user's documents
  const getDocumentsByUser = async () => {
    try {
      const response = await axios.get(`http://34.136.184.165:8080/api-gateway/documents/${storedData.email}`);
      setDocuments(response.data)
    } catch (error) {
      console.error('Error al cargar los documentos:', error)
    }

    // setDocuments(mockDocuments);
  }

  const mockDocuments = [
    {id: '1', title: 'archivo1.pdf', url: 'url.com', updatedAt: '2024-03-20'},
    {id: '2', title: 'archivo1.pdf', url: 'url', updatedAt: '2024-03-20'},
    {id: '3', title: 'archivo1.pdf', url: 'url', updatedAt: '2024-03-20'},
    {id: '4', title: 'archivo1.pdf', url: 'url', updatedAt: '2024-03-20'},
  ]

  const uploadDocument = async base64Data => {
    console.log('entra a cargar documento: ', base64Data)
    try {
      await axios.post(`http://34.136.184.165:8080/api-gateway/documents`, {
        file: base64Data,
      })
      getDocumentsByUser()
    } catch (error) {
      console.error('Error al cargar el nuevo documento:', error)
    }
  }

  const signDocument = async (urlDocument, documentTitle) => {
    try {
      await axios.post(`http://34.136.184.165:8080/api-gateway/sign-document`, {
        idCitizen: storedData.identification,
        urlDocument,
        documentTitle,
        email: storedData.email,
      })
      // Update the documents list after signing
      getDocumentsByUser()
    } catch (error) {
      console.error('Error al firmar el documento:', error)
    }
  }

  // Show selected file
  const handleFileChange = e => {
    const file = e.target.files[0]
    setNewDocument(file)
    setSelectedFileName(file.name)
  }

  // Function to upload a new document
  const handleFileUpload = async () => {
    if (!newDocument) return
    setLoading(true)

    try {
      const file = newDocument
      console.log('file: ', file.size)
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        throw new Error(
          `El archivo es demasiado grande. El tamaño máximo permitido es ${maxFileSizeMB} MB.`,
        )
      }
      console.log('file: ', file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64Data = reader.result.split(',')[1]
        await uploadDocument(base64Data)
      }
      // Update the documents list after uploading a new document
      getDocumentsByUser()
    } catch (error) {
      console.error('Error al cargar el nuevo documento:', error)
    } finally {
      setLoading(false)
      // Clean the new document state
      setNewDocument(null)
      setSelectedFileName('')
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
                    <button onClick={() => signDocument(document.url, document.title)}>
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
          Se aceptan todos los formatos de archivos, pero el tamaño máximo
          permitido es de 1MB
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
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx, .png"
          />
          {selectedFileName && (
            <span style={{marginLeft: '10px'}}>{selectedFileName}</span>
          )}
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
