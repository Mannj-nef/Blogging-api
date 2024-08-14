import { Request } from 'express'
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/entities/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await new JwtService().verifyAsync(token, {
        secret: this.configService.getOrThrow('JWT_SECRET_ACCESS_KEY')
      })

      const user = await this.userRepository.findOneBy({ id: payload.userId })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, forgotPasswordOtp, refreshToken, ...rest } = user

      request['user'] = rest
    } catch (error) {
      throw new UnauthorizedException()
    }

    return true
  }
}
