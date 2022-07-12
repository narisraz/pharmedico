import type { ValidationSchema } from './Context'

export const initialValues: ValidationSchema = {
  name: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    helperText: 'Ce champ est obligatoire'
  },
  firstName: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
  },
  email: {
    value: '',
    error: '',
    validate: 'email'
  },
  gender: {
    value: '',
    error: '',
    validate: 'select'
  },
  date: {
    value: '',
    error: ''
  },
  city: {
    value: '',
    error: '',
    validate: 'text',
    minLength: 3,
    maxLength: 20
  },
  agreenemt: {
    value: false,
    error: '',
    required: true,
    validate: 'checkbox',
    helperText: 'Please accept our terms and conditions'
  },
  phone: {
    value: '',
    error: '',
    validate: 'phone',
    maxLength: 15
  }
}
