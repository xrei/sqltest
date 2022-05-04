import React from 'react'
import MUIRichTextEditor, {TMUIRichTextEditorRef, TMUIRichTextEditorProps} from 'mui-rte'
import {EditorState, convertToRaw} from 'draft-js'

export const RichTextEditor = React.forwardRef<TMUIRichTextEditorRef, TMUIRichTextEditorProps>(
  (props, ref) => {
    const onChange = (state: EditorState) => {
      // console.log(state.getCurrentContent())
    }

    return <MUIRichTextEditor ref={ref} inlineToolbar={true} {...props} onChange={onChange} />
  }
)

RichTextEditor.displayName = 'RichTextEditor'
