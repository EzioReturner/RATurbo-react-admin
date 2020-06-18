// 防抖
export function debounce(fn: Function, wait: number = 300) {
  let timeout: null | NodeJS.Timeout = null;
  return function() {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
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

/**
 * 四舍五入保留预订小数
 * @param value 数值
 * @param fixedLength 保留小数
 */
export function halfAdjust(value: number, fixedLength: number = 2) {
  if (!value) {
    console.log('missing value params');
    return false;
  }
  const power = Math.pow(10, fixedLength);
  const powNum = value * power;
  const roundNum = Math.round(powNum);
  return roundNum / power;
}

/**
 * 16进制 转 rgb
 * @param color 16进制颜色值 string
 * @param type 返回类型， format 格式化后返回， number 数组按值返回
 */
export function hex2rgb(color: string, type: 'format' | 'number' = 'format') {
  let sColor = color.toLowerCase();
  //十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    let sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }
    return type === 'format' ? 'rgb(' + sColorChange.join(',') + ')' : sColorChange;
  }
  return sColor;
}

/**
 * rgb转16进制
 * @param color rgb颜色值 string
 */

export function rgb2hex(color: string) {
  let that = color;
  //十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(that)) {
    let aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    let strHex = '#';
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = '0' + hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = that;
    }
    return strHex;
  } else if (reg.test(that)) {
    let aNum = that.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      let numHex = '#';
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  }
  return that;
}

/**
 * rgb 转 hsl
 * @param rgb 颜色值数组
 * @param type 返回类型， format 格式化后返回， number 数组按值返回
 */
export function rgb2hsl(rgb: number[], type: 'format' | 'number' = 'format') {
  let [r, g, b] = rgb;
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let l = (max + min) / 2;
  let s = 0;

  if (max === min) {
    h = 0;
  } else if (max === r && g >= b) {
    h = 60 * ((g - b) / diff);
  } else if (max === r && g < b) {
    h = 60 * ((g - b) / diff) + 360;
  } else if (max === g) {
    h = 60 * ((b - r) / diff) + 120;
  } else if (max === b) {
    h = 60 * ((r - g) / diff) + 240;
  }

  if (l === 0 || max === min) {
    s = 0;
  } else if (0 < l && l <= 0.5) {
    s = diff / (2 * l);
  } else if (l > 0.5) {
    s = diff / (2 - 2 * l);
  }

  return type === 'format'
    ? `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
    : [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * hsl 增加亮度
 * @param hsl 颜色值
 * @param amount 亮度值
 */
export function hsl2lighten(hsl: number[], amount: number) {
  const [h, s, l] = hsl;
  return `hsl(${h}, ${s}%, ${Math.round(l + amount)}%)`;
}

/**
 * hsl 减少亮度
 * @param hsl 颜色值
 * @param amount 亮度值
 */
export function hsl2darken(hsl: number[], amount: number) {
  const [h, s, l] = hsl;
  return `hsl(${h}, ${s}%, ${Math.round(l - amount)}%)`;
}

/**
 * hsl 改变透明度
 * @param hsl 颜色值
 * @param amount 透明度度值
 */
export function hsl2fade(hsl: number[], amount: number) {
  const [h, s, l] = hsl;
  return `hsla(${h}, ${s}%, ${l}%, ${amount})`;
}

export function color2tint(color: number[], amount: number = 0.5) {
  return color2mix([255, 255, 255], color, amount);
}

/**
 * 颜色混合
 * @param color1 第一个颜色rgb值
 * @param color2 第二个颜色rgb值
 * @param amount 第一个颜色的占比值 默认50%，0.5
 */
export function color2mix(color1: number[], color2: number[], amount: number = 0.5) {
  let weight = 1 - amount;
  let [r1, g1, b1, alpha1] = color1;
  let [r2, g2, b2, alpha2] = color2;

  let alpha;
  if (alpha1 || alpha2) {
    alpha = alpha1 * amount + alpha2 * weight;
  }
  let r = Math.floor(r1 * amount + r2 * weight),
    g = Math.floor(g1 * amount + g2 * weight),
    b = Math.floor(b1 * amount + b2 * weight);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
}
