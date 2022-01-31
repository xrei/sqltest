import React from 'react'
import {basicSetup, EditorView} from '@codemirror/basic-setup'
import {EditorState, Compartment} from '@codemirror/state'
import {keymap} from '@codemirror/view'
import {indentWithTab} from '@codemirror/commands'
import {sql} from '@codemirror/lang-sql'
import {createEffect, attach, forward, createStore, createEvent} from 'effector'
import {createGate, useGate} from 'effector-react'
import {oneDark} from './theme'

export const $doc = createStore('')
const onDocChange = createEvent<string>()

$doc.on(onDocChange, (_, str) => str)

$doc.watch((v) => {
  console.log(v)
})

const langConf = new Compartment()

const cmState = EditorState.create({
  extensions: [
    basicSetup,
    oneDark,
    langConf.of(sql()),
    EditorView.updateListener.of((v) => {
      if (v.docChanged) {
        const val = v.state.doc.toString()
        onDocChange(val)
      }
    }),
    keymap.of([indentWithTab]),
  ],
})

let cmView: EditorView

const CodeMirrorGate = createGate()

const initCodeMirrorFx = createEffect(() => {
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
