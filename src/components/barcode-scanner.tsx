"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"

interface BarcodeScannerProps {
  onScan: (data: string | null) => void
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [startScan, setStartScan] = useState(false)

  const handleScan = () => {
    // Simulating a scan
    const mockData = "123456789"
    onScan(mockData)
    setStartScan(false)
  }

  return (
    <div className="relative">
      <Button
        onClick={() => {
          setStartScan(!startScan)
          if (!startScan) {
            handleScan()
          }
        }}
        className="whitespace-nowrap"
      >
        {startScan ? 'Stop Scan' : 'Start Scan'}
      </Button>
      {startScan && (
        <div className="w-full max-w-md mx-auto p-4 border border-gray-300 rounded">
          <p>Scanning... (simulated)</p>
        </div>
      )}
    </div>
  )
}

