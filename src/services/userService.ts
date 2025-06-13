import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export class UserService {
  private static instance: UserService

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  async register(userData: {
    name: string
    email: string
    password: string
    restaurantName: string
    restaurantDescription?: string
    restaurantLogo?: string
    restaurantBanner?: string
    restaurantAddress: string
    restaurantPhone: string
    restaurantWhatsapp?: string
    restaurantInstagram?: string
    restaurantFacebook?: string
    restaurantWebsite?: string
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        restaurantInfo: {
          create: {
            name: userData.restaurantName,
            description: userData.restaurantDescription,
            logo: userData.restaurantLogo,
            banner: userData.restaurantBanner,
            address: userData.restaurantAddress,
            phone: userData.restaurantPhone,
            whatsapp: userData.restaurantWhatsapp,
            instagram: userData.restaurantInstagram,
            facebook: userData.restaurantFacebook,
            website: userData.restaurantWebsite,
            themeConfig: {
              create: {
                primaryColor: '#FF0000',
                secondaryColor: '#00FF00',
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              },
            },
          },
        },
      },
      include: {
        restaurantInfo: {
          include: {
            themeConfig: true,
          },
        },
      },
    })

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        restaurantInfo: {
          include: {
            themeConfig: true,
          },
        },
      },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new Error('Senha incorreta')
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async updateUser(id: string, userData: any) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: userData.name,
        email: userData.email,
        restaurantInfo: {
          update: {
            name: userData.restaurantInfo?.name,
            description: userData.restaurantInfo?.description,
            logo: userData.restaurantInfo?.logo,
            banner: userData.restaurantInfo?.banner,
            address: userData.restaurantInfo?.address,
            phone: userData.restaurantInfo?.phone,
            whatsapp: userData.restaurantInfo?.whatsapp,
            instagram: userData.restaurantInfo?.instagram,
            facebook: userData.restaurantInfo?.facebook,
            website: userData.restaurantInfo?.website,
            themeConfig: {
              update: userData.restaurantInfo?.themeConfig,
            },
          },
        },
      },
      include: {
        restaurantInfo: {
          include: {
            themeConfig: true,
          },
        },
      },
    })

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: { id },
    })
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        restaurantInfo: {
          include: {
            themeConfig: true,
          },
        },
      },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        restaurantInfo: {
          include: {
            themeConfig: true,
          },
        },
      },
    })

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
} 