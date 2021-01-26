const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const { arch } = require('os')

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(2000, () => {
  console.log('Servidor rodando na porta 2000')
})

const readFile = () => {
  const content = fs.readFileSync('./data/items.json', 'utf-8')
  return JSON.parse(content)
}

const writeFile = (content) => {
  const updateFile = JSON.stringify(content)
  fs.writeFileSync('./data/items.json', updateFile, 'utf-8')
}

app.route('/')
.get(function(req, res) {
  const content = readFile()
  res.render('index.ejs')
})

.post((req, res) => {
  console.log('inserindo');
  try {
    var bodyReq = Object.keys(req.body)[0]
    var parsed = JSON.parse(bodyReq); 
    req.body = parsed; 
  } catch (err) {
    req.body = req.body
  }
    
  const { placa, chassi, renavam, modelo, marca, ano } = req.body
    const currentContent = readFile()
    const id = Math.random().toString(32).substr(2, 9)
    currentContent.push({ id, placa, chassi, renavam, modelo, marca, ano })
    writeFile(currentContent)
    
    res.redirect('/show')
})

app.route('/show')
.get((req, res) => {
  console.log('show')
  const content = readFile()
    res.render('show.ejs', { data: content })
})

app.route('/edit/:id')
.get((req, res) => {
  
  var id = req.params.id

    const { placa, chassi, renavam, modelo, marca, ano } = req.body

    const currentContent = readFile()
    const selectedItem = currentContent.findIndex((item) => item.id === id)
    
    var b = []
    b.push(currentContent[selectedItem])
    
    res.render('edit.ejs', { data: b })
  
})

app.route('/edit/:id')
.post((req, res) => {
  console.log('edit')
  var _Id = req.params.id
  var _placa = req.params.placa
  var _chassi = req.params.chassi
  var _renavam = req.params.renavam
  var _modelo = req.params.modelo
  var _marca = req.params.marca
  var _ano = req.params.ano

  const { placa, chassi, renavam, modelo, marca, ano } = req.body

  const currentContent = readFile()
  const selectedItem = currentContent.findIndex((item) => item.id === _Id)

  const newObject = {
    id: _Id,
    placa: placa ? placa: _placa,
    chassi: chassi ? chassi: _chassi,
    renavam: renavam ? renavam: _renavam,
    modelo: modelo ? modelo: _modelo,
    marca: marca ? marca: _marca,
    ano: ano ? ano: _ano    
  }

  currentContent[selectedItem] = newObject
  writeFile(currentContent)

    res.redirect('/show')

})

app.route('/delete/:id')
.get((req, res) => {
  console.log('delete');
  var id = req.params.id
  const currentContent = readFile()
  const selectedItem = currentContent.findIndex((item) => item.id === id)
  currentContent.splice(selectedItem, 1)
  writeFile(currentContent)
  res.redirect('/show')

})
