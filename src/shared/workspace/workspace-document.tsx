// ./components/Editor.js
import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./constants";

type Props = {
  data?: any;
  onChange: (data: any) => void;
  holder: string;
};

const EditorBlock = ({ data, onChange, holder }: Props) => {
  const ref = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_JS_TOOLS as any,
        data,
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;

      return () => {
        if (ref.current && ref.current.destroy) {
          ref.current.destroy();
        }
      };
    } else {
      // If the editor is already initialized, update the data
      ref.current.clear(); // Clear existing data
      ref.current.render(data); // Render new data
    }
  }, [data, holder, onChange]);

  return <div id={holder} />;
};

export default EditorBlock;
