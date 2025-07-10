const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')


const app = express()

// handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Middlewares (pegar o body)
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//arquivo estático
app.use(express.static('public'))

//* Renderizar a novatarefa
app.get('/novatarefa', (req,res) => {
    res.render('novatarefa')
})

//* INSERT (nova tarefa)
app.post('/novatarefa/inserttarefa', (req,res) => {
    const titulo = req.body.titulo
    const checkbox = req.body.concluida ? 1 : 0

    const query = `INSERT INTO tarefas (titulo, checkbox) VALUES (?, ?)`
    const data = [titulo, checkbox]

    conn.query(query, data, function(err) {
         if(err) { 
        console.log(err)
        return
        }
        res.redirect('/')
    })
})

//* Pegando o id para fazer o UPDATE
app.get('/editartarefa/:id', (req,res) => {
    const id = req.params.id

    const query = `SELECT * FROM tarefas WHERE id = ?`
    const data = [id]

    conn.query(query, data, function(err,data) {
         if(err) { 
        console.log(err)
        return
        }

       const tarefa = data[0]
        res.render('editartarefa', {tarefa})
    })
})

//* UPDATE
app.post('/editartarefa/atualizartarefa', (req,res) => {
    const id = req.body.id
    const titulo = req.body.titulo

    const query = `UPDATE tarefas SET titulo = ?  WHERE id = ?`
    const data = [titulo, id]

    conn.query(query, data, function(err){
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/')
    })
})

//* DELETE
app.post('/deletar/:id', (req,res) => {
    const id = req.params.id

    const query = `DELETE FROM tarefas WHERE id =  ?`
    const data = [id]

    conn.query(query, data, function(err) {
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/')
    })
})

//* Concluir tarefa
app.post('/concluir/:id', (req, res) => {
  const id = req.params.id
  const query = 'UPDATE tarefas SET checkbox = ? WHERE id = ?'
  const data = [1, id]

  conn.query(query, data, (err) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ success: false })
    }

    res.status(200).json({ success: true })
  })
})

app.get('/', (req, res) => {
  const query = 'SELECT * FROM tarefas ORDER BY checkbox ASC, id DESC'

  conn.query(query, (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    const tarefa = data
    res.render('home', { tarefa })
  })
})

app.listen(3000)