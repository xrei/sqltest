import {attach, createEffect, createEvent, createStore, forward, sample} from 'effector'
import {createAdminNews, deleteAdminNews, editAdminNews, getSomeNews} from 'src/api'
import {enqueueAlert} from 'src/features/Alerts'
import {reset} from 'src/lib/reset'
import {NewsPost} from 'src/types'

export const $isEdit = createStore<NewsPost | null>(null)
export const $manageNewsDialog = createStore(false)

export const editNewsClicked = createEvent<NewsPost>()
export const addNewsClicked = createEvent()
export const deleteNewsClicked = createEvent<number>()
export const manageNewsDialogToggled = createEvent()
export const resetStores = createEvent()
export const actualEditNewsClicked = createEvent()

$isEdit.on(editNewsClicked, (_, data) => data)
$manageNewsDialog.on(manageNewsDialogToggled, (open) => !open)

export const textChanged = createEvent<string>()

export const $postText = createStore<string>('')
$postText.on(textChanged, (_, value) => value)
$postText.on(editNewsClicked, (_, value) => value.Content)

reset({
  stores: [$isEdit, $postText],
  trigger: resetStores,
})

export const addNewsFx = attach({
  source: {
    newText: $postText,
  },
  async effect({newText}) {
    if (!newText.length) {
      enqueueAlert({message: 'Текст не может быть пустым', variant: 'error'})
      return
    }

    const res = await (await createAdminNews({Content: newText})).json()

    manageNewsDialogToggled()
    resetStores()

    return res
  },
})

sample({
  clock: addNewsClicked,
  target: addNewsFx,
})

export const editNewsFx = attach({
  source: {
    post: $isEdit,
    newText: $postText,
  },
  async effect({post, newText}) {
    if (!post) return
    if (!newText.length) {
      enqueueAlert({message: 'Текст не может быть пустым', variant: 'error'})
      return
    }

    const res = await (await editAdminNews({Id: post.Id, Content: newText})).json()

    manageNewsDialogToggled()
    resetStores()

    return res
  },
})

sample({
  clock: actualEditNewsClicked,
  target: editNewsFx,
})

export const deleteNewsFx = createEffect<number, string>(async (id) => {
  if (!confirm('Подтвердите удаление новости')) {
    throw Error('cancelled')
  }

  const res = await (await deleteAdminNews({Id: id})).json()

  enqueueAlert({message: 'Новость удалена'})
  return res
})

sample({
  clock: deleteNewsClicked,
  filter: (id) => Boolean(id),
  target: deleteNewsFx,
})

$manageNewsDialog.watch((open) => {
  if (!open) {
    resetStores()
  }
})
