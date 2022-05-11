import { Controller, Get, Param } from '@nestjs/common'
import { ProfileService } from './profile.service'

@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/')
  async findMany() {
    return this.profileService.findMany({})
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.profileService.findOne({ id })
  }
}
