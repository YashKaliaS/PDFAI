'use client'

import { useState } from 'react'
import { Upload, File, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface FileUploadProps {
  type: 'pdf' | 'photo'
  onReset: () => void
}

export default function FileUpload({ type, onReset }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (files.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    const formData = new FormData()
    files.forEach((file) => formData.append(type === 'pdf' ? 'files' : 'photos', file))

    const endpoint = type === 'pdf' ? 'http://localhost:8000/upload' : 'http://localhost:8000/upload-photos'

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload files')
      }

      setFiles([]) // Reset the file list after upload
      onReset() // Reset the upload option
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  // Determine the accepted file types based on the `type`
  const acceptedFileTypes = type === 'pdf' ? '.pdf' : '.jpg,.jpeg,.png,.gif'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {type === 'pdf' ? (
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
            ) : (
              <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
            )}
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500">
              {type === 'pdf' ? 'PDF files only (MAX. 10MB each)' : 'Image files only (JPG, PNG, GIF)'}
            </p>
          </div>
          <input 
            id="dropzone-file" 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            multiple 
            accept={acceptedFileTypes} // Dynamically set accepted file types
          />
        </label>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
              <div className="flex items-center space-x-2">
                {type === 'pdf' ? (
                  <File className="w-5 h-5 text-gray-500" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-gray-500" />
                )}
                <span className="text-sm text-gray-700">{file.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      {uploading && (
        <Progress value={uploadProgress} className="w-full" />
      )}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={uploading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={uploading || files.length === 0}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </form>
  )
}
