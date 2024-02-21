import Container from '@/components/ui/Container'
import { wrapper } from '@/store'
import '@/styles/globals.css'
import { Provider } from 'react-redux'

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  return (
    <Provider store={store}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
  )
}

export default App
