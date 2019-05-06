# 系统配置

可在 `/src/config/setting` 里做一些自定义配置：

## siteName

- 类型： `String`

  配置站点名称，应用到登录框，侧边栏顶部的标题文字显示。

## copyright

- 类型： `String`

  配置版权声明，应用到登录页、`Primay`布局底部。

## logoPath

- 类型： `String`

  配置站点 Logo，应用到登录框，侧边栏顶部的 Logo 显示。

## fixedHeader

- 类型： `String`

  页面滚动时是否固定顶部。


## i18n

- 类型： `Object`

  配置国际化，默认配置如下：

  ```javascript
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
  }
  ```

  ### i18n.languages

  - 类型： `Array`

    指定应用支持哪些语言，每种语言的对象属性如下：

    - `key` - 语言的`key`，用于区分语言，以及 `src/locals` 下对应的语言包文件；

    - `title` - 语言名称，布局顶部语言切换显示；

    - `icon` - 语言的国旗图标emoji，布局顶部语言切换显示。

 ### i18n.defaultLanguage
   
   - 类型： `String`

        配置默认语言。
