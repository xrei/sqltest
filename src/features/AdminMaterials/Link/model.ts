import {attach, createEffect, createEvent, createStore, merge} from 'effector'
import {ChangeEvent} from 'react'
import {
  adminAddLink,
  adminDeleteLink,
  adminEditLink,
  prepAddLink,
  prepDeleteLink,
  prepEditLink,
} from 'src/api'
import {UserModel} from 'src/entities/User'
import {enqueueAlert} from 'src/shared/ui/Alerts'
import type {MaterialLink, MaterialLinkDTO} from 'src/types'

export const nameChanged = createEvent<ChangeEvent<HTMLInputElement>>()
export const descriptionChanged = createEvent<ChangeEvent<HTMLInputElement>>()

export const linkDialogToEditOpened = createEvent<MaterialLink>()
export const linkDialogToggled = createEvent()
export const linkDialogOpened = createEvent<{SubjectId: number}>()
export const $dialogOpen = createStore(false)
  .on(linkDialogToggled, (open) => !open)
  .on(linkDialogToEditOpened, () => true)
  .on(linkDialogOpened, () => true)

export const $isEdit = createStore(false)
  .on(linkDialogToEditOpened, () => true)
  .on(linkDialogOpened, () => false)
export const $link = createStore<MaterialLink>({
  Description: '',
  Name: '',
  Id: 0,
  SubjectId: 0,
})

$link.on(linkDialogToEditOpened, (_, link) => link)
$link.on(linkDialogOpened, (link, {SubjectId}) => ({...link, SubjectId}))
$link.on(nameChanged, (state, e) => ({...state, Name: e.target.value}))
$link.on(descriptionChanged, (state, e) => ({...state, Description: e.target.value}))

const createLinkFx = createEffect(
  async ({linkDto, isAdmin}: {linkDto: MaterialLink; isAdmin: boolean}) => {
    validateLink(linkDto)

    const params: MaterialLinkDTO = {
      name: linkDto.Name,
      id: 0,
      description: linkDto.Description,
      subjectId: linkDto.SubjectId,
    }
    if (isAdmin) {
      const res = await (await adminAddLink(params)).json()
    } else {
      const res = await (await prepAddLink(params)).json()
    }

    enqueueAlert({message: 'Ссылка успешно добавлена'})
  }
)

export const createLinkFxWithUser = attach({
  effect: createLinkFx,
  source: {isAdmin: UserModel.$userIsAdmin, linkDto: $link},
  mapParams: (_, source) => source,
})

const editLinkFx = createEffect(
  async ({linkDto, isAdmin}: {linkDto: MaterialLink; isAdmin: boolean}) => {
    validateLink(linkDto)

    const params: MaterialLinkDTO = {
      name: linkDto.Name,
      id: linkDto.Id,
      description: linkDto.Description,
      subjectId: linkDto.SubjectId,
    }
    if (isAdmin) {
      const res = await (await adminEditLink(params)).json()
    } else {
      const res = await (await prepEditLink(params)).json()
    }

    enqueueAlert({message: 'Ссылка успешно отредактирована'})
  }
)

export const editLinkFxWithUser = attach({
  effect: editLinkFx,
  source: {isAdmin: UserModel.$userIsAdmin, linkDto: $link},
  mapParams: (_, source) => source,
})

const deleteLink = createEffect(async ({id, isAdmin}: {id: number; isAdmin: boolean}) => {
  if (!confirm('Подтвердите удаление')) return

  if (isAdmin) {
    await (await adminDeleteLink({Id: id})).json()
  } else {
    await (await prepDeleteLink({Id: id})).json()
  }

  enqueueAlert({message: 'Ссылка успешно удалена'})
})
export const deleteLinkFx = attach({
  effect: deleteLink,
  source: UserModel.$userIsAdmin,
  mapParams: (params: number, source) => ({id: params, isAdmin: source}),
})

export const actionsOnLinkDone = merge([
  createLinkFxWithUser.done,
  editLinkFxWithUser.done,
  deleteLinkFx.done,
])

$dialogOpen.reset(actionsOnLinkDone)
$link.reset([actionsOnLinkDone, linkDialogToggled])

function validateLink(link: MaterialLink) {
  if (!/^(ftp|http|https):\/\/[^ "]+$/.test(link.Name)) {
    enqueueAlert({
      variant: 'error',
      message: 'Ссылка должна начинаться с ftp://, http://, https://',
    })
    throw Error('link name error')
  }
  if (!link.Description.length) {
    enqueueAlert({variant: 'error', message: 'Необходимо ввести описание!'})

    throw Error('link description error')
  }
}
