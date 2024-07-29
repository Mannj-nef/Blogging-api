import { BadRequestException } from '@nestjs/common'
import { MESSAGE } from '../constants/message'

export class IncorrectException extends BadRequestException {
  constructor(message: string) {
    super(MESSAGE.COMMON.INCORRECT(message))
  }
}
