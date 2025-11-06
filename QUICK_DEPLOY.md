# ⚡ 빠른 배포 가이드

## 🎯 5분 만에 GitHub Pages에 배포하기!

### 1️⃣ GitHub에서 새 저장소 만들기

1. https://github.com/new 접속
2. Repository name: `test` 입력
3. **Public** 선택
4. **"Create repository"** 클릭

### 2️⃣ package.json 수정하기

`c:\Users\mywor\Desktop\test\package.json` 파일을 열어서:

마지막 줄의 `YOUR_USERNAME`을 **본인의 GitHub 사용자명**으로 변경:

```json
"homepage": "https://YOUR_USERNAME.github.io/test"
```

예시:
- GitHub 아이디가 `mywor`라면
- `"homepage": "https://mywor.github.io/test"`

### 3️⃣ Git 저장소 초기화 및 업로드

**PowerShell 또는 명령 프롬프트**를 열고 다음 명령어를 **한 줄씩** 실행:

```bash
cd c:\Users\mywor\Desktop\test
```

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Initial commit: 한글 두더지 잡기 게임"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/YOUR_USERNAME/test.git
```
⚠️ **YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경!**

```bash
git push -u origin main
```

💡 처음 push 시 GitHub 로그인 창이 나타나면 로그인하세요.

### 4️⃣ GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동
   - `https://github.com/YOUR_USERNAME/test`

2. **Settings** 탭 클릭

3. 왼쪽 메뉴에서 **Pages** 클릭

4. **Source** 항목에서:
   - **"GitHub Actions"** 선택

5. **Actions** 탭으로 이동
   - 첫 번째 워크플로우가 실행 중인지 확인
   - 초록색 체크 표시가 나올 때까지 대기 (약 1-2분)

### 5️⃣ 완료! 🎉

배포가 완료되면 다음 주소에서 게임을 플레이할 수 있습니다:

```
https://YOUR_USERNAME.github.io/test/
```

---

## 🔄 코드를 수정한 후 다시 배포하려면?

```bash
cd c:\Users\mywor\Desktop\test
git add .
git commit -m "업데이트 내용 설명"
git push
```

푸시하면 자동으로 배포됩니다!

---

## ❓ 문제가 생겼나요?

### 404 에러가 나요
- `vite.config.ts`의 `base: '/test/'`에서 `/test/`가 저장소 이름과 일치하는지 확인
- 5-10분 정도 기다려보세요 (처음 배포는 시간이 걸릴 수 있습니다)

### Git 명령어가 안 돼요
- Git 설치: https://git-scm.com/downloads
- 설치 후 컴퓨터 재시작 또는 새 터미널 창 열기

### Actions가 실패했어요
1. GitHub 저장소 → Settings → Actions → General
2. "Workflow permissions" 항목에서:
   - **"Read and write permissions"** 선택
3. **"Allow GitHub Actions to create and approve pull requests"** 체크
4. Save 후 다시 푸시

---

## 🎮 이제 친구들과 공유하세요!

배포 완료된 게임 링크를 친구들에게 보내보세요! 📱💻


