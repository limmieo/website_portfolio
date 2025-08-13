import sharp from 'sharp'
import { readdir, mkdir, stat } from 'fs/promises'
import { join, dirname, extname } from 'path'
import { existsSync } from 'fs'

const PUBLIC_DIR = join(process.cwd(), 'public')
const QUALITY = 80
const WIDTHS = [640, 768, 1024, 1366, 1600, 1920]
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

async function* walk(dir: string): AsyncGenerator<string> {
  const files = await readdir(dir, { withFileTypes: true })
  
  for (const file of files) {
    const path = join(dir, file.name)
    
    if (file.isDirectory()) {
      yield* walk(path)
    } else {
      const ext = extname(file.name).toLowerCase()
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        yield path
      }
    }
  }
}

async function optimizeImage(inputPath: string) {
  const outputDir = join(dirname(inputPath), 'optimized')
  const extension = extname(inputPath).toLowerCase().replace('jpeg', 'jpg')
  const name = inputPath.split('/').pop()?.split('.').slice(0, -1).join('.')
  
  if (!name) return
  
  // Create optimized directory if it doesn't exist
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true })
  }
  
  const metadata = await sharp(inputPath).metadata()
  const isTransparent = metadata.hasAlpha
  const format = extension === '.png' && !isTransparent ? 'webp' : extension.replace('.', '')
  
  // Generate responsive images
  for (const width of WIDTHS) {
    if (metadata.width && width > metadata.width) continue
    
    const outputPath = join(outputDir, `${name}-${width}w.${format}`)
    
    // Skip if already optimized and source hasn't changed
    if (existsSync(outputPath)) {
      const sourceStats = await stat(inputPath)
      const destStats = await stat(outputPath)
      
      if (sourceStats.mtimeMs <= destStats.mtimeMs) {
        console.log(`Skipping ${outputPath} - already optimized`)
        continue
      }
    }
    
    console.log(`Optimizing ${inputPath} -> ${outputPath} (${width}w)`)
    
    await sharp(inputPath)
      .resize(width)
      [format === 'webp' ? 'webp' : 'toFormat']({
        quality: QUALITY,
        effort: 6,
        ...(format === 'webp' ? { alphaQuality: 80 } : {}),
      })
      .toFile(outputPath)
  }
  
  // Generate a smaller version for blur placeholder
  const placeholderPath = join(outputDir, `${name}-placeholder.${format}`)
  await sharp(inputPath)
    .resize(20)
    .toFormat('webp', { quality: 20 })
    .toFile(placeholderPath)
    
  return {
    original: inputPath.replace(PUBLIC_DIR, ''),
    optimized: {
      src: `${outputDir.replace(PUBLIC_DIR, '')}/${name}-${WIDTHS[0]}w.${format}`,
      srcSet: WIDTHS
        .filter(w => !metadata.width || w <= metadata.width)
        .map(w => ({
          width: w,
          src: `${outputDir.replace(PUBLIC_DIR, '')}/${name}-${w}w.${format} ${w}w`
        }))
        .map(({ width, src }) => `${src} ${width}w`)
        .join(', '),
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      placeholder: placeholderPath.replace(PUBLIC_DIR, '')
    }
  }
}

async function main() {
  console.log('Starting image optimization...')
  
  try {
    const optimizedImages = []
    
    for await (const file of walk(PUBLIC_DIR)) {
      if (file.includes('optimized') || file.includes('favicon')) continue
      
      try {
        const result = await optimizeImage(file)
        if (result) optimizedImages.push(result)
      } catch (error) {
        console.error(`Error optimizing ${file}:`, error)
      }
    }
    
    console.log('\nOptimization complete!')
    console.log(`Optimized ${optimizedImages.length} images`)
    
    // Generate a manifest file if needed
    // await writeFile(
    //   join(process.cwd(), 'public', 'optimized-images.json'),
    //   JSON.stringify(optimizedImages, null, 2)
    // )
    
  } catch (error) {
    console.error('Error during optimization:', error)
    process.exit(1)
  }
}

main()
