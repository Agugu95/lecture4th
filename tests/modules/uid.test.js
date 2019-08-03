import { generate } from '../../utils/uid.util'

// TODO: generate의 반환 길이가 12자여야 합니다.
test('default일 경우 길이가 12자여야합니다.', () => {
    const randomByteString = generate()
    expect(randomByteString.length).toBe(12)
})

// TODO: 16진수 byte array로 모든 문자가 0 ~ 9, a ~ f사이에 존재해야 합니다.
test('16진수 byte array로 모든 문자는 0 ~9와 a~f사이에 존재해야 합니다.', () => {
    const randomByteString = generate()
    // expect(randomByteString).toBe(/\b[0-9a-f]{12}\b/g) jest에서는 toBe에서 정규표현식을 받아들일 수 없음
    expect(randomByteString).toMatch(/\b[0-9a-f]{12}\b/g)
})


// TODO: length를 8로 주었을 때 길이가 8로 나와야 함
const length = 8
test(`length를 ${ length }로 주었을 때 길이가 ${ length }로 나와야 합니다.`, () => {
    // lentgh 변수를 따로 만들어서 넣는게 좋음
    const randomByteString = generate(length)
    expect(randomByteString.length).toBe(length)
})
