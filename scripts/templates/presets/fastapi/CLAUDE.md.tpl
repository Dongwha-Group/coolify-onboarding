# {{PROJECT_NAME}}

## 개요

{{PROJECT_DESCRIPTION}}

## 기술 스택

{{TECH_STACK}}

## 주요 명령어

```bash
# 개발 서버 실행
{{DEV_COMMAND}}

# 프로덕션 빌드
{{BUILD_COMMAND}}
```

## 프로젝트 구조

```
{{PROJECT_NAME}}/
├── CLAUDE.md
├── .claude/rules/
├── .gitignore
├── Dockerfile
└── app/
    ├── __init__.py
    ├── routers/
    ├── models/
    ├── schemas/
    └── services/
```

## 규칙 파일

이 프로젝트는 `.claude/rules/` 디렉토리에 모듈화된 규칙 파일들을 포함합니다:

{{RULES_LIST}}

Claude Code는 세션 시작 시 이 파일들을 자동으로 로드합니다.
