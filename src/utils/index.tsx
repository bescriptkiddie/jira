import { useEffect, useState } from "react"
// 清除空元素
export const cleanObject = (object: any) => {
    const result = { ...object }
    // keys -> 属性名呀 知道🔑才能打开箱子拿到value
    Object.keys(result).forEach(key => {
        const value = result[key]
        // 当value == 0 的时候也会被误删
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}

// 判断是否为false
export const isFalsy = (value: any) => (value === 0 ? false : !value)

// 首次加载,只运行一次  模拟componentDidMount
export const useMount = (callback: any) => {
    useEffect(() => {
        callback()
    }, [])
}

/**
 * useEffect 生命周期:
 * 挂载过程: 组件挂载成功 -> 回调函数
 * 更新过程(依赖数组里的变量):willmount -> 执行useEffect中的返还函数 -> 组件更新 -> useEffect的回调函数
 * 卸载过程:执行useEffect 的返还函数
 */
export const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    console.log("value", value)

    useEffect(() => {
        // fn更新的时候都会执行这个回调
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        // return里面的回调是在上一个useEffect处理完再运行
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}
