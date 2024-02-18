import '@/styles/globals.css'

import { useRouter } from 'next/router'
import { wrapper } from '@/store'
import { Roboto } from "next/font/google"
import { Provider } from 'react-redux'

import Navbar from '@/components/navbar/Navbar'
import Notification from '@/components/ui/Notification'
import Feedbackbtn from '@/components/ui/Feedback'
import Footer from '@/components/footer/footer'

const roboto = Roboto({ subsets: ['latin'], weight: '300' })

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  const router = useRouter()

  return (<Provider store={store}>
    <div className={roboto.className}>
      <Navbar />
      <Notification />
      <Component {...pageProps} />
      {router.pathname !== '/join-us' && router.pathname !== '/login' &&
        <Feedbackbtn />
      }
      <Footer />
    </div>
  </Provider>)
}

export default App