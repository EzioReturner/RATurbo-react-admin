// @ts-ignore
module.exports = {
  siteName: 'RA-Turbo',
  useMenu: true,
  useHeader: true,
  copyright: ['RA-Turbo admin', 'ezioreturner@gmail.com', 'https://github.com/EzioReturner'],
  menuLinkUrl: 'https://github.com/EzioReturner/RATurbo-react-admin',
  iconfontUrl: '//at.alicdn.com/t/font_842049_rn496ve5nkq.js',
  layoutMode: 'split',
  navigateMode: 'vertical',
  contentAreaWidthMode: 'max-width',
  usei18n: true,
  useSiteIcon: false,
  i18n: {
    languages: [
      {
        key: 'zh',
        title: '简体中文',
        icon: '🇨🇳'
      },
      {
        key: 'en',
        title: 'English',
        icon: '🇬🇧'
      },
      {
        key: 'ja',
        title: '日本语',
        icon: '🇯🇵'
      }
    ],
    defaultLanguage: 'zh'
  },
  themeColors: [
    '#fb4491',
    '#f0b041',
    '#e33d39',
    '#54bf99',
    '#70c140',
    '#63a7c9',
    '#4090f7',
    '#b66dff',
    '#71669e'
  ],
  defaultDarkTheme: {
    '@component-background': '#1d1d1d',
    '@text-color': 'fade(@white, 65%)',
    '@text-color-secondary': 'fade(@white, 45%)',
    '@text-color-inverse': '@white',
    '@icon-color-hover': 'fade(@white, 75%)',
    '@heading-color': 'fade(@white, 85%)',
    '@disabled-color': 'fade(@white, 30%)',
    '@border-color-base': '#434343',
    '@border-color-split': '#303030',
    '@popover-background': '#1d1d1d',
    '@popover-customize-border-color': '#3a3a3a',
    '@select-selection-item-bg': 'hsv(0, 0, 96%)',
    '@item-hover-bg': 'fade(@white, 8%)',
    '@background-color-light': 'fade(@white, 4%)',
    '@background-color-base': 'fade(@white, 8%)'
  },
  defaultLightTheme: {
    '@component-background': '#ffffff',
    '@text-color': 'fade(@black, 65%)',
    '@text-color-secondary': 'fade(@black, 45%)',
    '@text-color-inverse': '@black',
    '@icon-color-hover': 'fade(@black, 75%)',
    '@heading-color': 'fade(@black, 85%)',
    '@disabled-color': 'fade(#000000, 30%)',
    '@border-color-base': 'hsv(0, 0, 85%)',
    '@border-color-split': 'hsv(0, 0, 94%)',
    '@popover-background': '#ffffff',
    '@popover-customize-border-color': 'hsv(0, 0, 94%)',
    '@select-selection-item-bg': 'fade(@white, 8)',
    '@item-hover-bg': '#f5f5f5',
    '@background-color-light': 'hsv(0, 0, 98%)',
    '@background-color-base': 'hsv(0, 0, 96%)'
  }
};
