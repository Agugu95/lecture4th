import fs from 'fs'
import path from 'path'
import express from 'express'

const router = express.Router()
const indexJs = path.basename(__filename)

// 본인을 제외한 auth.route.js 파일을 불러와 /v1/auth 로 만들어주는 코드
// 한마디로 현재 디렉터리를 필터링, foreach 해주는 것
fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== indexJs) && (file.slice(-9) === '.route.js'))
  .forEach(routeFile => router.use(`/${ routeFile.split('.')[0] }`, require(`./${ routeFile }`).default))

export default router
