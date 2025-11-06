# 한글 두더지 잡기 게임 자동 배포 스크립트
# PowerShell에서 실행하세요: .\자동_배포.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "한글 두더지 잡기 게임 자동 배포" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Git 설치 확인
Write-Host "[1/5] Git 설치 확인 중..." -ForegroundColor Yellow
$gitInstalled = Get-Command git -ErrorAction SilentlyContinue

if (-not $gitInstalled) {
    Write-Host "❌ Git이 설치되어 있지 않습니다." -ForegroundColor Red
    Write-Host ""
    Write-Host "Git을 설치하는 방법:" -ForegroundColor Yellow
    Write-Host "1. https://git-scm.com/downloads 접속" -ForegroundColor White
    Write-Host "2. 'Download for Windows' 클릭" -ForegroundColor White
    Write-Host "3. 설치 프로그램 실행 (모든 옵션 기본값)" -ForegroundColor White
    Write-Host "4. 설치 완료 후 컴퓨터 재시작" -ForegroundColor White
    Write-Host "5. 이 스크립트를 다시 실행" -ForegroundColor White
    Write-Host ""
    
    $install = Read-Host "지금 Git 다운로드 페이지를 열까요? (Y/N)"
    if ($install -eq "Y" -or $install -eq "y") {
        Start-Process "https://git-scm.com/downloads"
    }
    
    Write-Host ""
    Write-Host "Git 설치 후 다시 이 스크립트를 실행해주세요!" -ForegroundColor Green
    Read-Host "종료하려면 Enter를 누르세요"
    exit
}

Write-Host "✅ Git이 설치되어 있습니다!" -ForegroundColor Green
Write-Host ""

# Git 사용자 설정
Write-Host "[2/5] Git 사용자 설정 중..." -ForegroundColor Yellow
git config --global user.email "teacherkanghyunjoo@gmail.com"
git config --global user.name "HyunjooK"
Write-Host "✅ Git 사용자 설정 완료!" -ForegroundColor Green
Write-Host ""

# 프로젝트 디렉토리 확인
Write-Host "[3/5] 프로젝트 디렉토리 확인 중..." -ForegroundColor Yellow
$currentDir = Get-Location
Write-Host "현재 디렉토리: $currentDir" -ForegroundColor White

# Git 저장소 초기화
Write-Host ""
Write-Host "[4/5] Git 저장소 초기화 중..." -ForegroundColor Yellow

if (Test-Path ".git") {
    Write-Host "⚠️  이미 Git 저장소가 초기화되어 있습니다." -ForegroundColor Yellow
} else {
    git init
    Write-Host "✅ Git 저장소 초기화 완료!" -ForegroundColor Green
}

# 원격 저장소 설정
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "⚠️  원격 저장소가 이미 설정되어 있습니다: $remoteExists" -ForegroundColor Yellow
} else {
    git remote add origin https://github.com/HyunjooK/molegame.git
    Write-Host "✅ 원격 저장소 설정 완료!" -ForegroundColor Green
}

Write-Host ""

# 파일 추가 및 커밋
Write-Host "[5/5] 파일 추가 및 커밋 중..." -ForegroundColor Yellow
git add .
git commit -m "Initial commit: 한글 두더지 잡기 게임"

# 브랜치 설정
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    git branch -M main
}

Write-Host "✅ 커밋 완료!" -ForegroundColor Green
Write-Host ""

# GitHub 푸시
Write-Host "================================" -ForegroundColor Cyan
Write-Host "GitHub에 업로드 중..." -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  GitHub 로그인 창이 나타날 수 있습니다!" -ForegroundColor Yellow
Write-Host "   계정: teacherkanghyunjoo@gmail.com" -ForegroundColor White
Write-Host ""

try {
    git push -u origin main
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    Write-Host "🎉 배포 완료!" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "다음 단계:" -ForegroundColor Yellow
    Write-Host "1. 브라우저에서 https://github.com/HyunjooK/molegame 접속" -ForegroundColor White
    Write-Host "2. Settings → Pages 클릭" -ForegroundColor White
    Write-Host "3. Source를 'GitHub Actions'로 변경" -ForegroundColor White
    Write-Host "4. 1-2분 대기" -ForegroundColor White
    Write-Host ""
    Write-Host "게임 주소: https://HyunjooK.github.io/molegame/" -ForegroundColor Cyan
    Write-Host ""
    
    $openGitHub = Read-Host "지금 GitHub 저장소를 열까요? (Y/N)"
    if ($openGitHub -eq "Y" -or $openGitHub -eq "y") {
        Start-Process "https://github.com/HyunjooK/molegame/settings/pages"
    }
    
} catch {
    Write-Host ""
    Write-Host "❌ 업로드 중 오류가 발생했습니다." -ForegroundColor Red
    Write-Host ""
    Write-Host "오류 내용:" -ForegroundColor Yellow
    Write-Host $_.Exception.Message -ForegroundColor White
    Write-Host ""
    Write-Host "해결 방법:" -ForegroundColor Yellow
    Write-Host "1. GitHub에 로그인되어 있는지 확인" -ForegroundColor White
    Write-Host "2. 저장소가 비어있는지 확인 (https://github.com/HyunjooK/molegame)" -ForegroundColor White
    Write-Host "3. 인터넷 연결 확인" -ForegroundColor White
}

Write-Host ""
Read-Host "종료하려면 Enter를 누르세요"

