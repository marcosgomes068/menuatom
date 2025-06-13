import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

const uploadDir = join(process.cwd(), 'public', 'uploads')

// Função auxiliar para criar o diretório de uploads se não existir
async function ensureUploadDir() {
  try {
    await mkdir(uploadDir, { recursive: true })
    console.log('Diretório de uploads criado/verificado:', uploadDir)
  } catch (error) {
    console.error('Erro ao criar diretório de uploads:', error)
    throw new Error('Falha ao criar diretório de uploads')
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureUploadDir()

    const formData = await request.formData()
    const file = formData.get('image') as File
    const type = formData.get('type') as string

    console.log('Recebendo upload:', { type, fileName: file?.name, fileSize: file?.size })

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      )
    }

    if (!type || !['product', 'category', 'banner'].includes(type)) {
      return NextResponse.json(
        { error: 'Tipo de imagem inválido' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Gera um nome único para o arquivo
    const uniqueId = uuidv4()
    const extension = file.name.split('.').pop()?.toLowerCase()
    const filename = `${type}-${uniqueId}.${extension}`

    // Define o caminho do arquivo
    const filepath = join(uploadDir, filename)

    console.log('Salvando arquivo:', { filename, filepath })

    // Salva o arquivo
    await writeFile(filepath, buffer)

    // Retorna a URL da imagem
    const url = `/uploads/${filename}`
    console.log('Upload concluído:', { url, filename })

    return NextResponse.json({ url, filename })
  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json(
      { error: 'Erro ao processar upload' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const filename = request.nextUrl.pathname.split('/').pop()
    if (!filename) {
      return NextResponse.json(
        { error: 'Nome do arquivo não fornecido' },
        { status: 400 }
      )
    }

    console.log('Deletando arquivo:', filename)

    const filepath = join(uploadDir, filename)
    await unlink(filepath)

    console.log('Arquivo deletado com sucesso:', filename)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar arquivo' },
      { status: 500 }
    )
  }
} 