'use client'

import React, { useState } from 'react'
import ModalContainer from '@/components/modals/ModalContainer'

export default function ModalTest() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          🎯 Modal Container Test
        </h1>
        
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Test the fully responsive modal container with modern viewport units, 
          scroll locking, and accessibility features.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
        >
          🚀 Open Modal Test
        </button>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-2xl mx-auto">
          <h3 className="text-white font-semibold mb-4">✅ Features Tested</h3>
          <ul className="text-gray-300 space-y-2 text-left">
            <li>• <strong>Responsive Design:</strong> Works on desktop, tablet, and mobile</li>
            <li>• <strong>Modern Viewport Units:</strong> Uses dvh with fallback to vh</li>
            <li>• <strong>Scroll Locking:</strong> Prevents background scroll when modal is open</li>
            <li>• <strong>Accessibility:</strong> ARIA attributes, keyboard navigation, focus management</li>
            <li>• <strong>iOS Safari Fix:</strong> Handles mobile viewport issues</li>
            <li>• <strong>Content Overflow:</strong> Internal scrolling when content exceeds viewport</li>
            <li>• <strong>Smooth Animations:</strong> Fade in/out with scale transitions</li>
          </ul>
        </div>

        <ModalContainer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Responsive Modal Test"
          ariaLabel="Test modal for responsive design"
          ariaDescribedBy="modal-description"
        >
          <div id="modal-description" className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                🎉 Modal Container Success!
              </h3>
              <p className="text-gray-600">
                This modal is fully responsive and should work perfectly on all devices.
              </p>
            </div>

            {/* Long content to test scrolling */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Content Section 1</h4>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <h4 className="text-lg font-medium text-gray-900">Content Section 2</h4>
              <p className="text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <h4 className="text-lg font-medium text-gray-900">Content Section 3</h4>
              <p className="text-gray-600">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              
              <h4 className="text-lg font-medium text-gray-900">Content Section 4</h4>
              <p className="text-gray-600">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed 
                quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>
              
              <h4 className="text-lg font-medium text-gray-900">Content Section 5</h4>
              <p className="text-gray-600">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
                adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
                dolore magnam aliquam quaerat voluptatem.
              </p>
              
              <h4 className="text-lg font-medium text-gray-900">Footer Content</h4>
              <p className="text-gray-600">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
                praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias 
                excepturi sint occaecati cupiditate non provident.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                ✅ Close Modal
              </button>
              <button
                onClick={() => alert('Action button clicked!')}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                🔄 Test Action
              </button>
            </div>
          </div>
        </ModalContainer>
      </div>
    </div>
  )
}
