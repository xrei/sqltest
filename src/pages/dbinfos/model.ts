import {forward} from 'effector'
import {createGate} from 'effector-react'
import {DBInfoModel} from 'src/features/DBInfo'

export const DbInfoPage = createGate('DbInfoPage')
export const $isLoading = DBInfoModel.fetchDbInfo.pending

forward({
  from: DbInfoPage.open,
  to: DBInfoModel.fetchDbInfo,
})
