import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { extendException } from '@app/shared/lib/exceptions'

export const WrongCredentialsException = extendException(
  UnauthorizedException,
  {
    code: 'auth/sign_in/wrong_credentials',
    message: 'Wrong credentials',
  }
)

export const UserAlreadyExistsException = extendException(ConflictException, {
  code: 'auth/sign_up/user_exists',
  message: 'User already exists',
})

export const CurrentUserNotExistException = extendException(NotFoundException, {
  code: 'auth/current_user_not_exist',
  message: 'JWT Token owner is not found on database',
})
