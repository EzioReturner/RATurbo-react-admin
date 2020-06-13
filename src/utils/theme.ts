import {
  hex2rgb,
  rgb2hsl,
  hsl2lighten,
  hsl2darken,
  hsl2fade,
  color2tint,
  rgb2hex
} from '@utils/tools';
import { defaultDarkTheme, defaultLightTheme } from '@config/setting';
import cloneDeep from 'lodash/cloneDeep';

export function changeTheme(visionTheme: string, currentColor: string) {
  window.less
    .modifyVars(
      Object.assign(
        {
          '@primary-color': currentColor
        },
        visionTheme === 'dark' ? defaultDarkTheme : defaultLightTheme
      )
    )
    .then(() => {
      let rgbColor = hex2rgb(currentColor, 'number') as number[];
      let hslColor = rgb2hsl(rgbColor, 'number') as number[];
      document.body.style.setProperty('--primary', currentColor);
      document.body.style.setProperty('--primary-lighten', hsl2lighten(hslColor, 8));
      document.body.style.setProperty('--primary-lightener', hsl2lighten(hslColor, 20));
      document.body.style.setProperty('--primary-lightener-extra', hsl2lighten(hslColor, 33.5));
      document.body.style.setProperty('--primary-darken', hsl2darken(hslColor, 8));

      document.body.style.setProperty('--antd-slider-focus-shadow', hsl2fade(hslColor, 0.12));
      document.body.style.setProperty('--antd-select-focus-shadow', hsl2fade(hslColor, 0.2));

      document.body.style.setProperty('--antd-slider-active', hsl2fade(hslColor, 0.2));
      document.body.style.setProperty('--antd-slider-focus', hsl2fade(hslColor, 0.2));
      console.log(rgb2hex(color2tint(rgbColor, 0.5)));
      console.log(rgb2hex(color2tint(rgbColor, 0.2)));

      const _className = ['darkTheme', 'lightTheme'].reduce((total: string, _key: string) => {
        if (total.indexOf(_key) >= 0) {
          total = total.replace(_key, '');
        }
        return total;
      }, cloneDeep(document.body.className));

      document.body.className = (_className + ` ${visionTheme}Theme`).trim();
      console.log('sussess');
    });
}
