import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { staticPlugin } from '@elysiajs/static'
import { homePage } from './views/home'

const PORT = Number(process.env.PORT) || 3000

new Elysia()
  .use(html())
  .use(
    staticPlugin({
      assets: 'public',
      prefix: '/',
    })
  )
  .get('/', () => homePage())
  .listen(PORT, () => {
    console.log('\n🌸 ═══════════════════════════════════════')
    console.log('   爱莉希雅，我爱你  ♡  Elysia.pink v2.0')
    console.log('═══════════════════════════════════════')
    console.log(`🚀  http://localhost:${PORT}\n`)
  })
