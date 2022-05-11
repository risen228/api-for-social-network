import { Injectable } from '@nestjs/common'
import { Prisma, Profile } from '@prisma/client'
import { PrismaService } from '../prisma'

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    where: Prisma.ProfileWhereUniqueInput
  ): Promise<Profile | null> {
    return this.prisma.profile.findUnique({ where })
  }

  async findMany(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ProfileWhereUniqueInput
    where?: Prisma.ProfileWhereInput
    orderBy?: Prisma.ProfileOrderByWithRelationInput
  }): Promise<Profile[]> {
    return this.prisma.profile.findMany(params)
  }

  async create(data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.prisma.profile.create({ data })
  }

  async update(params: {
    where: Prisma.ProfileWhereUniqueInput
    data: Prisma.ProfileUpdateInput
  }): Promise<Profile> {
    return this.prisma.profile.update(params)
  }

  async delete(where: Prisma.ProfileWhereUniqueInput): Promise<Profile> {
    return this.prisma.profile.delete({ where })
  }
}
