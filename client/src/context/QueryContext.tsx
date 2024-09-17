import { QueryClientProvider } from '@tanstack/react-query'
import { ReactElement } from 'react'
import { queryClient } from '../service/queryClient'

type Props = {children : ReactElement}

function QueryContext({children}: Props) {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryContext