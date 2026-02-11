# 설치 가이드

독해력 훈련 웹앱의 전체 설치 및 실행 가이드입니다.

## 📋 시스템 요구사항

### 필수
- **Node.js**: 18.0.0 이상
- **npm**: 9.0.0 이상 (Node.js와 함께 설치됨)
- **Git**: 최신 버전
- **브라우저**: Chrome, Safari, Firefox, Edge (최신 버전)

### 권장
- **VS Code**: 코드 편집기
- **Git Bash** (Windows): Git 명령어 실행

## 🔍 설치 확인

터미널에서 다음 명령어로 버전을 확인하세요:

\`\`\`bash
node --version    # v18.0.0 이상이어야 함
npm --version     # v9.0.0 이상이어야 함
git --version     # 설치 확인
\`\`\`

## 📦 1단계: 의존성 설치

프로젝트 디렉토리에서:

\`\`\`bash
npm install
\`\`\`

### 설치되는 주요 패키지

#### 프로덕션 의존성
- `next@^14.2.0` - React 프레임워크
- `react@^18.3.1` - UI 라이브러리
- `@supabase/supabase-js@^2.39.0` - 데이터베이스 클라이언트
- `zustand@^4.5.0` - 상태 관리

#### 개발 의존성
- `typescript@^5.3.3` - 타입 시스템
- `tailwindcss@^3.4.1` - CSS 프레임워크
- `eslint@^8.56.0` - 코드 품질 도구

### 설치 문제 해결

#### "EACCES" 권한 오류
\`\`\`bash
# Windows
npm install --legacy-peer-deps

# Mac/Linux
sudo npm install
\`\`\`

#### "Cannot find module" 오류
\`\`\`bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
\`\`\`

#### 네트워크 오류
\`\`\`bash
# npm 레지스트리 변경
npm config set registry https://registry.npmjs.org/
npm install
\`\`\`

## 🗄️ 2단계: Supabase 설정

자세한 내용은 `SUPABASE_SETUP.md`를 참고하세요.

### 간단 요약

1. [Supabase](https://supabase.com) 가입 및 프로젝트 생성
2. SQL Editor에서 스키마 실행:

\`\`\`sql
CREATE TABLE reading_passages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  tags TEXT[],
  original_text TEXT NOT NULL,
  analysis_text TEXT,
  vocabulary_text TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reading_passages_title ON reading_passages(title);
CREATE INDEX idx_reading_passages_tags ON reading_passages USING GIN(tags);
CREATE INDEX idx_reading_passages_created_at ON reading_passages(created_at DESC);
\`\`\`

3. Project Settings → API에서 URL과 Key 복사

## 🔐 3단계: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

\`\`\`bash
# Windows
copy .env.local.example .env.local

# Mac/Linux
cp .env.local.example .env.local
\`\`\`

`.env.local` 파일 편집:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

### 환경 변수 확인

\`\`\`bash
# Windows PowerShell
Get-Content .env.local

# Mac/Linux/Git Bash
cat .env.local
\`\`\`

## 🚀 4단계: 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

출력 예시:
\`\`\`
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.3s
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## ✅ 5단계: 동작 확인

### 체크리스트

- [ ] 메인 페이지가 로드됨
- [ ] 우측 하단에 + 버튼이 보임
- [ ] + 버튼 클릭 시 입력 페이지로 이동
- [ ] 지문 입력 및 저장 가능
- [ ] 저장 후 목록에 표시됨
- [ ] 지문 클릭 시 상세 페이지 표시
- [ ] 탭 전환 (원문/분석/어휘) 작동
- [ ] 다크모드 토글 작동
- [ ] 폰트 크기 조절 작동

### 문제 발생 시

#### 페이지가 로드되지 않음
1. 터미널에서 에러 메시지 확인
2. `.env.local` 파일 존재 및 내용 확인
3. 포트 3000이 이미 사용 중인지 확인

\`\`\`bash
# 다른 포트로 실행
PORT=3001 npm run dev
\`\`\`

#### 데이터베이스 연결 오류
1. Supabase 프로젝트가 활성 상태인지 확인
2. `.env.local`의 URL과 Key가 정확한지 확인
3. 브라우저 콘솔(F12)에서 에러 확인

#### 빌드 오류
\`\`\`bash
# 캐시 삭제 후 재시작
rm -rf .next
npm run dev
\`\`\`

## 📱 6단계: 모바일 테스트

### 로컬 네트워크에서 접속

1. 개발 서버 실행 중인 상태에서 IP 주소 확인:

\`\`\`bash
# Windows
ipconfig

# Mac/Linux
ifconfig
\`\`\`

2. 모바일 기기에서 접속:
   - 같은 Wi-Fi 네트워크에 연결
   - 브라우저에서 `http://YOUR_IP:3000` 입력
   - 예: `http://192.168.0.10:3000`

### 반응형 테스트 (브라우저)

1. 브라우저 개발자 도구 열기 (F12)
2. 디바이스 툴바 토글 (Ctrl+Shift+M)
3. 다양한 기기 크기로 테스트:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

## 🔧 추가 명령어

### 프로덕션 빌드
\`\`\`bash
npm run build
npm start
\`\`\`

### 린트 실행
\`\`\`bash
npm run lint
\`\`\`

### 타입 체크
\`\`\`bash
npx tsc --noEmit
\`\`\`

## 📚 다음 단계

설치가 완료되었습니다! 이제:

1. **사용 시작**: 지문을 추가하고 독해 훈련 시작
2. **Git 설정**: `GIT_SETUP.md` 참고하여 버전 관리
3. **배포**: `DEPLOYMENT.md` 참고하여 Vercel에 배포

## 🆘 추가 도움말

- **빠른 시작**: `QUICKSTART.md`
- **Supabase 상세**: `SUPABASE_SETUP.md`
- **배포 가이드**: `DEPLOYMENT.md`
- **프로젝트 구조**: `PROJECT_SUMMARY.md`

## 💡 팁

1. **Hot Reload**: 코드 수정 시 자동으로 새로고침됨
2. **에러 표시**: 브라우저에 에러 오버레이가 표시됨
3. **콘솔 확인**: 터미널과 브라우저 콘솔 모두 확인
4. **포트 변경**: 필요시 `package.json`의 dev 스크립트 수정

\`\`\`json
"scripts": {
  "dev": "next dev -p 3001"
}
\`\`\`

---

설치 과정에서 문제가 발생하면 각 단계를 다시 확인하고, 에러 메시지를 주의 깊게 읽어보세요.

**Happy Coding! 💻**
