'use client'
import { ReactNode } from 'react'

import { useScanQR } from '@/app/scan-qr/contexts/scan-qr'

function QRVideo({ children }: { children: ReactNode }) {
  const { isScanning, videoRef } = useScanQR()

  return (
    <>
      {isScanning ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="mt-4 aspect-square w-full max-w-md rounded-lg"
        />
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default QRVideo
