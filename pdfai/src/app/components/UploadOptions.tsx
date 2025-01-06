'use client'

import { useState } from 'react'
import { FileUp, Image } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import FileUpload from './FileUpload'

export default function UploadOptions() {
  const [activeOption, setActiveOption] = useState<'pdf' | 'photo' | null>(null)

  return (
    <div className="p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card
          className={`cursor-pointer transition-all ${activeOption === 'pdf' ? 'ring-2 ring-indigo-500' : ''}`}
          onClick={() => setActiveOption('pdf')}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <FileUp className="w-12 h-12 text-indigo-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Upload PDFs</h2>
            <p className="text-center text-gray-600">Select multiple PDF files for analysis</p>
          </CardContent>
        </Card>
        <Card
          className={`cursor-pointer transition-all ${activeOption === 'photo' ? 'ring-2 ring-indigo-500' : ''}`}
          onClick={() => setActiveOption('photo')}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Image className="w-12 h-12 text-indigo-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Upload Photos</h2>
            <p className="text-center text-gray-600">Select multiple photo files for caption generation</p>
          </CardContent>
        </Card>
      </div>
      {activeOption && (
        <FileUpload type={activeOption} onReset={() => setActiveOption(null)} />
      )}
    </div>
  )
}
