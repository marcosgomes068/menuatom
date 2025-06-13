interface ImageUploadResponse {
  url: string
  filename: string
}

export class ImageService {
  private static instance: ImageService
  private baseUrl: string

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
  }

  public static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService()
    }
    return ImageService.instance
  }

  private async compressImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target?.result as string
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          // Calcula as novas dimensões mantendo a proporção
          let width = img.width
          let height = img.height
          const maxSize = 1200 // Tamanho máximo em pixels

          if (width > height && width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          } else if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }

          canvas.width = width
          canvas.height = height

          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height)
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob)
                } else {
                  reject(new Error('Falha ao comprimir imagem'))
                }
              },
              'image/jpeg',
              0.8
            )
          } else {
            reject(new Error('Falha ao criar contexto do canvas'))
          }
        }
        img.onerror = () => {
          reject(new Error('Falha ao carregar imagem'))
        }
      }
      reader.onerror = () => {
        reject(new Error('Falha ao ler arquivo'))
      }
    })
  }

  public async uploadImage(file: File, type: 'product' | 'category' | 'banner'): Promise<ImageUploadResponse> {
    try {
      // Comprime a imagem antes do upload
      const compressedBlob = await this.compressImage(file)
      const formData = new FormData()
      formData.append('image', compressedBlob, file.name)
      formData.append('type', type)

      console.log('Iniciando upload de imagem:', { type, fileName: file.name })

      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Falha no upload da imagem')
      }

      const data = await response.json()
      console.log('Upload concluído:', data)

      return {
        url: data.url,
        filename: data.filename,
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
      throw error
    }
  }

  public async deleteImage(filename: string): Promise<void> {
    try {
      console.log('Iniciando deleção de imagem:', filename)

      const response = await fetch(`${this.baseUrl}/upload/${filename}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Falha ao deletar imagem')
      }

      console.log('Imagem deletada com sucesso:', filename)
    } catch (error) {
      console.error('Erro ao deletar imagem:', error)
      throw error
    }
  }

  public getImageUrl(filename: string): string {
    return `${this.baseUrl}/uploads/${filename}`
  }
} 