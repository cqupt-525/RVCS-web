import routes from './router.config'

// ref: https://umijs.org/plugin/
const plugins = [
  ['umi-plugin-react', {
    antd: true,
    dva: {
      hmr: true,
    },

    routes: {
      exclude: [
        /models\//,
        /services\//,
        /model\.(t|j)sx?$/,
        /service\.(t|j)sx?$/,
        /components\//,
      ],
    },

    title: {
      defaultTitle: 'RVCS',
    },
  }],
]

// ref: https://umijs.org/config/
export default {
  plugins,
  routes,
  treeShaking: true,
}
