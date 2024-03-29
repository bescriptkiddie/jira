import styled from "@emotion/styled"
import React from "react"
import { Button, Spin, Typography } from "antd"
import { DevTools } from "jira-dev-tool"

export const Row = styled.div<{
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.between ? "space-between" : undefined)};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props =>
      typeof props.gap === "number" ? props.gap + "rem" : props.gap ? "2rem" : undefined};
  }
`
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
)

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <DevTools />
      <ErrorBox error={error} />
    </FullPage>
  )
}

// Select 中格式化 value值
export const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))

// 类型守卫 -> 如果 value.message 返回的是true 那么将把value定义为error类型
const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type="danger">{error.message}</Typography.Text>
  }
  return null
}

// 没有 padding 的 button
export const ButtonNoPadding = styled(Button)`
  padding: 0px;
`
