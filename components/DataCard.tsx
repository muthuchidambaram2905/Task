import React, { useState, useEffect } from 'react'

interface BucketInfoProps {
  bucketName?: string
  targetDirectory?: string
  region?: string
  bandwidthLimit?: number
  concurrency?: number
  dataDirectory?: string
  enableRealTimeUpdates?: boolean
  className?: string
  onToggle?: (isCollapsed: boolean) => void
}

interface BucketData {
  bucketName: string
  targetDirectory: string
  region: string
  bandwidthLimit: number
  concurrency: number
  dataDirectory: string
}

const BucketInfo: React.FC<BucketInfoProps> = ({
  bucketName = 'nz_sample_data',
  targetDirectory = 'test',
  region = 'ap-south-1',
  bandwidthLimit = 100,
  concurrency = 1,
  dataDirectory = '/root/neuralpilot_/tests/test_upload_dir',
  enableRealTimeUpdates = false,
  className = '',
  onToggle
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [currentBandwidth, setCurrentBandwidth] = useState<number>(bandwidthLimit)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Real-time bandwidth updates
  useEffect(() => {
    if (!enableRealTimeUpdates) return

    const interval = setInterval(() => {
      setCurrentBandwidth(prev => {
        const variation = Math.floor(Math.random() * 20) - 10 // ±10 Kbps
        return Math.max(50, Math.min(150, prev + variation))
      })
    }, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [enableRealTimeUpdates])

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed
    setIsCollapsed(newCollapsedState)
    onToggle?.(newCollapsedState)
  }

  const bucketData: Array<{ label: string; value: string | number }> = [
    { label: 'Bucket Name', value: bucketName },
    { label: 'Target Directory', value: targetDirectory },
    { label: 'Region', value: region },
    { label: 'Bandwidth Limit', value: `${currentBandwidth} Kbps` },
    { label: 'Concurrency', value: concurrency },
    { label: 'Data Directory', value: dataDirectory }
  ]

  return (
    <div className='bg-gray-700 bg-opacity-50 rounded-2xl p-2 '   >
        {bucketData.map((item, index) => (
          <div
            key={item.label}
            className={`flex  justify-between my-2 ${
              index < bucketData.length - 1 ? 'border-b border-[#404040]' : ''
            } ${
              hoveredRow === index ? 'bg-gray-700 bg-opacity-30' : ''
            }`}
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <span className=" text-gray-400 text-sm font-medium flex-shrink-0 mt-0.5">
              {item.label}
            </span>
            <span 
              className={`text-white text-sm px-2 font-medium text-right ml-4 ${
                item.label === 'Data Directory' ? 'font-mono break-all' : ''
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

  )
}

export default BucketInfo

// Export types for external use
export type { BucketInfoProps, BucketData }