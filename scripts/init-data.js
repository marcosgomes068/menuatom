const fs = require('fs')
const path = require('path')

const dataDir = path.join(process.cwd(), 'data')
const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

// Cria o diretório de dados se não existir
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Cria o diretório de uploads se não existir
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Inicializa os arquivos JSON com arrays vazios
const files = {
  'products.json': [],
  'categories.json': [],
}

Object.entries(files).forEach(([filename, initialData]) => {
  const filepath = path.join(dataDir, filename)
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify(initialData, null, 2))
    console.log(`Arquivo ${filename} criado com sucesso!`)
  }
})

console.log('Inicialização concluída!') 