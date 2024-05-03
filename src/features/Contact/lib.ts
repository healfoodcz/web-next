import { z } from 'zod'
import validator from 'validator'

// https://stackoverflow.com/questions/60269936/typescript-convert-generic-object-from-snake-to-camel-case
// type CamelToUpperSnakeCase<Value extends string> = Value extends `${infer T}${infer U}`
//   ? `${T extends Capitalize<T> ? '_' : ''}${Uppercase<T>}${CamelToUpperSnakeCase<U>}`
//   : Value

// type helloWorld = CamelToUpperSnakeCase<'helloWorld'> // 'HELLO_WORLD'

/*
 * Given input value = "fullName"
 * function will produce the following string:
 * FULL_NAME
 * */
// function toUpperSnakeCase<Value extends string>(value: Value): CamelToUpperSnakeCase<Value> {
//   return value.replace(/([A-Z][a-z]+)/g, '_$1').toUpperCase() as CamelToUpperSnakeCase<Value>
// }

// type Error<
//   FieldName extends string,
//   ErrorType extends string,
// > = `E_${CamelToUpperSnakeCase<FieldName>}_${CamelToUpperSnakeCase<ErrorType>}`

/*
 * Given input fieldName = "fullName" and errorType = "wrongFormat"
 * function will produce the following string:
 * E_FULL_NAME_WRONG_FORMAT
 * */
// function error<FieldName extends string, ErrorType extends string>(
//   fieldName: string,
//   errorType: string,
// ): Error<FieldName, ErrorType> {
//   return `E_${toUpperSnakeCase(fieldName)}_${toUpperSnakeCase(errorType)}` as Error<FieldName, ErrorType>
// }

// type FieldError<FieldName extends string> = {
//   [key in FieldName]: {
//     required: Error<FieldName, 'required'>
//     nonEmpty: Error<FieldName, 'nonEmpty'>
//     wrongFormat: Error<FieldName, 'wrongFormat'>
//   }
// }

/*
 * Given input fieldName = "fullName"
 * function will produce the following object:
 * {
 *   fullName: {
 *     required: "E_FULL_NAME_REQUIRED",
 *     nonEmpty: "E_FULL_NAME_NON_EMPTY",
 *     wrongFormat: "E_FULL_NAME_WRONG_FORMAT",
 *   }
 * }
 * */
// function fieldError<FieldName extends string>(fieldName: FieldName): FieldError<FieldName> {
//   return {
//     [fieldName]: {
//       required: error<FieldName, 'required'>(fieldName, 'required'),
//       nonEmpty: error<FieldName, 'nonEmpty'>(fieldName, 'nonEmpty'),
//       wrongFormat: error<FieldName, 'wrongFormat'>(fieldName, 'wrongFormat'),
//     },
//   } as FieldError<FieldName>
// }

// const errors = {
//   ...fieldError('url'),
//   ...fieldError('locale'),
//   ...fieldError('fullName'),
//   ...fieldError('email'),
//   ...fieldError('phone'),
//   ...fieldError('hasTelegram'),
//   ...fieldError('hasWhatsApp'),
// }

export function normalizePhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/\s/g, '')
}

export function createTelegramLink(phoneNumber: string) {
  return `https://t.me/${normalizePhoneNumber(phoneNumber)}`
}

export function createWhatsAppLink(phoneNumber: string) {
  return `https://wa.me/${normalizePhoneNumber(phoneNumber)}`
}

// eslint-disable-next-line no-shadow
export enum FieldError {
  MISSING = 'MISSING',
  EMPTY = 'EMPTY',
  WRONG_FORMAT = 'WRONG_FORMAT',
  TOO_LONG = 'TOO_LONG',
  MUST_BE_CHECKED = 'MUST_BE_CHECKED',
}

const missing = { required_error: FieldError.MISSING }
const wrongFormat = { message: FieldError.WRONG_FORMAT }
const mustBeChecked = { message: FieldError.MUST_BE_CHECKED }

function phoneValidator(value: string) {
  return validator.isMobilePhone(value, 'any', { strictMode: true })
}

export const textareaMaxLength = 2000

export const contactFormSchema = z
  .object({
    url: z.string(missing).trim(),
    locale: z.string(missing).trim(),
    productId: z.string().trim().nullable(),
    productTitle: z.string().trim().nullable(),
    userType: z.enum(['legalEntity', 'individual'], missing),
    companyName: z.string().trim().nullable(),
    fullName: z.string(missing).trim().min(1, FieldError.EMPTY),
    email: z.string(missing).trim().min(1, FieldError.EMPTY).email(wrongFormat),
    phone: z.string(missing).trim().min(1, FieldError.EMPTY).refine(phoneValidator, wrongFormat),
    hasTelegram: z.boolean(missing),
    hasWhatsApp: z.boolean(missing),
    message: z.string().trim().max(textareaMaxLength, FieldError.TOO_LONG).nullable(),
    save: z.boolean(missing),
    agreeWithPrivacyPolicy: z.boolean().refine((val) => val, mustBeChecked),
  })
  .superRefine(({ userType, companyName }, refinementContext) => {
    if (userType === 'legalEntity' && (!companyName || companyName.length === 0)) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 1,
        type: 'string',
        inclusive: true,
        exact: false,
        message: FieldError.EMPTY,
        path: ['companyName'],
      })
    }

    return undefined
  })
