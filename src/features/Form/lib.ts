import { FormStateType, FormStateDefiniteFailed, FormStateDefiniteSuccess } from './model'

export function createSuccessfulFormState(data: FormStateDefiniteSuccess['data']): FormStateDefiniteSuccess {
  return {
    type: FormStateType.SUCCESS,
    data,
  }
}

export function createFailedFormState(
  errors: FormStateDefiniteFailed['errors'] = {},
): FormStateDefiniteFailed {
  return {
    type: FormStateType.FAILED,
    errors,
  }
}
