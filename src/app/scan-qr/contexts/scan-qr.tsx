'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { useRouter } from 'next/navigation'
import * as Sentry from '@sentry/nextjs'
import jsQR from 'jsqr'

import { IS_DEV_ENVIRONMENT } from '@/constants'

type ScanQRContextType = {
  isScanning: boolean
  openCamera: () => Promise<void>
  closeCamera: () => void
  videoRef: React.RefObject<HTMLVideoElement | null>
}

const ScanQRContext = createContext<ScanQRContextType | undefined>(undefined)

export function ScanQRProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      canvasRef.current = document.createElement('canvas')
    }
  }, [])

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        if (videoRef.current && canvasRef.current) {
          const video = videoRef.current
          const canvas = canvasRef.current
          const context = canvas.getContext('2d')

          if (context && video.videoWidth > 0 && video.videoHeight > 0) {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            )
            const code = jsQR(imageData.data, imageData.width, imageData.height)

            if (code) {
              const path = code.data

              router.push(path)
              closeCamera()
            }
          }
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isScanning, router])

  const openCamera = async () => {
    try {
      setIsScanning(true)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      IS_DEV_ENVIRONMENT ? console.error(error) : Sentry.captureException(error)
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
