import { extendTheme, ChakraProvider, CSSReset, textDecoration } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import * as React from 'react'
import Header  from '../components/Header'

const theme = extendTheme({
  layerStyles: {
   
    postContent:{marginTop: '2rem',
    lineHeight: '2rem',
    fontSize: '1.125rem',
    color: 'var(--white)',
  
    'iframe':{
      width: '100%',
      minHeight: '350px',
      padding: '0.5rem 0',
    },
  
    'p, ul':{
      margin: '1.5rem 0',
    },
    'ul':{
      paddingLeft: '1.5rem',
      'li':{
        margin: '0.5rem 0'
      }
    },
   'a:hover':{
      color: 'var(--yellow-500)',
    },
    'pre':{
      borderRadius: '0.5rem',
      background: 'var(--gray-700)',
      padding: '0.5rem',
      color: 'var(--white)',
    }
  }
  },
  styles: {
    global: {
     
      ':root': {
        '--white': '#FFF',
        '--gray-100': '#AFAFAF',
        '--gray-200': '#525252',
        '--gray-700': '#15171b',
        '--gray-900': '#111113',
        '--blue-900': '#1fa4e5',
        '--yellow-500': '#FFBE16',
      },
    body: {
        bg: '#111113',
        color:'white',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '1rem',
        fontWeight: 400,
      },
      'body, input, textarea, select, button': {
        fontFamily: 'inherit',
        
      },
      'button': {
        cursor: 'pointer',
      },
      h1: {
        // you can also use responsive styles
        fontSize: ['48px', '72px'],
        fontWeight: 'bold',
        lineHeight: '110%',
        letterSpacing: '-2%',
        
      },
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Header/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
