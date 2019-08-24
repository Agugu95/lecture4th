# Express를 이용한 ORM 연동 API 구현  

## 개발 환경 

### MVC Partten 개발에서 MiddleWare Freamwork를 사용  
- MVC 패턴  
> [MVC](https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%8D%B8-%EB%B7%B0-%EC%BB%A8%ED%8A%B8%EB%A1%A4%EB%9F%AC)  

- MVC 패턴 -> V를 Middleware Route로 대신함
기존 MVC 패턴에서 View와 Controller의 위치를 변경  
모든 클라이언트의 요청은 Route를 거친 뒤 컨트롤러에 의해 동작  
(미들웨어 프레임워크인 Express를 사용)

### 테스트 케이스 구현  
- JEST을 이용한 테스트 케이스 구현  
TDD 방법론적 개발에 따라 테스트 케이스를 작성하고 테스트 케이스를 완성시키며 레버리지를 올리는 방향으로 연습하였음  

### JWT를 이용한 Auth 구현  
- JWT (Json Web Token)  
기존 세션 보안 방식의 세션 저장소 별개 사용을 하지 않기 위하여 JWT를 사용하여 연습하였음  
> [JWT](https://jwt.io)  
