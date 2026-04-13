import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import type { IRegisterUser } from '../dto/organization.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Organizations')
@Controller('api/organization')
export class OrganizationController {
  constructor(
    @Inject(OrganizationService)
    private organizationService: OrganizationService,
  ) {}

  @Post('onboard')
  @ApiOperation({ summary: 'Create a new organization' })
  async createOrganization(@Body() data: IRegisterUser) {
    return await this.organizationService.createOrganization(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  async getAllOrganizations() {
    return await this.organizationService.getAllOrganizations();
  }
}
