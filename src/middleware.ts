import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verificar se é uma rota de administração
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Ignorar a rota de login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Verificar se o usuário está autenticado
    const token = request.cookies.get('adminToken')
    if (!token) {
      // Redirecionar para a página de login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
} 