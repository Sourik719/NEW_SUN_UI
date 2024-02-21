import '@/styles/globals.css'

import { wrapper } from '@/store'
import { Provider } from 'react-redux'

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  return (<Provider store={store}>
    <Component {...pageProps} />
  </Provider>)
}

export default App
