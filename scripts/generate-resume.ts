import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { ResumeData, type ExperienceItem } from '../src/data';
import { getExperienceDateDisplay } from '../src/utils/experienceDates';

const scriptPath = fileURLToPath(import.meta.url);
const htmlOutputPath = fileURLToPath(new URL('../public/resume.html', import.meta.url));
const outputPath = fileURLToPath(new URL('../public/assets/resume.pdf', import.meta.url));

if (process.argv[1] === scriptPath) {
  void generateResumePdf().catch((error: unknown) => {
    const message = error instanceof Error ? (error.stack ?? error.message) : String(error);

    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  });
}

export async function generateResumePdf() {
  const resumeHtml = renderResumeHtml();

  await mkdir(dirname(htmlOutputPath), { recursive: true });
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(htmlOutputPath, resumeHtml, 'utf8');

  const browser = await puppeteer.launch(getPuppeteerLaunchOptions());

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 1 });
    await page.setContent(resumeHtml, { waitUntil: 'load' });
    await page.pdf({
      path: outputPath,
      format: 'A4',
      margin: {
        bottom: '0px',
        left: '0px',
        right: '0px',
        top: '0px',
      },
      preferCSSPageSize: true,
      printBackground: true,
    });
  } finally {
    await browser.close();
  }
}

