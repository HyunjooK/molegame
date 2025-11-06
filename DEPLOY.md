# 🚀 GitHub Pages 배포 가이드

이 문서는 한글 두더지 잡기 게임을 GitHub Pages에 배포하는 방법을 설명합니다.

## 📋 배포 전 준비사항

### 1. Node.js 설치
- Node.js가 설치되어 있어야 합니다
- https://nodejs.org/ 에서 LTS 버전 다운로드

### 2. Git 설치
- Git이 설치되어 있어야 합니다
- https://git-scm.com/ 에서 다운로드

## 🔧 배포 단계

### Step 1: GitHub 저장소 생성

1. GitHub에 로그인
2. 우측 상단의 `+` 버튼 클릭 → `New repository`
3. Repository name: `test` (또는 원하는 이름)
4. Public으로 설정
5. `Create repository` 클릭

### Step 2: package.json 수정

`package.json` 파일의 `homepage` 부분을 본인의 GitHub 사용자명으로 변경:

```json
"homepage": "https://YOUR_USERNAME.github.io/test"
```

예시:
```json
"homepage": "https://mywor.github.io/test"
```

### Step 3: Git 저장소 초기화 및 연결

터미널에서 다음 명령어를 순서대로 실행:

```bash
# 프로젝트 폴더로 이동
cd c:\Users\mywor\Desktop\test

# Git 저장소 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 한글 두더지 잡기 게임"

# 브랜치 이름을 main으로 변경
git branch -M main

# GitHub 저장소와 연결 (YOUR_USERNAME을 본인 계정명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/test.git

# GitHub에 푸시
git push -u origin main
```

### Step 4: GitHub Pages 활성화

#### 방법 A: GitHub Actions 사용 (자동 배포 - 권장)

1. GitHub 저장소 페이지로 이동
2. `Settings` → `Pages` 클릭
3. `Source`를 `GitHub Actions`로 변경
4. 코드를 push하면 자동으로 빌드 및 배포됩니다!

#### 방법 B: gh-pages 패키지 사용 (수동 배포)

터미널에서 실행:

```bash
# 의존성 설치
npm install

# 빌드 및 배포
npm run deploy
```

## 🎯 배포 완료!

배포가 완료되면 다음 주소에서 게임을 플레이할 수 있습니다:

```
https://YOUR_USERNAME.github.io/test/
```

## 🔄 코드 업데이트 후 재배포

### GitHub Actions 사용 시:
```bash
git add .
git commit -m "Update game"
git push
```
푸시하면 자동으로 배포됩니다!

### gh-pages 사용 시:
```bash
npm run deploy
```

## ⚙️ 배포 설정 파일 설명

### `.github/workflows/deploy.yml`
- GitHub Actions 자동 배포 설정
- main 브랜치에 push할 때마다 자동 빌드 및 배포

### `vite.config.ts`
```typescript
base: '/test/'
```
- GitHub Pages의 서브 경로 설정
- 저장소 이름이 'test'가 아니면 이 부분도 변경 필요

### `package.json`
```json
"homepage": "https://YOUR_USERNAME.github.io/test"
```
- 배포될 최종 URL 설정

## 🐛 트러블슈팅

### 문제 1: 404 에러
- `vite.config.ts`의 `base` 경로가 저장소 이름과 일치하는지 확인
- GitHub Pages가 활성화되어 있는지 확인

### 문제 2: 빈 화면
- 브라우저 개발자 도구(F12)에서 콘솔 에러 확인
- `base` 경로 설정 다시 확인

### 문제 3: GitHub Actions 실패
- GitHub 저장소 Settings → Actions → General에서:
  - "Workflow permissions"를 "Read and write permissions"로 설정
  - "Allow GitHub Actions to create and approve pull requests" 체크

## 📞 도움이 필요하면

GitHub Issues에 문의하거나, 다음을 확인하세요:
- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)

---

**Happy Deploying! 🎉**


