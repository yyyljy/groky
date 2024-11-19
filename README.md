# AI 채팅 애플리케이션

NestJS와 HTML/JavaScript를 사용한 AI 채팅 애플리케이션입니다.

## 주요 기능

- x.ai의 Grok 모델을 활용한 AI 채팅
- 마크다운 형식의 응답 지원
- 채팅 내역 저장 및 불러오기
- 채팅 목록 타임라인 뷰

## 기술 스택

- Backend: NestJS
- Frontend: HTML, JavaScript, CSS
- AI API: x.ai Grok Beta
- 마크다운 렌더링: marked.js

## 실행 방법

1. 프로젝트 클론

   git clone https://github.com/yyyljy/groky

   cd groky

2. 의존성 설치

   npm install

3. 환경 변수 설정
   .env 파일을 생성하고 다음 내용을 추가:

   XAPI_KEY=your_api_key_here

4. 서버 실행
