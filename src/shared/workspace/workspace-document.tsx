// This is my Editorjs component, better if make a seperate component and use it
"use cleint";
// @ts-ignore
// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs"; // @ts-ignore

import CheckList from "@editorjs/checklist"; // @ts-ignore
import Code from "@editorjs/code"; // @ts-ignore
import Delimiter from "@editorjs/delimiter"; // @ts-ignore
import Embed from "@editorjs/embed"; // @ts-ignore
import Image from "@editorjs/image"; // @ts-ignore
import InlineCode from "@editorjs/inline-code"; // @ts-ignore
import List from "@editorjs/list"; // @ts-ignore
import Quote from "@editorjs/quote"; // @ts-ignore
import Table from "@editorjs/table"; // @ts-ignore
import SimpleImage from "@editorjs/simple-image"; // @ts-ignore
import Paragraph from "@editorjs/paragraph"; // @ts-ignore
import Header from "@editorjs/header"; // @ts-ignore
import Raw from "@editorjs/raw"; // @ts-ignore

function Editor({ data, onChange, holder }: any) {
  // tools list
  const EDITOR_TOOLS = {
    code: Code,

    header: {
      class: Header,
      shortcut: "CMD+H",
      inlineToolbar: true,
      config: {
        placeholder: "Enter a Header",
        levels: [2, 3, 4],
        defaultLevel: 2,
      },
    },
    paragraph: {
      class: Paragraph,
      // shortcut: 'CMD+P',
      inlineToolbar: true,
    },
    checklist: CheckList,
    inlineCode: InlineCode,
    table: Table,
    list: List,
    quote: Quote,
    delimiter: Delimiter,
    raw: Raw,
    image: SimpleImage,
    embed: Embed,
  };

  //add a reference to editor
  const ref = useRef();
  let holderName = holder ?? "editor_create";
  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current && holderName) {
      const editor = new EditorJS({
        holder: holderName,
        placeholder: "Start writting here..", // @ts-ignore
        tools: EDITOR_TOOLS,
        data,
        i18n: {
          direction: "ltr",
          messages: {
            // @ts-ignore
            header: {
              default: "Header",
              "level-1": "H1",
              "level-2": "H2",
              "level-3": "H3",
              "level-4": "H4",
              "level-5": "H5",
              "level-6": "H6",
            },
          },
        },
        inlineToolbar: true,
        allowBase64: true,

        async onChange(api, event) {
          const content = await api.saver.save();
          // console.log(content, "sdfb");
          onChange(content);
        },
      });

      // @ts-ignore
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      // @ts-ignore
      if (ref.current && ref.current.destroy) {
        // @ts-ignore
        ref.current.destroy();
      }
    };
  }, [holderName]);

  // console.log("data", data);

  return (
    <>
      <div
        id={holderName}
        style={{
          width: "100%",
          minHeight: 500,
          borderRadius: " 7px",
          background: "fff",
        }}
      />
    </>
  );
}

export default Editor;
