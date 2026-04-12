import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// ─── Math helpers ─────────────────────────────────────────────────────────────

type Vec3 = [number, number, number]

function norm(v: Vec3): Vec3 {
  const l = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2)
  return [v[0] / l, v[1] / l, v[2] / l]
}
function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]
}
function dot(a: Vec3, b: Vec3) { return a[0]*b[0] + a[1]*b[1] + a[2]*b[2] }
function sub(a: Vec3, b: Vec3): Vec3 { return [a[0]-b[0], a[1]-b[1], a[2]-b[2]] }

function rx(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a)
  return [v[0], v[1]*c - v[2]*s, v[1]*s + v[2]*c]
}
function ry(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a)
  return [v[0]*c + v[2]*s, v[1], -v[0]*s + v[2]*c]
}
function rz(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a)
  return [v[0]*c - v[1]*s, v[0]*s + v[1]*c, v[2]]
}

// ─── Geometry ─────────────────────────────────────────────────────────────────

const PHI = (1 + Math.sqrt(5)) / 2

const ICOSA_VERTS: Vec3[] = ([
  [0,1,PHI],[0,-1,PHI],[0,1,-PHI],[0,-1,-PHI],
  [1,PHI,0],[-1,PHI,0],[1,-PHI,0],[-1,-PHI,0],
  [PHI,0,1],[-PHI,0,1],[PHI,0,-1],[-PHI,0,-1],
] as Vec3[]).map(norm)

// 20 triangular faces — all 30 edges verified
const ICOSA_FACES: [number,number,number][] = [
  [0,1,8],[0,8,4],[0,4,5],[0,5,9],[0,9,1],         // fan around v0
  [3,6,7],[3,10,6],[3,2,10],[3,11,2],[3,7,11],      // fan around v3
  [1,6,7],[1,7,9],[1,6,8],                          // middle belt A
  [4,8,10],[4,10,2],[4,2,5],                        // middle belt B
  [5,2,11],[5,11,9],                                // middle belt C
  [6,8,10],[7,9,11],                                // closing edges
]

const OCTA_VERTS: Vec3[] = [
  [1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],
]
// 8 triangular faces
const OCTA_FACES: [number,number,number][] = [
  [0,2,4],[0,4,3],[0,3,5],[0,5,2],
  [1,4,2],[1,3,4],[1,5,3],[1,2,5],
]

// ─── Scene objects ────────────────────────────────────────────────────────────

// Global light direction (normalized)
const LIGHT: Vec3 = norm([0.5, -0.8, 0.6])

interface SolidObj {
  kind: 'solid'
  verts: Vec3[]
  faces: [number,number,number][]
  nx: number; ny: number       // current fractional position
  ox: number; oy: number       // offset from cursor
  lerpN: number                // position lerp speed
  baseR: number
  ax: number; ay: number; az: number
  vx: number; vy: number; vz: number
  spinBoost: number
}

interface SphereObj {
  kind: 'sphere'
  nx: number; ny: number
  ox: number; oy: number
  lerpN: number
  baseR: number
  t: number                    // highlight orbit phase
  tSpd: number
  spinBoost: number
}

type SceneObj = SolidObj | SphereObj

// At cursor (0.5, 0.5), nx = 0.5 + ox, ny = 0.5 + oy
const SCENE: SceneObj[] = [
  {
    kind: 'solid', verts: ICOSA_VERTS, faces: ICOSA_FACES,
    nx: 0.84, ny: 0.22, ox: 0.34, oy: -0.28, lerpN: 0.022,
    baseR: 120, ax: 0.4, ay: 0.9, az: 0.2,
    vx: 0.0018, vy: 0.0032, vz: 0.0011, spinBoost: 0,
  },
  {
    kind: 'sphere',
    nx: 0.10, ny: 0.74, ox: -0.40, oy: 0.24, lerpN: 0.034,
    baseR: 80, t: 0, tSpd: 0.006, spinBoost: 0,
  },
  {
    kind: 'solid', verts: OCTA_VERTS, faces: OCTA_FACES,
    nx: 0.76, ny: 0.88, ox: 0.26, oy: 0.38, lerpN: 0.018,
    baseR: 70, ax: 0.6, ay: 1.2, az: 0.4,
    vx: 0.0035, vy: -0.0018, vz: 0.0026, spinBoost: 0,
  },
  {
    kind: 'sphere',
    nx: 0.14, ny: 0.16, ox: -0.36, oy: -0.34, lerpN: 0.028,
    baseR: 50, t: Math.PI, tSpd: 0.009, spinBoost: 0,
  },
]

