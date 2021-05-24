import React, { ReactNode } from "react"
import { AuthProvider } from "context/auth-context"
import { QueryClient, QueryClientProvider } from "react-query"
export const AppProviders = ({ children }: { children: ReactNode }) => {
  /**
   * <AuthProvider>
   *    <something> 等效于下面把children放在AuthPrvider里面 </something>
   * </AuthProvider>
   *  */
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider> {children}</AuthProvider>
    </QueryClientProvider>
  )
}
