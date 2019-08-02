
// const models = require('../../models')
import models from '../../models'

const get = async (req, res, next) => { // 비동기 기다림
    try {
        // GET/v1/users/1 (params)
        // GET/v1/users?id=1 (쿼리)는 서로 다른 라우트
        if (req.params.id) { // 특정 사용자 조회
            const user = await models.User.findOne({ // DB ORM
                where: {    // sql 조건식
                    id: req.params.id
                }
            })
            if (!user) {
                return res.status(404)
                    .json({ message: '사용자를 찾을 수 없습니다.' })
            }
            return res.status(200) // 데이터 조회 시 반환 해주는 상태코드
                .json({ user })
            // select * from 으로 만들어짐
        }



        // 모든 사용자 조회
        const users = await models.Users.findAll() // 로드 될 때까지 블로킹 모든 데이터 가져옴
        return res.status(200)
            .json({ users })
    } catch (err) {
        next(err)
    }
}

const create = async (req, res, next) => {
    try {
        const user = await models.User.create({
            uid: req.body.uid,
            nickname: req.body.nickname,
            password: req.body.password,
            profileImg: req.body.profileImg
        })

        return res.status(201)
            .json({
                message: '사용자를 생성하였습니다.',
                user
            })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const user = await models.User.findOne({
            where: {
                id: req.params.id
            }
        })
        if (user) {
            return res.status(404)
                .json({ message: '사용자를 찾을 수 없습니다.' })
        }

        //
        user.password = req.body.password
        user.profileImg = req.body.profileImg
        await user.save()
        //

        return res.status(200)
            .json({
                message: '사용자 정보를 수정하였습니다.'
            })
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        await models.User.destroy({
            where: {
                id: req.params.id
            }
        })


        return res.status(200)
            .json({
                message: '사용자를 삭제하였습니다.'
            })
    } catch (err) {
        next(err)
    }
}
export { get, create, update, destroy }