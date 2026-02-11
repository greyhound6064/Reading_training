# 배포 가이드

이 문서는 독해력 훈련 웹앱을 GitHub와 Vercel을 통해 배포하는 방법을 안내합니다.

## 사전 준비

- [x] Supabase 프로젝트 설정 완료 (SUPABASE_SETUP.md 참고)
- [x] 로컬에서 앱이 정상 작동하는지 확인
- [ ] GitHub 계정
- [ ] Vercel 계정 (GitHub 계정으로 가입 가능)

## 1단계: GitHub 저장소 생성

### 방법 1: GitHub 웹사이트에서 생성

1. [GitHub](https://github.com) 로그인
2. 우측 상단 "+" 버튼 → "New repository" 클릭
3. 저장소 정보 입력:
   - Repository name: `reading-trainer` (또는 원하는 이름)
   - Description: `독해력 훈련 웹앱`
   - Public 또는 Private 선택
   - **"Initialize this repository with a README" 체크 해제** (이미 README가 있음)
4. "Create repository" 클릭

### 방법 2: GitHub CLI 사용 (선택사항)

\`\`\`bash
gh repo create reading-trainer --public --source=. --remote=origin
\`\`\`

## 2단계: Git 초기화 및 푸시

프로젝트 디렉토리에서 다음 명령어를 실행하세요:

\`\`\`bash
# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 독해력 훈련 웹앱"

# GitHub 저장소 연결 (YOUR_USERNAME을 본인 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/reading-trainer.git

# 기본 브랜치를 main으로 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
\`\`\`

### 푸시 오류 해결

만약 인증 오류가 발생하면:

1. **Personal Access Token 생성**:
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - "Generate new token" → "Generate new token (classic)"
   - Note: `reading-trainer-deploy`
   - Expiration: `90 days` 또는 원하는 기간
   - Scopes: `repo` 전체 선택
   - "Generate token" 클릭
   - **토큰을 복사하여 안전한 곳에 저장** (다시 볼 수 없음)

2. **토큰으로 푸시**:
   \`\`\`bash
   git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/reading-trainer.git
   git push -u origin main
   \`\`\`

## 3단계: Vercel 배포

### 3-1. Vercel 계정 생성

1. [Vercel](https://vercel.com) 방문
2. "Sign Up" 클릭
3. "Continue with GitHub" 선택하여 GitHub 계정으로 가입

### 3-2. 프로젝트 Import

1. Vercel 대시보드에서 "Add New..." → "Project" 클릭
2. "Import Git Repository" 섹션에서 GitHub 저장소 찾기
3. `reading-trainer` 저장소 옆의 "Import" 클릭

### 3-3. 프로젝트 설정

1. **Configure Project** 화면에서:
   - Project Name: `reading-trainer` (자동 입력됨)
   - Framework Preset: `Next.js` (자동 감지됨)
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (기본값)
   - Output Directory: `.next` (기본값)

2. **Environment Variables** 섹션 펼치기

3. 환경 변수 추가:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Supabase Project URL (SUPABASE_SETUP.md 참고)
   
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Supabase Anon Key (SUPABASE_SETUP.md 참고)

4. "Deploy" 버튼 클릭

### 3-4. 배포 완료

- 배포가 진행되며 빌드 로그를 확인할 수 있습니다 (약 1-2분 소요)
- 배포 완료 시 축하 화면과 함께 배포 URL이 표시됩니다
- URL 형식: `https://reading-trainer-xxxxx.vercel.app`

## 4단계: 배포 확인

1. 제공된 URL을 클릭하여 앱 접속
2. 다음 기능들이 정상 작동하는지 확인:
   - [ ] 메인 페이지 로딩
   - [ ] 지문 목록 표시
   - [ ] 새 지문 추가
   - [ ] 지문 상세 페이지
   - [ ] 탭 전환 (원문/분석/어휘)
   - [ ] 다크모드 토글
   - [ ] 폰트 크기 조절
   - [ ] 검색 기능

## 5단계: 커스텀 도메인 연결 (선택사항)

본인의 도메인이 있다면 연결할 수 있습니다:

1. Vercel 프로젝트 → Settings → Domains
2. 도메인 입력 후 "Add" 클릭
3. DNS 설정 안내에 따라 도메인 제공업체에서 설정
4. 검증 완료 후 커스텀 도메인으로 접속 가능

## 자동 배포

이제 GitHub에 코드를 푸시할 때마다 Vercel이 자동으로 배포합니다:

\`\`\`bash
# 코드 수정 후
git add .
git commit -m "기능 추가: ..."
git push
\`\`\`

- `main` 브랜치에 푸시하면 프로덕션 배포
- 다른 브랜치에 푸시하면 프리뷰 배포

## 문제 해결

### 빌드 실패

1. Vercel 대시보드에서 빌드 로그 확인
2. 로컬에서 `npm run build` 실행하여 에러 재현
3. 환경 변수가 올바르게 설정되었는지 확인

### 데이터베이스 연결 오류

1. Vercel → Settings → Environment Variables 확인
2. Supabase URL과 Key가 정확한지 확인
3. Supabase 프로젝트가 활성 상태인지 확인

### 페이지가 로딩되지 않음

1. 브라우저 콘솔(F12)에서 에러 확인
2. Vercel → Deployments → 최신 배포 → "View Function Logs"
3. 네트워크 탭에서 API 요청 상태 확인

## 모니터링

Vercel은 다음 기능을 제공합니다:

- **Analytics**: 방문자 통계, 페이지 뷰
- **Speed Insights**: 페이지 로딩 속도 분석
- **Logs**: 서버 로그 확인

프로젝트 대시보드에서 각 탭을 확인할 수 있습니다.

## 다음 단계

배포가 완료되었습니다! 이제:

1. 친구들과 URL 공유
2. 모바일 기기에서 테스트
3. 피드백을 받아 기능 개선
4. 추가 기능 개발 (북마크, 하이라이트 등)

즐거운 독해 훈련 되세요! 📚
