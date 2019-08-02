// 테스트 파일
require('dotenv').config()
import request from 'supertest'
import randomString from 'random-string'
import models from '../models'
// TODO : 사용자가 제대로 조회가 되는가?
// TODO : 사용자가 제대로 생성이 되는가?
// TODO : 사용자가 중복해서 같은 nickname으로 생성이 되는가?
// TODO : 사용자가 중복해서 같은 uid로 생성 되는가?
// TODO : 사용자의 profileImg가 url이 아니여도 생성이 되는가?

const app = require('../app') // 서버를 실제로 돌리지 않고, 코드상에서만 돌림

afterAll(() => {
    models.sequelize.close()
})

// * 여기까지는 무조건 테스트 케이스 작성에 쓴다

describe('사용자 조회 테스트', () => { // lecture - test DB 필요
    // TODO : 사용자가 제대로 조회가 되는가?
    // status 코드까지 확인
    // 네트워크를 통한 테스트는 비동기기때문에 무조건 async/await


    beforeAll(async () => { // 무조건 이게 먼저 1번 도는 hook, 이게 완료 되야 테스트 작동
        // get 조회 시 비교를 위한 유저 객체 
        await models.User.create({
            uid: 'test1',
            nickname: 'test1',
            password: 'test1',
            profileImg: 'http://www.naver.com'
        })

        await models.User.create({
            uid: 'test2',
            nickname: 'test2',
            password: 'test2',
            profileImg: 'http://www.naver.com'
        })

        await models.User.create({
            uid: 'test3',
            nickname: 'test3',
            password: 'test3',
            profileImg: 'http://www.naver.com'
        })
    })

    // cross-env 되면서 무조건 db reset이 되기에 무조건 1번
    test('1번 사용자가 존재하고, 조회가 되어야합니다. | 200', async () => {
        let res = await request(app).get('/v1/users/1') // 서버 모킹 자동 감지

        console.log(res.body)

        expect(res.status).toBe(200) // user DB에 get을 했을 때 받아와야하는 status code
        expect(res.body.user).not.toBe(null) // user를 받아 왔을 때  NotNull 이여야한다
        expect(res.body.user.uid).toBe('test1') // get을 통해 가져온 정보와 비교할 정보의 일치 판단 
        expect(res.body.user.nickname).toBe('test1')
        expect(res.body.user.password).toBe('test1')
        expect(res.body.user.profileImg).toBe('http://www.naver.com')
    })


    test('사용자를 모두 조회하고, 사용자는 3명이어야 합니다. | 200', async () => {
        let res = await request(app).get('/v1/users')
        console.error(res.body)
        expect(res.status).toBe(200)
        expect(res.body.users.length).toBe(3) // users 가 3명
    })
})

describe('사용자 생성 테스트', () => { // CREATE = POST 
    // TODO : 사용자가 제대로 생성이 되는가?
    // status를 통한 구분 !!
    test('사용자를 생성하고 모든 데이터가 제대로 저장이 되어야 합니다. | 201', async () => {
        const newUser = {
            uid: randomString(),
            nickname: randomString(),
            password: randomString(),
            profileImg: 'http://www.naver.com'
        }

        let res = await request(app)
            // POST /v1/users
            .post('/v1/users')
            .send(newUser)

        console.error(res.body)

        // 서버는 각 테스트를 잘 작성하기만 하면 테스트 자체가 바뀌는 일은 거의 없다.
        expect(res.status).toBe(201)
        expect(res.body.user.uid).toBe(newUser.uid) // 생성 되는 데이터와 보내는 데이터가 똑같냐?
        expect(res.body.user.nickname).toBe(newUser.nickname)
        expect(res.body.user.password).toBe(newUser.password)
        expect(res.body.user.profileImg).toBe(newUser.profileImg)
    })
    // TODO : 사용자가 중복해서 같은 nickname으로 생성이 되는가?
    // TODO : 사용자가 중복해서 같은 uid로 생성 되는가?
    // TODO : 사용자의 profileImg가 url이 아니여도 생성이 되는가?
})

describe('사용자 업데이트', () => { // UPDATE = PUT 
    // TODO : 사용자는 password 와 profileImg만 변경 가능
    let user
    beforeAll(async () => {
        user = await models.User.create({
            uid: randomString(),
            nickname: randomString(),
            password: randomString(),
            profileImg: 'http://www.naver.com'

        })
    })
    // PUT /v1/users/user 
    test('사용자는 password를 변경할 수 있습니다. | 200', async () => { // jest 5초 반응 없으면 타임아웃 에러 줌
        const password = 'asdf'
        const profileImg = 'https://www.google.com'
        let res = await request(app)
            .put('/v1/users/' + user.id)
            .send({
                password, // 자동적으로 KEY : VALUE 믂음 password : password
                profileImg
            })
        expect(res.status).toBe(200)
        expect(res.body.user.password).toBe(password)
        expect(res.body.user.profileImg).toBe(profileImg)
    })
})

describe('사용자 삭제', () => {
    // TODO : 사용자는 password 와 profileImg만 변경 가능
    let user
    beforeAll(async () => {
        user = await models.User.create({
            uid: randomString(),
            nickname: randomString(),
            password: randomString(),
            profileImg: 'http://www.naver.com'

        })
    })
    test('사용자를 삭제할 수 있습니다. | 200', async () => { // jest 5초 반응 없으면 타임아웃 에러 줌
        let res = await request(app)
            .delete(`/v1/users/${ user.id }`)
        expect(res.status).toBe(200)


    })
})

