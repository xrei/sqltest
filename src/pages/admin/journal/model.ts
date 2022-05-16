import {SelectChangeEvent} from '@mui/material'
import {combine, createEffect, createEvent, createStore, forward, sample} from 'effector'
import {createGate} from 'effector-react'
import {getAdminJournal} from 'src/api'
import {fetchAdminDataFx} from 'src/features/Admin/AdminData'
import {reset} from 'src/lib/reset'
import type {JournalData} from 'src/types'

export const JournalPageGate = createGate()

export const $journal = createStore<JournalData[]>([])

export const fetchJournalDataFx = createEffect<{groupId: string; subjId: string}, JournalData[]>(
  async (data) => {
    const res = await (await getAdminJournal(data)).json()
    return res
  }
)

$journal.on(fetchJournalDataFx.doneData, (_, data) => data)

export const formJournalClicked = createEvent()

export const $groupId = createStore('')
export const $subjId = createStore('')

export const groupSelected = createEvent<SelectChangeEvent<string>>()
export const subjSelected = createEvent<SelectChangeEvent<string>>()

$groupId.on(groupSelected, (_, s) => String(s.target.value))
$subjId.on(subjSelected, (_, s) => String(s.target.value))

export const $isFormJournalActive = combine($groupId, $subjId, (a, b) => Boolean(a) && Boolean(b))

forward({
  from: JournalPageGate.open,
  to: fetchAdminDataFx,
})

sample({
  clock: formJournalClicked,
  source: {
    groupId: $groupId,
    subjId: $subjId,
  },
  filter: $isFormJournalActive,
  target: fetchJournalDataFx,
})

reset({
  stores: [$groupId, $subjId, $journal],
  trigger: JournalPageGate.close,
})
