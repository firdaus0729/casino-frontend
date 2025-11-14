'use client'

import React, { useState } from 'react'
import { Input, Button } from '.'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
  buttonText?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search...',
  className = '',
  buttonText = 'Search',
}) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="flex-1"
      />
      <Button variant="blue" disabled={!query.trim()}>
        {buttonText}
      </Button>
    </form>
  )
}

export default SearchBar
