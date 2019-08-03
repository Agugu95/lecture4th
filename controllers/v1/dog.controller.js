import models from '../../models'
// 메소드를 수행 할 MODEL 실제로는 DB가 정의되어 있음.
// DB = Dog, DB findAll = dogs, 개별 객체 = dog

// dog 목록 조회
const get = async (req, res, next) => {
    try {

        if (req.params.id) {
            const dog = await models.Dog.findOne({ // DB ORM
                where: {    // sql 조건식
                    id: req.params.id
                }
            })

            // get 메소드 수행 시 만약 유저가 없을 때 반환해줄 예외
            if (!dog) {
                return res.status(404)
                    .json({ message: '개를 찾을 수 없습니다.' })
            }

            // 데이터 조회 시 반환 해줄 상태코드
            return res.status(200)
                .json({ dog })
            // select * from 으로 만들어짐
        }

        // 모든 dog 조회
        // 로드 될 때까지 블로킹 / 모든 데이터 가져옴
        const dogs = await models.Dog.findAll()
        return res.status(200)
            .json({ dogs })
    } catch (err) {
        next(err)
    }
}

// POST 메소드를 수행 할 create 함수
const create = async (req, res, next) => {
    try {
        const dog = await models.Dog.create({
            uid: req.body.uid,
            dogName: req.body.dogName,
            dogType: req.body.dogType,
            dogAge: req.body.dogAge,
            dogSex: req.body.dogSex,
            profileImg: req.body.profileImg
        })

        // 생성 성공 시 반환해 줄 status 코드
        return res.status(201)
            .json({
                message: '사용자를 생성하였습니다.',
                dog // 메세지 뿐 아니라 생성 된 user도 반환
                // !! user의 반환이 없으면 안됨, POST 수행 된 user로 작업을 하기 때문
            })
    } catch (err) {
        next(err)
    }
}

// PUT 메소드를 수행 할 update 함수
const update = async (req, res, next) => {
    try {
        // 특정 사용자를 조회
        const dog = await models.Dog.findOne({
            where: {
                id: req.params.id
            }
        })

        // 만약 특정 user가 없으면 반환
        if (!dog) {
            return res.status(404)
                .json({ message: '사용자를 찾을 수 없습니다.' })
        }

        // get으로 가져온 데이터를 업데이트
        dog.profileImg = req.body.profileImg

        /* rquest body 에 포함 된 데이터로 MODEL의 데이터를
        바꾸기 전 까지 블로킹 후 MODEL 저장 */
        await dog.save()

        return res.status(200)
            .json({
                message: '사용자 정보를 수정하였습니다.',
                dog // 업데이트 된 user 반환
                // user의 반환은 없으면 안됨. 반환 된 user로 작업을 하기 때문
            })
    } catch (err) {
        next(err)
    }
}

// DELETE 메소드를 수행 할 destroy 함수
const destroy = async (req, res, next) => {
    try {
        await models.Dog.destroy({
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