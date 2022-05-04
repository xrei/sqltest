import {RichTextEditor} from './RichTextEditor'
import {indigo} from '@mui/material/colors'

export const MUIRichTextEditorTheme = {
  MUIRichTextEditor: {
    styleOverrides: {
      root: {
        border: `1px solid ${indigo[400]}`,
        borderRadius: '6px',
        minHeight: '200px',
        padding: '0 12px',
      },
      container: {},
    },
  },
}

export {RichTextEditor}
