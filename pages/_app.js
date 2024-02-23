import '@/styles/globals.css'

import { wrapper } from '@/store'
import { Provider } from 'react-redux'

import Navbar from '@/components/navbar/Navbar'

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  return (<Provider store={store}>
    <Navbar />
    <Component {...pageProps} />
  </Provider>)
}

export default App
