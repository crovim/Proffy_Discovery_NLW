// Criar um package -> npm init -y
// Iniciar com dependência no express -> npm install express

// Servidor
const express = require('express')
const server = express()

const { 
    pageLanding,
    pageStudy, 
    pageGiveClasses,
    saveClasses 
} = require('./pages')

// configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server, // devolve um objeto
    noCache: true,  // desativo o cache
})

// Inicio e confiugração do servidor
server
// receber os dados do req.body
.use(express.urlencoded({ extended: true }))

// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))

// rotas da aplicação
.get("/", pageLanding) // Colocamos a rota que ele não estava achando(/)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)

// start do servidor
.listen(5500)

