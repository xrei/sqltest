import {attach, createEffect} from 'effector'
import type {StudentRating, User} from 'src/types'
import {getAdminGroupRating, getPrepGroupRating} from 'src/api'
import {UserModel} from 'src/features/User'

const fetchAdminGroupRatings = createEffect<
  {user: User | null; TestId: number; StuId: number},
  StudentRating[]
>(async ({user, TestId, StuId}) => {
  if (!user) return []

  const addId = (xs: StudentRating[]) =>
    xs.map((x, idx) => ({
      ...x,
      id: idx,
      StudentsRatings: x.StudentsRatings.map((y) => ({...y, id: y.RatingId, studentRatingId: idx})),
    }))

  const payload = {TestId, StuId}
  if (user?.Role === 1) {
    const res = await (await getPrepGroupRating(payload)).json()
    return addId(res)
  }
  if (user.Role === 2) {
    const res = await (await getAdminGroupRating(payload)).json()
    console.log(res)
    return addId(res)
  }
  return []
})

export const fetchAdminGroupRatingsFx = attach({
  source: UserModel.$user,
  effect: fetchAdminGroupRatings,
  mapParams: ({groupId, TestId}, user) => ({user, TestId, StuId: groupId}),
})
