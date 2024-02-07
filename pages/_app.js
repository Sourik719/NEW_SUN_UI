import '@/styles/globals.css'

import { Provider } from 'react-redux'
import { wrapper } from '@/store'
import { Roboto } from "next/font/google"

import Navbar from '@/components/navbar/Navbar'
import Notification from '@/components/ui/Notification'

const roboto = Roboto({ subsets: ['latin'], weight: '300' })

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  return (<Provider store={store}>
    <div className={roboto.className}>
      <Navbar />
      <Notification />
      <Component {...pageProps} />
    </div>
  </Provider>)
}

export default App