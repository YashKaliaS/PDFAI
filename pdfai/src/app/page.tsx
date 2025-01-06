import UploadOptions from './components/UploadOptions'
import ChatInterface from './components/ChatInterface'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-gray-800 p-6">Document Chat App</h1>
        <UploadOptions />
        <ChatInterface />
      </div>
    </main>
  )
}

