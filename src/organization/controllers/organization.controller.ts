import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import type { IRegisterUser } from '../dto/organization.dto';

@Controller('api/organization')
export class OrganizationController {
  constructor(
    @Inject(OrganizationService)
    private organizationService: OrganizationService,
  ) {}

  @Post('onboard')
  async createOrganization(@Body() data: IRegisterUser) {
    return await this.organizationService.createOrganization(data);
  }

  @Get()
  async getAllOrganizations() {
    return await this.organizationService.getAllOrganizations();
  }
}
