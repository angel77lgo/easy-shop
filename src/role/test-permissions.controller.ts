import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
import { Permissions } from './decorators/permissions.decorator';
import { RolesGuard } from './guards/roles.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { Role, Action } from './enums/role.enum';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Test Permissions')
@Controller('test-permissions')
@UseGuards(RolesGuard, PermissionsGuard)
export class TestPermissionsController {
  @Get('admin')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Admin only access' })
  adminOnly() {
    return 'Admin access granted';
  }

  @Get('buyer')
  @Roles(Role.BUYER)
  @ApiOperation({ summary: 'Buyer only access' })
  buyerOnly() {
    return 'Buyer access granted';
  }

  @Get('read')
  @Permissions(Action.READ)
  @ApiOperation({ summary: 'Read access' })
  readAccess() {
    return 'Read access granted';
  }

  @Get('create')
  @Permissions(Action.CREATE)
  @ApiOperation({ summary: 'Create access' })
  createAccess() {
    return 'Create access granted';
  }
}
