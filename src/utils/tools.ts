// 防抖
export function debounce(fn: Function, wait: number = 300) {
  let timeout: null | NodeJS.Timeout = null;
  return function() {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(function() {
      // @ts-ignore
      fn.apply(this, arguments);
    }, wait);
  };
}

// 千分法
export function micrometerLevel(value: number) {
  if (typeof value === 'undefined' || value === null || isNaN(value)) {
    return value;
  }
  const stringValue = value.toString();
  const [integer, decimal] = stringValue.split('.');
  if (integer.length <= 3) {
    return stringValue;
  }
  let total = '';
  for (let i = integer.length - 1, j = 1; i > -1; i--, j++) {
    const num = j % 3 === 0 ? `,${integer[i]}` : integer[i];
    total = num + total;
  }
  total = total.replace(/^,/, '') + (decimal ? `.${decimal}` : '');
  return total;
}

// 四舍五入保留预订小数
export function halfAdjust(value: number, fixedLength: number = 2) {
  if (!value || !fixedLength) {
    console.log('you should provide a num and fixed length');
    return false;
  }
  const power = Math.pow(10, fixedLength);
  const powNum = value * power;
  const roundNum = Math.round(powNum);
  return roundNum / power;
}
