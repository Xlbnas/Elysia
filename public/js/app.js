;(function () {
  'use strict'

  /* ─── 滚动淡入 ─── */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

  /* ─── 版权年份 ─── */
  const yearEl = document.getElementById('copyright-year')
  if (yearEl) yearEl.textContent = String(new Date().getFullYear())

  /* ─── 画廊：点击打开 Lightbox，鼠标悬停轻微放大 ─── */
  /* 倾斜效果已移除，避免与 click 冲突；放大由纯 CSS :hover 完成 */

  /* ─── 鼠标粉色光晕（桌面端，即时跟随）─── */
  if (!window.matchMedia('(pointer: coarse)').matches) {
    const glow = document.createElement('div')
    const SIZE = 320
    Object.assign(glow.style, {
      position:      'fixed',
      width:         SIZE + 'px',
      height:        SIZE + 'px',
      borderRadius:  '50%',
      background:    'radial-gradient(circle, rgba(255,154,252,.065) 0%, transparent 70%)',
      pointerEvents: 'none',
      zIndex:        '5',
      top:           '0',
      left:          '0',
      willChange:    'transform',
    })
    document.body.appendChild(glow)

    /* 用 transform 代替 left/top，无 CSS transition，实现零延迟 */
    window.addEventListener('mousemove', (e) => {
      glow.style.transform = `translate(${e.clientX - SIZE / 2}px, ${e.clientY - SIZE / 2}px)`
    }, { passive: true })
  }

  /* ─── ESC 关闭所有弹出层 ─── */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    const modalClose = document.querySelector('[data-modal-close]')
    if (modalClose) modalClose.dispatchEvent(new MouseEvent('click'))
    const lbClose = document.querySelector('[data-lb-close]')
    if (lbClose) lbClose.dispatchEvent(new MouseEvent('click'))
  })

  /* ─── 体重彩蛋 ─── */
  document.querySelectorAll('.secret-text').forEach((el) => {
    el.addEventListener('mouseenter', () => el.setAttribute('title', '不许四舍五入！'))
  })
})()
