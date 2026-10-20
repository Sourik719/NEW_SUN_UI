import '@/styles/globals.css'

import { wrapper } from '@/store'
import Head from 'next/head'
import { Provider } from 'react-redux'

import Navbar from '@/components/navbar/Navbar'

const SITE_NAME = 'Team New Sun Foundation'

const pageTitles = {
  '/': 'Home',
  '/about': 'About Us',
  '/adminpanel': 'Admin Panel',
  '/cancellation': 'Cancellation Policy',
  '/donate/cause': 'Donate',
  '/donate/member_contribution': "Member's Contribution",
  '/donate/sponsor': 'Sponsor an Event',
  '/gallery': 'Gallery',
  '/join-us': 'Join Us',
  '/login': 'Login',
  '/members/[id]': 'Member Profile',
  '/privacy': 'Privacy Policy',
  '/projects/[id]': 'Project',
  '/terms': 'Terms and Conditions',
}

const formatTitle = (title) => title ? `${title} | ${SITE_NAME}` : SITE_NAME

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  const pageTitle = pageTitles[rest.router?.pathname]

  return (<Provider store={store}>
    <Head>
      <title>{formatTitle(pageTitle)}</title>
    </Head>
    <Navbar />
    <Component {...pageProps} />
  </Provider>)
}

export default App
