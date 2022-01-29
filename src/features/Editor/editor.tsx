import React from 'react'
import {createEffect, attach, forward} from 'effector'
import {createGate, useGate} from 'effector-react'

const CodeMirrorGate = createGate()

export const CodeEditor = () => {
  useGate(CodeMirrorGate)

  return (
    <div className="editor">
      <textarea />
    </div>
  )
}
