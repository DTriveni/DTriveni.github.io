// Project case studies live in src/content/projects/*.md.
// Add a new project by copying an existing file and editing its frontmatter.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const metric = z.object({
  value: z.string(),
  label: z.string(),
  context: z.string().optional(),
  kind: z.enum(['scope', 'result']),
});

const flow = z.object({
  title: z.string(),
  note: z.string().optional(),
  tone: z.enum(['before', 'after']).default('after'),
  steps: z.array(z.object({ name: z.string(), detail: z.string().optional() })),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    summary: z.string(),
    type: z.string(),
    year: z.string(),
    grade: z.string().optional(),
    role: z.string().optional(),
    // built: I implemented it. designed: a proposed framework or method.
    // group: a team result. ongoing: a continuing role.
    status: z
      .object({ kind: z.enum(['built', 'designed', 'group', 'ongoing']), label: z.string() })
      .optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number(),
    ledger: z
      .object({ domain: z.string(), before: z.string(), after: z.string() })
      .optional(),
    metrics: z.array(metric).default([]),
    flows: z.array(flow).default([]),
    stack: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    // Optional personal reflection, shown as a "What I learned" section.
    reflection: z.string().optional(),
    openQuestions: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
