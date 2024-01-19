import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Account from 'src/components/Account/Account'
import Auth from 'src/components/Auth/Auth'

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      <Metadata title="Home" description="Home page" />

      <h1>HomePage</h1>
      <>{!isAuthenticated ? <Auth /> : <Account />}</>
    </>
  )
}

export default HomePage
