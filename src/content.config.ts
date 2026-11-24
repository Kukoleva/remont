import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    label: z.string(),
    short: z.string(),
    intro: z.string(),
    priceFrom: z.string(),
    icon: z.string().default('🛠️'),
    order: z.number().default(0),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('Виктор — РемонтГомель'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { services, blog };