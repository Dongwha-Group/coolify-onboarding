#!/usr/bin/env node

import { createInterface } from 'node:readline';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, cpSync } from 'node:fs';
import { join, basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Constants ──────────────────────────────────────────────────────────────────

const GITHUB_OWNER = 'user';
const GITHUB_REPO = 'coolify-onboarding';
const GITHUB_BRANCH = 'main';
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// ── Helpers ────────────────────────────────────────────────────────────────────

const isLocal = import.meta.url?.startsWith('file://');

function getScriptDir() {
  return dirname(fileURLToPath(import.meta.url));
}

function ask(rl, question, defaultValue) {
  const prompt = defaultValue ? `${question} (${defaultValue}): ` : `${question}: `;
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim() || defaultValue || '');
    });
  });
}

function askYN(rl, question) {
  return new Promise((resolve) => {
    rl.question(`${question} (y/N): `, (answer) => {
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

// ── Template loading (local vs remote) ─────────────────────────────────────────

async function loadTemplateLocal(scriptDir) {
  const templatesDir = join(scriptDir, 'templates');
  const rulesDir = join(templatesDir, 'rules');

  const templateContent = readFileSync(join(templatesDir, 'CLAUDE.md.tpl'), 'utf-8');

  const ruleFiles = readdirSync(rulesDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  const rules = ruleFiles.map((f) => ({
    name: f,
    content: readFileSync(join(rulesDir, f), 'utf-8'),
  }));

  return { templateContent, rules };
}

async function loadTemplateRemote() {
  console.log('원격 템플릿을 다운로드합니다...\n');

  const templateUrl = `${GITHUB_RAW_BASE}/scripts/templates/CLAUDE.md.tpl`;
  const templateRes = await fetch(templateUrl);
  if (!templateRes.ok) {
    throw new Error(`템플릿 다운로드 실패: ${templateRes.status} ${templateRes.statusText}`);
  }
  const templateContent = await templateRes.text();

  const apiUrl = `${GITHUB_API_BASE}/scripts/templates/rules`;
  const apiRes = await fetch(apiUrl, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  });
  if (!apiRes.ok) {
    throw new Error(`규칙 파일 목록 조회 실패: ${apiRes.status} ${apiRes.statusText}`);
  }
  const items = await apiRes.json();
  const mdFiles = items.filter((item) => item.name.endsWith('.md')).sort((a, b) => a.name.localeCompare(b.name));

  const rules = await Promise.all(
    mdFiles.map(async (item) => {
      const rawUrl = `${GITHUB_RAW_BASE}/scripts/templates/rules/${item.name}`;
      const res = await fetch(rawUrl);
      if (!res.ok) {
        throw new Error(`규칙 파일 다운로드 실패 (${item.name}): ${res.status}`);
      }
      return { name: item.name, content: await res.text() };
    }),
  );

  return { templateContent, rules };
}

// ── File generation ────────────────────────────────────────────────────────────

function generateRulesList(rules) {
  return rules
    .map((r) => {
      const label = r.name.replace('.md', '').replace(/-/g, ' ');
      return `- **${r.name}**: ${label}`;
    })
    .join('\n');
}

function renderTemplate(template, values) {
  let result = template;
  for (const [key, value] of Object.entries(values)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }
  return result;
}

function generateTechStackBlock(techStack) {
  const items = techStack
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  if (items.length === 0) return '- (미정)';
  return items.map((item) => `- **${item}**`).join('\n');
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('=== Claude 룰 스캐폴드 ===');
  console.log('프로젝트에 CLAUDE.md와 .claude/rules/ 를 설치합니다.\n');

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    // 1. Interactive prompts
    const cwd = process.cwd();
    const defaultName = basename(cwd);

    const projectName = await ask(rl, '프로젝트 이름', defaultName);
    const projectDesc = await ask(rl, '프로젝트 설명', '');
    const techStack = await ask(rl, '기술 스택 (쉼표 구분, 예: Next.js, FastAPI, Docker)', '');
    const devCommand = await ask(rl, '개발 서버 명령어', 'npm run dev');
    const buildCommand = await ask(rl, '빌드 명령어', 'npm run build');
    const installPath = await ask(rl, '설치 경로', '.');

    const targetDir = resolve(cwd, installPath);

    // 2. Conflict check
    const claudeMdPath = join(targetDir, 'CLAUDE.md');
    const claudeRulesDir = join(targetDir, '.claude', 'rules');
    const hasConflict = existsSync(claudeMdPath) || existsSync(join(targetDir, '.claude'));

    if (hasConflict) {
      console.log('');
      const overwrite = await askYN(rl, '기존 CLAUDE.md 또는 .claude/ 디렉토리가 존재합니다. 덮어쓰시겠습니까?');
      if (!overwrite) {
        console.log('설치를 취소합니다.');
        rl.close();
        return;
      }
    }

    rl.close();

    // 3. Load templates
    let templateContent, rules;

    if (isLocal) {
      const scriptDir = getScriptDir();
      ({ templateContent, rules } = await loadTemplateLocal(scriptDir));
    } else {
      ({ templateContent, rules } = await loadTemplateRemote());
    }

    // 4. Generate files
    mkdirSync(claudeRulesDir, { recursive: true });

    // Copy rule files
    const createdFiles = [];
    for (const rule of rules) {
      const dest = join(claudeRulesDir, rule.name);
      writeFileSync(dest, rule.content, 'utf-8');
      createdFiles.push(`.claude/rules/${rule.name}`);
    }

    // Render and write CLAUDE.md
    const rulesList = generateRulesList(rules);
    const techStackBlock = generateTechStackBlock(techStack);

    const claudeMd = renderTemplate(templateContent, {
      PROJECT_NAME: projectName,
      PROJECT_DESCRIPTION: projectDesc || `${projectName} 프로젝트입니다.`,
      TECH_STACK: techStackBlock,
      DEV_COMMAND: devCommand,
      BUILD_COMMAND: buildCommand,
      RULES_LIST: rulesList,
    });

    writeFileSync(claudeMdPath, claudeMd, 'utf-8');
    createdFiles.push('CLAUDE.md');

    // 5. Done
    console.log('\n=== 설치 완료 ===\n');
    console.log('생성된 파일:');
    for (const f of createdFiles) {
      console.log(`  + ${f}`);
    }
    console.log('');
    console.log('사용법:');
    console.log('  Claude Code가 세션 시작 시 CLAUDE.md와 .claude/rules/ 를 자동으로 로드합니다.');
    console.log('  규칙을 추가하려면 .claude/rules/ 에 .md 파일을 넣으세요.');
    console.log('');
  } catch (err) {
    rl.close();
    console.error(`\n오류: ${err.message}`);
    process.exit(1);
  }
}

main();
