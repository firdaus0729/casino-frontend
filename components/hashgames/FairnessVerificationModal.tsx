'use client'

import React, { useState } from 'react'
import { X, Copy, Check, ExternalLink } from 'lucide-react'

interface RoundResult {
  blockNum: number
  blockId: string | null
  lastChar: string | null
  algorithm: string
  result: 'ODD' | 'EVEN' | null
  status: string
}

interface FairnessVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  roundResult: RoundResult
}

/**
 * Verify Odd/Even result from block hash
 */
const verifyResult = (blockId: string): { result: 'ODD' | 'EVEN'; lastChar: string; value: number } => {
  const lastChar = blockId.slice(-1).toLowerCase()
  const isDigit = /[0-9]/.test(lastChar)
  
  let value: number
  if (isDigit) {
    value = parseInt(lastChar, 10)
  } else {
    // For hex letters (a-f), use char code
    value = lastChar.charCodeAt(0)
  }
  
  const result: 'ODD' | 'EVEN' = value % 2 === 0 ? 'EVEN' : 'ODD'
  
  return { result, lastChar, value }
}

const FairnessVerificationModal: React.FC<FairnessVerificationModalProps> = ({
  isOpen,
  onClose,
  roundResult,
}) => {
  const [copied, setCopied] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    result: 'ODD' | 'EVEN'
    lastChar: string
    value: number
    matches: boolean
  } | null>(null)

  React.useEffect(() => {
    if (roundResult.blockId && roundResult.result) {
      const verified = verifyResult(roundResult.blockId)
      setVerificationResult({
        ...verified,
        matches: verified.result === roundResult.result,
      })
    }
  }, [roundResult])

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#1a2332] rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Fairness Verification</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Block Information */}
        <div className="space-y-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-casper text-sm">Block Number</span>
              <span className="text-white font-bold">{roundResult.blockNum}</span>
            </div>
            {roundResult.blockId && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-casper text-sm">Block Hash (Block ID)</span>
                  <button
                    onClick={() => handleCopy(roundResult.blockId!)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-casper" />
                    )}
                  </button>
                </div>
                <div className="bg-black/30 rounded p-3 break-all">
                  <code className="text-white text-xs font-mono">
                    {roundResult.blockId}
                  </code>
                </div>
                <a
                  href={`https://tronscan.org/#/block/${roundResult.blockNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-dodger-blue hover:underline mt-2 text-sm"
                >
                  View on TronScan
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Algorithm Explanation */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-white font-bold mb-2">Algorithm</h3>
            <p className="text-casper text-sm mb-2">
              The result is calculated using the last character of the block hash:
            </p>
            <div className="bg-black/30 rounded p-3">
              <code className="text-white text-xs font-mono whitespace-pre-wrap">
                {`const lastChar = blockId.slice(-1).toLowerCase();
const isDigit = /[0-9]/.test(lastChar);
const value = isDigit ? parseInt(lastChar, 10) : lastChar.charCodeAt(0);
const result = value % 2 === 0 ? 'EVEN' : 'ODD';`}
              </code>
            </div>
          </div>

          {/* Verification Result */}
          {verificationResult && (
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-white font-bold mb-4">Verification Result</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-casper text-sm">Last Character</span>
                  <span className="text-white font-bold font-mono">
                    {verificationResult.lastChar}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-casper text-sm">Numeric Value</span>
                  <span className="text-white font-bold">
                    {verificationResult.value}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-casper text-sm">Computed Result</span>
                  <span
                    className={`font-bold ${
                      verificationResult.result === 'ODD'
                        ? 'text-crimson'
                        : 'text-yellow-orange'
                    }`}
                  >
                    {verificationResult.result}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-casper text-sm">Server Result</span>
                  <span
                    className={`font-bold ${
                      roundResult.result === 'ODD'
                        ? 'text-crimson'
                        : 'text-yellow-orange'
                    }`}
                  >
                    {roundResult.result}
                  </span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-casper text-sm font-bold">Verification Status</span>
                    <div
                      className={`flex items-center gap-2 ${
                        verificationResult.matches
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {verificationResult.matches ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span className="font-bold">Match ✅</span>
                        </>
                      ) : (
                        <>
                          <X className="w-5 h-5" />
                          <span className="font-bold">Mismatch ❌</span>
                        </>
                      )}
                    </div>
                  </div>
                  {verificationResult.matches ? (
                    <p className="text-green-400 text-sm mt-2">
                      The result has been verified and matches the server's calculation.
                      The game is fair and provably fair.
                    </p>
                  ) : (
                    <p className="text-red-400 text-sm mt-2">
                      Warning: The computed result does not match the server's result.
                      Please contact support if you believe this is an error.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Fairness Explanation */}
          <div className="bg-dodger-blue/10 rounded-lg p-4 border border-dodger-blue/20">
            <h3 className="text-white font-bold mb-2">Why This is Provably Fair</h3>
            <ul className="text-casper text-sm space-y-2 list-disc list-inside">
              <li>
                The block hash is publicly verifiable on TronScan blockchain explorer
              </li>
              <li>
                The algorithm is deterministic and publicly known - anyone can verify the result
              </li>
              <li>
                The block hash cannot be predicted or manipulated before the block is mined
              </li>
              <li>
                You can verify the result independently using the block hash and the algorithm
              </li>
            </ul>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-dodger-blue text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default FairnessVerificationModal

