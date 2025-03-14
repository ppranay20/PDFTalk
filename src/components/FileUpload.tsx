"use client";

import { Inbox } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function FileUpload() {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {'application/pdf': ['.pdf']},
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
        console.log(acceptedFiles);
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
        <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
        </>
      </div>
    </div>
  );
}
