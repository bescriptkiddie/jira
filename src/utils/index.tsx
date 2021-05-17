import { useEffect, useState, useRef } from "react"
// 清除空元素
export const cleanObject = (object: object) => {
  const result = { ...object }
  // keys -> 属性名呀 知道🔑才能打开箱子拿到value
  Object.keys(result).forEach(key => {
    //@ts-ignore
    const value = result[key]
    // 当value == 0 的时候也会被误删
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key]
    }
  })
  return result
}

// 判断是否为false
export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

// 首次加载,只运行一次  模拟componentDidMount
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * useEffect 生命周期:
 * 挂载过程: 组件挂载成功 -> 回调函数
 * 更新过程(依赖数组里的变量):willmount -> 执行useEffect中的返还函数 -> 组件更新 -> useEffect的回调函数
 * 卸载过程:执行useEffect 的返还函数
 */
export const useDebounce = (value: unknown, delay?: number) => {
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

// 随便把节流给写了,节流 or 防抖都是用来减少请求次数,节流更多用于 加载场景 , 页面滚动
export const useThrottledEffect = (callback: any, delay: number, deps = []) => {
  const timeFlag = useRef(Date.now())
  useEffect(() => {
    const handler = setTimeout(function () {
      if (Date.now() - timeFlag.current >= delay) {
        callback()
        timeFlag.current = Date.now()
      }
    }, delay - (Date.now() - timeFlag.current))

    return () => {
      clearTimeout(handler)
    }
  }, [delay, ...deps])
}

// export const useDebouncedEffect = (callback:any, delay:number, deps = []) => {
//   const data = useRef({ firstTime : true });
//   useEffect(() => {
//     const { firstTime, clearFunc } = data.current;

//     if (firstTime) {
//       data.current.firstTime = false;
//       return;
//     }

//     const handler = setTimeout(() => {
//       if (clearFunc && typeof clearFunc === 'function') {
//         clearFunc();
//       }
//       data.current.clearFunc = callback();
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   },[delay, ...deps]);
// }
