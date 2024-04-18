// why is this happening?
// ESLint: 'FormStateType' is already declared in the upper scope on line 2 column 13.(no-shadow)
// eslint-disable-next-line no-shadow
export enum FormStateType {
  SUCCESS,
  FAILED,
}

export type FormStateDefiniteSuccess = {
  type: FormStateType.SUCCESS
  data: Record<string, any>
}

export type FormStateDefiniteFailed = {
  type: FormStateType.FAILED
  errors: Record<string, string[]>
}

export type FormStateDefinite = FormStateDefiniteSuccess | FormStateDefiniteFailed

export type FormStateUnknown = null

export type FormState = FormStateDefinite | FormStateUnknown
