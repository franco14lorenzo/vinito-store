'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import { IS_DEV_ENVIRONMENT } from '@/constants'

type ScanQRContextType = {
  isScanning: boolean
  openCamera: () => Promise<void>
  closeCamera: () => void
  videoRef: React.RefObject<HTMLVideoElement>
}

const ScanQRContext = createContext<ScanQRContextType | undefined>(undefined)

export function ScanQRProvider({ children }: { children: React.ReactNode }) {
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const openCamera = async () => {
    try {
      setIsScanning(true)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      IS_DEV_ENVIRONMENT && console.error(err) // TODO: Handle error in production
      alert('No se pudo acceder a la cámara. Por favor, intenta de nuevo.')
      setIsScanning(false)
    }
  }

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }
    setIsScanning(false)
  }

  return (
    <ScanQRContext.Provider
      value={{ isScanning, openCamera, closeCamera, videoRef }}
    >
      {children}
    </ScanQRContext.Provider>
  )
}

export function useScanQR() {
  const context = useContext(ScanQRContext)
  if (context === undefined) {
    throw new Error('useScanQR must be used within a ScanQRProvider')
  }
  return context
}
