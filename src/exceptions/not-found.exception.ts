import { BadRequestException } from '@nestjs/common'
import { MESSAGE } from '../constants/message'

export class NotFoundException extends BadRequestException {
  constructor(message: string) {
    super(MESSAGE.COMMON.NOT_FOUND(message))
  }
}
