import express from 'express'
import { // 컨트롤러에서구현 된 HTTP 메소드
    get,
    create,
    update,
    destroy
} from '../../controllers/v1/user.controller'
const router = express.Router()

// GET /v1/users : 사용자 조회
// POST /v1/users : 사용자 생성
// '/' 이거 하나 하나가 라우트 경로가 된다.
// 즉 메소드 + /v1/users + / 를 통해 나는 하나의 REST를 만든 것
// GET + /v1/users + /  = GET/v1/users/
// Router 모듈에 있는 각 HTTP 메소드에 내가 정의한 함수를 담은 것 !
router.route('/')
    .get(get)
    .post(create)

// GET /v1/users/:id  특정 사용자 조회
// PUT /v1/users/:id  특정 사용자 업데이트
// DEL /v1/users/:id  특정 사용자 삭제
router.route('/:id') // 스코프 지정 : id dog면 dog:id
    .get(get)
    .put(update) // 특정 사용자만 업데이트 하지 전체를 업데이트 하지 않음
    .delete(destroy) // 특정 사용자만 삭제

// 파이프 라인을 통해 라우트 모델에 연결 된 메소드는 선택 가능

export default router