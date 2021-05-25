import React from "react"
import "App.css"
import { useAuth } from "context/auth-context"
import { AuthenticationApp } from "authenticated-app"
import { UnauthenticatedApp } from "unauthenticated-app"
import { ErrorBoundary } from "components/error-boundary"
import { FullPageErrorFallback } from "components/lib"
function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticationApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
