import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(UserService) private userService: UserService,
  ) {}
}
