'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export function ThemeProvider(props: PropsWithChildren) {
  return <ChakraProvider>{props?.children}</ChakraProvider>
}
