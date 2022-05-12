import { RefinementCtx, ZodCustomIssue } from 'zod'

interface IssuePayload {
  code: string
  params?: ZodCustomIssue['params']
  message: string
}

export function addIssue(context: RefinementCtx, payload: IssuePayload) {
  const { code, params, message } = payload

  context.addIssue({
    code: 'custom',
    params: { code, ...params },
    message,
  })
}
