"use client";
import React, { useState, useEffect, useMemo } from 'react'

interface StorageInfoProps {
  totalStorage?: number
  occupiedStorage?: number
  dataDirectory?: string
  enableRealTimeUpdates?: boolean
  className?: string
}

interface StorageData {
  totalStorage: number
  occupiedStorage: number
  availablePercentage: number
  dataDirectory: string
}

const StorageInfo: React.FC<StorageInfoProps> = ({
  totalStorage = 30,
  occupiedStorage = 2.208,
  dataDirectory = '/tests/test_upload_dir',
  enableRealTimeUpdates = false,
  className = ''
}) => {
  const [currentOccupied, setCurrentOccupied] = useState<number>(occupiedStorage)
  const [isAnimated, setIsAnimated] = useState<boolean>(false)

  // Computed values
  const availablePercentage = useMemo(() => {
    return Math.round(((totalStorage - currentOccupied) / totalStorage) * 100)
  }, [totalStorage, currentOccupied])

  const usedPercentage = useMemo(() => {
    return (currentOccupied / totalStorage) * 100
  }, [currentOccupied, totalStorage])

  const circumference = useMemo(() => 2 * Math.PI * 40, []) // radius = 40
  
  const strokeDashoffset = useMemo(() => {
    return circumference - (usedPercentage / 100) * circumference
  }, [circumference, usedPercentage])

  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Real-time updates effect
  useEffect(() => {
    if (!enableRealTimeUpdates) return

    const interval = setInterval(() => {
      setCurrentOccupied(prev => {
        const change = (Math.random() - 0.5) * 0.1
        return Math.max(2.0, Math.min(2.5, prev + change))
      })
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [enableRealTimeUpdates])

  return (
    <div className={`  bg-gray-700 bg-opacity-50  rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center justify-between">
        {/* Left Section: Storage Stats */}
        <div className="flex-1">
          {/* Storage Information */}
          <div className="flex mb-2 space-x-3">
            {/* Total Storage */}
            <div className="items-center space-x-3">
<div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-900 rounded-full" />
                <p className="text-gray-400 text-xs font-medium">Total Storage</p>
</div>
              <div>
                <p className="text-white text-base font-bold mt-1">{totalStorage} GB</p>
              </div>
            </div>

            {/* Occupied Storage */}
            <div className=" items-center space-x-3">
            <div className="flex items-center space-x-1">

              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <p className="text-gray-400 text-xs font-medium">Occupied Storage</p>
              </div>
              <div>
                
                <p className="text-white text-base font-bold mt-1">
                  {currentOccupied.toFixed(3)} GB
                </p>
              </div>
            </div>
          </div>

          {/* Data Directory */}
          <div className="mb-4">
            <h3 className="text-gray-400 text-xs font-medium m">Data Directory</h3>
            <p className="text-white max-w-60 text-xs font-mono  ">
              {dataDirectory}
            </p>
          </div>
        </div>

        {/* Right Section: Circular Chart */}
        <div className="">
          <div className="relative w-30 h-30">
            {/* Background Circle */}
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#1a1a1a"
                strokeWidth="12"
              />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={isAnimated ? strokeDashoffset : circumference}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-base font-bold text-white ">
                  {availablePercentage}%
                </div>
                <div className="text-xs text-gray-400">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StorageInfo

// Export types for external use
export type { StorageInfoProps, StorageData }