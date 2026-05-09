;(function () {
  'use strict'

  const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('particles-canvas'))
  if (!canvas) return
  const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'))

  /* ─── Canvas 尺寸同步 ─── */
  function resize() {
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize, { passive: true })

  /* ─── 工具 ─── */
  const rnd = (min, max) => Math.random() * (max - min) + min

  /* ─── 粒子类 ─── */
  class Particle {
    constructor (scatter) {
      this._scatter = scatter
      this._reset()
    }

    _reset () {
      this.x     = rnd(0, canvas.width)
      this.y     = this._scatter ? rnd(-canvas.height, -10) : rnd(-100, -10)
      this.size  = rnd(5, 15)
      this.vy    = rnd(0.55, 1.65)
      this.vx    = rnd(-0.7, 0.7)
      this.alpha = rnd(0.28, 0.68)
      this.rot   = rnd(0, Math.PI * 2)
      this.dRot  = rnd(-0.025, 0.025)
      this.sway  = rnd(0, Math.PI * 2)
      this.dSway = rnd(0.012, 0.028)
      this.amp   = rnd(0.3, 1.1)
      /* 60% 粉色花瓣，40% 心形 */
      this.kind  = Math.random() > 0.4 ? 'petal' : 'heart'
    }

    /* ── 绘制心形 ── */
    _drawHeart (s) {
      const r = s * 0.45
      ctx.beginPath()
      ctx.moveTo(0, r * 0.5)
      ctx.bezierCurveTo(-r, -r * 0.2, -r * 1.8,  r * 0.9,  0, r * 1.8)
      ctx.bezierCurveTo( r * 1.8, r * 0.9,  r, -r * 0.2, 0, r * 0.5)
      ctx.closePath()
    }

    /* ── 绘制花瓣（椭圆 + 柔和渐变）── */
    _drawPetal (s) {
      ctx.beginPath()
      ctx.ellipse(0, 0, s * 0.32, s * 0.58, 0, 0, Math.PI * 2)
      ctx.closePath()
    }

    update () {
      this.sway += this.dSway
      this.x    += this.vx + Math.sin(this.sway) * this.amp
      this.y    += this.vy
      this.rot  += this.dRot

      if (
        this.y > canvas.height + 40 ||
        this.x < -40 ||
        this.x > canvas.width + 40
      ) {
        this._scatter = false
        this._reset()
      }
    }

    draw () {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rot)
      ctx.globalAlpha = this.alpha

      if (this.kind === 'heart') {
        ctx.fillStyle = '#ff9afc'
        this._drawHeart(this.size)
        ctx.fill()
      } else {
        /* 径向渐变花瓣 */
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.65)
        g.addColorStop(0,   '#ffeaf9')
        g.addColorStop(0.6, '#ffb8f5')
        g.addColorStop(1,   '#ff9afc')
        ctx.fillStyle = g
        this._drawPetal(this.size)
        ctx.fill()
      }

      ctx.restore()
    }
  }

  /* ─── 初始化粒子池 ─── */
  const TOTAL = Math.min(70, Math.floor(window.innerWidth / 18))
  const pool  = Array.from({ length: TOTAL }, () => new Particle(true))

  /* ─── 主循环 ─── */
  function loop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const p of pool) {
      p.update()
      p.draw()
    }
    requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop)
})()