const REF_W = 1440

// ─── Renderers ────────────────────────────────────────────────────────────────

function drawSolid(
  ctx: CanvasRenderingContext2D,
  obj: SolidObj,
  cx: number, cy: number, r: number,
  tiltX: number, tiltY: number,
  speedMult: number,
  isDark: boolean,
) {
  obj.ax += obj.vx * speedMult
  obj.ay += obj.vy * speedMult
  obj.az += obj.vz * speedMult

  const tv: Vec3[] = obj.verts.map(v => {
    let p = rx(v, obj.ax + tiltX)
    p = ry(p, obj.ay + tiltY)
    return rz(p, obj.az)
  })

  const FOV = 3.5
  const pv = tv.map(v => {
    const sz = FOV / (FOV + v[2] + 1)
    return { x: cx + v[0] * r * sz, y: cy + v[1] * r * sz, z: v[2] }
  })

  // Compute brightness + depth per face, sort back→front
  const fdata = obj.faces.map(([a,b,c]) => {
    const va = tv[a], vb = tv[b], vc = tv[c]
    const centZ = (va[2] + vb[2] + vc[2]) / 3
    const n = norm(cross(sub(vb, va), sub(vc, va)))
    const brightness = 0.15 + Math.max(0, -dot(n, LIGHT)) * 0.85
    return { a, b, c, centZ, brightness }
  })
  fdata.sort((x, y) => x.centZ - y.centZ)

  const alphaBoost = Math.min(1.4, 1 + obj.spinBoost * 0.04)

  fdata.forEach(({ a, b, c, centZ, brightness }) => {
    const depth = (centZ + 1) / 2
    const alpha = Math.min(0.88, alphaBoost * (0.08 + depth * 0.28) * (0.3 + brightness * 0.7))

    ctx.beginPath()
    ctx.moveTo(pv[a].x, pv[a].y)
    ctx.lineTo(pv[b].x, pv[b].y)
    ctx.lineTo(pv[c].x, pv[c].y)
    ctx.closePath()

    if (isDark) {
      const v = Math.round(160 + brightness * 80)
      ctx.fillStyle = `rgba(${v},${v-3},${v-6},${alpha.toFixed(3)})`
    } else {
      const v = Math.round(55 + brightness * 145)
      ctx.fillStyle = `rgba(${v},${v-2},${v-5},${alpha.toFixed(3)})`
    }
    ctx.fill()

    // Crisp edge lines
    const ea = (0.04 + depth * 0.07) * alphaBoost
    ctx.strokeStyle = isDark
      ? `rgba(245,244,242,${ea.toFixed(3)})`
      : `rgba(26,24,22,${ea.toFixed(3)})`
    ctx.lineWidth = 0.4
    ctx.stroke()
  })
}

