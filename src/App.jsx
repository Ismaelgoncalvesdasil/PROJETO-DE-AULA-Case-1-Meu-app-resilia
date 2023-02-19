import { Table, Container, Button } from 'react-bootstrap'
import ContentsApi from './api/ContentsApi'
import { useEffect, useState } from 'react'
import CreateContentModal from './components/CreateContentModal'
import UpdateContentModal from './components/UpdateContentModal'

function App() {
  // função para retorno de conteúdo do database
  const [contents, setContents] = useState()
  // função para retorno de conteúdo do database
  
  // states para controlar a abertura e fechamento de modal de criação, sempre com estado inicial false.
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState()
// states para controlar a abertura e fechamento de modal de criação, sempre com estado inicial false.

// funções para gerir state do modal de creação:
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);
   // funções para gerir state do modal de creação:

   // funções para gerir state do modal de atualização:
   const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
   const handleShowUpdateModal = () => setIsUpdateModalOpen(true);
   // funções para gerir state do modal de atualização:
 
   // função para retorno de conteúdo do database
  useEffect(() => {
    async function getData() {
      await ContentsApi().getContents().then(data => {
        return data.json()
      })
      .then(data => {
        setContents(data)
      })
    }

    getData()
  }, [])
  // função para retorno de conteúdo do database

  // chamar endpoint de get
        const formattedContents = contents.map(cont => {
          if(cont.id === selectedContent.id) {
            return {
              id: selectedContent.id,
              titulo:  req.titulo.value,
              descricao: req.descricao.value,
              porcentagem: Number(req.porcentagem.value)
            }
          }
          
          return cont
        })
   // chamar endpoint de get

   
  // chamar endpoint de criação de conteúdo
  async function createContent(event) {
    try {
      event.preventDefault()
      
      const req = event.currentTarget.elements
      
      await ContentsApi().createContent(
        req.titulo.value, req.descricao.value, Number(req.porcentagem.value)
        ).then(data => {
        return data.json()
      }).then(res => {
        setContents([...contents, {
          id: res.contentId,
          titulo: req.titulo.value,
          descricao: req.descricao.value,
          porcentagem: Number(req.porcentagem.value)
        }])
        
        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }
  // chamar endpoint de criação de conteúdo

  // chamar endpoint de edição  de conteúdo
  async function updateContent(event) {
    try {
      event.preventDefault()
      
      const req = event.currentTarget.elements
      
      await ContentsApi().updateContent(
        selectedContent.id, req.titulo.value, req.descricao.value, Number(req.porcentagem.value)
        )// chamar endpoint de deletar conteúdo
    async function deleteContent(contentId) {
     try {
       await ContentsApi().deleteContent(contentId)
    
       const formattedContents = contents.filter(cont => {
         if(cont.id !== contentId){
           return cont
         }
       })
    
       setContents(formattedContents)
     } catch(err) {
       throw err
     }
    }
        
        
        setContents(formattedContents)
        
        setIsUpdateModalOpen(false)
      } catch(err) {
        throw err
      }
    }
    

    return(
      <>
      {/* Listagem dos valores recebidos */}
    <Container
      className="
      d-flex
      flex-column
      align-items-start
      justify-content-center
      h-100
      w-100
      "
    >
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Criar Conteúdo
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Porcentagem</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contents && contents.map(cont => (
            <tr key={cont.id}>
              <td>{cont.titulo}</td>
              <td>{cont.descricao}</td>
              <td>{cont.porcentagem}</td>
              <td>
                <Button onClick={() => deleteContent(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedContent(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>
           </tr>
          ))}
    
        </tbody>
      </Table>
    </Container>
   {/* Listagem dos valores recebidos */}
    
   {/* Incluindo modal de criação  */}
    <CreateContentModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createContent={createContent} />
    {/* Incluindo modal de criação  */}

    {/* Incluindo modal de atualização */}
    {selectedContent && (
      <UpdateContentModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateContent={updateContent} content={selectedContent} />
      )}
    {/* Incluindo modal de atualização */}
    </>
  )
}


export default App
