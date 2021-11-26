import React from 'react'
import {useStore} from 'effector-react'
import {AboutPageGate, $about} from './model'
import {RenderHtml} from 'src/ui/RenderHtml'

export const AboutPage: React.FC = () => {
  const about = useStore($about)
  return (
    <>
      <AboutPageGate></AboutPageGate>
      <RenderHtml htmlStr={about}></RenderHtml>
    </>
  )
}