function drawSphere(
  ctx: CanvasRenderingContext2D,
  obj: SphereObj,
  cx: number, cy: number, r: number,
  isDark: boolean,
) {
  // Highlight orbits the surface
  const hx = cx - r * (0.28 + 0.06 * Math.cos(obj.t))
  const hy = cy - r * (0.32 + 0.06 * Math.sin(obj.t * 0.8))
  const boost = Math.min(1.5, 1 + obj.spinBoost * 0.08)

  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.clip()

  // Diffuse body
  const body = ctx.createRadialGradient(hx, hy, 0, cx, cy, r)
  if (isDark) {
    body.addColorStop(0, `rgba(245,244,242,${(0.14 * boost).toFixed(3)})`)
    body.addColorStop(0.5, `rgba(200,195,190,${(0.055 * boost).toFixed(3)})`)
    body.addColorStop(1,   `rgba(140,135,130,${(0.018 * boost).toFixed(3)})`)
  } else {
    body.addColorStop(0, `rgba(255,255,255,${(0.22 * boost).toFixed(3)})`)
    body.addColorStop(0.5, `rgba(210,205,200,${(0.09 * boost).toFixed(3)})`)
    body.addColorStop(1,   `rgba(120,113,108,${(0.03 * boost).toFixed(3)})`)
  }
  ctx.fillStyle = body
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2)

  // Specular
  const spec = ctx.createRadialGradient(hx, hy, 0, hx, hy, r * 0.28)
  spec.addColorStop(0, `rgba(255,255,255,${(0.55 * boost).toFixed(3)})`)
  spec.addColorStop(0.5, `rgba(255,255,255,${(0.18 * boost).toFixed(3)})`)
  spec.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = spec
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2)

  // Rim
  const rim = ctx.createRadialGradient(cx, cy, r * 0.68, cx, cy, r)
  rim.addColorStop(0, 'rgba(255,255,255,0)')
  rim.addColorStop(1, isDark
    ? `rgba(245,244,242,${(0.10 * boost).toFixed(3)})`
    : `rgba(255,255,255,${(0.16 * boost).toFixed(3)})`)
  ctx.fillStyle = rim
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2)

  ctx.restore()

  // Edge ring
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.strokeStyle = isDark
    ? `rgba(245,244,242,${(0.09 * boost).toFixed(3)})`
    : `rgba(26,24,22,${(0.07 * boost).toFixed(3)})`
  ctx.lineWidth = 0.6
  ctx.stroke()
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroGeometry() {
  const reduced = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseSmooth = useRef({ x: 0.5, y: 0.5 })
  const mouseTarget = useRef({ x: 0.5, y: 0.5 })
  const scene = useRef<SceneObj[]>(SCENE.map(o => ({ ...o })))
  const raf = useRef(0)

  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement!
    const resize = () => {
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      mouseTarget.current = {
        x: Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
      }
    }
    const onLeave = () => { mouseTarget.current = { x: 0.5, y: 0.5 } }
    const onClick = () => scene.current.forEach(o => { o.spinBoost = 10 })

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)
    parent.addEventListener('click', onClick)

    const loop = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      const m = mouseSmooth.current
      m.x += (mouseTarget.current.x - m.x) * 0.04
      m.y += (mouseTarget.current.y - m.y) * 0.04

      const tiltX = (m.y - 0.5) * 0.45
      const tiltY = (m.x - 0.5) * 0.45

      const isDark = document.documentElement.classList.contains('dark')
      const scale = Math.max(0.45, width / REF_W)

      scene.current.forEach(obj => {
        obj.spinBoost *= 0.93
        const speedMult = 1 + obj.spinBoost

        // Drift position toward cursor + offset
        obj.nx += (m.x + obj.ox - obj.nx) * obj.lerpN
        obj.ny += (m.y + obj.oy - obj.ny) * obj.lerpN

        const cx = obj.nx * width
        const cy = obj.ny * height
        const r = obj.baseR * scale

        if (obj.kind === 'solid') {
          drawSolid(ctx, obj, cx, cy, r, tiltX, tiltY, speedMult, isDark)
        } else {
          obj.t += obj.tSpd * speedMult
          drawSphere(ctx, obj, cx, cy, r, isDark)
        }
      })

      raf.current = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(raf.current)
      ro.disconnect()
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
      parent.removeEventListener('click', onClick)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none select-none"
      aria-hidden
    />
  )
}
