import {createStore, createEvent, createEffect, sample, forward} from 'effector'
import {createGate} from 'effector-react'
import {ChangeEvent} from 'react'
import {addAuthor, deleteAuthor, editAuthor} from 'src/api'
import {enqueueAlert} from 'src/features/Alerts'
import {$authors, fetchAuthorsData} from 'src/pages/authors/model'
import {Author} from 'src/types'

export const EditAuthorPageGate = createGate<{id: number}>()
export const AddAuthorPageGate = createGate()

export const $authorIdToEdit = createStore<number>(0)
$authorIdToEdit.reset(EditAuthorPageGate.close)

sample({
  clock: EditAuthorPageGate.open,
  fn: ({id}) => id,
  target: $authorIdToEdit,
})

sample({
  source: $authors,
  clock: EditAuthorPageGate.open,
  filter: (authors) => !authors.length,
  target: fetchAuthorsData,
})

export const setAuthorToEdit = createEvent<Author>()

sample({
  clock: $authors,
  source: $authorIdToEdit,
  filter: (id, authors) =>
    Boolean(authors.length) && Boolean(authors.find((v) => v.AuthorId === id)),
  fn: (id, a) => a.find((v) => v.AuthorId === id) as Author,
  target: setAuthorToEdit,
})

sample({
  source: $authors,
  clock: $authorIdToEdit,
  filter: (authors) => Boolean(authors.length),
  fn: (a, id) => a.find((v) => v.AuthorId === id) as Author,
  target: setAuthorToEdit,
})

export const $authorForm = createStore<Author>({
  AuthorDescription: '',
  AuthorId: 0,
  AuthorImage: '',
  AuthorName: '',
})

$authorForm.on(setAuthorToEdit, (_, author) => author)
$authorForm.reset([EditAuthorPageGate.close, AddAuthorPageGate.close])
$authorForm.watch((a) => {
  console.log('authorForm', a)
})

export const $authorDescriptionState = createStore('')
$authorDescriptionState.reset([EditAuthorPageGate.close, AddAuthorPageGate.close])

export const nameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const descriptionChanged = createEvent<string>()
export const imageChanged = createEvent<string>()

$authorDescriptionState.on(descriptionChanged, (_, value) => value)
$authorForm.on(nameChanged, (state, e) => ({...state, AuthorName: e.target.value}))
$authorForm.on(imageChanged, (state, value) => ({...state, AuthorImage: value}))

export const isEditClicked = createEvent()

export const editAuthorFx = createEffect<
  {form: Author; authors: Author[]; description: string},
  string
>(async ({form, authors, description}) => {
  const oldAuthorData = authors.find((a) => a.AuthorId === form.AuthorId) as unknown as Author
  const hasImage = form.AuthorImage.length > 0
  const payload: Author = {
    ...form,
    AuthorDescription: description,
    AuthorImage: hasImage ? form.AuthorImage : oldAuthorData.AuthorImage,
  }
  const res = await (await editAuthor(payload)).json()

  enqueueAlert({message: 'Автор успешно отредактирован'})
  return res
})

sample({
  clock: isEditClicked,
  source: {
    form: $authorForm,
    authors: $authors,
    description: $authorDescriptionState,
  },
  filter: ({form}) => Boolean(form.AuthorId),
  target: editAuthorFx,
})

export const addAuthorClicked = createEvent()

export const addAuthorFx = createEffect<{form: Author; description: string}, string>(
  async ({form, description}) => {
    if (!description || !form.AuthorImage || !form.AuthorName) {
      enqueueAlert({message: 'Все поля обязательны для заполнения!', variant: 'error'})
      return 'error'
    }

    const res = await (
      await addAuthor({
        AuthorDescription: description,
        AuthorImage: form.AuthorImage,
        AuthorName: form.AuthorName,
      })
    ).json()

    enqueueAlert({message: 'Автор успешно добавлен'})
    return res
  }
)

sample({
  clock: addAuthorClicked,
  source: {
    form: $authorForm,
    description: $authorDescriptionState,
  },
  target: addAuthorFx,
})

export const deleteAuthorClicked = createEvent<number>()

export const deleteAuthorFx = createEffect(async (id: number) => {
  const res = await (await deleteAuthor({AuthorId: id})).json()

  enqueueAlert({message: 'Автор успешно удален', variant: 'success'})
  fetchAuthorsData()
  return res
})

sample({
  clock: deleteAuthorClicked,
  filter: (id) => Boolean(id),
  target: deleteAuthorFx,
})

$authorForm.reset([addAuthorFx.doneData])
$authorDescriptionState.reset([addAuthorFx.doneData])
