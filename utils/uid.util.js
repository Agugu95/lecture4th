// 바이트 스트링을 뽑아내기 위한 제네레이트 함수

const generate = (length = 12) => {
    // default 값
    // -> return '0.xxxxxxxxx'와 같은 임의 16진수 스트링 변환
    return (Math.random()).toString('16')
        .substr(2, length)
}

export {
    generate
}