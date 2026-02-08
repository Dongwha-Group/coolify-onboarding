# AX 스타터 킷

AX 팀의 개발 온보딩 허브. 기술 스택, 아키텍처, 개발 환경, 배포 파이프라인을 안내하는 Next.js 웹 애플리케이션입니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Pretendard (동화 디자인 시스템)
- **Package Manager**: npm

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── get-started/
│       └── page.tsx        # Get Started 페이지
├── components/
│   ├── GNB.tsx             # 글로벌 내비게이션 바
│   ├── Hero.tsx            # 히어로 섹션
│   ├── GetStarted.tsx      # Claude 룰 설치 가이드
│   ├── SetupGuide.tsx      # 개발 환경 설정 가이드
│   ├── Footer.tsx          # 푸터
│   └── ...
scripts/
├── init-claude.mjs         # Claude 룰 스캐폴드 CLI
└── templates/
    ├── CLAUDE.md.tpl       # CLAUDE.md 템플릿
    └── rules/              # 규칙 파일 템플릿
```

## Claude 룰 스캐폴드

프로젝트에 AX 팀의 Claude 룰(`CLAUDE.md`, `.claude/rules/`)을 설치하는 CLI 스크립트를 제공합니다.

### Bash (macOS / Linux)

```bash
curl -fsSL https://raw.githubusercontent.com/Dongwha-Group/coolify-onboarding/main/scripts/init-claude.mjs -o init-claude.mjs && node init-claude.mjs
```

### PowerShell (Windows)

```powershell
curl.exe -fsSL https://raw.githubusercontent.com/Dongwha-Group/coolify-onboarding/main/scripts/init-claude.mjs -o init-claude.mjs; node init-claude.mjs
```

### 사전 요구사항

- Node.js 18+
- curl (Windows 10+, macOS, Linux 기본 내장)

### 생성되는 파일

```
your-project/
├── CLAUDE.md
└── .claude/
    └── rules/
        ├── design-system.md
        └── git-commit.md
```
