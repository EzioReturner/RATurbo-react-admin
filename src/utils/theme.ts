import { hex2rgb, rgb2hsl, hsl2lighten, hsl2darken } from '@utils/tools';
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
      let primaryColor = rgb2hsl(rgbColor, 'number') as number[];
      document.body.style.setProperty('--primary', currentColor);
      document.body.style.setProperty('--primary-lighten', hsl2lighten(primaryColor, 8));
      document.body.style.setProperty('--primary-lightener', hsl2lighten(primaryColor, 20));
      document.body.style.setProperty('--primary-lightener-extra', hsl2lighten(primaryColor, 33.5));
      document.body.style.setProperty('--primary-darken', hsl2darken(primaryColor, 8));

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
