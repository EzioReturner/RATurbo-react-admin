import React, { useEffect, useRef } from 'react';

export function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<Function>();

  // 保存新回调
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 建立 interval
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// 截取当前路由的query
// 传入key则读取指定key，查询不到返回null
export function useLocationQuery(search: string, key?: string): string | StoreKeyValue | null {
  if (key) {
    return new URLSearchParams(search).get(key);
  } else {
    let _back: StoreKeyValue = {};
    search
      .replace(/^\?/, '')
      .split('&')
      .forEach(query => {
        const [key, value] = query.split('=');
        _back[key] = value;
      });
    return _back;
  }
}
