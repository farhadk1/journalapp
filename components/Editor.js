import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import createLinkPlugin from "@draft-js-plugins/anchor";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import { stateFromMarkdown } from "draft-js-import-markdown";

import {
  BoldButton,
  ItalicButton,
  BlockquoteButton,
  HeadlineOneButton,
  OrderedListButton,
} from "@draft-js-plugins/buttons";

import Head from "next/head";
import styles from "../styles/Home.module.css";

import "@draft-js-plugins/inline-toolbar/lib/plugin.css";

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
// const linkPlugin = createLinkPlugin();
// const linkifyPlugin = createLinkifyPlugin();

const markdown = `
#This is Journal Ninja#


A minimalist writing zone, where you can block out all distractions and get to what's important. The writing!  

 To get started, all you need to do is delete this text (seriously, just highlight it and hit delete), and fill the page with your own fantastic words. You can even change the title!  
 
 You can use **bold**, _italics_, **_both_** and [ urls ](http://zenpen.io) just by highlighting the text and selecting them from the tiny options box that appears above it.
> Quotes are easy to add too!
If you're using ZenPen, and want to contribute a few dollars, there's a small donate button on the bottom left.

Happy Typing! ~ ** Journal Ninja **
`;

export default function MyEditor({ journalState, setJournalState }) {
  let contentState = stateFromMarkdown(markdown);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );
  //   const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editor = useRef(null);

  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    focusEditor();
  }, []);

  useEffect(() => {
    setJournalState(editorState);
  }, [editorState]);

  return (
    <div className="max-w-[900px] h-[90%] w-screen relative top-16">
      <div className="w-100 h-screen" onClick={focusEditor}>
        <Editor
          className="w-[80%] bg-slate-900"
          ref={editor}
          editorState={editorState}
          onChange={(editorState) => setEditorState(editorState)}
          plugins={[inlineToolbarPlugin]}
        />
        <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div>
                {/* <linkPlugin.LinkButton {...externalProps} /> */}
                <BoldButton {...externalProps} />
                <HeadlineOneButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <OrderedListButton {...externalProps} />
              </div>
            )
          }
        </InlineToolbar>
      </div>
    </div>
  );
}
