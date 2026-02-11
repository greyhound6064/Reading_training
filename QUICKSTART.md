# 빠른 시작 가이드

독해력 훈련 웹앱을 5분 안에 시작하는 방법입니다.

## 📋 체크리스트

- [ ] Node.js 18+ 설치
- [ ] npm 또는 yarn 설치
- [ ] Supabase 계정
- [ ] 코드 에디터 (VS Code 권장)

## 🚀 5분 설정

### 1단계: 의존성 설치 (1분)

\`\`\`bash
npm install
\`\`\`

### 2단계: Supabase 설정 (2분)

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. SQL Editor에서 다음 실행:

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

### 3단계: 환경 변수 설정 (1분)

`.env.local` 파일 생성:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
\`\`\`

### 4단계: 실행 (1분)

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## ✅ 완료!

이제 다음을 할 수 있습니다:

- 우측 하단 + 버튼으로 지문 추가
- 지문 클릭하여 독해 시작
- 탭으로 원문/분석/어휘 전환
- 다크모드 및 폰트 크기 조절

## 📚 더 알아보기

- 상세 설정: `SUPABASE_SETUP.md`
- 배포 방법: `DEPLOYMENT.md`
- Git 설정: `GIT_SETUP.md`

## 🆘 문제 발생 시

1. `npm install` 실패 → Node.js 버전 확인 (18+)
2. 데이터베이스 연결 오류 → `.env.local` 확인
3. 빌드 오류 → `node_modules` 삭제 후 재설치

\`\`\`bash
rm -rf node_modules
npm install
\`\`\`

즐거운 독해 훈련 되세요! 📖
