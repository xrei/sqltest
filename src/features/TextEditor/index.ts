import {convertFromHTML, ContentState, convertToRaw} from 'draft-js'
import {RichTextEditor} from './RichTextEditor'
import {indigo} from '@mui/material/colors'

export const MUIRichTextEditorTheme = {
  MUIRichTextEditor: {
    styleOverrides: {
      root: {
        border: `1px solid ${indigo[400]}`,
        borderRadius: '6px',
        minHeight: '220px',
        padding: '0 12px',
      },
      container: {},
      editor: {
        maxHeight: '800px',
        overflow: 'auto',
        paddingBottom: '16px',
      },
      placeHolder: {
        minHeight: '170px',
      },
    },
  },
}

export const html2Editor = (html: string) => {
  const contentHtml = convertFromHTML(html)
  const state = ContentState.createFromBlockArray(contentHtml.contentBlocks, contentHtml.entityMap)
  console.log(html)
  return convertToRaw(state)
}

export {RichTextEditor}
