'use client'

import React from 'react'

interface PolicyFormProps {
  content: string // or `content?: string` if it can be optional
}

const PolicyForm: React.FC<PolicyFormProps> = ({ content }) => {
  return (
    <div className="policy-form flex gap-4 items-center">
      <input type="checkbox" />
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
    </div>
  )
}

export default PolicyForm
