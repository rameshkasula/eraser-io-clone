// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
// import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";

const CustomEditor = ({ data, handleInstance }) => {
  const editorJS = useRef(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      data,
      tools: {
        header: Header,
        list: List,
        checklist: Checklist,
        code: Code,
        delimiter: Delimiter,
        embed: Embed,
        // image: Image,
        inlineCode: InlineCode,
        link: Link,
        quote: Quote,
        "simple-image": SimpleImage,
      },
      onReady: () => {
        editorJS.current = editor;
        handleInstance(editor);
      },
    });

    return () => {
      // editor.isReady.then((promise) => {
      //   promise.destroy().then(() => console.log("Editor was destroyed"));
      // });
      if (editor.current && editor.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id="editorjs"></div>;
};

export default CustomEditor;
