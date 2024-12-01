import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Upload } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept: string
  className?: string
}

export function FileUpload({ onFileSelect, accept, className = '' }: FileUploadProps) {
  const [fileName, setFileName] = useState<string>('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setFileName(file.name)
      onFileSelect(file)
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxFiles: 1
  })

  return (
    <Card className={className}>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 cursor-pointer
            ${isDragActive ? 'border-primary' : 'border-border'}
            hover:border-primary transition-colors`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {fileName ? (
              <>
                <FileText className="h-8 w-8 text-primary" />
                <p className="text-sm">{fileName}</p>
              </>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {isDragActive ? 
                    'Drop the file here' : 
                    'Drag & drop a JSON file or click to select'}
                </p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}