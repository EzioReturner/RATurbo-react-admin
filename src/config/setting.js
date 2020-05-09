// @ts-ignore
module.exports = {
  siteName: 'RA-Turbo',
  useMenu: true,
  useHeader: true,
  copyright: ['RA-Turbo admin', 'ezioreturner@gmail.com', 'https://github.com/EzioReturner'],
  menuLinkUrl: 'https://github.com/EzioReturner/RATurbo-react-admin',
  iconfontUrl: '//at.alicdn.com/t/font_842049_rn496ve5nkq.js',
  layoutMode: 'inline',
  navigateMode: 'horizontal',
  contentAreaWidthMode: 'max-width',
  useSiteIcon: true,
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
  theme: {
    '@primary-color': '#fb4491',
    '@link-color': '#fb4491',
    '@border-radius-base': '2px',
    '@font-size-base': '13px',
    '@success-color': '#00ce68',
    '@warning-color': '#ffaf00',
    '@error-color': '#e65251',
    '@processing-color': '#308ee0'
  }
};
