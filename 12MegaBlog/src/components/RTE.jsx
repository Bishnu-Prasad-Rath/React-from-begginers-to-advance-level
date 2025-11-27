import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="w-full">
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              value={value}
              initialValue={defaultValue}
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap",
                  "preview", "anchor", "searchreplace", "visualblocks", "code",
                  "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | forecolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat | code | help",
                content_style:
                  "body { font-family: Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; padding: 12px; }",
                width: "100%",
                resize: true,
              }}
              onEditorChange={onChange}
            />
          </div>
        )}
      />
    </div>
  );
}
