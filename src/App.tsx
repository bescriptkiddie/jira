import React from "react"
import "App.css"
import { useAuth } from "context/auth-context"
import { AuthenticationApp } from "authenticated-app"
import { UnauthenticatedApp } from "unauthenticated-app"

function App() {
  const { user } = useAuth()
  return <div className="App">{user ? <AuthenticationApp /> : <UnauthenticatedApp />}</div>
}

export default App
