import { error } from "console"
import React, { ReactNode } from "react"

/**
 * 在React.Component中,需要传入的两个参数,一个是props,一个是state
 * 传入的props一般会有children,fallbackRender
 */

type FallbackRender = (props: { error: Error | null }) => React.ReactElement

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null }

  // 当子组件抛出异常,这里会接收并且调用
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}
