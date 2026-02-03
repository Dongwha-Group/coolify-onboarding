# Coolify Onboarding 프로젝트

## 개요

Coolify 온보딩을 위한 Next.js 웹 애플리케이션 프로젝트입니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint
```

## 프로젝트 구조

```
src/
├── app/           # Next.js App Router 페이지
│   ├── layout.tsx # 루트 레이아웃
│   ├── page.tsx   # 메인 페이지
│   └── globals.css
└── ...
```

## 규칙 파일

이 프로젝트는 `.claude/rules/` 디렉토리에 모듈화된 규칙 파일들을 포함합니다:

- **design-system.md**: 동화 디자인 시스템 가이드
- **git-commit.md**: Git Commit 컨벤션

Claude Code는 세션 시작 시 이 파일들을 자동으로 로드합니다.
