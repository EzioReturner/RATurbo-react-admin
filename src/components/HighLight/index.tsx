import React, { useState, useEffect, Fragment, memo } from 'react';

interface HighLightProps {
  val: string; // 原始字段
  tarVal: string; // 需要匹配高亮的字段
}

const isEqual = (prevProps: HighLightProps, nextProps: HighLightProps) => {
  if (prevProps.val !== nextProps.val || prevProps.tarVal !== nextProps.tarVal) {
    return false;
  }
  return true;
};

const HighLight: React.FC<HighLightProps> = props => {
  const [unmatchVal, setUnmatchVal] = useState<string[]>([]);
  const { val, tarVal } = props;

  const checkText = (_val: string, cacheUnmatch: string[]) => {
    const index = _val.indexOf(tarVal);

    if (index < 0 || !tarVal) {
      setUnmatchVal([...cacheUnmatch, _val]);
      return;
    }
    const queryScope = index + tarVal.length;
    const head = _val.slice(0, index);
    const surplus = _val.substr(queryScope);
    cacheUnmatch.push(head);
    checkText(surplus, cacheUnmatch);
  };

  useEffect(() => {
    let cacheUnmatch: string[] = [];
    checkText(val, cacheUnmatch);
  }, [tarVal, val]);

  return (
    <>
      {unmatchVal.length ? (
        unmatchVal.map((text, index) => {
          return (
            <Fragment key={index}>
              <span>{text}</span>
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
