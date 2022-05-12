import { RefinementCtx } from 'zod'
import { addIssue } from '../lib/add-issue'

export function birthYear() {
  return (number: number, context: RefinementCtx) => {
    const now = new Date()
    const currentYear = now.getFullYear()

    const minimum = currentYear - 120
    const maximum = currentYear

    if (number < minimum)
      addIssue(context, {
        code: 'birth_year_too_small',
        params: { minimum },
        message: `Birth year must be later than or equal to ${minimum}`,
      })

    if (number > maximum)
      addIssue(context, {
        code: 'birth_year_too_big',
        params: { maximum },
        message: `Birth year must be earlier than or equal to ${maximum}`,
      })
  }
}
