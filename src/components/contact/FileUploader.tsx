
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  files: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

const FileUploader = ({ files, onFileChange, onRemoveFile }: FileUploaderProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="plans">Upload Your Plans and/or Pictures</Label>
      <div className="flex items-center gap-2">
        <label htmlFor="plans" className="flex-1">
          <div className="border border-gray-300 rounded-md px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Upload className="h-5 w-5 text-atomic-turquoise" />
            <span>Choose files...</span>
          </div>
          <input 
            type="file" 
            id="plans" 
            className="sr-only" 
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={onFileChange}
            multiple
          />
        </label>
        <Button 
          type="button" 
          variant="upload"
          onClick={() => document.getElementById('plans')?.click()}
        >
          Upload
        </Button>
      </div>
      <p className="text-xs text-gray-500">Upload blueprints, plans or photos (PDF, DOC, PNG, JPG)</p>
      
      {/* Display uploaded files */}
      {files.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium mb-2">Uploaded files:</p>
          <ul className="space-y-1 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between text-sm p-1 bg-gray-50 rounded">
                <span className="truncate max-w-[200px]">{file.name}</span>
                <button 
                  type="button" 
                  onClick={() => onRemoveFile(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
