import { z, defineCollection } from 'astro:content';

const sourceSchema = z.object({
  name: z.string(),
  url: z.string().optional(),
  type: z.enum([
    'industry-report',
    'peer-reviewed',
    'operator-interview',
    'vendor-data',
    'proprietary-analysis'
  ]),
});

const decisionBoundarySchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string().default("Deepak Gupta"),
  pubDate: z.date(),
  cluster: z.enum([
    'automation-roi',
    'robotics-deployment-economics',
    'automation-failure',
    'vendor-economics',
    'deployment-risk'
  ]),
  relatedArticles: z.array(z.string()).optional(),
  relatedFrameworks: z.array(z.string()).optional(),
  relatedUseCases: z.array(z.string()).optional(),
  relatedCaseStudies: z.array(z.string()).optional(),
  answerNugget: z.string(),
  decisionBoundaries: z.array(decisionBoundarySchema),
  sources: z.array(sourceSchema).default([]),
});

const frameworkSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  cluster: z.enum([
    'automation-roi',
    'robotics-deployment-economics',
    'automation-failure',
    'vendor-economics',
    'deployment-risk'
  ]),
  relatedArticles: z.array(z.string()).optional(),
  relatedUseCases: z.array(z.string()).optional(),
  relatedCaseStudies: z.array(z.string()).optional(),
  diagramFile: z.string().optional(),
  diagramFiles: z.array(z.string()).optional(),
});

const useCaseSchema = z.object({
  title: z.string(),
  description: z.string(),
  audience: z.string(),
  decisionQuestion: z.string(),
  relatedArticles: z.array(z.string()).optional(),
  relatedFrameworks: z.array(z.string()).optional(),
  relatedCaseStudies: z.array(z.string()).optional(),
});

const caseStudySchema = z.object({
  title: z.string(),
  description: z.string(),
  engagementType: z.string(),
  decisionQuestion: z.string(),
  relatedArticles: z.array(z.string()).optional(),
  relatedFrameworks: z.array(z.string()).optional(),
  relatedUseCases: z.array(z.string()).optional(),
});

const glossarySchema = z.object({
  title: z.string(),
  abbreviation: z.string().optional(),
  description: z.string(),
  definition: z.string(),
  relatedTerms: z.array(z.string()).optional(),
  usedIn: z.array(z.string()).optional(),
});

export const collections = {
  articles: defineCollection({ type: 'content', schema: articleSchema }),
  frameworks: defineCollection({ type: 'content', schema: frameworkSchema }),
  'use-cases': defineCollection({ type: 'content', schema: useCaseSchema }),
  'case-studies': defineCollection({ type: 'content', schema: caseStudySchema }),
  glossary: defineCollection({ type: 'content', schema: glossarySchema }),
};
