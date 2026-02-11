# 기여 가이드

독해력 훈련 웹앱 프로젝트에 기여해주셔서 감사합니다!

## 🤝 기여 방법

### 1. 이슈 제기

버그를 발견하거나 새로운 기능을 제안하고 싶다면:

1. GitHub Issues에서 기존 이슈 확인
2. 없다면 새 이슈 생성
3. 명확한 제목과 설명 작성
4. 가능하면 스크린샷이나 에러 로그 첨부

### 2. 풀 리퀘스트

코드를 직접 수정하고 싶다면:

1. **Fork** 저장소
2. **Clone** 본인의 fork
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/reading-trainer.git
   \`\`\`

3. **브랜치 생성**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   # 또는
   git checkout -b fix/bug-description
   \`\`\`

4. **코드 수정**
   - 코딩 스타일 가이드 준수
   - 타입 안정성 유지
   - 주석 추가 (필요시)

5. **테스트**
   \`\`\`bash
   npm run dev    # 로컬에서 테스트
   npm run build  # 빌드 확인
   npm run lint   # 린트 확인
   \`\`\`

6. **커밋**
   \`\`\`bash
   git add .
   git commit -m "feat: 새로운 기능 추가"
   \`\`\`

7. **푸시**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

8. **Pull Request 생성**
   - GitHub에서 본인의 fork로 이동
   - "New Pull Request" 클릭
   - 변경 사항 설명 작성
   - 관련 이슈 링크 (있다면)

## 📝 커밋 메시지 규칙

### 형식
\`\`\`
<type>: <subject>

<body> (선택사항)
\`\`\`

### Type 종류
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드/설정 변경

### 예시
\`\`\`
feat: 북마크 기능 추가

사용자가 지문을 북마크할 수 있는 기능을 추가했습니다.
- 북마크 버튼 UI 추가
- Supabase에 bookmarks 테이블 생성
- 북마크 목록 페이지 구현
\`\`\`

## 🎨 코딩 스타일

### TypeScript
- 명시적 타입 선언 사용
- `any` 타입 지양
- 인터페이스 우선 (type보다)

\`\`\`typescript
// Good
interface User {
  id: string;
  name: string;
}

// Avoid
const user: any = { id: '1', name: 'John' };
\`\`\`

### React 컴포넌트
- 함수형 컴포넌트 사용
- Props 타입 정의
- 명확한 컴포넌트 이름

\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
\`\`\`

### Tailwind CSS
- 유틸리티 클래스 사용
- 커스텀 CSS는 globals.css에
- 반응형 클래스 활용

\`\`\`tsx
<div className="px-4 py-2 bg-blue-600 hover:bg-blue-700 md:px-6">
  Button
</div>
\`\`\`

### 파일 구조
- 컴포넌트는 `components/` 디렉토리
- 유틸리티는 `lib/` 디렉토리
- 페이지는 `app/` 디렉토리 (App Router)

## 🧪 테스트

현재 테스트 프레임워크는 설정되어 있지 않지만, 추가할 예정입니다.

수동 테스트 체크리스트:
- [ ] 모든 페이지가 로드되는가?
- [ ] CRUD 작업이 정상 작동하는가?
- [ ] 모바일에서 UI가 깨지지 않는가?
- [ ] 다크모드가 정상 작동하는가?
- [ ] 에러 처리가 적절한가?

## 📋 PR 체크리스트

Pull Request를 제출하기 전에:

- [ ] 코드가 정상 작동하는지 테스트
- [ ] 린트 에러가 없는지 확인 (`npm run lint`)
- [ ] 빌드가 성공하는지 확인 (`npm run build`)
- [ ] 커밋 메시지가 규칙을 따르는지 확인
- [ ] 관련 문서를 업데이트했는지 확인
- [ ] PR 설명이 명확한지 확인

## 🐛 버그 리포트

버그를 발견했다면 다음 정보를 포함해주세요:

1. **환경**
   - OS: (예: Windows 11, macOS 14)
   - 브라우저: (예: Chrome 120)
   - Node.js 버전: (예: 18.17.0)

2. **재현 단계**
   1. 메인 페이지 접속
   2. + 버튼 클릭
   3. 지문 입력 후 저장
   4. 에러 발생

3. **예상 동작**
   - 지문이 저장되고 목록에 표시되어야 함

4. **실제 동작**
   - "저장 실패" 에러 메시지 표시

5. **스크린샷/로그**
   - 에러 메시지 스크린샷
   - 브라우저 콘솔 로그

## 💡 기능 제안

새로운 기능을 제안할 때:

1. **문제 정의**
   - 어떤 문제를 해결하는가?
   - 왜 필요한가?

2. **제안 솔루션**
   - 어떻게 구현할 것인가?
   - UI/UX는 어떻게 될 것인가?

3. **대안**
   - 다른 접근 방법은?
   - 장단점은?

4. **추가 컨텍스트**
   - 참고 자료
   - 비슷한 기능의 예시

## 🌟 우선순위

현재 필요한 기여:

### 높음
- [ ] 단위 테스트 추가
- [ ] 접근성 개선 (ARIA 레이블)
- [ ] 에러 처리 강화

### 중간
- [ ] 북마크 기능
- [ ] 지문 수정/삭제 기능
- [ ] 태그 자동완성

### 낮음
- [ ] 다국어 지원
- [ ] 테마 커스터마이징
- [ ] 통계 대시보드

## 📞 문의

질문이나 제안이 있다면:
- GitHub Issues에 질문 등록
- 또는 이메일로 문의

## 🙏 감사합니다!

여러분의 기여가 이 프로젝트를 더 나아지게 만듭니다.

모든 기여자들에게 감사드립니다! ❤️
