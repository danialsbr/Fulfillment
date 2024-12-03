import { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

const API_BASE_URL = 'http://localhost:5001'

export function useApi() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleResponse = async (response: Response) => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'An error occurred')
    }
    return response.json()
  }

  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
      const data = await handleResponse(response)
      return data
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: "destructive",
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return apiCall('/upload', { method: 'POST', body: formData })
  }

  const downloadFile = async () => {
    const response = await fetch(`${API_BASE_URL}/download-updated`, { method: 'GET' })
    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'updated_fulfillment.xlsx'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      toast({
        title: "Success",
        description: "File downloaded successfully",
      })
    } else {
      throw new Error('Failed to download file')
    }
  }

  const getOrders = () => apiCall('/orders')

  return {
    isLoading,
    uploadFile,
    downloadFile,
    getOrders,
  }
}

