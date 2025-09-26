import { Inject, Injectable } from '@nestjs/common';
import { RoleRepository } from '../repository/role.repository';
import { Role } from '../model/role.entity';

@Injectable()
export class RoleService {
  constructor(@Inject(RoleRepository) private roleRepository: RoleRepository) {}

  async findByName(name: string): Promise<Role | null> {
    console.log(`Role Name: ${name}`);
    return await this.roleRepository.findOne({ where: { name } });
  }
}
