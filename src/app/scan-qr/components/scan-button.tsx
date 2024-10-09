'use client'

import { Camera } from 'lucide-react'

import { useScanQR } from '@/app/scan-qr/contexts/scan-qr'
import { Button } from '@/components/ui/button'

function ScanQRButton() {
  const { isScanning, openCamera, closeCamera } = useScanQR()

  return (
    <Button
      className="h-10 w-full rounded-full md:w-auto"
      onClick={isScanning ? closeCamera : openCamera}
    >
      <Camera className="mr-2 h-4 w-4" />
      {isScanning ? 'Detener escaneo' : 'Escanear QR'}
    </Button>
  )
}

export default ScanQRButton
