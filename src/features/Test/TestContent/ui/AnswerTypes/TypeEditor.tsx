import React, {useEffect, useState} from 'react'
import {useStore} from 'effector-react'
import {createCodeEditor, CodeEditorModel} from 'src/features/Editor'
import debounce from 'lodash.debounce'
import * as TestContentModel from '../../model'

const setValDebounced = debounce(TestContentModel.changeTypeEditorAnswer, 500)

export const TypeEditor: React.FC = () => {
  const currQsn = useStore(TestContentModel.$currQuestion)
  const [model, setModel] = useState<CodeEditorModel>(
    createCodeEditor({lang: returnLangByType(currQsn.Type)})
  )
  const CodeEditor = model.CodeEditor

  useEffect(() => {
    model.$doc.updates.watch((val) => {
      if (val !== currQsn.UserAnswer) {
        setValDebounced(val)
      }
    })
  }, [])

  useEffect(() => {
    const usrAnsw = (currQsn.UserAnswer || '') as string
    if (model.$doc.getState() !== usrAnsw) {
      model.insertDoc(usrAnsw)
    }
  }, [currQsn.Id])

  return <CodeEditor />
}

function returnLangByType(type = 4) {
  const langs: {[key: number]: string} = {
    4: 'sql',
    5: 'sql',
    6: 'sql',
    7: 'text',
    8: 'text',
  }

  return langs[type]
}
