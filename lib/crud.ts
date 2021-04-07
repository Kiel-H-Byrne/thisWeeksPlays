import { useCallback } from "react"
// import useSWR, { mutate } from "swr"
// import { isArray } from "util"

export const fetcher = useCallback(
  async (url: string) => {
  const response = await fetch(url)
  return response
  },
  []
  )

//  export const create = useCallback(
//   async (url, newObject, shouldRevalidate = false) => {
//   const response = await fetch(url, {
//   body: newObject,
//   method: 'POST'
//   })
//  const result = response 
//  if (daresultta && mutate) {
//   let newData = result
//   if (isArray(result)) {
//   newData = data.concat(result)
//   }
//  await mutate([...new Set(newData)], shouldRevalidate)
//   }
//  return result
//   },
//   [url, data, mutate]
//   )