function getPuppeteerLaunchOptions(): Parameters<typeof puppeteer.launch>[0] {
  if (process.env.GITHUB_ACTIONS !== 'true') {
    return undefined;
  }

  return {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
}

export function renderResumeHtml() {
  const { contact, experience, profile } = ResumeData;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(profile.name)} Resume</title>
    <style>
      :root {
        --accent: #2d7f83;
        --accent-soft: #e7f2f2;
        --accent-line: #bed7d9;
        --ink: #000000;
        --muted: #4b5b68;
        --paper: #fbfcfb;
        --page: #eef3f3;
        --rule: #d9e3e4;
        --section: #315b72;
      }

      @page {
        size: A4;
        margin: 34px 38px 38px;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: var(--ink);
        background: var(--paper);
        font-family: "Aptos Display", Aptos, "Segoe UI Variable", "Segoe UI", "Helvetica Neue", Arial,
          sans-serif;
        font-size: 13px;
        line-height: 1.5;
      }

      @media screen {
        body {
          background: var(--page);
          padding: 34px 38px 38px;
        }
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .resume {
        position: relative;
        background: var(--paper);
      }

      .header {
        position: relative;
        display: grid;
        grid-template-columns: auto auto;
        gap: 24px;
        padding: 20px 28px 20px 28px;
        justify-content: space-between;
      }

      .header > :not(.header-frame) {
        position: relative;
        z-index: 1;
      }

      .header-frame {
        position: absolute;
        width: 58px;
        height: 54px;
        pointer-events: none;
      }

      .header-frame-bottom-right {
        bottom: 0;
        right: 0;
        width: 66px;
        border-right: 2px solid var(--accent);
        border-bottom: 2px solid var(--accent);
        border-radius: 0 0 12px 0;
      }

      .header-frame-top-left {
        top: 0;
        left: 0;
        border-top: 2px solid var(--accent);
        border-left: 2px solid var(--accent);
        border-radius: 12px 0 0 0;
      }

      .eyebrow {
        margin: 0 0 8px;
        color: var(--accent);
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 1.4px;
        text-transform: uppercase;
      }

      h1,
      h2,
      h3,
      p {
        margin: 0;
      }

      h1 {
        color: var(--ink);
        font-size: 42px;
        font-weight: 850;
        letter-spacing: 0;
        line-height: 1;
      }

      .headline {
        margin-top: 8px;
        color: var(--section);
        font-size: 16px;
        font-weight: 700;
      }

      .contact {
        align-self: end;
        display: grid;
        gap: 8px;
        min-width: 270px;
        color: var(--muted);
        font-size: 13px;
        position: relative;
        z-index: 1;
      }

      .contact-item {
        display: grid;
        grid-template-columns: 25px 1fr;
        gap: 10px;
        align-items: center;
      }

      .contact-icon {
        display: grid;
        width: 25px;
        height: 25px;
        place-items: center;
        color: var(--accent);
        background: var(--accent-soft);
        border: 1px solid var(--accent-line);
        border-radius: 999px;
      }

      .contact-icon svg {
        display: block;
        width: 13px;
        height: 13px;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
      }

      .contact-value {
        color: var(--ink);
      }

      section {
        padding-top: 22px;
      }

      .section-title {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 11px;
        align-items: center;
        margin-bottom: 8px;
        color: var(--section);
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 1.3px;
        text-transform: uppercase;
      }

      .section-title::after {
        display: block;
        height: 1px;
        background: linear-gradient(90deg, var(--accent-line), transparent);
        content: "";
      }

      .summary {
        color: var(--ink);
        font-size: 13px;
      }

      .two-column {
        display: grid;
        grid-template-columns: 1.08fr 0.92fr;
        gap: 28px;
      }

      .highlight-list,
      .achievement-list {
        display: grid;
        gap: 6px;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .highlight-list li,
      .achievement-list li {
        position: relative;
        padding-left: 14px;
      }

      .highlight-list li::before,
      .achievement-list li::before {
        position: absolute;
        left: 0;
        color: var(--accent);
        content: "•";
        font-weight: 800;
      }

      .skill-groups {
        display: grid;
        gap: 9px;
      }

      .skill-group {
        break-inside: avoid;
      }

      .skill-label {
        margin-bottom: 4px;
        color: var(--section);
        font-size: 13px;
        font-weight: 800;
      }

      .skills {
        color: var(--ink);
        font-size: 13px;
      }

      .experience-list {
        display: grid;
        gap: 16px;
      }

      .experience-item {
        break-inside: avoid;
        padding-top: 16px;
        border-top: 1px solid var(--rule);
      }

      .experience-item:first-child {
        padding-top: 0;
        border-top: 0;
      }

      .experience-heading {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        align-items: baseline;
      }

      h3 {
        color: var(--ink);
        font-size: 15px;
        font-weight: 800;
        line-height: 1.15;
      }

      .date-range {
        color: var(--section);
        font-size: 13px;
        font-weight: 800;
        white-space: nowrap;
      }

      .job-summary {
        margin-top: 6px;
        color: var(--ink);
      }

      .stack {
        margin-top: 7px;
        color: var(--ink);
        font-size: 13px;
      }

      .stack strong,
      .achievement-list strong {
        color: var(--section);
      }

      .achievement-list {
        gap: 5px;
        margin-top: 8px;
        color: var(--ink);
        font-size: 13px;
      }

    </style>
  </head>
  <body>
    <main class="resume">
      <header class="header">
        <span class="header-frame header-frame-top-left" aria-hidden="true"></span>
        <span class="header-frame header-frame-bottom-right" aria-hidden="true"></span>
        <div>
          <p class="eyebrow">Resume</p>
          <h1>${escapeHtml(profile.name)}</h1>
          <p class="headline">${escapeHtml(profile.headline)}</p>
        </div>
        <div class="contact">
          ${renderContactItem('Phone', `tel:${contact.phone.replace(/\s/g, '')}`, contact.phone)}
          ${renderContactItem('Email', `mailto:${contact.email}`, contact.email)}
          ${renderContactItem('Web', contact.website, contact.website)}
        </div>
      </header>

      <section>
        <h2 class="section-title">Profile</h2>
        <p class="summary">${escapeHtml(profile.summary)}</p>
      </section>

      <section class="two-column">
        <div>
          <h2 class="section-title">Core Strengths</h2>
          <ul class="highlight-list">
            ${profile.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h2 class="section-title">Skills</h2>
          <div class="skill-groups">
            ${profile.skillGroups.map(renderSkillGroup).join('')}
          </div>
        </div>
      </section>

      <section>
        <h2 class="section-title">Experience</h2>
        <div class="experience-list">
          ${experience.map(renderExperienceItem).join('')}
        </div>
      </section>

    </main>
  </body>
</html>`;
}

function renderContactItem(label: string, href: string, value: string) {
  return `<div class="contact-item"><span class="contact-icon">${renderContactIcon(
    label
  )}</span><a class="contact-value" href="${escapeHtml(href)}">${escapeHtml(value)}</a></div>`;
}

function renderContactIcon(label: string) {
  switch (label) {
    case 'Phone':
      return '<svg viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.89.32 1.76.59 2.6a2 2 0 0 1-.45 2.11L8 9.68a16 16 0 0 0 6.32 6.32l1.25-1.25a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.6.59A2 2 0 0 1 22 16.92Z" /></svg>';
    case 'Email':
      return '<svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" /><path d="m22 7-10 6L2 7" /></svg>';
    default:
      return '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 0 20" /><path d="M12 2a15.3 15.3 0 0 0 0 20" /></svg>';
  }
}

function renderSkillGroup(group: { label: string; skills: readonly string[] }) {
  return `<div class="skill-group"><p class="skill-label">${escapeHtml(
    group.label
  )}</p><p class="skills">${group.skills.map(escapeHtml).join(', ')}</p></div>`;
}

function renderExperienceItem(experienceItem: ExperienceItem, index: number) {
  const achievements = getSelectedAchievements(experienceItem, index);

  return `<article class="experience-item">
    <div class="experience-heading">
      <h3>${escapeHtml(experienceItem.position)} @ ${escapeHtml(experienceItem.employer)}</h3>
      <span class="date-range">${getExperienceDateDisplay(experienceItem)}</span>
    </div>
    <p class="job-summary">${escapeHtml(experienceItem.summary)}</p>
    ${renderTechnologies(experienceItem.technologies)}
    ${renderAchievements(achievements)}
  </article>`;
}

function getSelectedAchievements(experienceItem: ExperienceItem, index: number) {
  const limits = [6, 6, 3, 3, 2];
  const limit = limits[index] ?? 0;

  return experienceItem.keyAchievements?.slice(0, limit) ?? [];
}

function renderTechnologies(technologies: string[] | undefined) {
  if (!technologies?.length) {
    return '';
  }

  return `<p class="stack"><strong>Stack:</strong> ${technologies.map(escapeHtml).join(', ')}</p>`;
}

function renderAchievements(achievements: NonNullable<ExperienceItem['keyAchievements']>) {
  if (!achievements.length) {
    return '';
  }

  return `<ul class="achievement-list">${achievements
    .map((achievement) => {
      const label = achievement.label ? `<strong>${escapeHtml(achievement.label)}.</strong> ` : '';

      return `<li>${label}${escapeHtml(achievement.description)}</li>`;
    })
    .join('')}</ul>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case "'":
        return '&#39;';
      case '"':
        return '&quot;';
      default:
        return character;
    }
  });
}
