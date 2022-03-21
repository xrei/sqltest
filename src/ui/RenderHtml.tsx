import React from 'react'

type Props = {
  htmlStr: string
}

export const RenderHtml: React.FC<Props> = ({children, htmlStr}) => {
  return <div dangerouslySetInnerHTML={{__html: htmlStr}}></div>
}
