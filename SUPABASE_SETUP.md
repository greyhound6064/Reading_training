# Supabase 설정 가이드

이 문서는 독해력 훈련 웹앱을 위한 Supabase 데이터베이스 설정 방법을 안내합니다.

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 웹사이트 방문
2. "Start your project" 클릭하여 회원가입/로그인
3. "New Project" 버튼 클릭
4. 프로젝트 정보 입력:
   - Name: `reading-trainer` (또는 원하는 이름)
   - Database Password: 안전한 비밀번호 생성
   - Region: `Northeast Asia (Seoul)` 선택 (한국에서 가장 빠름)
   - Pricing Plan: `Free` 선택
5. "Create new project" 클릭

## 2. 데이터베이스 스키마 생성

프로젝트가 생성되면 다음 단계를 진행하세요:

1. 좌측 메뉴에서 **SQL Editor** 클릭
2. "New query" 버튼 클릭
3. 아래 SQL 코드를 복사하여 붙여넣기:

\`\`\`sql
-- reading_passages 테이블 생성
CREATE TABLE reading_passages (
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

-- 검색 성능 최적화를 위한 인덱스 생성
CREATE INDEX idx_reading_passages_title ON reading_passages(title);
CREATE INDEX idx_reading_passages_tags ON reading_passages USING GIN(tags);
CREATE INDEX idx_reading_passages_created_at ON reading_passages(created_at DESC);

-- 테스트 데이터 삽입 (선택사항)
INSERT INTO reading_passages (title, tags, original_text, analysis_text, vocabulary_text)
VALUES (
  '2023학년도 수능 - 과학',
  ARRAY['수능', '과학', '물리'],
  '물체의 운동을 설명하는 뉴턴의 운동 법칙은 고전 역학의 기초를 이룬다. 첫 번째 법칙인 관성의 법칙은 외부 힘이 작용하지 않으면 정지한 물체는 계속 정지해 있고, 운동하는 물체는 등속 직선 운동을 계속한다는 것이다.

두 번째 법칙은 힘과 가속도의 관계를 나타낸다. 물체에 작용하는 힘은 물체의 질량과 가속도의 곱과 같다. 이를 수식으로 나타내면 F=ma이다.

세 번째 법칙은 작용-반작용의 법칙이다. 한 물체가 다른 물체에 힘을 가하면, 다른 물체도 같은 크기의 힘을 반대 방향으로 가한다.',
  '이 지문은 뉴턴의 운동 법칙 세 가지를 순서대로 설명하고 있습니다.

첫 번째 단락: 관성의 법칙 - 외부 힘이 없으면 운동 상태가 유지됨
두 번째 단락: 가속도의 법칙 - F=ma 공식으로 표현
세 번째 단락: 작용-반작용의 법칙 - 힘은 항상 쌍으로 작용

각 법칙의 의미와 적용 사례를 이해하는 것이 중요합니다.',
  '관성: 물체가 현재의 운동 상태를 유지하려는 성질
등속 직선 운동: 일정한 속도로 직선으로 움직이는 운동
가속도: 속도가 변하는 정도
작용-반작용: 두 물체 사이에 작용하는 힘의 쌍'
);
\`\`\`

4. "Run" 버튼 클릭하여 실행
5. 성공 메시지 확인

## 3. API 키 확인

1. 좌측 메뉴에서 **Project Settings** (톱니바퀴 아이콘) 클릭
2. **API** 섹션 선택
3. 다음 두 값을 복사:
   - **Project URL**: `https://xxxxx.supabase.co` 형태
   - **anon public** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` 형태

## 4. 환경 변수 설정

프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 다음 내용을 입력하세요:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=여기에_Project_URL_붙여넣기
NEXT_PUBLIC_SUPABASE_ANON_KEY=여기에_anon_public_key_붙여넣기
\`\`\`

예시:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MTk5NTU3NjAwMH0.abcdefghijklmnopqrstuvwxyz1234567890
\`\`\`

## 5. 테스트

1. 개발 서버 실행:
   \`\`\`bash
   npm run dev
   \`\`\`

2. 브라우저에서 `http://localhost:3000` 접속

3. 테스트 데이터를 삽입했다면 메인 페이지에 지문이 표시되어야 합니다.

4. 우측 하단 + 버튼을 클릭하여 새 지문을 추가해보세요.

## 문제 해결

### 연결 오류가 발생하는 경우

1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 환경 변수 이름이 정확한지 확인 (`NEXT_PUBLIC_` 접두사 필수)
3. Supabase 프로젝트가 활성 상태인지 확인
4. 개발 서버를 재시작 (`Ctrl+C` 후 `npm run dev`)

### 데이터가 표시되지 않는 경우

1. Supabase 대시보드 → Table Editor에서 `reading_passages` 테이블 확인
2. 브라우저 콘솔(F12)에서 에러 메시지 확인
3. SQL Editor에서 직접 쿼리 실행: `SELECT * FROM reading_passages;`

## 추가 설정 (선택사항)

### Row Level Security (RLS) 비활성화

현재 앱은 단일 사용자용이므로 RLS를 비활성화해도 됩니다:

1. Table Editor → reading_passages 테이블 선택
2. 우측 상단 "..." 메뉴 → "Edit table" 클릭
3. "Enable Row Level Security" 체크 해제

나중에 다중 사용자 지원이 필요하면 RLS를 활성화하고 정책을 설정하세요.

## 다음 단계

Supabase 설정이 완료되었습니다! 이제 앱을 사용하여 지문을 추가하고 독해 훈련을 시작할 수 있습니다.

배포가 필요하면 `README.md`의 "배포" 섹션을 참고하세요.
