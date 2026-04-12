import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// ─── Geometry definitions ────────────────────────────────────────────────────

const PHI = (1 + Math.sqrt(5)) / 2

type Vec3 = [number, number, number]

function norm(v: Vec3): Vec3 {
  const l = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2)
  return [v[0] / l, v[1] / l, v[2] / l]
}

// Icosahedron — 12 vertices, 30 edges
const ICOSA_VERTS: Vec3[] = (
  [
    [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
    [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
    [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
  ] as Vec3[]
).map(norm)

const ICOSA_EDGES: [number, number][] = [
  [0, 1], [0, 4], [0, 5], [0, 8], [0, 9],
  [1, 6], [1, 7], [1, 8], [1, 9],
  [2, 3], [2, 4], [2, 5], [2, 10], [2, 11],
  [3, 6], [3, 7], [3, 10], [3, 11],
  [4, 5], [4, 8], [4, 10],
  [5, 9], [5, 11],
  [6, 7], [6, 8], [6, 10],
  [7, 9], [7, 11],
  [8, 10], [9, 11],
]

// Octahedron — 6 vertices, 12 edges
const OCTA_VERTS: Vec3[] = [
  [1, 0, 0], [-1, 0, 0],
  [0, 1, 0], [0, -1, 0],
  [0, 0, 1], [0, 0, -1],
]
const OCTA_EDGES: [number, number][] = [
  [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 4], [2, 5], [3, 4], [3, 5],
]

// Cube — 8 vertices, 12 edges
const CUBE_VERTS: Vec3[] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
].map(v => norm(v as Vec3))
const CUBE_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
]

const GEOS = [
  { verts: ICOSA_VERTS, edges: ICOSA_EDGES },
  { verts: OCTA_VERTS, edges: OCTA_EDGES },
  { verts: CUBE_VERTS, edges: CUBE_EDGES },
]

// ─── Rotation helpers ────────────────────────────────────────────────────────

function rx(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a)
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]
}
function ry(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a)
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]
}
function rz(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a)
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]]
}

// ─── Scene config ────────────────────────────────────────────────────────────

interface Shape {
  geo: 0 | 1 | 2
  /** Fractional position on the canvas [0–1] */
  nx: number
  ny: number
  /** Base radius in px at reference width 1440 */
  baseR: number
  ax: number; ay: number; az: number
  vx: number; vy: number; vz: number
  /** Max opacity at closest depth */
  maxAlpha: number
}

const SHAPES: Shape[] = [
  // Large icosahedron, top-right
  {
    geo: 0, nx: 0.84, ny: 0.22, baseR: 118,
    ax: 0.30, ay: 0.70, az: 0.10,
    vx: 0.0022, vy: 0.0038, vz: 0.0014,
    maxAlpha: 0.22,
  },
  // Medium octahedron, bottom-left
  {
    geo: 1, nx: 0.10, ny: 0.74, baseR: 72,
    ax: 1.20, ay: 0.30, az: 0.80,
    vx: -0.0032, vy: 0.0028, vz: 0.0045,
    maxAlpha: 0.16,
  },
  // Smaller icosahedron, bottom-right
  {
    geo: 0, nx: 0.76, ny: 0.88, baseR: 62,
    ax: 0.50, ay: 1.10, az: 0.30,
    vx: 0.0042, vy: -0.0020, vz: 0.0028,
    maxAlpha: 0.13,
  },
  // Small cube, top-left
  {
    geo: 2, nx: 0.14, ny: 0.16, baseR: 48,
    ax: 0.80, ay: 0.40, az: 1.00,
    vx: -0.0028, vy: 0.0052, vz: -0.0024,
    maxAlpha: 0.11,
  },
]

const REF_W = 1440

// ─── Component ───────────────────────────────────────────────────────────────

export function HeroGeometry() {
  const reduced = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseSmooth = useRef({ x: 0.5, y: 0.5 })
  const mouseTarget = useRef({ x: 0.5, y: 0.5 })
  const shapes = useRef<Shape[]>(SHAPES.map(s => ({ ...s })))
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
      const r = parent.getBoundingClientRect()
      mouseTarget.current = {
        x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
        y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
      }
    }
    const onLeave = () => {
      mouseTarget.current = { x: 0.5, y: 0.5 }
    }

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)

    const loop = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      // Smooth cursor lerp
      const m = mouseSmooth.current
      const t = mouseTarget.current
      m.x += (t.x - m.x) * 0.04
      m.y += (t.y - m.y) * 0.04

      // Cursor → subtle global rotation tilt (±0.3 rad)
      const tiltX = (m.y - 0.5) * 0.6
      const tiltY = (m.x - 0.5) * 0.6

      const isDark = document.documentElement.classList.contains('dark')
      const rgb = isDark ? '245,244,242' : '26,24,22'
      const scale = width / REF_W

      shapes.current.forEach(shape => {
        // Advance auto-rotation
        shape.ax += shape.vx
        shape.ay += shape.vy
        shape.az += shape.vz

        const geo = GEOS[shape.geo]
        const cx = shape.nx * width
        const cy = shape.ny * height
        const r = shape.baseR * Math.max(0.5, scale)

        // Project all vertices
        const proj = geo.verts.map(v => {
          // Apply shape rotation, then cursor tilt on top
          let p = rx(v, shape.ax + tiltX)
          p = ry(p, shape.ay + tiltY)
          p = rz(p, shape.az)
          // Perspective divide
          const FOV = 3.5
          const sz = FOV / (FOV + p[2] + 1)
          return { sx: cx + p[0] * r * sz, sy: cy + p[1] * r * sz, z: p[2] }
        })

        // Draw edges with depth-based opacity
        ctx.lineWidth = Math.max(0.5, 0.8 * Math.min(1, scale))
        geo.edges.forEach(([a, b]) => {
          const pa = proj[a]
          const pb = proj[b]
          // Depth in [0, 1]: 1 = front, 0 = back
          const depth = ((pa.z + pb.z) / 2 + 1) / 2
          const alpha = shape.maxAlpha * (0.25 + depth * 0.75)
          ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(pa.sx, pa.sy)
          ctx.lineTo(pb.sx, pb.sy)
          ctx.stroke()
        })
      })

      raf.current = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      cancelAnimationFrame(raf.current)
      ro.disconnect()
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
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
