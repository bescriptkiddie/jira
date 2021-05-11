// 清除空元素
export const cleanObject = (object: any) => {
  const result = { ...object };
  // keys -> 属性名呀 知道🔑才能打开箱子拿到value
  Object.keys(object).forEach((key) => {
    const value = object[key];
    // 当value == 0 的时候也会被误删
    if (!isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const isFalsy = (value: any) => (value === 0 ? true : !!value);
