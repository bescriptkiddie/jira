import React, { ReactNode } from "react"
import { AuthProvider } from "context/auth-context"

export const AppProviders = ({ children }: { children: ReactNode }) => {
  /**
   * <AuthProvider>
   *    <something> 等效于下面把children放在AuthPrvider里面 </something>
   * </AuthProvider>
   *  */
  return <AuthProvider>{children}</AuthProvider>
}
