/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs')
const path = require('path')
const lessToJs = require('less-vars-to-js')

const themePath = path.join(__dirname, '../styles/antd-theme.less')
module.exports = lessToJs(fs.readFileSync(themePath, 'utf8'))
