import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

// Legacy collection definition (no loader) - Astro 5 auto-generates content from the filesystem
// but requires a schema to be defined for type safety and to apply defaults like draft: false.
export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
};
