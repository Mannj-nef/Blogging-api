import { BadRequestException } from '@nestjs/common'
import { MESSAGE } from '../constants/message'

export class ExitsException extends BadRequestException {
  constructor(message: string) {
    super(MESSAGE.COMMON.EXISTS(message))
  }
}
