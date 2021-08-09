const path = require('path');
const postcssNormalize = require('postcss-normalize');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

function _resolve(track) {
  return path.join(__dirname, '..', track);
}

module.exports = function() {
  const isEnvDevelopment = process.env.NODE_ENV === 'development';
  const isEnvProduction = process.env.NODE_ENV === 'production';
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
  const publicPath = isEnvProduction
    ? paths.servedPath
    : isEnvDevelopment && '/';

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: {
          options: publicPath === './' ? { publicPath: '../../' } : {}
        }
      },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3
            }),
            postcssNormalize()
          ],
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment
        }
      }
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
            root: paths.appSrc
          }
        },
        {
          loader: require.resolve(preProcessor),
          options: Object.assign(
            {},
            {
              sourceMap: isEnvProduction && shouldUseSourceMap
            },
            preProcessor === 'less-loader'
              ? {
                  javascriptEnabled: true,
                  modifyVars: {
                    '@primary-color': '#536ec2',
                    '@font-size-base': '13px',
                    'brand-primary': '#586fbc'
                  }
                }
              : undefined
          )
        }
      );
    }

    if (preProcessor === 'less-loader') {
      loaders.push({
        loader: 'sass-resources-loader',
        options: {
          resources: [
            _resolve('./src/styles/mainVars.less'),
            _resolve('./src/styles/customClass.less'),
            _resolve('./src/styles/variables.less')
          ]
        }
      });
    }
    return loaders;
  };

  return [
    {
      test: cssRegex,
      exclude: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment
      }),
      sideEffects: true
    },
    {
      test: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        modules: {
          getLocalIdent: getCSSModuleLocalIdent
        }
      })
    },
    {
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 3,
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment
        },
        'less-loader'
      ),
      sideEffects: true
    },
    {
      test: lessModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 3,
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
          modules: {
            getLocalIdent: getCSSModuleLocalIdent
          }
        },
        'less-loader'
      )
    }
  ];
};
