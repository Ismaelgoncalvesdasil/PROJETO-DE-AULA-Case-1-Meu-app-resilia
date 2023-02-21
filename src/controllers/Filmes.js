import { openDb } from '../confgDB.mjs';

export async function listar(req, res) {
      openDb()
      .then(db=>{
      db.all('SELECT * FROM filmes')
      .then(filmes =>res.json(filmes)) 
     })}

  export async function inserir(req,res) {
    const filmes = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      porcentagem: req.body.porcentagem
    }
    openDb()
    .then( db=>{
      db.run( 'INSERT INTO filmes (titulo, descricao, porcentagem) VALUES (?, ?, ?)',[filmes.titulo, filmes.descricao, filmes.porcentagem])
    })
    res.json({
      "statusCode": 200
    })
          }

          export async function atualizar(req,res) {
            const titulo = (req.body.titulo)
            const descricao = (req.body.descricao)
            const porcentagem = (req.body.porcentagem)
            const id = (req.params.id)
            
        
            const result =(req.params.id)
            if(result.erro){
                res.status(500).send('Erro ao atualizar o filme')
            }
            res.send({mensagem: 'Filme alterado com sucesso'})
          
            openDb()
            .then(db=>{
              db.run('UPDATE filmes SET titulo = ?, descricao = ?, porcentagem = ? WHERE id = ?',[titulo,descricao,porcentagem,id])
          })}

          
          export async function deletarf(req,res) {
          const id = req.params.id;
          if(id.erro){
          res.status(500).send('Erro ao deletar o filme')
          }

          res.send({mensagem: 'filme removido com sucesso'})

          openDb()
          .then(db=>{
          db.run('DELETE FROM filmes WHERE id = ?', [id])
          })}