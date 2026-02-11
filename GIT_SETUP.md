# Git 설정 가이드

프로젝트를 GitHub에 업로드하기 위한 Git 설정 방법입니다.

## 방법 1: VS Code 터미널 사용 (권장)

1. VS Code에서 프로젝트 폴더 열기
2. 터미널 열기 (Ctrl + `)
3. 다음 명령어 순서대로 실행:

\`\`\`bash
# Git 초기화
git init

# 모든 파일 스테이징
git add .

# 첫 커밋
git commit -m "Initial commit: 독해력 훈련 웹앱"
\`\`\`

## 방법 2: Git Bash 사용

1. 프로젝트 폴더에서 우클릭
2. "Git Bash Here" 선택
3. 위의 명령어들 실행

## GitHub 저장소 연결

### 1. GitHub에서 새 저장소 생성

1. GitHub 로그인
2. 우측 상단 "+" → "New repository"
3. Repository name: `reading-trainer`
4. **"Initialize this repository with a README" 체크 해제**
5. "Create repository" 클릭

### 2. 로컬 저장소와 연결

GitHub에서 생성한 저장소 페이지에 표시된 명령어를 사용하거나, 아래 명령어를 실행하세요:

\`\`\`bash
# YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경
git remote add origin https://github.com/YOUR_USERNAME/reading-trainer.git

# 기본 브랜치를 main으로 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
\`\`\`

### 인증 방법

#### Personal Access Token 사용 (권장)

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token (classic)" 클릭
3. Note: `reading-trainer`
4. Scopes: `repo` 선택
5. "Generate token" 클릭
6. 토큰 복사 (다시 볼 수 없으니 안전한 곳에 저장)

7. 푸시 시 인증:
   - Username: GitHub 사용자명
   - Password: 복사한 토큰

#### 또는 SSH 사용

\`\`\`bash
# SSH 키 생성 (이미 있다면 생략)
ssh-keygen -t ed25519 -C "your_email@example.com"

# SSH 키를 GitHub에 등록
# 1. 생성된 공개키 복사
cat ~/.ssh/id_ed25519.pub

# 2. GitHub → Settings → SSH and GPG keys → New SSH key
# 3. 복사한 키 붙여넣기

# SSH URL로 remote 변경
git remote set-url origin git@github.com:YOUR_USERNAME/reading-trainer.git

# 푸시
git push -u origin main
\`\`\`

## 다음 단계

Git 설정이 완료되면 `DEPLOYMENT.md` 파일을 참고하여 Vercel 배포를 진행하세요.

## 자주 사용하는 Git 명령어

\`\`\`bash
# 현재 상태 확인
git status

# 변경사항 스테이징
git add .

# 커밋
git commit -m "커밋 메시지"

# GitHub에 푸시
git push

# 최신 변경사항 가져오기
git pull

# 브랜치 생성 및 전환
git checkout -b feature/new-feature

# 브랜치 목록 확인
git branch
\`\`\`

## 문제 해결

### "fatal: not a git repository"

프로젝트 디렉토리에서 `git init`을 실행하세요.

### "failed to push some refs"

원격 저장소에 로컬에 없는 커밋이 있는 경우:

\`\`\`bash
git pull origin main --rebase
git push origin main
\`\`\`

### 인증 실패

1. Personal Access Token을 사용하고 있는지 확인
2. 토큰에 `repo` 권한이 있는지 확인
3. 토큰이 만료되지 않았는지 확인

### 한글 파일명 깨짐

\`\`\`bash
git config --global core.quotepath false
\`\`\`
