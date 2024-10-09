'use client'
import { useState } from 'react'
import { Camera } from 'lucide-react'

import { Button } from '@/components/ui/button'

function ScanQRButton() {
  const [isScanning, setIsScanning] = useState(false)

  const openCamera = async () => {
    try {
      setIsScanning(true)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      // Aquí normalmente se inicializaría un escáner de QR con el stream
      console.log('Cámara abierta:', stream)

      // Por ahora, solo cerramos el stream después de un breve delay como ejemplo
      setTimeout(() => {
        stream.getTracks().forEach((track) => track.stop())
        setIsScanning(false)
      }, 3000)
    } catch (err) {
      console.error('Error al abrir la cámara:', err)
      alert('No se pudo acceder a la cámara. Por favor, intenta de nuevo.')
      setIsScanning(false)
    }
  }
  return (
    <Button
      className="w-full rounded-full md:w-auto"
      onClick={openCamera}
      disabled={isScanning}
    >
      <Camera className="mr-2 h-4 w-4" />
      {isScanning ? 'Escaneando...' : 'Escanear QR'}
    </Button>
  )
}

export default ScanQRButton
