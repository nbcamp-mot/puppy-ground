## 내일배움캠프 React 3기 최종프로젝트 A-4조

## 📝 프로젝트 개요

**기간** : 24. 01. 04 ~ 02. 08

**프로젝트명** : Puppy Ground(**퍼**피 **그**라운드)

**소개** : 반려견 중고 물품 거래 및 정보공유 플랫폼

**설명** : 반려동물을 키우는 사람이 많아진 만큼 사용하지 않는 반려동물 용품을 가까운 이웃과 중고거래 할 수 있는 서비스를 만들어 보고자 하였습니다. 그와 더불어 유기동물 또한 많아져서 사지말고 입양을 권하는 취지로 전국 유기견보호소에 있는 아이들에 대한 정보를 제공하고자 하였고 반려견과 함께 할 수 있는 내 주변 장소를 공유하고 반려인들과 소통할 수 있는 플랫폼을 만들어보고자 하였습니다.



## 👥 팀소개

**팀명** : 막내 온 TOP

**팀원** : 염혜원, 천영륜, 손지원, 손창성, 이예지

**디자이너** : 박애리



## 사용기술

### 프론트엔드

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"><img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"><img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white">



### 서버리스 DB

<img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white"><img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white">



### 버전 관리

<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white">



### 협업 툴

<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"><img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"><img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">



### 배포

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">



## 기술적 의사결정

| 사용기술       | 선택한 이유                                                  |
| -------------- | ------------------------------------------------------------ |
| Next.js        | SSG와 SSR의 지원으로 검색엔진 최적화와 초기로딩 성능 향상, 이미지 최적화 등 |
| Typescript     | - 런타임 환경에서의 오류를 예방하고 타입에러를 방지  - 자동완성 기능제공으로 휴먼에러를 줄이고 개발생산성 향상 |
| Zustand        | \- Redux와 유사하나 Redux에 비해 보일러플레이트가 적고 러닝커브가 낮음 - pasist와 같은 부가 기능을 지원함 |
| Tanstack Query | \- 비동기 작업과 상태를 관리 - 데이터를 가져오는 로직이 심플하고, 데이터 업데이트가 신속하게 반영됨 - Devtool이 내장되어 있어서 디버깅에 용이 |
| Supabase       | 관계형 데이터베이스를 기반으로 하여 중복되는 데이터를 한 테이블에서 관리할 수 있고 firebase에 비해 코드가 직관적이며 Query를 사용해서 비교적 자유롭게 데이터를 사용할 수 있음 |



## 주요기능

### MVP

1. **회원가입 / 로그인**
   - Supabase Auth를 활용한 이메일 회원가입 및 로그인
   - 소셜 로그인(카카오톡, 구글)
   - react-hook-form 을 사용한 실시간 유효성 검사
2. **메인 페이지**
   - 각 페이지 소개 및 이동버튼
   - framer-motion 적용
   - 헤더
     - 반응형 햄버거버튼
     - 좋아요, 찜 실시간 알림
     - 채팅아이콘 클릭시 채팅리스트 오픈
3. **중고거래 페이지**
   - 중고물품 리스트
     - 물품 상세 정보로 이동할 수 있는 링크 
     - 거래장소, 찜, 채팅개수, 등록한 시간 확인가능
     - 카테고리, 견종사이즈, 판매여부, 검색 등 다양한 필터링
     - 페이지네이션
   - 중고물품 등록하기
     - 대표이미지, 드래그 앤 드롭
     - 거래희망장소 지도로 마커 표시
   - 중고물품 상세페이지
     - 이미지 슬라이드
     - 공유하기 (카카오톡, URL) 
     - 찜 선택 및 개수 확인가능
     - 채팅하기
4. **멍스타그램 페이지**
   - 멍스타그램 리스트
     - 등록한 유저 프로필, 게시글 태그 확인가능
   - 멍스타그램 등록하기
     - 모달창으로 등록가능
     - 해시태그 등록
     - 이미지 다중선택
   - 멍스타그램 상세모달
     - parallel routes를 활용한 모달로 이전, 다음게시물 바로 이동가능
     - 이미지 슬라이드
     - 좋아요 및 개수 확인가능
5. **반려견 동반시설 페이지**
   - 카카오맵API로 데이터 마커표시
   - 위치권한 허용시 현재위치에서 시작
   - 마커 마우스오버시 간단한 정보확인
   - 보여지는 화면영역의 변화에 따라 리스트 확인가능한 토글버튼
   - 보여지는 화면영역의 변화에 따른 리스트 확인가능
   - 키워드 검색 및 장소명 클릭시 해당 위치로 이동
6. **유기견 공고 페이지** 
   - 공공API를 활용하여 전국 유기견 보호소의 유기견의 공고 목록을 표시 
   - 등록날짜, 지역별로 필터링가능
   - 페이지네이션
7. **마이페이지**
   - 프로필 사진 , 닉네임 변경
   - 중고거래 등록한상품, 찜한상품 확인가능
   - 멍스타그램 좋아요한 게시물, 등록한 게시물 확인가능



## ⚖️ 역할분담

| 담당자 | 작업내용                                                     |
| ------ | ------------------------------------------------------------ |
| 염혜원 | 마이페이지 프로필수정 / 실시간 1:1 채팅 / 채팅알림           |
| 천영륜 | 중고거래 등록페이지 / 마이페이지 / 좋아요 및 찜 / 공유하기 / 멍스타그램 댓글 CRUD |
| 손지원 | 회원가입 / (소셜)로그인 / 로그인 유무 분기처리 / 유기견공고 필터링 |
| 손창성 | 중고거래 리스트페이지 / 상세페이지 / 멍스타그램 리스트페이지 / 등록모달 / 상세모달 |
| 이예지 | 메인페이지 / 동반시설페이지 / 유기견공고 상세페이지 / (좋아요 찜)실시간 알림 |