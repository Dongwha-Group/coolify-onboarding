#!/usr/bin/env node

import { createInterface } from 'node:readline';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Constants ──────────────────────────────────────────────────────────────────

const GITHUB_OWNER = 'Dongwha-Group';
const GITHUB_REPO = 'coolify-onboarding';
const GITHUB_BRANCH = 'main';
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}`;

const UTF8_BOM = '\uFEFF';

// ── Helpers ────────────────────────────────────────────────────────────────────

function getScriptDir() {
  return dirname(fileURLToPath(import.meta.url));
}

function hasLocalTemplates() {
  try {
    const scriptDir = getScriptDir();
    return existsSync(join(scriptDir, 'templates', 'CLAUDE.md.tpl'));
  } catch {
    return false;
  }
}

function hasLocalPresets() {
  try {
    const scriptDir = getScriptDir();
    return existsSync(join(scriptDir, 'templates', 'presets', 'manifest.json'));
  } catch {
    return false;
  }
}

function createPrompt(rl) {
  const buffer = [];
  let waiting = null;

  rl.on('line', (line) => {
    if (waiting) {
      const resolve = waiting;
      waiting = null;
      resolve(line);
    } else {
      buffer.push(line);
    }
  });

  function nextLine(prompt) {
    process.stdout.write(prompt);
    if (buffer.length > 0) return Promise.resolve(buffer.shift());
    return new Promise((resolve) => { waiting = resolve; });
  }

  async function ask(question, defaultValue) {
    const prompt = defaultValue ? `${question} (${defaultValue}): ` : `${question}: `;
    const answer = await nextLine(prompt);
    return answer.trim() || defaultValue || '';
  }

  async function askYN(question) {
    const answer = await nextLine(`${question} (y/N): `);
    return answer.trim().toLowerCase() === 'y';
  }

  async function askChoice(question, options, defaultIdx = 0) {
    console.log(`\n${question}\n`);
    for (let i = 0; i < options.length; i++) {
      const marker = i === defaultIdx ? '*' : ' ';
      console.log(`  ${marker} [${i}] ${options[i]}`);
    }
    console.log('');
    const answer = await nextLine(`선택 (${defaultIdx}): `);
    const idx = answer.trim() === '' ? defaultIdx : parseInt(answer.trim(), 10);
    if (isNaN(idx) || idx < 0 || idx >= options.length) {
      console.log(`잘못된 입력입니다. 기본값 [${defaultIdx}]을 사용합니다.`);
      return defaultIdx;
    }
    return idx;
  }

  return { ask, askYN, askChoice };
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

// ── Preset loading (local vs remote) ────────────────────────────────────────

function loadPresetLocal(scriptDir, presetId) {
  const presetsDir = join(scriptDir, 'templates', 'presets');
  const presetDir = join(presetsDir, presetId);

  const manifest = JSON.parse(readFileSync(join(presetDir, 'manifest.json'), 'utf-8'));

  const files = manifest.files.map((entry) => ({
    dest: entry.dest,
    content: readFileSync(join(presetDir, entry.src), 'utf-8'),
  }));

  const directories = manifest.directories || [];

  return { files, directories };
}

async function loadPresetRemote(presetId) {
  console.log(`프리셋 '${presetId}' 원격 템플릿을 다운로드합니다...\n`);

  const manifestUrl = `${GITHUB_RAW_BASE}/scripts/templates/presets/${presetId}/manifest.json`;
  const manifestRes = await fetch(manifestUrl);
  if (!manifestRes.ok) {
    throw new Error(`프리셋 manifest 다운로드 실패: ${manifestRes.status}`);
  }
  const manifest = await manifestRes.json();

  const files = await Promise.all(
    manifest.files.map(async (entry) => {
      const fileUrl = `${GITHUB_RAW_BASE}/scripts/templates/presets/${presetId}/${entry.src}`;
      const res = await fetch(fileUrl);
      if (!res.ok) {
        throw new Error(`프리셋 파일 다운로드 실패 (${entry.src}): ${res.status}`);
      }
      return { dest: entry.dest, content: await res.text() };
    }),
  );

  const directories = manifest.directories || [];

  return { files, directories };
}

async function loadMasterManifestRemote() {
  const url = `${GITHUB_RAW_BASE}/scripts/templates/presets/manifest.json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`프리셋 목록 다운로드 실패: ${res.status}`);
  }
  return res.json();
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

