import React from 'react'
import {basicSetup, EditorView} from '@codemirror/basic-setup'
import {EditorState, Compartment} from '@codemirror/state'
import {keymap} from '@codemirror/view'
import {indentWithTab} from '@codemirror/commands'
import {sql} from '@codemirror/lang-sql'
import {createEffect, attach, forward, createStore, createEvent} from 'effector'
import {createGate, useGate} from 'effector-react'
import {oneDark} from './theme'

export type CodeEditorModel = ReturnType<typeof createCodeEditor>

type CreateCodeEditorParams = {
  lang: string
}
const defaultConfig: CreateCodeEditorParams = {
  lang: '',
}
export function createCodeEditor(config = defaultConfig) {
  const editorId = genUid()

  const gate = createGate<unknown>()

  const change = createEvent<string>()
  const $doc = createStore('')
  $doc.on(change, (_, s) => s)

  let state: EditorState
  let view: EditorView
  // const langConf = new Compartment()

  const initCodeMirrorFx = createEffect((doc: string) => {
    state = EditorState.create({
      doc: doc,
      extensions: [
        basicSetup,
        oneDark,
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            const val = v.state.doc.toString()
            change(val)
          }
        }),
        keymap.of([indentWithTab]),
        defineLang(config.lang),
      ],
    })
    view = new EditorView({
      state: state,
      parent: document.querySelector(`.${editorId}`)!,
    })
  })

  forward({
    from: gate.open,
    to: attach({
      source: $doc,
      effect: initCodeMirrorFx,
    }),
  })

  gate.close.watch(() => {
    view.destroy()
  })

  const insertDoc = createEffect((str: string) => {
    if (!view) return
    // console.log('insertDoc str: ', str)
    view.dispatch({
      changes: {from: 0, to: state.doc.length, insert: str},
    })
  })

  const CodeEditor: React.FC = () => {
    useGate(gate)

    return <div className={editorId}></div>
  }

  return {
    editorId,
    $doc,
    change,
    insertDoc,
    gate,
    CodeEditor,
  }
}

function defineLang(lang: string) {
  if (lang === 'sql') return [sql()]
  return []
}

function genUid() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}
