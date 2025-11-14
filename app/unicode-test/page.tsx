'use client'

import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setDisplayName } from '@/store/slices/authSlice'
import { useToast } from '@/context/ToastProvider'

export default function UnicodeTestPage() {
  const [testName, setTestName] = useState('')
  const dispatch = useAppDispatch()
  const { user, token } = useAppSelector(state => state.auth)
  const { showSuccess, showError } = useToast()

  const testNames = [
    '田中太郎',  // Japanese
    '张三',      // Chinese
    'Олександр', // Ukrainian
    'أحمد',      // Arabic
    'François',  // French
    'John Doe'   // English
  ]

  const handleTestName = async (name: string) => {
    try {
      console.log('Testing name:', name)
      console.log('Name length:', name.length)
      console.log('Name bytes:', new TextEncoder().encode(name).length)
      console.log('Name characters:', Array.from(name).map(c => ({ char: c, code: c.charCodeAt(0).toString(16) })))
      
      const result = await dispatch(setDisplayName({ name })).unwrap()
      console.log('API result:', result)
      
      if (result.code === 200 || result.code === 0) {
        showSuccess('Success', `Successfully set name to: ${name}`)
      } else {
        showError('Error', result.message || 'Failed to set name')
      }
    } catch (error) {
      console.error('Error testing name:', error)
      showError('Error', error instanceof Error ? error.message : 'Failed to set name')
    }
  }

  const handleCustomTest = async () => {
    if (!testName.trim()) {
      showError('Error', 'Please enter a name to test')
      return
    }
    
    await handleTestName(testName.trim())
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Unicode Name Test</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Current User Info</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p><strong>User ID:</strong> {user?.id}</p>
            <p><strong>Current Name:</strong> {user?.name || 'None'}</p>
            <p><strong>Token:</strong> {token ? 'Present' : 'Missing'}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Predefined Test Names</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {testNames.map((name, index) => (
              <button
                key={index}
                onClick={() => handleTestName(name)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                Test: {name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Custom Test</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Enter any Unicode name to test..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
            />
            <button
              onClick={handleCustomTest}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition-colors"
            >
              Test Custom Name
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            <ol className="list-decimal list-inside space-y-2">
              <li>Make sure you're logged in (you need a valid token)</li>
              <li>Click on any predefined test name or enter your own</li>
              <li>Check the browser console for detailed logging</li>
              <li>Check the backend server logs for API debugging info</li>
              <li>If successful, the name should appear in the "Current User Info" section</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
