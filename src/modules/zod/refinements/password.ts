import { RefinementCtx } from 'nestjs-zod/z'
import { addIssue } from '../lib/add-issue'

export function password() {
  return (string: string, context: RefinementCtx) => {
    const minLength = 8
    const maxLength = 100

    if (string.length < minLength)
      addIssue(context, {
        code: 'password_too_short',
        params: { minLength },
        message: `Password must contain at least ${minLength} character(s)`,
      })

    if (string.length > maxLength)
      addIssue(context, {
        code: 'password_too_long',
        params: { maxLength },
        message: `Password must contain at most ${maxLength} character(s)`,
      })

    const lowerCaseRegex = /[a-z]/
    const upperCaseRegex = /[A-Z]/
    const numberRegex = /[0-9]/

    if (!string.match(lowerCaseRegex))
      addIssue(context, {
        code: 'password_no_lowercase',
        message: `Password must contain at least one lowercase letter`,
      })

    if (!string.match(upperCaseRegex))
      addIssue(context, {
        code: 'password_no_uppercase',
        message: `Password must contain at least one uppercase letter`,
      })

    if (!string.match(numberRegex))
      addIssue(context, {
        code: 'password_no_digit',
        message: `Password must contain at least one digit`,
      })
  }
}
