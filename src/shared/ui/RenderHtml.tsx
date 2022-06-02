import React from 'react'

type Props = {
  htmlStr: string
  children?: React.ReactNode
}

export const RenderHtml: React.FC<Props> = ({htmlStr}) => {
  return <div dangerouslySetInnerHTML={{__html: htmlStr}}></div>
}
