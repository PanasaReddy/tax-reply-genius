import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Upload, File, X, FileText, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  acceptedFormats?: string[];
  maxFiles?: number;
}

export function FileUploader({
  onFileSelect,
  acceptedFormats = [".pdf", ".png", ".jpg", ".jpeg", ".txt"],
  maxFiles = 5,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files).slice(
        0,
        maxFiles - files.length
      );
      const newFiles = [...files, ...droppedFiles];
      setFiles(newFiles);
      onFileSelect(newFiles);
    },
    [files, maxFiles, onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files).slice(
          0,
          maxFiles - files.length
        );
        const newFiles = [...files, ...selectedFiles];
        setFiles(newFiles);
        onFileSelect(newFiles);
      }
    },
    [files, maxFiles, onFileSelect]
  );

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onFileSelect(newFiles);
    },
    [files, onFileSelect]
  );

  const getFileIcon = (file: File) => {
    if (file.type.includes("pdf")) return FileText;
    if (file.type.includes("image")) return Image;
    return File;
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-300",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <input
          type="file"
          multiple
          accept={acceptedFormats.join(",")}
          onChange={handleFileInput}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={files.length >= maxFiles}
        />
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300",
            isDragging
              ? "gradient-primary text-primary-foreground scale-110"
              : "bg-primary/10 text-primary"
          )}
        >
          <Upload className="h-8 w-8" />
        </div>
        <div className="mt-4 text-center">
          <p className="font-semibold text-foreground">
            {isDragging ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            or click to browse
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Supports PDF, Images, and Text files (max {maxFiles} files)
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => {
            const Icon = getFileIcon(file);
            return (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 animate-fade-in"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-card-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 text-muted-foreground hover:text-danger"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
