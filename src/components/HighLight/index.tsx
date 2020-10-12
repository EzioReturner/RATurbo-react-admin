import React, { useState, useEffect, Fragment, memo, useCallback } from 'react';

interface HighLightProps {
  val: string; // 原始字段
  tarVal: string; // 需要匹配高亮的字段
  matchAll?: boolean; // 全局匹配模式  目标数据为 111 tar 为 1 时则全部高亮
}

const isEqual = (prevProps: HighLightProps, nextProps: HighLightProps) => {
  if (prevProps.val !== nextProps.val || prevProps.tarVal !== nextProps.tarVal) {
    return false;
  }
  return true;
};

const HighLight: React.FC<HighLightProps> = props => {
  const [unmatchVal, setUnmatchVal] = useState<string[]>([]);
  const { val, tarVal, matchAll } = props;

  const checkText = useCallback(
    (_val: string, cacheUnmatch: string[]) => {
      // 找到匹配的位置
      const index = _val.indexOf(tarVal);

      if (index < 0 || !tarVal) {
        setUnmatchVal([...cacheUnmatch, _val]);
        return;
      }

      // 剩余的字符串长度
      const queryScope = index + tarVal.length;

      // 匹配字符之前的字符串
      const head = _val.slice(0, index);

      const surplus = _val.substr(queryScope);

      if (matchAll) {
        cacheUnmatch.push(head);
        checkText(surplus, cacheUnmatch);
      } else if (index >= 0) {
        setUnmatchVal([head, surplus]);
        return;
      }
    },
    [tarVal, matchAll]
  );

  useEffect(() => {
    let cacheUnmatch: string[] = [];
    checkText(val, cacheUnmatch);
  }, [tarVal, val, checkText]);

  return (
    <>
      {unmatchVal.length ? (
        unmatchVal.map((text, index) => {
          return (
            <Fragment key={index}>
              {text && <span>{text}</span>}
              {index !== unmatchVal.length - 1 ? (
                <span style={{ color: '#1e90ff' }}>{tarVal}</span>
              ) : null}
            </Fragment>
          );
        })
      ) : (
        <span>{val}</span>
      )}
    </>
  );
};

export default memo(HighLight, isEqual);
