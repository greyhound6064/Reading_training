# 독해력 훈련 웹앱

독해력 향상을 위한 지문 학습 플랫폼입니다. 여러 지문을 체계적으로 관리하고, 원문·분석·어휘를 효율적으로 학습할 수 있습니다.

## 주요 기능

- **지문 관리**: 지문 추가, 수정, 삭제
- **독해 최적화**: 모바일/태블릿 환경에 최적화된 가독성
- **검색 & 필터**: 제목, 태그로 지문 검색 및 정렬
- **다크모드**: 눈의 피로를 줄이는 다크모드 지원
- **폰트 조절**: 사용자 맞춤 폰트 크기 조절 (14px~22px)
- **탭 전환**: 원문, 분석, 어휘를 쉽게 전환하며 학습

## 기술 스택

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 시작하기

### 1. 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. SQL Editor에서 다음 스키마 실행:

\`\`\`sql
CREATE TABLE passages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  source VARCHAR(255),
  type VARCHAR(100),
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

### 3. 환경 변수 설정

\`.env.local\` 파일을 생성하고 Supabase 정보를 입력하세요:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### 4. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

\`\`\`
독해훈련/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지 (지문 목록)
│   ├── passage/[id]/      # 지문 상세 페이지
│   └── input/             # 지문 입력 페이지
├── components/            # React 컴포넌트
│   ├── PassageList.tsx
│   ├── PassageCard.tsx
│   ├── PassageForm.tsx
│   ├── SearchBar.tsx
│   └── PassageReader/     # 독해 전용 컴포넌트
├── lib/                   # 유틸리티 & 설정
│   ├── supabase.ts       # Supabase 클라이언트
│   ├── types.ts          # TypeScript 타입
│   └── store.ts          # Zustand 상태 관리
└── styles/               # 전역 스타일
\`\`\`

## 배포

### Vercel 배포

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 import
3. 환경 변수 설정 (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
4. 배포 완료!

## 사용 방법

1. **지문 추가**: 우측 하단 + 버튼 클릭
2. **지문 검색**: 상단 검색바에서 제목 또는 태그 검색
3. **지문 읽기**: 지문 카드 클릭 → 탭으로 원문/분석/어휘 전환
4. **설정 조절**: 상단 우측에서 폰트 크기 및 다크모드 조절

## 라이선스

MIT License
