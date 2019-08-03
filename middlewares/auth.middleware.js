import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
    try {
        return res.status(401)
            .json({ message: '로그인이 필요합니다.' })
        next() // 이게 없으면 이 다음의 check는 타지 않음, 타임아웃으로 뻗음
    } catch (err) {
        next(err)
    }
}