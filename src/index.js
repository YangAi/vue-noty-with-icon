import baseConfig from './config'
import Noty from 'noty'
import './style.scss'

export let VNoty = {
  config: baseConfig,
  mergeConfig (overwriteConfig) {
    this.config = {
      ...this.config,
      ...overwriteConfig
    }
    return this
  },
  create (options) {
    VNoty.mergeConfig(options)
    const type = options.type
    if (this.config.withIcon && this.config.icon[type]) {
      console.log('with icon', this.config.icon[type])
      this.config.text = '<i class="' + this.config.icon[type] + '"></i>' + this.config.text
    }
    return new Noty(this.config).show()
  }
};

[
  'success',
  'info',
  'warning',
  'alert',
  'error'
].forEach(type => {
  VNoty[type] = function (options) {
    if (!options) return
    options = typeof options === 'string'
      ? {
        type: type,
        text: options
      } : {
        type: type,
        ...options
      }
    return VNoty.create(options)
  }
})

export default {
  install: function (Vue, config) {
    const noty = VNoty.mergeConfig(config)
    Vue.prototype.$noty = noty
  }
}
