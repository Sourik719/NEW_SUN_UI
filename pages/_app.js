import '@/styles/globals.css'

import { Provider } from 'react-redux'
import { wrapper } from '@/store'

import Notification from '@/components/ui/Notification'

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  return (<Provider store={store}>
    <Notification />
    <Component {...pageProps} />
  </Provider>)
}

export default App