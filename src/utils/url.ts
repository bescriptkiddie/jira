import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

// 返回页面url中,指定键的参数值
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) }
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    // setSearchParams 要进行约束的话,需要传入一个函数
    // [key in K]: unknown  键值必须在 K 里面,键值不做要求
    (params: Partial<{ [key in K]: unknown }>) => {
      const p = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit
      return setSearchParams(p)
    },
  ] as const
}
