import '@/styles/globals.css'

import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/Navbar'
import Notification from '@/components/ui/Notification'
import { wrapper } from '@/store'
import { Roboto } from "next/font/google"
import { Provider } from 'react-redux'

const roboto = Roboto({ subsets: ['latin'], weight: '300' })

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  return (<Provider store={store}>
    <div className={roboto.className}>
      <Navbar />
      <Notification />
      <Component {...pageProps} />
      <hr className='border-red-200 w-full' />
      <Footer />
    </div>
  </Provider>)
}

export default App