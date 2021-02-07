module.exports = {
	/*css: {
    loaderOptions: {
			sass: {
				additionalData: '@import "@/styles/base.sass";'
			}
    }
	},*/
  configureWebpack: {
		devServer: {
			proxy: {
				'/api/*': {
					target: 'http://localhost:3000'
				}
			}
		}
  }
}