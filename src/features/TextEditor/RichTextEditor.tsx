import React, {useRef, useState} from 'react'
import MUIRichTextEditor, {TMUIRichTextEditorProps} from 'mui-rte'
import {EditorState, convertToRaw, convertFromHTML, ContentState} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'

type RTEProps = {
  html?: string
  EditorProps: TMUIRichTextEditorProps
  onChange?: (state: string) => void
}

export const RichTextEditor = (props: RTEProps) => {
  const editorRef = useRef(null)

  const onChange = (state: EditorState) => {
    if (typeof props.onChange === 'function') {
      props.onChange(stateToHTML(state.getCurrentContent(), {}))
    }
  }

  const defval = props.html ? html2state(props.html) : ''

  return (
    <MUIRichTextEditor
      ref={(editor: any) => (editorRef.current = editor)}
      inlineToolbar={true}
      defaultValue={defval}
      {...props.EditorProps}
      onChange={(state) => onChange(state)}
    />
  )
}

export const html2state = (html: string) => {
  const contentHtml = convertFromHTML(html)
  const state = ContentState.createFromBlockArray(contentHtml.contentBlocks, contentHtml.entityMap)
  return JSON.stringify(convertToRaw(state))
}
