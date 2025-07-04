const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')
require('dotenv').config()

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

//homepage
app.get('/', (req,res) => {
    const query = "SELECT * FROM tarefas"

    conn.query(query, function(err, data) {
        if(err) {
            console.log(err)
            return
        }

        const tarefa = data
        console.log(tarefa)

        res.render('home', {tarefa})
    })
})

app.get('/novatarefa', (req,res) => {
    res.render('novatarefa')
})

//post da novatarefa
app.post('/novatarefa/inserttarefa', (req,res) => {
    const titulo = req.body.titulo

    const checkbox = req.body.concluida ? 1 : 0;

    const query = `INSERT INTO tarefas (titulo, checkbox) VALUES ('${titulo}', '${checkbox}')`

    conn.query(query, function(err) {
         if(err) { 
        console.log(err)
        return
        }
        res.redirect('/')
    })
})

// conexão com database
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

conn.connect(function(err) {
    if(err) {
        console.log('Erro na conexão com o MySQL:', err.message)
    }

    console.log('Conectou ao MySQL')
    app.listen(3000)
})

