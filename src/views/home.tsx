import { Html } from '@elysiajs/html'

/* ─── Tailwind 主题扩展（内联脚本）─── */
const twConfig = `tailwind.config={theme:{extend:{colors:{fairy:'#ff9afc',petal:'#ffc8f0',blush:'#f9b2bd','rose-deep':'#e879a0',crimson:'#901A1A'},fontFamily:{poet:["'HFPoet'","'Noto Serif SC'","serif"]}}}}`

/* ─── 角色数据 ─── */
interface StatRow { label: string; value: string; pink?: boolean; secret?: boolean }
const STATS: StatRow[] = [
  { label: '本名',  value: '爱莉希雅 (Elysia)' },
  { label: '发色',  value: '粉色♪', pink: true },
  { label: '身高',  value: '163 cm' },
  { label: '体重',  value: '54.8 kg', secret: true },
  { label: '生日',  value: '11 月 11 日' },
]

/* ─── 画廊图片 ─── */
interface GalleryItem { src: string; label: string; cls: string; pos?: string }
const GALLERY: GalleryItem[] = [
  { src: '/img/about_1.jpg', label: '♡ 01', cls: 'g1' },
  { src: '/img/about_2.jpg', label: '♡ 02', cls: 'g2', pos: 'right center' },
  { src: '/img/about_3.jpg', label: '♡ 03', cls: 'g3', pos: 'right center' },
  { src: '/img/about_4.jpg', label: '♡ 04', cls: 'g4', pos: 'left center' },
]

/* ─── 结语三段台词 ─── */
const EPILOGUE_QUOTES = [
  '"不过，再厚的书，都会有翻到最后一页的时候；再难忘的故事，也都会有结束的时候呀。"',
  '"一段故事结束，也是另一段故事的开始。只要那些名字不被遗忘，故事也会得到延续。"',
  '"要微笑着看到最后一页哦。接下来的故事，就交给你来续写啦。"',
]

