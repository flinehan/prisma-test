import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Click } from 'prisma/client'
import { createClick, fetchClicks } from '../api/clicks'
import { queryClient } from './query-client'

export const CLICK_QUERY_KEY = 'clicks'

export const useClicks = () => {
  return useQuery({
    queryKey: [CLICK_QUERY_KEY],
    queryFn: async (): Promise<Array<Click>> => {
      const response = await fetchClicks()
      return response.clicks
    },
  })
}

export const useAddClick = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (click: Pick<Click, "perSecond">) =>
      createClick(click),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLICK_QUERY_KEY] })
    },
  })
}