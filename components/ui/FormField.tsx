'use client'

import React from 'react'
import clsx from 'clsx'

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
  htmlFor?: string
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  children,
  className = '',
  htmlFor,
}) => {
  return (
    <div className={clsx('w-full', className)}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-200 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default FormField
