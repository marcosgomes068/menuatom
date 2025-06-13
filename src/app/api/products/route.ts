import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const dataFile = join(process.cwd(), 'data', 'products.json')

// Função auxiliar para ler o arquivo de produtos
async function readProducts() {
  try {
    const data = await readFile(dataFile, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Se o arquivo não existir, retorna um array vazio
    return []
  }
}

// Função auxiliar para escrever no arquivo de produtos
async function writeProducts(products: any[]) {
  await writeFile(dataFile, JSON.stringify(products, null, 2))
}

export async function GET() {
  try {
    const products = await readProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Erro ao ler produtos:', error)
    return NextResponse.json(
      { error: 'Erro ao ler produtos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const product = await request.json()
    const products = await readProducts()

    // Gera um ID único para o novo produto
    const newProduct = {
      ...product,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    }

    products.push(newProduct)
    await writeProducts(products)

    return NextResponse.json(newProduct)
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const product = await request.json()
    const products = await readProducts()

    const index = products.findIndex((p: any) => p.id === product.id)
    if (index === -1) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    products[index] = {
      ...products[index],
      ...product,
      updatedAt: new Date().toISOString(),
    }

    await writeProducts(products)

    return NextResponse.json(products[index])
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID do produto não fornecido' },
        { status: 400 }
      )
    }

    const products = await readProducts()
    const filteredProducts = products.filter((p: any) => p.id !== id)

    if (filteredProducts.length === products.length) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    await writeProducts(filteredProducts)

    return NextResponse.json({ message: 'Produto deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar produto:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar produto' },
      { status: 500 }
    )
  }
} 