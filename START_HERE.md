# 🚀 시작하기 전에 - 필수 설치 프로그램

GitHub에 배포하기 위해 다음 프로그램들을 먼저 설치해야 합니다.

## 📦 필수 설치 항목

### 1. Node.js 설치 ⭐ (필수)

Node.js는 React 앱을 빌드하고 실행하는 데 필요합니다.

**설치 방법:**
1. https://nodejs.org/ 접속
2. **LTS 버전** (왼쪽, 추천 버전) 다운로드
3. 설치 프로그램 실행 → 기본 설정으로 진행
4. 설치 완료 후 **컴퓨터 재시작**

**설치 확인:**
새 PowerShell 또는 명령 프롬프트를 열고:
```bash
node --version
npm --version
```
버전이 표시되면 성공!

---

### 2. Git 설치 ⭐ (필수)

Git은 코드를 GitHub에 업로드하는 데 필요합니다.

**설치 방법:**
1. https://git-scm.com/downloads 접속
2. **Windows용 Git** 다운로드
3. 설치 프로그램 실행 → **기본 설정으로 진행** (모두 Next 클릭)
4. 설치 완료 후 **컴퓨터 재시작**

**설치 확인:**
새 PowerShell 또는 명령 프롬프트를 열고:
```bash
git --version
```
버전이 표시되면 성공!

---

### 3. GitHub 계정 생성 ⭐ (필수)

아직 GitHub 계정이 없다면:

1. https://github.com/signup 접속
2. 무료 계정 생성
3. 이메일 인증 완료

---

## ✅ 모두 설치 완료 후

1. **컴퓨터 재시작** (중요!)

2. **PowerShell** 또는 **명령 프롬프트**를 열고:

```bash
cd c:\Users\mywor\Desktop\test
```

3. 다음 파일을 참고하여 배포:
   - **QUICK_DEPLOY.md** ← 🌟 여기부터 시작! (빠른 배포 가이드)
   - DEPLOY.md ← 상세 가이드

---

## 🎯 빠른 체크리스트

설치가 완료되었는지 확인:

```bash
# PowerShell 또는 명령 프롬프트에서 실행
node --version
npm --version
git --version
```

✅ 세 가지 모두 버전이 표시되면 배포 준비 완료!

---

## 💡 설치 팁

### PowerShell이 명령어를 인식 못 하는 경우:
1. 컴퓨터를 재시작하세요
2. **새로운 PowerShell 창**을 열어보세요
3. 환경 변수를 수동으로 새로고침:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

### Winget으로 빠르게 설치 (Windows 11):
```powershell
# 관리자 권한으로 PowerShell 실행 후
winget install OpenJS.NodeJS.LTS
winget install Git.Git
```

---

## 📞 다음 단계

설치가 모두 완료되면:
👉 **QUICK_DEPLOY.md** 파일을 열어서 배포를 진행하세요!

---

## ❓ 도움이 필요하면

문제가 발생하면:
1. 컴퓨터를 재시작했는지 확인
2. 새 터미널 창을 열었는지 확인
3. 설치 프로그램을 관리자 권한으로 실행해보세요


