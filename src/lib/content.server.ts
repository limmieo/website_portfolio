import { promises as fs } from 'fs'
import path from 'path'
import type { Content } from '@/types/content'

export async function getContent(): Promise<Content> {
  const filePath = path.join(process.cwd(), 'public', 'content', 'content.json')
  const file = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(file) as Content
}
