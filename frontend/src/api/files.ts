import apiClient from './client';
import axios, { type AxiosProgressEvent } from 'axios';

export interface FileUploadResponse {
  success: boolean;
  data: {
    fileId: string;
    filename: string;
    fileSize: number;
    duration: number;
    format: string;
    stepFileId?: string;
  };
  message?: string;
}

export const uploadFile = async (
  file: File,
  onProgress?: (progress: AxiosProgressEvent) => void
): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  return apiClient.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: onProgress,
  });
};

export const getFile = async (fileId: string) => {
  return apiClient.get(`/files/${fileId}`);
};

export const deleteFile = async (fileId: string) => {
  return apiClient.delete(`/files/${fileId}`);
};



