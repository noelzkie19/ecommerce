"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { imageLibraryApi } from "@/infrastructure/api/image-library.api";

interface Props {
  readonly id?: string;
  readonly value?: string;
  readonly onChange: (url: string, thumbnailUrl?: string) => void;
  readonly disabled?: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ImageUpload({ id, value, onChange, disabled }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Invalid file type. Please upload jpg, png, gif, or webp.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File too large. Maximum size is 5MB.";
    }
    return null;
  };

  const handleUpload = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await imageLibraryApi.upload(file, (progress) => {
        setUploadProgress(progress);
      });

      setPreview(result.imageUrl);
      onChange(result.imageUrl, result.thumbnailUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled && !isUploading) {
        setIsDragging(true);
      }
    },
    [disabled, isUploading],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled || isUploading) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        handleUpload(file);
      }
    },
    [disabled, isUploading],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  if (preview) {
    return (
      <div className="relative">
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <div className="text-white text-center">
              <Loader2 size={24} className="animate-spin mx-auto mb-2" />
              <span className="text-sm">Uploading... {uploadProgress}%</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <section
        id={id}
        aria-label="Image upload drop zone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative w-full h-40 border-2 border-dashed rounded-lg
          transition-colors flex flex-col items-center justify-center gap-2
          ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300"}
          ${disabled || isUploading ? "opacity-50" : "cursor-pointer hover:border-gray-400"}
        `}
      >
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled || isUploading}
          className="w-full h-full flex flex-col items-center justify-center gap-2"
          aria-label="Upload image"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled || isUploading}
          />

          {isUploading ? (
            <>
              <Loader2 size={32} className="text-emerald-600 animate-spin" />
              <span className="text-sm text-gray-600">
                Uploading... {uploadProgress}%
              </span>
              <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="p-3 bg-gray-100 rounded-full">
                <Upload size={24} className="text-gray-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Drag and drop your image here
                </p>
                <p className="text-xs text-gray-500 mt-1">or click to browse</p>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <ImageIcon size={12} className="text-gray-400" />
                <span className="text-xs text-gray-400">
                  JPG, PNG, GIF, WebP (max 5MB)
                </span>
              </div>
            </>
          )}
        </button>
      </section>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
