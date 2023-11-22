const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

//definindo handlebars como template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.post('/delete', (requisicao, resposta) => {
    const { id } = requisicao.body

    const sql = `
        DELETE FROM books
        WHERE id = ${id}
    `

    conn.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        resposta.redirect('/')
    })
})

app.post("/edit/save", (requisicao, resposta) => {
    const { id, title, pageqty } = requisicao.body

    const sql = `
        UPDATE books
        SET title = '${title}', pageqty = '${pageqty}'
        WHERE id = ${id}
    `

    conn.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        resposta.redirect('/')
    })
})

app.post('/register/save', (requisicao, resposta) => {
    const { title, pageqty } = requisicao.body

    const book = {
        title,
        pageqty
    }

    const query = `
        INSERT INTO books (title, pageqty)
        VALUES ('${title}', '${pageqty}')
    `

    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }

        resposta.redirect('/')
    })
})

app.get("/edit/:id", (requisicao, resposta) => {
    const id = requisicao.params.id

    const sql = `
        SELECT * FROM books
        WHERE id = ${id}
    `

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const book = data[0]

        resposta.render('edit', { book })
    })
})

app.get("/book/:id", (requisicao, resposta) => {
    const id = requisicao.params.id

    const sql = `
        SELECT * FROM books
        WHERE id = ${id}
    `

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const book = data[0]

        resposta.render("book", { book })
    })
})

app.get('/register', (requisicao, resposta) => {
    resposta.render('register')
})

app.get('/', (requisicao, resposta) => {
    const query = 'SELECT * FROM books'

    conn.query(query, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const books = data 

        resposta.render('home', { books })
    })

})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql',
    port: 3307
})

conn.connect((error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log('Conectado no MySQL!')

    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000!')
    })
})