/* ─── StatRow 组件 ─── */
function StatItem({ label, value, pink = false, secret = false }: StatRow) {
  return (
    <div class="stat-row">
      <span class="text-xs tracking-widest whitespace-nowrap" style="color:rgba(255,200,240,.65);">{label}</span>
      <span style="color:rgba(255,255,255,.2);">·</span>
      <span class={pink ? 'font-semibold' : ''} style={pink ? 'color:#ff9afc;' : 'color:rgba(255,255,255,.88);'}>
        {value}
      </span>
      {secret && (
        <span class="secret-text ml-auto text-xs px-2 py-0.5 rounded">不许四舍五入！</span>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   主页组件
   ═══════════════════════════════════════════ */
export function homePage(): string {
  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="zh-CN">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Elysia · 爱莉希雅，我爱你</title>
          <meta name="description" content="献给爱莉希雅——粉色妖精、逐火英桀之首、最动人心弦的少女。" />
          <link rel="icon" href="/img/ico.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <script src="https://cdn.tailwindcss.com"></script>
          <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"></script>
          <link rel="stylesheet" href="/css/style.css" />
          <script>{twConfig}</script>
        </head>

        <body class="bg-[#070108] text-white overflow-x-hidden" x-data="{ modal: false }">

          {/* ── 粒子画布 ── */}
          <canvas id="particles-canvas" class="fixed inset-0 w-full h-full pointer-events-none" style="z-index:9;" aria-hidden="true" />

          {/* ════════════════════════════════
              § 1  HERO
              ════════════════════════════════ */}
          <section class="hero-bg relative w-full h-screen flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0" style="background:linear-gradient(180deg,rgba(7,1,8,.1) 0%,rgba(7,1,8,.05) 45%,rgba(7,1,8,.75) 100%);" />

            <div class="relative text-center px-6" style="z-index:10;">
              <p class="hero-sub tracking-[.55em] text-xs md:text-sm uppercase mb-5 font-light" style="color:rgba(255,200,240,.55);">
                崩坏 3 · 逐火英桀之首
              </p>

              <h1
                class="hero-title shimmer-text text-[5rem] md:text-[9rem] lg:text-[12rem] font-bold tracking-widest select-none"
                style="line-height:1.15; padding-bottom:0.15em; padding-right:0.12em;"
              >
                Elysia
              </h1>

              <p class="hero-sub text-xl md:text-2xl mt-4 tracking-[.45em]" style="color:rgba(255,154,252,.8);">
                爱莉希雅
              </p>

              <div class="hero-deco mt-8 flex items-center justify-center gap-5">
                <div class="h-px w-20" style="background:linear-gradient(90deg,transparent,rgba(255,154,252,.55));" />
                <span class="animate-heartbeat text-2xl" style="color:#ff9afc;" aria-hidden="true">♡</span>
                <div class="h-px w-20" style="background:linear-gradient(270deg,transparent,rgba(255,154,252,.55));" />
              </div>
            </div>

            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style="z-index:10;animation:bounceSoft 2.5s ease-in-out infinite;" aria-hidden="true">
              <span class="text-[.6rem] tracking-[.5em] uppercase" style="color:rgba(255,200,240,.3);">scroll</span>
              <div class="w-px h-14" style="background:linear-gradient(180deg,rgba(255,154,252,.35),transparent);" />
            </div>
          </section>

          {/* ════════════════════════════════
              § 2  跑马灯 MARQUEE
              ════════════════════════════════ */}
          <div class="marquee-outer" aria-hidden="true">
            <div class="marquee-track">
              {/* 重复两次以实现无缝循环 */}
              <span class="marquee-item">
                <span class="text-[.65rem] tracking-[.55em] uppercase" style="color:rgba(255,154,252,.6);">ELYSIA</span>
                <span style="color:rgba(255,154,252,.3);">✦</span>
                <span class="text-[.65rem] tracking-[.45em]" style="color:rgba(255,255,255,.35);">粉色妖精</span>
                <span style="color:rgba(255,154,252,.3);">✦</span>
                <span class="text-[.65rem] tracking-[.55em] uppercase" style="color:rgba(255,154,252,.6);">PINK FAIRY</span>
                <span style="color:rgba(255,154,252,.3);">✦</span>
                <span class="text-[.65rem] tracking-[.45em]" style="color:rgba(255,255,255,.35);">逐火英桀</span>
                <span style="color:rgba(255,154,252,.3);">✦</span>
                <span class="text-[.65rem] tracking-[.55em] uppercase" style="color:rgba(255,154,252,.6);">HUMAN · HERRSCHER OF HUMAN EGO</span>
                <span style="color:rgba(255,154,252,.3);">✦</span>
                <span class="text-[.65rem] tracking-[.45em]" style="color:rgba(255,255,255,.35);">人之律者</span>
                <span style="color:rgba(255,154,252,.5);">♡</span>
              </span>
              <span class="marquee-item">
                <span class="text-[.65rem] tracking-[.55em] uppercase" style="color:rgba(255,154,252,.6);">ELYSIA</span>
                <span style="color:rgba(255,154,252,.3);">✦</span>
                <span class="text-[.65rem] tracking-[.45em]" style="color:rgba(255,255,255,.35);">粉色妖精</span>
                <span style="color:rgba(255,154,252,.3);">✦</span>
                <span class="text-[.65rem] tracking-[.55em] uppercase" style="color:rgba(255,154,252,.6);">PINK FAIRY</span>
                <span style="color:rgba(255,154,252,.3);">✦</span>
                <span class="text-[.65rem] tracking-[.45em]" style="color:rgba(255,255,255,.35);">逐火英桀</span>
                <span style="color:rgba(255,154,252,.3);">✦</span>
                <span class="text-[.65rem] tracking-[.55em] uppercase" style="color:rgba(255,154,252,.6);">HUMAN · HERRSCHER OF HUMAN EGO</span>
                <span style="color:rgba(255,154,252,.3);">✦</span>
                <span class="text-[.65rem] tracking-[.45em]" style="color:rgba(255,255,255,.35);">人之律者</span>
                <span style="color:rgba(255,154,252,.5);">♡</span>
              </span>
            </div>
          </div>

          {/* ════════════════════════════════
              § 3  大引言 1
              ════════════════════════════════ */}
          <section class="big-quote-section reveal w-full py-20 md:py-28 px-8">
            <span class="big-quote-deco" aria-hidden="true">"</span>
            <div class="max-w-3xl mx-auto text-center">
              <p class="big-quote-text">
                "粉色妖精小姐？嗯……如果你真的很想用这个称呼……<br class="hidden md:block" />
                那我当然是欣然接受啦♪"
              </p>
              <div class="mt-8 flex items-center justify-center gap-3">
                <div class="h-px w-12" style="background:rgba(255,154,252,.35);" />
                <cite class="not-italic text-sm tracking-[.4em]" style="color:rgba(200,100,140,.7);">Elysia</cite>
                <div class="h-px w-12" style="background:rgba(255,154,252,.35);" />
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              § 4  人物档案 PROFILE
              ════════════════════════════════ */}
          <section class="profile-section reveal w-full">
            <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">

              {/* 左：图片 */}
              <div class="profile-img-wrap relative" style="min-height:55vw; max-height:90vh;">
                <img
                  src="/img/Elysia_1.jpg"
                  alt="爱莉希雅"
                  loading="lazy"
                  style="object-position:top center;"
                />
                {/* 装饰边框角落 */}
                <div class="profile-img-border" />
                <div class="profile-img-corner corner-tl" />
                <div class="profile-img-corner corner-tr" />
                <div class="profile-img-corner corner-bl" />
                <div class="profile-img-corner corner-br" />
                {/* 右侧渐变过渡 */}
                <div class="absolute inset-y-0 right-0 w-24 hidden lg:block" style="background:linear-gradient(90deg,transparent,#070108);" />
              </div>

              {/* 右：信息 */}
              <div class="flex flex-col justify-center px-8 md:px-12 py-16 gap-8" style="background:#070108;">
                <div>
                  <p class="text-xs tracking-[.55em] uppercase mb-3" style="color:rgba(255,154,252,.5);">CHARACTER PROFILE</p>
                  <h2 class="text-4xl md:text-5xl font-bold mb-2" style="color:#fff;font-family:'HFPoet',serif;letter-spacing:.08em;">
                    爱莉希雅
                  </h2>
                  <p class="text-lg tracking-widest" style="color:rgba(255,154,252,.7);">Elysia</p>
                </div>

                <div class="glass-pink p-6 md:p-8">
                  <p class="text-sm md:text-base leading-loose mb-3" style="color:rgba(255,230,250,.8);text-indent:2em;">
                    凡事任凭心意而为，自由自在，与副首领的身份格格不入的少女。亦是逐火英桀的创立者，聚集并维系此十三人的核心人物。
                  </p>
                  <p class="text-sm md:text-base leading-loose mb-3" style="color:rgba(255,230,250,.8);text-indent:2em;">
                    只在喜欢的人上花时间，但每个人都很喜欢；只在有趣的事上花心思，但每件事都很有趣——心怀如此信念，带着真诚与热情拥抱每一天的纯真女孩♪
                  </p>
                  <p class="text-sm md:text-base leading-loose" style="color:rgba(255,230,250,.8);text-indent:2em;">
                    无论是引起她的注意，亦或是令她失去兴趣，都值得为之如临如履。
                  </p>
                </div>

                {/* 基本资料 */}
                <div>
                  <p class="text-xs tracking-[.45em] uppercase mb-4" style="color:rgba(255,154,252,.45);">BASIC INFO</p>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {STATS.map((s) => <StatItem {...s} />)}
                  </div>
                </div>

                {/* 故事按钮 */}
                <div class="flex items-center gap-4 pt-2">
                  <button
                    class="btn-intro"
                    type="button"
                    aria-label="打开爱莉希雅的故事"
                    x-on:click="modal = true"
                  >
                    她的故事♪
                  </button>
                  <p class="text-xs" style="color:rgba(255,154,252,.4);letter-spacing:.15em;">点击了解更多</p>
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              § 5  引言 2
              ════════════════════════════════ */}
          <section class="reveal w-full py-12 px-8 text-center" style="background:#0d0212;">
            <p class="text-base md:text-lg italic max-w-2xl mx-auto leading-loose" style="color:rgba(255,154,252,.6);font-family:'HFPoet',serif;">
              "如你所见，与那个凯文齐名的第二领袖，竟是一位如花朵般娇羞的少女——也就是我啦。"
            </p>
          </section>

          {/* ════════════════════════════════
              § 6  画廊 GALLERY（区域内展开）
              ════════════════════════════════ */}
          <section
            aria-label="爱莉希雅画廊"
            x-data={`{ lb: -1, imgs: [${GALLERY.map(g => `'${g.src}'`).join(',')}] }`}
            style="position:relative;"
          >
            {/* 标题行 */}
            <div class="gallery-header reveal">
              <div>
                <p class="text-xs tracking-[.55em] uppercase mb-1" style="color:rgba(255,154,252,.4);">GALLERY</p>
                <h2 class="text-3xl md:text-4xl font-bold" style="color:#fff;font-family:'HFPoet',serif;">
                  画廊
                </h2>
              </div>
              <p class="text-xs tracking-[.3em]" style="color:rgba(255,154,252,.3);">
                04 images · click to expand
              </p>
            </div>

            {/* ── gallery-wrap：bento + overlay 的共同定位父级 ── */}
            <div class="gallery-wrap">

              {/* Bento 网格（dim 时整体变暗）*/}
              <div
                class="gallery-bento"
                x-bind:class="lb >= 0 ? 'gallery-dimmed' : ''"
              >
                {GALLERY.map((item, i) => (
                  <div
                    class={`gallery-item ${item.cls}`}
                    style="cursor:zoom-in;"
                    x-on:click={`lb = ${i}`}
                  >
                    <img
                      src={item.src}
                      alt="爱莉希雅"
                      loading="lazy"
                      style={item.pos ? `object-position:${item.pos};` : ''}
                    />
                    <div class="gallery-overlay">
                      <span class="gallery-label">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 区域内展开覆盖层：精准覆盖 gallery-bento，不遮标题 */}
              <div
                class="gin-overlay"
                x-show="lb >= 0"
                x-on:click="lb = -1"
                style="display:none;"
                x-transition:enter="transition ease-out duration-350"
                x-transition:enter-start="opacity-0"
                x-transition:enter-end="opacity-100"
                x-transition:leave="transition ease-in duration-250"
                x-transition:leave-start="opacity-100"
                x-transition:leave-end="opacity-0"
              >
                <button
                  class="gin-close"
                  type="button"
                  aria-label="关闭"
                  data-lb-close=""
                  x-on:click="lb = -1"
                >✕</button>

                <div class="gin-main" x-on:click="$event.stopPropagation()">
                  <img
                    class="gin-img"
                    x-bind:src="lb >= 0 ? imgs[lb] : ''"
                    alt="爱莉希雅"
                  />
                </div>

                <div class="gin-thumbs" x-on:click="$event.stopPropagation()">
                  {GALLERY.map((item, i) => (
                    <button
                      class="gin-thumb"
                      type="button"
                      x-bind:class={`lb === ${i} ? 'gin-thumb-active' : ''`}
                      x-on:click={`lb = ${i}`}
                      aria-label={`查看图片 ${i + 1}`}
                    >
                      <img src={item.src} alt="" />
                    </button>
                  ))}
                </div>
              </div>

            </div>{/* /gallery-wrap */}
          </section>

          {/* ════════════════════════════════
              § 7  Elysia_3 全宽 Banner
              ════════════════════════════════ */}
          <section class="banner-section reveal">
            <img src="/img/Elysia_3.jpg" alt="爱莉希雅" loading="lazy" />
            <div class="banner-overlay">
              <p class="text-xs tracking-[.55em] uppercase mb-4" style="color:rgba(255,154,252,.5);">QUOTE</p>
              <blockquote
                class="text-2xl md:text-4xl font-bold max-w-3xl leading-snug text-center"
                style="font-family:'HFPoet',serif;color:#fff;text-shadow:0 4px 24px rgba(0,0,0,.6);"
              >
                "心怀如此信念，带着真诚与热情<br />拥抱每一天的纯真女孩♪"
              </blockquote>
            </div>
          </section>

          {/* ════════════════════════════════
              § 8  引言墙 QUOTES WALL
              ════════════════════════════════ */}
          <section class="quotes-wall w-full py-20 md:py-28 px-8">
            <div class="max-w-4xl mx-auto">
              <p class="text-xs tracking-[.55em] uppercase mb-14 reveal" style="color:rgba(255,154,252,.4);">
                HER WORDS · 她的话
              </p>

              <div class="flex flex-col gap-10">
                {EPILOGUE_QUOTES.map((q, i) => (
                  <div class="quote-card reveal">
                    <p class="quote-card-num">NO. 0{i + 1}</p>
                    <p class="quote-card-text">{q}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ════════════════════════════════
              § 9  结语 EPILOGUE
              ════════════════════════════════ */}
          <section class="epilogue-section reveal w-full py-16 md:py-20 px-6 flex flex-col items-center gap-8">
            <div class="text-center">
              <p class="text-xs tracking-[.55em] uppercase mb-2" style="color:rgba(144,26,26,.6);">EPILOGUE</p>
              <h2 class="text-3xl md:text-4xl font-bold" style="color:#901A1A;font-family:'HFPoet',serif;letter-spacing:.15em;">
                结语♪
              </h2>
            </div>

            <div class="w-40 h-px hidden md:block" style="background:linear-gradient(90deg,transparent,rgba(144,26,26,.3),transparent);" />

            {/* 音乐播放器 */}
            <div class="music-wrapper">
              <iframe
                frameborder="no"
                border="0"
                marginwidth="0"
                marginheight="0"
                width="400"
                height="86"
                src="https://music.163.com/outchain/player?type=2&id=1971144922&auto=0&height=66"
                title="爱莉希雅 BGM"
                class="block max-w-[80vw]"
              ></iframe>
            </div>

            {/* 作者留言 */}
            <div class="author-card max-w-xl w-full px-6 md:px-8 py-6 flex flex-col gap-3 text-center" style="color:rgba(255,255,255,.85);">
              <p class="text-sm md:text-base leading-loose">
                玩崩三时突发奇想看看 Elysia 这个域名是不是全被注册了，结果发现还有一大半，于是就买了一个给爱莉希雅当作生日礼物了，没用啥框架导致实在是不好看也不实用，等过段时间写个更好的
              </p>
              <p class="text-sm md:text-base leading-loose">
                （现在终于写了！用上了 Elysia.js，希望她喜欢♪）
              </p>
              <p class="text-sm md:text-base leading-loose">
                在这里祝爱莉希雅生日快乐！也祝各位舰长们双 11 开心♪
              </p>
              <p class="text-sm md:text-base leading-loose">
                主站{' '}
                <a href="https://xlbnas.cafe" target="_blank" rel="noopener noreferrer" class="site-link">
                  在这里
                </a>
              </p>
              <p class="text-right text-xs tracking-widest mt-2" style="color:rgba(144,26,26,.5);">
                BY XLBNAS
              </p>
            </div>
          </section>

          {/* ════════════════════════════════
              § 10  版权
              ════════════════════════════════ */}
          <footer class="copyright-bar w-full h-14 flex items-center justify-center text-center">
            Copyright © <span id="copyright-year">2024</span>&nbsp;Xlbnas.&nbsp;All Rights Reserved.
          </footer>

          {/* ════════════════════════════════
              弹窗 MODAL（Elysia_2.jpg 背景）
              ════════════════════════════════ */}
          {/* ── 故事弹窗 MODAL ── */}
          <div
            class="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="爱莉希雅的故事"
            x-show="modal"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0"
            x-transition:enter-end="opacity-100"
            x-transition:leave="transition ease-in duration-200"
            x-transition:leave-start="opacity-100"
            x-transition:leave-end="opacity-0"
            style="display:none;"
          >
            <div class="absolute inset-0" x-on:click="modal = false" aria-hidden="true" />

            <div
              class="modal-card"
              x-transition:enter="transition ease-out duration-300"
              x-transition:enter-start="opacity-0 scale-95"
              x-transition:enter-end="opacity-100 scale-100"
              x-transition:leave="transition ease-in duration-200"
              x-transition:leave-start="opacity-100 scale-100"
              x-transition:leave-end="opacity-0 scale-95"
            >
              <button class="modal-close" type="button" aria-label="关闭" data-modal-close="" x-on:click="modal = false">✕</button>

              <div class="modal-inner">
                <div class="glass" style="padding:1.75rem 2rem;">

                  {/* 标题 */}
                  <div class="flex items-center gap-3 mb-6">
                    <div class="h-px flex-1" style="background:rgba(255,154,252,.25);" />
                    <h2 class="text-base font-bold tracking-[.3em] whitespace-nowrap" style="color:#ff9afc;font-family:'HFPoet',serif;">
                      ✦ 她的故事 / Her Story ✦
                    </h2>
                    <div class="h-px flex-1" style="background:rgba(255,154,252,.25);" />
                  </div>

                  {/* 故事时间线 */}
                  <div class="flex flex-col gap-5">

                    <div class="story-block">
                      <p class="story-tag">第一章 · 英桀之始</p>
                      <p class="story-text">
                        爱莉希雅是逐火英桀最早的成员之一，也是将其他十二位英桀凝聚在一起的核心人物。她以真诚与温柔包容了每一个人——无论是孤傲的凯文，还是沉默的苏。
                      </p>
                    </div>

                    <div class="story-block">
                      <p class="story-tag">第二章 · 人之律者</p>
                      <p class="story-text">
                        她是"人之律者"——崩坏意志中罕见以人类之爱为核心的律者。她的能力并非源于愤怒或痛苦，而是对生命本质最纯粹的理解：爱、温暖与选择的自由。
                      </p>
                    </div>

                    <div class="story-block">
                      <p class="story-tag">第三章 · 最后的英桀</p>
                      <p class="story-text">
                        当英桀们一个个离去，爱莉希雅选择留到最后。她主动请缨，以自己为代价阻挡那场将毁灭世界的崩坏。临别前，她将微笑留给了每一位同伴，独自走向宿命。
                      </p>
                    </div>

                    <div class="story-block">
                      <p class="story-tag">第四章 · 乐土长眠</p>
                      <p class="story-text">
                        她的记忆化作"乐土"，一片永恒的粉色梦境。在那里，她依然微笑着等待，用她最后的温柔，守护着那些还活着的人。
                      </p>
                    </div>

                  </div>

                  {/* 分割线 */}
                  <div class="h-px my-5" style="background:rgba(255,154,252,.18);" />

                  {/* 名台词 */}
                  <p class="text-xs tracking-[.4em] uppercase mb-3" style="color:rgba(255,154,252,.45);">HER WORDS</p>
                  <div class="flex flex-col gap-3">
                    <blockquote class="story-quote">"人不是为了意义而活的，是活着才找到了意义。"</blockquote>
                    <blockquote class="story-quote">"我非常确信，这样的生命，是很值得珍惜的。"</blockquote>
                    <blockquote class="story-quote">"如果你记得我，那我就还活着。"</blockquote>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* JS */}
          <script src="/js/particles.js"></script>
          <script src="/js/app.js"></script>
        </body>
      </html>
    </>
  ) as unknown as string
}
