import { test } from 'vitest'
import { getAll, getById, set, exists, remove } from '@/utils/storage-utils'

test('localStorage functions', async ({ expect }) => {
  const dummyData = [{ id: '10', name: 'Some Data Here' }]

  set('dummyData', dummyData)
  expect(localStorage.getItem('dummyData')).toBe(JSON.stringify(dummyData))

  const allData = getAll('dummyData')
  expect(allData).toEqual(dummyData)

  expect(exists('dummyData')).toBe(true)

  const dataById = getById('dummyData', '10')
  expect(dataById).toEqual(dummyData[0])

  remove('dummyData')
  expect(localStorage.getItem('dummyData')).toBe(null)
})
