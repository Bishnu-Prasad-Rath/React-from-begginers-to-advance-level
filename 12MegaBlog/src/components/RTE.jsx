import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={value}
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table help wordcount"
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",

              // ✅ Force full toolbar on mobile
              mobile: {
                toolbar:
                  "undo redo | bold italic underline forecolor | bullist numlist | link image",
                menubar: true
              },

              content_style:
                "body { font-family: Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; }",
            }}
          />
        )}
      />
    </div>
  );
}
