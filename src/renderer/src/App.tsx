import { useEffect, useState } from 'react'
import { KeycloakService } from './services/KeycloakService'
import { jwtDecode } from 'jwt-decode'
function App(): JSX.Element {
  const [appVersion, setAppVersion] = useState('')
  const VMInfo = window.env.VMInfo ? jwtDecode(window.env.VMInfo) : null
  const login = (): void => {
    const loginUrl: string = KeycloakService.getLoginUrl()
    window.context.login(loginUrl)
  }

  const getAppVersion = async (): Promise<void> => {
    const version = await window.context.getAppVersion()
    setAppVersion(version)
  }

  useEffect(() => {
    getAppVersion()
  })

  if (!KeycloakService.isLoggedIn()) {
    return (
      <>
        <h1>Sign in</h1>
        <button onClick={login}>Login</button>
        <p>{VMInfo ? JSON.stringify(VMInfo) : null}</p>
        <p>Version {appVersion}</p>
      </>
    )
  }

  return (
    <div>
      <h1>Home</h1>
      <div>Hello {KeycloakService.getName()}</div>
      <button onClick={KeycloakService.logout}>Logout</button>
      <p>Version {appVersion}</p>
    </div>
  )
}

export default App
