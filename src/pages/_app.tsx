import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react'
import {useEffect} from 'react'

function MyApp({Component, pageProps}: AppProps) {
    useEffect(() => {
        document.addEventListener('touchmove', e => {
            if (e.cancelable) {
                e.preventDefault();
            }
         }, {passive: false})
    }, []);
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp
