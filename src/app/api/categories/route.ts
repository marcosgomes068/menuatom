import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const dataFile = join(process.cwd(), 'data', 'categories.json')

// Função auxiliar para ler o arquivo de categorias
async function readCategories() {
  try {
    const data = await readFile(dataFile, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Se o arquivo não existir, retorna um array vazio
    return []
  }
}

// Função auxiliar para escrever no arquivo de categorias
async function writeCategories(categories: any[]) {
  await writeFile(dataFile, JSON.stringify(categories, null, 2))
}

export async function GET() {
  try {
    const categories = await readCategories()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Erro ao ler categorias:', error)
    return NextResponse.json(
      { error: 'Erro ao ler categorias' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const category = await request.json()
    const categories = await readCategories()

    // Verifica se já existe uma categoria com o mesmo nome
    if (categories.some((c: any) => c.name === category.name)) {
      return NextResponse.json(
        { error: 'Já existe uma categoria com este nome' },
        { status: 400 }
      )
    }

    // Gera um ID único para a nova categoria
    const newCategory = {
      ...category,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    }

    categories.push(newCategory)
    await writeCategories(categories)

    return NextResponse.json(newCategory)
  } catch (error) {
    console.error('Erro ao criar categoria:', error)
    return NextResponse.json(
      { error: 'Erro ao criar categoria' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const category = await request.json()
    const categories = await readCategories()

    const index = categories.findIndex((c: any) => c.id === category.id)
    if (index === -1) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      )
    }

    // Verifica se já existe outra categoria com o mesmo nome
    if (
      categories.some(
        (c: any) => c.name === category.name && c.id !== category.id
      )
    ) {
      return NextResponse.json(
        { error: 'Já existe uma categoria com este nome' },
        { status: 400 }
      )
    }

    categories[index] = {
      ...categories[index],
      ...category,
      updatedAt: new Date().toISOString(),
    }

    await writeCategories(categories)

    return NextResponse.json(categories[index])
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar categoria' },
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
        { error: 'ID da categoria não fornecido' },
        { status: 400 }
      )
    }

    const categories = await readCategories()
    const filteredCategories = categories.filter((c: any) => c.id !== id)

    if (filteredCategories.length === categories.length) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      )
    }

    await writeCategories(filteredCategories)

    return NextResponse.json({ message: 'Categoria deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar categoria:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar categoria' },
      { status: 500 }
    )
  }
} 