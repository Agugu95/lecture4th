// 테스트 코드 먼저 작성
import models from '../../models'
import randomString from 'random-string'
import { request } from 'supertest'
const app = require('../../app')

let password
let user

//로그인 테스트를 위한 사용자 생성
beforeAll(async () => {
    password = randomString()

    user = await models.User.create({
        nickname: randomString(),
        password, // password : password
        profileImg: 'http://www.naver.com'
    })
})

afterAll(() => {
    models.sequelize.close() // db 안닫으면 db가 계속 떠있기에 테스트 종료 안됨
})

// 테스트
let accesss

test('로그인 후 정상적으로 JWT를 받아야 합니다.', async () => {
    let res = await request(app)
        .post('/v1/auth/login')
        .send({
            nickname: user.nickname,
            password
        })

    accesss = res.body.accessToken // access에 jwt 토큰 담음

    // { accessToken: xxxxxx.xxxxxxxx.xxxxxxx} 형식으로 응답을 반환 받습니다. (JWT)
    expect(res.body.accessToken).toBetruthy
})

test('받아온 JWT로 유효한 인증을 받아야 합니다.', async () => {
    let res = await request(app)
        .get
        .set('Authorization', `Bearer ${ accesss }`) // 인증이 안되면 401 반환

    expect(res.statusCode).toBe(200)
})