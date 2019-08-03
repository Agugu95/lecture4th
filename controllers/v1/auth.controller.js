import models from '../../models' // DB 꺼낼 모델, 매번 모듈 로딩 해야함(근데 애초에 노드 모듈은 전부 로딩됨)
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const check = async (req, res, next) => {
  try {
    return res.status(200)
      .json({ message: '인증이 완료되었습니다.' })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    // 요청을 보낼 때 nickname 과 password를 body 담아서 준걸 꺼냄
    const nickname = req.body.nickname
    const password = req.body.password

    const user = await models.User.findOne({
      where: {
        nickname
      }
    })

    // 행동이 올바르지 않을 때의 조건만 집어넣고, 정상적으로 시행 될 땐 실행되게 하면 여러 에러코드 가능
    if (!user) {
      return res.status(404)
        .json({ mesasge: '유저가 없습니다.' })
    }

    // async를 위해 만듬
    const isUserPasspawordMatch = await comparePassword(password, user.password)
    if (!isUserPasspawordMatch) {
      return res.status(422)
        .json({ message: '비밀번호가 일치하지 않습니다.' })
    }

    // 실수 방어코드 (  = 으로 쓰게 되면 어차피 const라 걸러짐, 근데 user.password = password 로 하면 오버라이트 됨)
    //if (password === user.password) {

    // 토큰 생성
    const accessToken = jwt.sign(
      {
        uid: user.uid,
        nickname: user.nickname
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRESIN } // 시크릿과 유효기간
    )

    return res.status(200)
      .json({ accessToken })
  } catch (err) {
    next(err)
  }
}

const comparePassword = async (password, password2) => {
  const match = await bcrypt.compare(password, password2) // 평문 / 암호화 된 비밀번호 비교
  return match // 같으면 뽑음
}

export { login }

