# 🎯 한글 두더지 잡기 게임

초등학교 1학년 학생들이 게임을 통해 재미있게 한글을 학습할 수 있는 교육용 게임입니다.

## 📋 주요 기능

### 3단계 학습 레벨
- **레벨 1**: 자음·모음 (14개 자음 + 10개 모음)
- **레벨 2**: 낱말 (50개 이상의 일상 낱말)
- **레벨 3**: 문장 (20개 이상의 간단한 문장)

### 게임 기능
- 🎮 3x3 두더지 잡기 게임 방식
- ⏱️ 60초 타이머
- 💯 점수 및 콤보 시스템
- 🔊 음성 안내 (TTS)
- 💾 최고 점수 저장
- ⭐ 별점 보상 시스템

## 🎮 온라인에서 플레이하기

**🌐 데모 사이트**: [https://HyunjooK.github.io/molegame/](https://HyunjooK.github.io/molegame/)

배포 후 위 링크에서 바로 게임을 플레이할 수 있습니다!

## 🚀 로컬에서 실행하기

### 필요 사항
- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

### 개발 서버 실행 후
브라우저에서 `http://localhost:5173` 접속

## 🚀 GitHub Pages에 배포하기

자세한 배포 방법은 [DEPLOY.md](./DEPLOY.md)를 참고하세요.

**간단 배포:**
```bash
# 1. GitHub 저장소 생성 후
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/HyunjooK/molegame.git
git push -u origin main

# 2. GitHub 저장소 Settings → Pages → Source를 "GitHub Actions"로 설정
# 자동으로 배포됩니다!
```

## 🎮 게임 방법

1. **레벨 선택**: 메인 메뉴에서 원하는 레벨 선택
2. **게임 시작**: "게임 시작" 버튼 클릭
3. **미션 수행**: 화면 상단에 표시된 글자/단어/문장을 찾아 클릭
4. **점수 획득**: 
   - 정답: +10점
   - 오답: -5점
   - 3콤보 이상: 보너스 점수
5. **결과 확인**: 60초 후 결과 화면에서 별점 확인

## 🏗️ 프로젝트 구조

```
korean-whack-a-mole/
├── src/
│   ├── components/         # React 컴포넌트
│   │   ├── MainMenu.tsx   # 메인 메뉴
│   │   ├── GameScreen.tsx # 게임 화면
│   │   └── MoleHole.tsx   # 두더지 구멍
│   ├── data/
│   │   └── gameData.ts    # 게임 데이터 (자음, 모음, 낱말, 문장)
│   ├── hooks/
│   │   └── useGameLogic.ts # 게임 로직 훅
│   ├── utils/
│   │   ├── storage.ts     # 로컬 스토리지 관리
│   │   └── sound.ts       # 사운드 관리
│   ├── types.ts           # TypeScript 타입 정의
│   ├── App.tsx            # 메인 App 컴포넌트
│   ├── App.css            # 스타일
│   └── main.tsx           # 엔트리 포인트
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ 기술 스택

- **React 18**: UI 라이브러리
- **TypeScript**: 타입 안정성
- **Vite**: 빌드 도구
- **Web Audio API**: 효과음
- **Web Speech API**: TTS 음성 안내
- **Local Storage**: 진행 상황 저장

## 📱 반응형 디자인

- 데스크톱 (1200px+)
- 태블릿 (768px ~ 1199px)
- 모바일 (~ 767px)

## 🎨 디자인 가이드

### 색상 팔레트
- 주 색상: `#4A90E2` (밝은 파랑)
- 보조 색상: `#FFD966` (노랑), `#7ED321` (초록)
- 배경: `#E8F4FF` (연한 하늘색)

### 폰트
- Noto Sans KR (Google Fonts)

## 📊 점수 시스템

- 정답: +10점
- 오답: -5점
- 3콤보 이상: 1.5배 보너스
- 남은 시간 보너스: 초당 +1점

### 별점 기준
- ⭐⭐⭐ (3점): 100점 이상
- ⭐⭐ (2점): 70점 이상
- ⭐ (1점): 40점 이상

## 🔧 커스터마이징

### 게임 데이터 수정
`src/data/gameData.ts` 파일에서 자음, 모음, 낱말, 문장 데이터를 수정할 수 있습니다.

### 난이도 조정
`src/data/gameData.ts`의 `levelData`에서 각 레벨의 설정을 변경할 수 있습니다:
- `spawnInterval`: 두더지 등장 간격 (밀리초)
- `displayTime`: 두더지 표시 시간 (밀리초)

### 점수 설정
`src/data/gameData.ts`의 `SCORE_CONFIG`에서 점수 관련 설정을 변경할 수 있습니다.

## 📝 라이선스

이 프로젝트는 교육 목적으로 자유롭게 사용할 수 있습니다.

## 🙏 기여

버그 리포트, 기능 제안, 풀 리퀘스트를 환영합니다!

## 📞 문의

프로젝트에 대한 질문이나 제안이 있으시면 이슈를 등록해 주세요.

---

**Made with ❤️ for Korean Language Learners**

