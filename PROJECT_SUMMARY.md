# 프로젝트 요약

## 📱 독해력 훈련 웹앱

모바일 최적화된 독해력 향상 학습 플랫폼

---

## 🎯 프로젝트 개요

### 목적
여러 지문을 체계적으로 관리하고, 원문·분석·어휘를 효율적으로 학습하여 독해력을 향상시키는 웹 애플리케이션

### 주요 사용자
독해 능력 향상을 원하는 학생 및 학습자 (모바일/태블릿 환경)

---

## ✨ 핵심 기능

### 1. 데이터 입력
- 지문 제목(출처) 입력
- 태그 입력 (쉼표 구분)
- 원문, 분석 내용, 어휘 보충 입력
- 필수 필드 검증

### 2. 데이터 관리
- 커뮤니티 게시판 스타일 목록
- 제목 및 태그 검색
- 최신순/오래된순 정렬
- 태그 필터링

### 3. 독해 최적화
- **탭 전환**: 원문/분석/어휘 간 쉬운 전환
- **가독성**: Noto Sans KR, 최적 줄간격(1.8-2.0), 최대 너비 680px
- **다크모드**: 눈의 피로 감소
- **폰트 조절**: 14px~22px 사용자 맞춤
- **반응형**: 모바일/태블릿/데스크톱 최적화

---

## 🏗️ 기술 스택

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 14 | React 프레임워크 (App Router) |
| TypeScript | 5.3+ | 타입 안정성 |
| Tailwind CSS | 3.4+ | 유틸리티 CSS |
| Zustand | 4.5+ | 상태 관리 (다크모드, 폰트) |

### Backend & Database
| 기술 | 용도 |
|------|------|
| Supabase | PostgreSQL 데이터베이스 |
| @supabase/supabase-js | 클라이언트 라이브러리 |

### Deployment
| 플랫폼 | 용도 |
|--------|------|
| GitHub | 버전 관리 |
| Vercel | 호스팅 및 자동 배포 |

---

## 📁 프로젝트 구조

\`\`\`
독해훈련/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃 (폰트, 메타데이터)
│   ├── page.tsx                 # 메인 페이지 (지문 목록)
│   ├── globals.css              # 전역 스타일 (독해 최적화)
│   ├── passage/[id]/page.tsx   # 지문 상세 페이지
│   └── input/page.tsx           # 지문 입력 페이지
│
├── components/                   # React 컴포넌트
│   ├── SearchBar.tsx            # 검색 및 정렬
│   ├── PassageList.tsx          # 지문 목록 (데이터 페칭)
│   ├── PassageCard.tsx          # 지문 카드 (목록 아이템)
│   ├── PassageForm.tsx          # 지문 입력 폼
│   └── PassageReader/           # 독해 전용 컴포넌트
│       ├── ReaderHeader.tsx    # 헤더 (탭, 다크모드, 폰트)
│       └── ReaderContent.tsx   # 본문 표시
│
├── lib/                          # 유틸리티 & 설정
│   ├── supabase.ts              # Supabase 클라이언트 & API
│   ├── types.ts                 # TypeScript 타입 정의
│   └── store.ts                 # Zustand 스토어 (설정)
│
├── public/                       # 정적 파일
│
├── 설정 파일
│   ├── package.json             # 의존성 관리
│   ├── tsconfig.json            # TypeScript 설정
│   ├── tailwind.config.ts       # Tailwind 설정
│   ├── next.config.js           # Next.js 설정
│   └── .env.local.example       # 환경 변수 예시
│
└── 문서
    ├── README.md                # 프로젝트 개요
    ├── QUICKSTART.md            # 5분 시작 가이드
    ├── SUPABASE_SETUP.md        # Supabase 설정
    ├── GIT_SETUP.md             # Git 설정
    ├── DEPLOYMENT.md            # 배포 가이드
    └── PROJECT_SUMMARY.md       # 이 문서
\`\`\`

---

## 🗄️ 데이터베이스 스키마

### reading_passages 테이블

| 컬럼 | 타입 | 제약 | 설명 |
|------|------|------|------|
| id | UUID | PK | 자동 생성 ID |
| title | VARCHAR(255) | NOT NULL | 지문 제목/출처 |
| source | VARCHAR(255) | - | 출처 상세 |
| type | VARCHAR(100) | - | 지문 유형 |
| tags | TEXT[] | - | 태그 배열 |
| original_text | TEXT | NOT NULL | 원문 |
| analysis_text | TEXT | - | 분석 내용 |
| vocabulary_text | TEXT | - | 어휘 보충 |
| created_at | TIMESTAMP | DEFAULT NOW() | 생성 시간 |
| updated_at | TIMESTAMP | DEFAULT NOW() | 수정 시간 |

### 인덱스
- `idx_reading_passages_title`: 제목 검색 최적화
- `idx_reading_passages_tags`: 태그 검색 최적화 (GIN)
- `idx_reading_passages_created_at`: 정렬 최적화

---

## 🎨 UI/UX 설계

### 디자인 원칙
1. **모바일 우선**: 320px부터 반응형
2. **가독성 최우선**: 독해에 최적화된 타이포그래피
3. **접근성**: 44x44px 터치 영역, 명확한 대비
4. **일관성**: 통일된 컴포넌트 스타일

### 색상 팔레트

#### 라이트 모드
- 배경: `#FAFAFA`
- 텍스트: `#1A1A1A`
- 강조: `#2563EB` (Blue 600)

