"use client";

import { uploadToS3 } from "@/actions/uploadToS3";
import { useMutation } from "@tanstack/react-query";
import { Axis3DIcon, Inbox, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import toast from "react-hot-toast";
import { useState } from "react";

export default function FileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const { mutate, status } = useMutation({
    mutationFn: async ({ fileKey, fileName}: {
      fileKey: string,
      fileName: string
    }) => {
      const response = await axios.post('/api/create-chat', {
        fileKey,
        fileName
      },);

      return response.data;
    }
  });
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {'application/pdf': ['.pdf']},
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
        const file = acceptedFiles[0];

        if(file.size > 1 * 1024 * 1024) {
          toast.error("Please upload the file less the 10mb")
          return;
        }

        try {
          setIsUploading(true);
          const response = await uploadToS3(file);
          const data = response?.data;
          console.log(data);
          if(!data?.fileKey || !data?.fileName) {
            toast.error("Something went wrong");
            return;
          }

          mutate(data, {
            onSuccess: (data) => {
              console.log(data);
            },
            onError: (error) => {
              toast.error("Error creating chat");
              console.error(error);
            }
          })
        } catch(err) {
          console.error(err);
        } finally {
          setIsUploading(false);
        }
    },
  });

  return (
    <div className="p-2 rounded-xl bg-white">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl py-8 cursor-pointer bg-gray-50 flex flex-col justify-center items-center",
        })}
      >
        <input {...getInputProps()} />
        { isUploading || status === "pending" } ?
        <>
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
          <p className="mt-2 text-sm text-slate-400">
            Spilling Tea to GPT...
          </p>
        </>
        :
        <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
        </>
      </div>
    </div>
  );
}
