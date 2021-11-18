import React from 'react'
import {CircularProgress, Box} from '@mui/material'

type Props = {
  htmlStr: string
}

export const RenderHtml: React.FC<Props> = ({children, htmlStr}) => {
  if (htmlStr) {
    return <div dangerouslySetInnerHTML={{__html: htmlStr}}></div>
  } else {
    return (
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
        <CircularProgress />
      </Box>
    )
  }
}
