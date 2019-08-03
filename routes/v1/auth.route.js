import express from 'express'
import auth from '../../middlewares/auth.middleware'
import { login, check } from '../../controllers/v1/auth.controller'

const router = express.Router()

router.route('/login')
    .post(login)

router.route('/check')
    .get( // auth.middleware 의 req에 정보를 붙여서 전달 해 줄 수 있음. DB를 갔다오지 않더라도
        auth, // next 가 없으면 여기서 끝남, header에 Authrization: Barer Token이 존재하면 유효성을 검증하는 로직을 구현
        check
    )

export default router