#### 다크 모드
- 배경: `#1E1E1E`
- 텍스트: `#E0E0E0`
- 강조: `#3B82F6` (Blue 500)

### 타이포그래피
- **폰트**: Noto Sans KR
- **크기**: 16px (모바일), 18px (태블릿)
- **줄간격**: 1.8-2.0
- **자간**: 0.02em
- **문단 간격**: 1.5em

### 반응형 브레이크포인트
- 모바일: 320px ~ 767px
- 태블릿: 768px ~ 1023px
- 데스크톱: 1024px+

---

## 🔄 데이터 흐름

\`\`\`
사용자 입력
    ↓
PassageForm (검증)
    ↓
createPassage() → Supabase INSERT
    ↓
리다이렉트 → 메인 페이지
    ↓
PassageList → getPassages() → Supabase SELECT
    ↓
PassageCard 렌더링
    ↓
클릭 → 상세 페이지
    ↓
getPassage(id) → Supabase SELECT
    ↓
ReaderHeader + ReaderContent 렌더링
\`\`\`

---

## 📊 주요 API 함수

### lib/supabase.ts

| 함수 | 설명 | 파라미터 | 반환 |
|------|------|----------|------|
| getPassages | 지문 목록 조회 | searchQuery?, sortOrder? | Passage[] |
| getPassage | 단일 지문 조회 | id | Passage \| null |
| createPassage | 지문 생성 | passage | Passage |
| updatePassage | 지문 수정 | id, passage | Passage |
| deletePassage | 지문 삭제 | id | void |

---

## 🚀 배포 프로세스

1. **개발**: 로컬에서 `npm run dev`
2. **Git**: 코드를 GitHub에 푸시
3. **Vercel**: GitHub 연동 후 자동 배포
4. **환경 변수**: Vercel에서 Supabase 키 설정
5. **완료**: `https://your-app.vercel.app` 접속

---

## 📈 성능 최적화

- ✅ Next.js App Router의 서버 컴포넌트 활용
- ✅ 클라이언트 컴포넌트 최소화
- ✅ Supabase 인덱스로 쿼리 최적화
- ✅ 이미지 없는 텍스트 중심 (빠른 로딩)
- ✅ 로컬 스토리지로 설정 캐싱
- ✅ 코드 스플리팅 (Next.js 자동)

---

## 🔮 향후 확장 가능성

### Phase 2 (추가 기능)
- [ ] 북마크 기능
- [ ] 형광펜/하이라이트
- [ ] 메모 기능
- [ ] 학습 진행도 추적

### Phase 3 (다중 사용자)
- [ ] Supabase Auth 통합
- [ ] 사용자별 데이터 분리
- [ ] 공유 기능

### Phase 4 (고급 기능)
- [ ] AI 기반 지문 분석
- [ ] 독해 테스트 생성
- [ ] 학습 통계 대시보드

---

## 📝 라이선스

MIT License

---

## 👨‍💻 개발 정보

- **개발 기간**: 2024
- **개발 환경**: Windows, VS Code
- **테스트 환경**: Chrome, Safari (모바일)

---

## 📞 지원

문제가 발생하면 다음 문서를 참고하세요:
- 빠른 시작: `QUICKSTART.md`
- Supabase 설정: `SUPABASE_SETUP.md`
- 배포: `DEPLOYMENT.md`
- Git 설정: `GIT_SETUP.md`

---

**Happy Reading! 📚**
