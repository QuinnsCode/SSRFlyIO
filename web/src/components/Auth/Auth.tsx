import { useState } from 'react'

import { useAuth } from 'src/auth'

const Auth = () => {
  const { logIn } = useAuth()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await logIn({ email, authMethod: 'otp' })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget border-2 border-solid border-gray-500 ">
        {/* <h1 className="header">Supabase + RedwoodJS</h1> */}
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <input
            className="inputField border-2 border-solid border-gray-500"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className={'button block'}
            disabled={loading}
          >
            {loading ? <span>Loading</span> : <span>Send magic link</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
