const fs = require('fs')

class StringReplacePlugin {
	constructor(options) {
    this.patterns = options.patterns || []
    console.log('StringReplacePlugin', options)
	}

	apply(compiler) {
		compiler.hooks.emit.tapAsync(
			'StringReplacePlugin',
			(compilation, callback) => {
				// 获取所有文件的路径
				const files = Object.keys(compilation.assets)

				files.forEach((file) => {
					if (file.endsWith('.js')) {
						// 读取文件内容
						let content = compilation.assets[file].source()
            
            for (let i = 0; i < this.patterns.length; i++) {
              const { search, replace } = this.patterns[i]

              content = content.replace(new RegExp(search, 'g'), replace)
            }

						compilation.assets[file] = {
							source: () => content,
							size: () => content.length
						}
					}
				})
				callback()
			}
		)
	}
}

module.exports = StringReplacePlugin
