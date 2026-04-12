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

// 20 triangular faces
const ICOSA_FACES: [number,number,number][] = [
  [0,1,8],[0,8,4],[0,4,5],[0,5,9],[0,9,1],
  [3,6,7],[3,10,6],[3,2,10],[3,11,2],[3,7,11],
  [1,6,7],[1,7,9],[1,6,8],
  [4,8,10],[4,10,2],[4,2,5],
  [5,2,11],[5,11,9],
  [6,8,10],[7,9,11],
]

const OCTA_VERTS: Vec3[] = [
  [1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],
]
const OCTA_FACES: [number,number,number][] = [
  [0,2,4],[0,4,3],[0,3,5],[0,5,2],
  [1,4,2],[1,3,4],[1,5,3],[1,2,5],
]

// Tetrahedron — 4 vertices, 4 faces, outward normals verified
const TETRA_VERTS: Vec3[] = ([
  [1,1,1], [-1,-1,1], [-1,1,-1], [1,-1,-1],
] as Vec3[]).map(norm)

const TETRA_FACES: [number,number,number][] = [
  [0,2,1], [0,1,3], [0,3,2], [1,2,3],
]

// ─── Scene ────────────────────────────────────────────────────────────────────

const LIGHT: Vec3 = norm([0.5, -0.8, 0.6])

interface SolidObj {
  kind: 'solid'
  verts: Vec3[]
  faces: [number,number,number][]
  nx: number; ny: number     // current fractional screen position
  ox: number; oy: number     // offset from cursor (tighter = ±0.14–0.22)
  lerpN: number
  baseR: number
  ax: number; ay: number; az: number
  vx: number; vy: number; vz: number
  spinBoost: number
}

// Offsets are sized so objects stay close — at cursor (0.5, 0.5) they sit at
// visually balanced positions; drift target is always clamped to [0.04, 0.96]
const SCENE: SolidObj[] = [
  // Large icosahedron — top-right
  {
    kind: 'solid', verts: ICOSA_VERTS, faces: ICOSA_FACES,
    nx: 0.72, ny: 0.36, ox: 0.22, oy: -0.14, lerpN: 0.022,
    baseR: 120, ax: 0.4, ay: 0.9, az: 0.2,
    vx: 0.0018, vy: 0.0032, vz: 0.0011, spinBoost: 0,
  },
  // Medium tetrahedron — bottom-left
  {
    kind: 'solid', verts: TETRA_VERTS, faces: TETRA_FACES,
    nx: 0.30, ny: 0.66, ox: -0.20, oy: 0.16, lerpN: 0.034,
    baseR: 72, ax: 1.1, ay: 0.3, az: 0.7,
    vx: -0.0030, vy: 0.0042, vz: 0.0020, spinBoost: 0,
  },
  // Small octahedron — bottom-right
  {
    kind: 'solid', verts: OCTA_VERTS, faces: OCTA_FACES,
    nx: 0.66, ny: 0.70, ox: 0.16, oy: 0.20, lerpN: 0.018,
    baseR: 68, ax: 0.6, ay: 1.2, az: 0.4,
    vx: 0.0035, vy: -0.0018, vz: 0.0026, spinBoost: 0,
  },
  // Small tetrahedron — top-left
  {
    kind: 'solid', verts: TETRA_VERTS, faces: TETRA_FACES,
    nx: 0.36, ny: 0.32, ox: -0.14, oy: -0.18, lerpN: 0.028,
    baseR: 50, ax: 0.8, ay: 0.5, az: 1.0,
    vx: -0.0025, vy: 0.0048, vz: -0.0022, spinBoost: 0,
  },
]

const REF_W = 1440

// ─── Renderer ────────────────────────────────────────────────────────────────

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

  // Per-face brightness + depth, painter's sort
  const fdata = obj.faces.map(([a, b, c]) => {
    const va = tv[a], vb = tv[b], vc = tv[c]
    const centZ = (va[2] + vb[2] + vc[2]) / 3
    const n = norm(cross(sub(vb, va), sub(vc, va)))
    const brightness = 0.15 + Math.max(0, -dot(n, LIGHT)) * 0.85
    return { a, b, c, centZ, brightness }
  })
  fdata.sort((x, y) => x.centZ - y.centZ)

  const ab = Math.min(1.4, 1 + obj.spinBoost * 0.04)

  fdata.forEach(({ a, b, c, centZ, brightness }) => {
    const depth = (centZ + 1) / 2
    const alpha = Math.min(0.88, ab * (0.08 + depth * 0.28) * (0.3 + brightness * 0.7))

    ctx.beginPath()
    ctx.moveTo(pv[a].x, pv[a].y)
    ctx.lineTo(pv[b].x, pv[b].y)
    ctx.lineTo(pv[c].x, pv[c].y)
    ctx.closePath()

    if (isDark) {
      const v = Math.round(155 + brightness * 85)
      ctx.fillStyle = `rgba(${v},${v-3},${v-6},${alpha.toFixed(3)})`
    } else {
      const v = Math.round(50 + brightness * 148)
      ctx.fillStyle = `rgba(${v},${v-2},${v-5},${alpha.toFixed(3)})`
    }
    ctx.fill()

    const ea = (0.04 + depth * 0.07) * ab
    ctx.strokeStyle = isDark
      ? `rgba(245,244,242,${ea.toFixed(3)})`
      : `rgba(26,24,22,${ea.toFixed(3)})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  })
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroGeometry() {
  const reduced = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseSmooth = useRef({ x: 0.5, y: 0.5 })
  const mouseTarget = useRef({ x: 0.5, y: 0.5 })
  const scene = useRef<SolidObj[]>(SCENE.map(o => ({ ...o })))
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

        // Clamp drift target so objects never leave the canvas
        const tx = Math.max(0.04, Math.min(0.96, m.x + obj.ox))
        const ty = Math.max(0.04, Math.min(0.96, m.y + obj.oy))
        obj.nx += (tx - obj.nx) * obj.lerpN
        obj.ny += (ty - obj.ny) * obj.lerpN

        drawSolid(
          ctx, obj,
          obj.nx * width, obj.ny * height,
          obj.baseR * scale,
          tiltX, tiltY, speedMult, isDark,
        )
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