function writePresetFiles(targetDir, presetFiles, templateValues) {
  const createdFiles = [];

  // Create directories with .gitkeep
  if (presetFiles.directories) {
    for (const dir of presetFiles.directories) {
      const dirPath = join(targetDir, dir);
      mkdirSync(dirPath, { recursive: true });
      const gitkeepPath = join(dirPath, '.gitkeep');
      if (!existsSync(gitkeepPath)) {
        writeFileSync(gitkeepPath, '', 'utf-8');
        createdFiles.push(`${dir}/.gitkeep`);
      }
    }
  }

  // Write template files
  for (const file of presetFiles.files) {
    const destPath = join(targetDir, file.dest);
    const destDir = dirname(destPath);
    mkdirSync(destDir, { recursive: true });

    let content = file.content;
    if (file.dest.endsWith('.md') || file.dest.endsWith('.yml') || file.dest.endsWith('.yaml')) {
      content = renderTemplate(content, templateValues);
    }

    writeFileSync(destPath, UTF8_BOM + content, 'utf-8');
    createdFiles.push(file.dest);
  }

  return createdFiles;
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
  const { ask, askYN, askChoice } = createPrompt(rl);

  try {
    // 1. Interactive prompts
    const cwd = process.cwd();
    const defaultName = basename(cwd);

    const projectName = await ask('프로젝트 이름', defaultName);
    const projectDesc = await ask('프로젝트 설명', '');

    // Load preset master manifest
    let masterManifest;
    if (hasLocalPresets()) {
      const scriptDir = getScriptDir();
      const manifestPath = join(scriptDir, 'templates', 'presets', 'manifest.json');
      masterManifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    } else {
      masterManifest = await loadMasterManifestRemote();
    }

    const presetOptions = [
      'Claude 룰만 설치 (기존 방식)',
      ...masterManifest.presets.map((p) => p.label),
    ];

    const presetIdx = await askChoice('프로젝트 유형을 선택하세요:', presetOptions, 0);

    let techStack, devCommand, buildCommand, selectedPreset;

    if (presetIdx === 0) {
      // Legacy mode: manual input
      techStack = await ask('기술 스택 (쉼표 구분, 예: Next.js, FastAPI, Docker)', '');
      devCommand = await ask('개발 서버 명령어', 'npm run dev');
      buildCommand = await ask('빌드 명령어', 'npm run build');
    } else {
      // Preset mode: auto-fill from manifest
      selectedPreset = masterManifest.presets[presetIdx - 1];
      techStack = selectedPreset.techStack;
      devCommand = selectedPreset.devCommand;
      buildCommand = selectedPreset.buildCommand;
      console.log(`\n  기술 스택: ${techStack}`);
      console.log(`  개발 명령어: ${devCommand}`);
      console.log(`  빌드 명령어: ${buildCommand}`);
    }

    const installPath = await ask('설치 경로', '.');
    const targetDir = resolve(cwd, installPath);

    // 2. Conflict check
    const claudeMdPath = join(targetDir, 'CLAUDE.md');
    const claudeRulesDir = join(targetDir, '.claude', 'rules');
    const hasConflict = existsSync(claudeMdPath) || existsSync(join(targetDir, '.claude'));

    if (hasConflict) {
      console.log('');
      const overwrite = await askYN('기존 CLAUDE.md 또는 .claude/ 디렉토리가 존재합니다. 덮어쓰시겠습니까?');
      if (!overwrite) {
        console.log('설치를 취소합니다.');
        rl.close();
        return;
      }
    }

    rl.close();

    // 3. Load rules (common for all modes)
    let rules;
    if (hasLocalTemplates()) {
      const scriptDir = getScriptDir();
      ({ rules } = await loadTemplateLocal(scriptDir));
    } else {
      ({ rules } = await loadTemplateRemote());
    }

    // 4. Write .claude/rules/
    mkdirSync(claudeRulesDir, { recursive: true });
    const createdFiles = [];
    for (const rule of rules) {
      const dest = join(claudeRulesDir, rule.name);
      writeFileSync(dest, UTF8_BOM + rule.content, 'utf-8');
      createdFiles.push(`.claude/rules/${rule.name}`);
    }

    const rulesList = generateRulesList(rules);
    const techStackBlock = generateTechStackBlock(techStack);
    const templateValues = {
      PROJECT_NAME: projectName,
      PROJECT_DESCRIPTION: projectDesc || `${projectName} 프로젝트입니다.`,
      TECH_STACK: techStackBlock,
      DEV_COMMAND: devCommand,
      BUILD_COMMAND: buildCommand,
      RULES_LIST: rulesList,
    };

    if (presetIdx === 0) {
      // Legacy mode: only CLAUDE.md + rules
      let templateContent;
      if (hasLocalTemplates()) {
        const scriptDir = getScriptDir();
        ({ templateContent } = await loadTemplateLocal(scriptDir));
      } else {
        ({ templateContent } = await loadTemplateRemote());
      }

      const claudeMd = renderTemplate(templateContent, templateValues);
      writeFileSync(claudeMdPath, UTF8_BOM + claudeMd, 'utf-8');
      createdFiles.push('CLAUDE.md');
    } else {
      // Preset mode: write preset files (includes CLAUDE.md.tpl)
      let presetFiles;
      if (hasLocalPresets()) {
        const scriptDir = getScriptDir();
        presetFiles = loadPresetLocal(scriptDir, selectedPreset.id);
      } else {
        presetFiles = await loadPresetRemote(selectedPreset.id);
      }

      const presetCreated = writePresetFiles(targetDir, presetFiles, templateValues);
      createdFiles.push(...presetCreated);
    }

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
