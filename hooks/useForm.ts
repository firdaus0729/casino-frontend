import { useState, useCallback } from 'react'

interface UseFormOptions<T> {
  initialValues: T
  onSubmit: (values: T) => void | Promise<void>
  validate?: (values: T) => Partial<Record<keyof T, string>>
}

interface UseFormReturn<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  handleChange: (
    field: keyof T
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleBlur: (field: keyof T) => () => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  setFieldValue: (field: keyof T, value: any) => void
  resetForm: () => void
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback(
    (field: keyof T) => {
      return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value
        setValues(prev => ({ ...prev, [field]: value }))

        // Clear error when user starts typing
        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: undefined }))
        }
      }
    },
    [errors]
  )

  const handleBlur = useCallback(
    (field: keyof T) => {
      return () => {
        setTouched(prev => ({ ...prev, [field]: true }))

        // Validate field on blur if validation function exists
        if (validate) {
          const fieldErrors = validate(values)
          if (fieldErrors[field]) {
            setErrors(prev => ({
              ...prev,
              [field]: fieldErrors[field],
            }))
          }
        }
      }
    },
    [values, validate]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (validate) {
        const validationErrors = validate(values)
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors)
          // Mark all fields as touched
          const allTouched = Object.keys(values).reduce(
            (acc, key) => {
              acc[key as keyof T] = true
              return acc
            },
            {} as Partial<Record<keyof T, boolean>>
          )
          setTouched(allTouched)
          return
        }
      }

      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validate, onSubmit]
  )

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }, [])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  }
}
