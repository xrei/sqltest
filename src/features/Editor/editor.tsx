import React from 'react'
import {basicSetup, EditorView} from '@codemirror/basic-setup'
import {EditorState, Compartment} from '@codemirror/state'
import {sql} from '@codemirror/lang-sql'
import {createEffect, attach, forward, createStore, createEvent} from 'effector'
import {createGate, useGate} from 'effector-react'

export const $doc = createStore('')
export const onDocChange = createEvent<string>()

$doc.on(onDocChange, (_, str) => str)

$doc.watch((v) => {
  console.log(v)
})

const langConf = new Compartment()

const cmState = EditorState.create({
  extensions: [
    basicSetup,
    langConf.of(sql()),
    EditorView.updateListener.of((v) => {
      if (v.docChanged) {
        const val = v.state.doc.toString()
        onDocChange(val)
      }
    }),
  ],
})

let cmView: EditorView

const CodeMirrorGate = createGate()

export const initCodeMirrorFx = createEffect(() => {
  cmView = new EditorView({
    state: cmState,
    parent: document.querySelector('.editor')!,
  })
})

forward({
  from: CodeMirrorGate.open,
  to: initCodeMirrorFx,
})

CodeMirrorGate.close.watch(() => {
  cmView.destroy()
})

export const CodeEditor = () => {
  useGate(CodeMirrorGate)

  return <div className="editor"></div>
}
