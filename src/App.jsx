import { useEffect, useRef, useState } from 'react'

/* ─── SVG Icons ─────────────────────────────────────────────── */
const DockerIcon = ({ size = 48, color = '#C1440E' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="4" y="28" width="6" height="5" rx="1" stroke={color} strokeWidth="1.5"/>
    <rect x="12" y="28" width="6" height="5" rx="1" stroke={color} strokeWidth="1.5"/>
    <rect x="20" y="28" width="6" height="5" rx="1" stroke={color} strokeWidth="1.5"/>
    <rect x="12" y="21" width="6" height="5" rx="1" stroke={color} strokeWidth="1.5"/>
    <rect x="20" y="21" width="6" height="5" rx="1" stroke={color} strokeWidth="1.5"/>
    <rect x="20" y="14" width="6" height="5" rx="1" stroke={color} strokeWidth="1.5"/>
    <path d="M34 31c1.5-1 5-4 4-9-2 0-6 1-7 4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4 33s1 4 6 4h22c4 0 6-2 6-5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="7" cy="22" r="2" stroke={color} strokeWidth="1.5"/>
    <line x1="7" y1="20" x2="7" y2="16" stroke={color} strokeWidth="1.5"/>
  </svg>
)

const K8sIcon = ({ size = 48, color = '#C1440E' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <polygon points="24,6 30,18 44,20 34,30 36,44 24,38 12,44 14,30 4,20 18,18" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="24" cy="24" r="6" stroke={color} strokeWidth="1.5"/>
    <line x1="24" y1="18" x2="24" y2="6" stroke={color} strokeWidth="1" strokeDasharray="2,2"/>
    <line x1="24" y1="30" x2="24" y2="44" stroke={color} strokeWidth="1" strokeDasharray="2,2"/>
    <line x1="18" y1="24" x2="4" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2,2"/>
    <line x1="30" y1="24" x2="44" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2,2"/>
  </svg>
)

const CloudIcon = ({ size = 48, color = '#C1440E' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M12 34a8 8 0 01-2-15.5A10 10 0 0130 18a6 6 0 015 10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="16" y="28" width="16" height="10" rx="2" stroke={color} strokeWidth="1.5"/>
    <line x1="20" y1="33" x2="28" y2="33" stroke={color} strokeWidth="1"/>
    <line x1="24" y1="38" x2="24" y2="42" stroke={color} strokeWidth="1.5"/>
    <line x1="20" y1="42" x2="28" y2="42" stroke={color} strokeWidth="1.5"/>
  </svg>
)

const PostGISIcon = ({ size = 48, color = '#C1440E' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <polygon points="24,4 42,14 42,34 24,44 6,34 6,14" stroke={color} strokeWidth="1.5" fill="none"/>
    <polygon points="24,12 34,18 34,30 24,36 14,30 14,18" stroke={color} strokeWidth="1" strokeDasharray="3,2" fill="none"/>
    <circle cx="24" cy="24" r="4" stroke={color} strokeWidth="1.5"/>
    <line x1="24" y1="4" x2="24" y2="12" stroke={color} strokeWidth="1"/>
    <line x1="24" y1="36" x2="24" y2="44" stroke={color} strokeWidth="1"/>
    <line x1="6" y1="14" x2="14" y2="18" stroke={color} strokeWidth="1"/>
    <line x1="34" y1="30" x2="42" y2="34" stroke={color} strokeWidth="1"/>
  </svg>
)

const PipelineIcon = ({ size = 48, color = '#C1440E' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="4" y="18" width="10" height="12" rx="2" stroke={color} strokeWidth="1.5"/>
    <rect x="19" y="18" width="10" height="12" rx="2" stroke={color} strokeWidth="1.5"/>
    <rect x="34" y="18" width="10" height="12" rx="2" stroke={color} strokeWidth="1.5"/>
    <line x1="14" y1="24" x2="19" y2="24" stroke={color} strokeWidth="1.5"/>
    <polygon points="17,22 19,24 17,26" fill={color}/>
    <line x1="29" y1="24" x2="34" y2="24" stroke={color} strokeWidth="1.5"/>
    <polygon points="32,22 34,24 32,26" fill={color}/>
    <circle cx="9" cy="24" r="2" fill={color} opacity=".4"/>
    <circle cx="24" cy="24" r="2" fill={color} opacity=".4"/>
    <circle cx="39" cy="24" r="2" fill={color} opacity=".4"/>
  </svg>
)

const GeoAIIcon = ({ size = 48, color = '#C1440E' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="1.5"/>
    <ellipse cx="24" cy="24" rx="18" ry="8" stroke={color} strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="24" y1="6" x2="24" y2="42" stroke={color} strokeWidth="1" strokeDasharray="3,2"/>
    <circle cx="24" cy="24" r="4" fill={color} opacity=".2" stroke={color} strokeWidth="1.5"/>
    <circle cx="24" cy="14" r="2.5" stroke={color} strokeWidth="1.5"/>
    <circle cx="32" cy="28" r="2" stroke={color} strokeWidth="1.5"/>
    <circle cx="16" cy="30" r="2" stroke={color} strokeWidth="1.5"/>
  </svg>
)

/* ─── Animated Grid Canvas (Hero) ───────────────────────────── */
function HeroCanvas() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = e => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    window.addEventListener('mousemove', onMove)

    // Coordinate points
    const pts = []
    for (let i = 0; i < 40; i++) {
      pts.push({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - .5) * .0003,
        vy: (Math.random() - .5) * .0003,
      })
    }

    let t = 0
    const draw = () => {
      t += .008
      const w = canvas.width, h = canvas.height
      ctx.clearRect(0, 0, w, h)

      // grid offset by mouse
      const ox = (mouse.current.x / w - .5) * 20
      const oy = (mouse.current.y / h - .5) * 20
      const gs = 48

      ctx.strokeStyle = 'rgba(193,68,14,0.1)'
      ctx.lineWidth = 1
      for (let x = (ox % gs); x < w; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = (oy % gs); y < h; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      // coordinate labels
      ctx.font = '9px IBM Plex Mono'
      ctx.fillStyle = 'rgba(193,68,14,0.18)'
      ctx.textAlign = 'left'
      for (let xi = 0; xi < 5; xi++) {
        for (let yi = 0; yi < 4; yi++) {
          const lx = xi * (w / 4) + 4
          const ly = yi * (h / 3) + 10
          const lon = (73.04 + xi * 0.5 + ox * 0.01).toFixed(2)
          const lat = (33.72 + yi * 0.3 - oy * 0.01).toFixed(2)
          ctx.fillText(`${lon}°E`, lx, ly)
          ctx.fillText(`${lat}°N`, lx, ly + 12)
        }
      }

      // moving dots
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(193,68,14,0.35)'
        ctx.fill()
      })

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = (pts[i].x - pts[j].x) * w
          const dy = (pts[i].y - pts[j].y) * h
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x * w, pts[i].y * h)
            ctx.lineTo(pts[j].x * w, pts[j].y * h)
            ctx.strokeStyle = `rgba(193,68,14,${.12 * (1 - d / 120)})`
            ctx.lineWidth = .8
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove) }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}

/* ─── Pipeline Canvas ────────────────────────────────────────── */
function PipelineCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const stages = [
      { label: 'INGEST', sub: 'Raw Geodata', color: '#8B2E06' },
      { label: 'TRANSFORM', sub: 'ETL / GDAL', color: '#C1440E' },
      { label: 'STORE', sub: 'PostGIS DB', color: '#1A4A8A' },
      { label: 'SERVE', sub: 'FastAPI', color: '#1A7A4A' },
      { label: 'GeoAI', sub: 'NLP Layer', color: '#C1440E' },
    ]

    const pkts = stages.slice(0, -1).flatMap((_, i) => [
      { stage: i, progress: Math.random(), speed: .003 + Math.random() * .004 },
      { stage: i, progress: Math.random(), speed: .003 + Math.random() * .004 },
    ])

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width, h = canvas.height
      const cy = h / 2
      const pad = w * .08
      const spacing = (w - pad * 2) / (stages.length - 1)

      // bg
      ctx.fillStyle = 'rgba(237,232,220,0.5)'
      ctx.fillRect(0, 0, w, h)

      // grid
      ctx.strokeStyle = 'rgba(193,68,14,0.06)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 36) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
      for (let y = 0; y < h; y += 36) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }

      // connector lines
      stages.forEach((s, i) => {
        if (i < stages.length - 1) {
          const x1 = pad + i * spacing
          const x2 = pad + (i + 1) * spacing
          ctx.beginPath()
          ctx.moveTo(x1, cy)
          ctx.lineTo(x2, cy)
          ctx.strokeStyle = 'rgba(193,68,14,0.2)'
          ctx.lineWidth = 2
          ctx.setLineDash([6, 4])
          ctx.stroke()
          ctx.setLineDash([])
        }
      })

      // packets
      pkts.forEach(p => {
        p.progress += p.speed
        if (p.progress >= 1) p.progress = 0
        const x1 = pad + p.stage * spacing
        const x2 = pad + (p.stage + 1) * spacing
        const px = x1 + (x2 - x1) * p.progress
        ctx.beginPath()
        ctx.arc(px, cy, 4, 0, Math.PI * 2)
        ctx.fillStyle = stages[p.stage].color
        ctx.shadowColor = stages[p.stage].color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // nodes
      stages.forEach((s, i) => {
        const x = pad + i * spacing
        ctx.beginPath()
        ctx.arc(x, cy, 14, 0, Math.PI * 2)
        ctx.fillStyle = '#F5F0E8'
        ctx.strokeStyle = s.color
        ctx.lineWidth = 2
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = s.color
        ctx.font = 'bold 8px IBM Plex Mono'
        ctx.textAlign = 'center'
        ctx.fillText(s.label, x, cy - 26)
        ctx.fillStyle = 'rgba(58,43,26,0.55)'
        ctx.font = '9px IBM Plex Mono'
        ctx.fillText(s.sub, x, cy + 30)
      })

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '180px', borderRadius: '2px', border: '1px solid #D4C8B4' }} />
  )
}

/* ─── Nervous System Canvas ──────────────────────────────────── */
function NervousCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const nodes = [
      { name: 'FastAPI', x: .15, y: .3, c: '#1A7A4A', r: 16 },
      { name: 'Django', x: .15, y: .7, c: '#1A7A4A', r: 13 },
      { name: 'Docker', x: .35, y: .2, c: '#8B2E06', r: 14 },
      { name: 'PostGIS', x: .5, y: .5, c: '#C1440E', r: 20 },
      { name: 'GDAL/OGR', x: .35, y: .8, c: '#1A4A8A', r: 13 },
      { name: 'K8s', x: .65, y: .25, c: '#8B2E06', r: 14 },
      { name: 'Azure', x: .8, y: .4, c: '#1A4A8A', r: 15 },
      { name: 'GeoAI', x: .7, y: .7, c: '#C1440E', r: 16 },
      { name: 'GEE', x: .85, y: .75, c: '#1A7A4A', r: 13 },
    ]
    const edges = [[0, 3], [1, 3], [2, 5], [3, 4], [3, 7], [5, 6], [6, 7], [7, 8], [0, 2], [3, 6]]

    const pkts = edges.map(([a]) => ({ edge: edges.indexOf([a, edges.find(e => e[0] === a)?.[1]]), from: a, to: edges.find(e => e[0] === a)?.[1] || 3, progress: Math.random(), speed: .004 + Math.random() * .005 }))

    const realPkts = edges.flatMap(([a, b]) => [
      { a, b, progress: Math.random(), speed: .003 + Math.random() * .005 },
    ])

    let t = 0
    const draw = () => {
      t += .01
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width, h = canvas.height

      // bg grid
      ctx.strokeStyle = 'rgba(193,68,14,0.07)'
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
      for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }

      // edges
      edges.forEach(([a, b]) => {
        const n1 = nodes[a], n2 = nodes[b]
        ctx.beginPath()
        ctx.moveTo(n1.x * w, n1.y * h)
        ctx.lineTo(n2.x * w, n2.y * h)
        ctx.strokeStyle = 'rgba(193,68,14,0.15)'
        ctx.lineWidth = 1.5
        ctx.setLineDash([4, 3])
        ctx.stroke()
        ctx.setLineDash([])
      })

      // packets
      realPkts.forEach(p => {
        p.progress += p.speed
        if (p.progress > 1) p.progress = 0
        const n1 = nodes[p.a], n2 = nodes[p.b]
        if (!n1 || !n2) return
        const px = n1.x * w + (n2.x * w - n1.x * w) * p.progress
        const py = n1.y * h + (n2.y * h - n1.y * h) * p.progress
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = n1.c
        ctx.shadowColor = n1.c
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // nodes
      nodes.forEach((node, i) => {
        const x = node.x * w, y = node.y * h
        const pulse = node.r + Math.sin(t + i * .8) * 2

        ctx.beginPath(); ctx.arc(x, y, pulse + 6, 0, Math.PI * 2)
        ctx.fillStyle = node.c + '18'; ctx.fill()

        ctx.beginPath(); ctx.arc(x, y, node.r, 0, Math.PI * 2)
        ctx.fillStyle = '#F5F0E8'
        ctx.strokeStyle = node.c
        ctx.lineWidth = 2
        ctx.fill(); ctx.stroke()

        ctx.fillStyle = node.c
        ctx.font = `bold 9px IBM Plex Mono`
        ctx.textAlign = 'center'
        ctx.fillText(node.name, x, y + node.r + 16)
      })

      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '360px', border: '1px solid #D4C8B4', borderRadius: '2px' }} />
}

/* ─── Pillar Card ─────────────────────────────────────────────── */
function PillarCard({ icon: Icon, num, title, desc, tools, accent }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2rem',
        border: `1px solid ${hovered ? accent : '#D4C8B4'}`,
        background: hovered ? '#EDE8DC' : '#F5F0E8',
        transition: 'all .25s',
        cursor: 'default',
        borderTop: `3px solid ${accent}`,
      }}
    >
      <div style={{ marginBottom: '1rem' }}><Icon size={40} color={accent} /></div>
      <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', color: accent, letterSpacing: '.12em', marginBottom: '.5rem' }}>{num}</div>
      <div style={{ fontFamily: 'DM Serif Display', fontSize: '22px', marginBottom: '.75rem', color: '#1A1208' }}>{title}</div>
      <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: '#8A7A68', lineHeight: '1.85', marginBottom: '1.25rem' }}>{desc}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {tools.map(t => (
          <span key={t} style={{
            fontFamily: 'IBM Plex Mono', fontSize: '9px', padding: '3px 8px',
            border: `1px solid ${hovered ? accent + '55' : '#D4C8B4'}`,
            color: hovered ? accent : '#8A7A68', letterSpacing: '.04em',
            transition: 'all .25s'
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

/* ─── Query Playground ───────────────────────────────────────── */
const QUERIES = {
  spatial: `SELECT
  zone_id,
  classification,
  ST_Area(geom::geography)/1e6 AS area_km2,
  ST_Distance(
    geom,
    ST_MakePoint(73.04,33.72)::geography
  ) AS dist_m
FROM urban_zones
WHERE ST_Intersects(geom,
  ST_Buffer(
    ST_MakePoint(73.04,33.72)::geography,
    5000
  )
)
ORDER BY area_km2 DESC;`,

  etl: `# Spatial ETL with GeoPandas
import geopandas as gpd
from sqlalchemy import create_engine

gdf = gpd.read_file("zones.shp")
gdf = gdf.to_crs(epsg=4326)
gdf = gdf[gdf.geometry.is_valid]

engine = create_engine(DB_URL)
gdf.to_postgis(
  "urban_zones", engine,
  if_exists="replace",
  dtype={"geom": Geometry("POLYGON")}
)
print(f"Loaded {len(gdf)} features")`,

  nlp: `# NaqshaGPT — NLP → Spatial Query
query = "flood zones within 10km
         of Islamabad"

intent = nlp_parser.extract(query)
# → { op: "ST_DWithin",
#     target: "flood_zones",
#     ref: [73.04, 33.72],
#     dist: 10000 }

sql = query_builder(intent)
results = postgis.execute(sql)
# → 23 features · 44ms`
}

const RESULTS = {
  spatial: `✓ Executed · PostGIS GIST Index\n\nzone_id │ class      │ area_km2 │ dist_m\n────────┼────────────┼──────────┼───────\n   1042 │ Residential│     2.34 │    834\n    891 │ Commercial │     1.87 │   1204\n   1156 │ Industrial │     4.12 │   2891\n    ...17 more rows\n\nTime: 38ms · Index: zones_geom_gist`,
  etl: `✓ Pipeline Complete\n\n→ Loaded: 4,821 features\n→ Reprojected to EPSG:4326\n→ Invalid geoms removed: 3\n→ Written to PostGIS\n→ GIST index rebuilt\n\nDuration: 2.3s · 4,818 stored`,
  nlp: `✓ Intent Parsed\n\nInput: "flood zones within 10km"\nOp: ST_DWithin detected\nTarget: flood_zones\nRef: 73.04°E 33.72°N\nDist: 10,000m\n\n→ 23 features · 44ms\nNo GIS expertise required.`
}

function QueryPlayground() {
  const [tab, setTab] = useState('spatial')
  const [result, setResult] = useState(null)

  const execute = () => setResult(RESULTS[tab])
  const clear = () => setResult(null)

  return (
    <div>
      <div style={{ display: 'flex', gap: '2px', marginBottom: '1.5rem', borderBottom: '1px solid #D4C8B4' }}>
        {['spatial', 'etl', 'nlp'].map(k => (
          <button key={k} onClick={() => { setTab(k); setResult(null) }} style={{
            fontFamily: 'IBM Plex Mono', fontSize: '10px', letterSpacing: '.08em',
            textTransform: 'uppercase', padding: '8px 16px', border: 'none', cursor: 'pointer',
            background: tab === k ? '#C1440E' : 'transparent',
            color: tab === k ? '#F5F0E8' : '#8A7A68',
            borderBottom: tab === k ? '2px solid #C1440E' : '2px solid transparent',
            transition: 'all .2s'
          }}>
            {k === 'spatial' ? 'Spatial SQL' : k === 'etl' ? 'ETL Pipeline' : 'NLP → SQL'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#D4C8B4', border: '1px solid #D4C8B4' }}>
        <div style={{ background: '#F5F0E8', padding: '1.5rem' }}>
          <pre style={{
            fontFamily: 'IBM Plex Mono', fontSize: '11px', lineHeight: '1.8',
            color: '#3D2B1A', whiteSpace: 'pre-wrap', marginBottom: '1rem'
          }}>{QUERIES[tab]}</pre>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={execute} style={{
              fontFamily: 'IBM Plex Mono', fontSize: '10px', fontWeight: '700',
              letterSpacing: '.08em', textTransform: 'uppercase',
              padding: '10px 20px', background: '#C1440E', color: '#F5F0E8',
              border: 'none', cursor: 'pointer'
            }}>▶ Execute</button>
            {result && <button onClick={clear} style={{
              fontFamily: 'IBM Plex Mono', fontSize: '10px', padding: '10px 16px',
              background: 'transparent', color: '#8A7A68', border: '1px solid #D4C8B4', cursor: 'pointer'
            }}>Clear</button>}
          </div>
        </div>
        <div style={{ background: '#EDE8DC', padding: '1.5rem', minHeight: '200px' }}>
          {result
            ? <pre style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', lineHeight: '1.85', color: '#1A7A4A', whiteSpace: 'pre-wrap' }}>{result}</pre>
            : <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: '#8A7A68', paddingTop: '.5rem' }}>
                {'// Output will appear here'}<br />
                {'// Click ▶ Execute to run'}
              </div>
          }
        </div>
      </div>
    </div>
  )
}

/* ─── Infra Cards ─────────────────────────────────────────────── */
function InfraCard({ icon: Icon, title, desc, tags, color }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2rem',
        background: hovered ? '#EDE8DC' : '#F5F0E8',
        border: `1px solid ${hovered ? color : '#D4C8B4'}`,
        transition: 'all .25s',
        cursor: 'default'
      }}
    >
      <div style={{ marginBottom: '.75rem' }}><Icon size={36} color={color} /></div>
      <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', fontWeight: '700', color, marginBottom: '.5rem', letterSpacing: '.04em' }}>{title}</div>
      <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: '#8A7A68', lineHeight: '1.8', marginBottom: '1rem' }}>{desc}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {tags.map(t => <span key={t} style={{ fontFamily: 'IBM Plex Mono', fontSize: '9px', padding: '2px 7px', border: `1px solid ${color}44`, color, letterSpacing: '.04em' }}>{t}</span>)}
      </div>
    </div>
  )
}

/* ─── Main App ────────────────────────────────────────────────── */
export default function App() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const ringPos = useRef({ x: 0, y: 0 })
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = e => { mousePos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    let raf
    const loop = () => {
      if (dotRef.current) { dotRef.current.style.left = mousePos.current.x + 'px'; dotRef.current.style.top = mousePos.current.y + 'px' }
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * .1
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * .1
      if (ringRef.current) { ringRef.current.style.left = ringPos.current.x + 'px'; ringRef.current.style.top = ringPos.current.y + 'px' }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  const S = { /* shared styles */
    section: { padding: '6rem 4rem', borderTop: '1px solid #D4C8B4', maxWidth: '1200px', margin: '0 auto' },
    label: { fontFamily: 'IBM Plex Mono', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C1440E', marginBottom: '.6rem' },
    h2: { fontFamily: 'DM Serif Display', fontSize: 'clamp(32px,4vw,52px)', color: '#1A1208', letterSpacing: '-.02em', marginBottom: '2.5rem', lineHeight: 1.05 },
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 3rem', background: 'rgba(245,240,232,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #D4C8B4'
      }}>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', color: '#C1440E', letterSpacing: '.12em' }}>DANISH AMIN</div>
        <div style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
          {['#pillars', '#infrastructure', '#geoai', '#contact'].map((h, i) => (
            <a key={h} href={h} style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', color: '#8A7A68', textDecoration: 'none', letterSpacing: '.1em', textTransform: 'uppercase' }}>
              {['Systems', 'Infrastructure', 'GeoAI', 'Contact'][i]}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: 'IBM Plex Mono', fontSize: '10px', color: '#8A7A68' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A7A4A', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          Available for work
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', padding: '0 4rem', overflow: 'hidden' }}>
        <HeroCanvas />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
          <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: '#C1440E', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeUp .6s .1s both' }}>
            <span style={{ width: 24, height: 1, background: '#C1440E', display: 'inline-block' }} />
            Early-career · Geospatial Systems Developer
          </div>
          <h1 style={{ fontFamily: 'DM Serif Display', fontSize: 'clamp(56px,9vw,120px)', fontWeight: 400, lineHeight: .9, letterSpacing: '-.04em', color: '#1A1208', marginBottom: '1.5rem', animation: 'fadeUp .6s .2s both' }}>
            Danish<br /><em style={{ color: '#C1440E', fontStyle: 'italic' }}>Amin.</em>
          </h1>
          <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px', color: '#8A7A68', lineHeight: 1.9, maxWidth: '480px', marginBottom: '2rem', animation: 'fadeUp .6s .3s both' }}>
            I write Python. I think in PostGIS.<br />
            I build the layer between raw spatial data<br />and the systems that depend on it.
          </p>
          <div style={{ display: 'flex', gap: '1rem', animation: 'fadeUp .6s .4s both' }}>
            <a href="#contact" style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', fontWeight: '700', letterSpacing: '.08em', textTransform: 'uppercase', padding: '13px 28px', background: '#C1440E', color: '#F5F0E8', textDecoration: 'none', border: '1px solid #C1440E' }}>→ Get in touch</a>
            <a href="#pillars" style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', padding: '13px 28px', border: '1px solid #D4C8B4', color: '#8A7A68', textDecoration: 'none' }}>Explore the work</a>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '2rem', right: '3rem', fontFamily: 'IBM Plex Mono', fontSize: '10px', color: '#8A7A68', textAlign: 'right', zIndex: 2, lineHeight: 1.7 }}>
          33.7215° N, 73.0433° E<br />Islamabad, Pakistan
        </div>
      </section>

      {/* PILLARS */}
      <section id="pillars" style={{ ...S.section }}>
        <div style={S.label}>01 // Core Capabilities</div>
        <h2 style={S.h2}>Three pillars,<br />one <em style={{ color: '#C1440E' }}>system.</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: '#D4C8B4' }}>
          <PillarCard icon={PipelineIcon} num="01 · Systems Development" title="Backend & APIs" accent="#1A7A4A"
            desc="Building the services that expose spatial data — RESTful endpoints, geospatial microservices, and containerized deployment that makes spatial backends reproducible."
            tools={['FastAPI', 'Django', 'Flask', 'Docker', 'Linux', 'Git', 'REST APIs']} />
          <PillarCard icon={PostGISIcon} num="02 · Data Infrastructure" title="Pipelines & Databases" accent="#1A4A8A"
            desc="Spatial schema design, ETL pipelines that handle real-world messy geodata, and PostGIS databases that serve reliable spatial queries at the core of every system."
            tools={['PostgreSQL', 'PostGIS', 'GeoPandas', 'GDAL/OGR', 'Rasterio', 'GeoServer', 'ETL']} />
          <PillarCard icon={GeoAIIcon} num="03 · GeoAI Layer" title="Intelligence on Top" accent="#C1440E"
            desc="NLP-driven spatial query systems, ML models for building footprint extraction, satellite image segmentation, and Earth Engine workflows for large-scale analysis."
            tools={['NLP→SQL', 'Google Earth Engine', 'ArcGIS ML', 'Sentinel-2', 'Python ML', 'ENVI']} />
        </div>
      </section>

      {/* NERVOUS SYSTEM */}
      <section style={{ ...S.section, paddingTop: '2rem' }}>
        <div style={S.label}>// System Overview</div>
        <h2 style={{ ...S.h2, marginBottom: '1.5rem' }}>The spatial <em style={{ color: '#C1440E' }}>nervous system.</em></h2>
        <NervousCanvas />
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          {[{ c: '#1A7A4A', l: 'Systems Dev' }, { c: '#1A4A8A', l: 'Data Infra' }, { c: '#C1440E', l: 'GeoAI' }].map(({ c, l }) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: 'IBM Plex Mono', fontSize: '10px', color: '#8A7A68' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />{l}
            </div>
          ))}
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infrastructure" style={{ ...S.section }}>
        <div style={S.label}>02 // Data Infrastructure</div>
        <h2 style={S.h2}>PostGIS <em style={{ color: '#C1440E' }}>query engine.</em></h2>
        <QueryPlayground />

        <div style={{ marginTop: '3rem' }}>
          <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', color: '#8A7A68', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>// Animated data pipeline</div>
          <PipelineCanvas />
        </div>

        <div style={{ marginTop: '3rem' }}>
          <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', color: '#8A7A68', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>// Cloud & container infrastructure</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: '#D4C8B4' }}>
            <InfraCard icon={CloudIcon} title="Azure / AWS" color="#1A4A8A"
              desc="Cloud infrastructure for geospatial workloads — storage, compute, and spatial services on Azure and AWS."
              tags={['Azure Maps', 'Blob Storage', 'App Service', 'Static Web Apps', 'EC2', 'S3']} />
            <InfraCard icon={DockerIcon} title="Docker" color="#8B2E06"
              desc="Containerized geospatial services — reproducible environments for spatial data pipelines and APIs."
              tags={['Containers', 'Docker Compose', 'Images', 'Volumes', 'Dockerfile']} />
            <InfraCard icon={K8sIcon} title="Kubernetes" color="#C1440E"
              desc="Orchestrating spatial microservices — scaling PostGIS and API pods for production workloads."
              tags={['Pods', 'Services', 'Deployments', 'AKS', 'Helm', 'Ingress']} />
          </div>
        </div>
      </section>

      {/* GEOAI */}
      <section id="geoai" style={{ ...S.section }}>
        <div style={S.label}>03 // GeoAI Layer</div>
        <h2 style={S.h2}>AI on top of <em style={{ color: '#C1440E' }}>spatial.</em></h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#D4C8B4', border: '1px solid #D4C8B4' }}>
          {[
            { label: 'Input', color: '#8A7A68', desc: 'Natural language query or raw satellite imagery enters the system. No GIS expertise required from the end user.', chips: [['NLP Input', '#1A7A4A'], ['Raster Input', '#1A4A8A']] },
            { label: 'Parse & Route', color: '#8B2E06', desc: 'NLP model extracts spatial intent — location, operation type, geometry — and routes to the appropriate spatial pipeline.', chips: [['Intent Extract', '#8B2E06'], ['Query Routing', '#8B2E06']] },
            { label: 'Spatial Exec', color: '#1A4A8A', desc: 'Translated query hits PostGIS. Imagery routes to Earth Engine or ArcGIS ML for segmentation and feature extraction.', chips: [['PostGIS', '#1A4A8A'], ['GEE', '#1A4A8A'], ['ArcGIS ML', '#1A4A8A']] },
            { label: 'Output', color: '#1A7A4A', desc: 'Results returned as structured GeoJSON, enriched feature sets, or rendered map layers — ready for downstream APIs.', chips: [['GeoJSON', '#1A7A4A'], ['REST Response', '#1A7A4A']] },
            { label: 'NaqshaGPT ↗', color: '#C1440E', desc: 'Built this end-to-end. Exhibited at GITEX Global Dubai 2025 — spoke with stakeholders from Esri, Google Cloud, and government delegations.', chips: [['Python', '#C1440E'], ['FastAPI', '#C1440E'], ['PostGIS', '#C1440E']] },
          ].map(({ label, color, desc, chips }) => (
            <div key={label} style={{ background: '#F5F0E8', padding: '1.25rem 2rem', display: 'grid', gridTemplateColumns: '140px 1fr auto', alignItems: 'center', gap: '2rem' }}>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color }}>{label}</div>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: '#8A7A68', lineHeight: 1.75 }}>{desc}</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {chips.map(([t, c]) => <span key={t} style={{ fontFamily: 'IBM Plex Mono', fontSize: '9px', padding: '3px 8px', border: `1px solid ${c}44`, color: c, letterSpacing: '.04em' }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ ...S.section }}>
        <div style={S.label}>04 // Contact</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'DM Serif Display', fontSize: 'clamp(40px,5vw,72px)', color: '#1A1208', letterSpacing: '-.04em', lineHeight: .95, marginBottom: '1.5rem' }}>
              Building<br />something<br /><em style={{ color: '#C1440E' }}>spatial?</em>
            </h2>
            <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', color: '#8A7A68', lineHeight: 1.9, marginBottom: '2rem', maxWidth: '380px' }}>
              Open to GIS Developer and Spatial Systems roles. If you're working on geospatial infrastructure, AI-powered spatial platforms, or satellite data pipelines — reach out.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { href: 'mailto:amind0584@gmail.com', text: '✉ amind0584@gmail.com' },
                { href: 'https://linkedin.com/in/bydanishamin', text: '↗ linkedin.com/in/bydanishamin' },
                { href: '#', text: '⌥ danishamin.me' },
              ].map(({ href, text }) => (
                <a key={text} href={href} target="_blank" rel="noreferrer" style={{
                  fontFamily: 'IBM Plex Mono', fontSize: '11px', color: '#8A7A68',
                  textDecoration: 'none', padding: '13px 18px', border: '1px solid #D4C8B4',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'all .2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C1440E'; e.currentTarget.style.color = '#C1440E' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#D4C8B4'; e.currentTarget.style.color = '#8A7A68' }}
                >{text}<span>→</span></a>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#D4C8B4' }}>
            {[
              { val: 'GITEX', lbl: 'Dubai 2025 · NaqshaGPT' },
              { val: '3', lbl: 'Pillars · Systems · Infra · AI' },
              { val: '5+', lbl: 'Organizations across domains' },
              { val: '3.35', lbl: 'CGPA · BS Geoinformatics · UAAR' },
            ].map(({ val, lbl }) => (
              <div key={val} style={{ background: '#F5F0E8', padding: '1.5rem 2rem' }}
                onMouseEnter={e => e.currentTarget.style.background = '#EDE8DC'}
                onMouseLeave={e => e.currentTarget.style.background = '#F5F0E8'}
              >
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '28px', fontWeight: '700', color: '#C1440E', letterSpacing: '-.02em' }}>{val}</div>
                <div style={{ fontFamily: 'Instrument Sans', fontSize: '12px', color: '#8A7A68', marginTop: '3px' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #D4C8B4', padding: '1.5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', color: '#8A7A68' }}>danishamin.me · © 2026 · Danish Amin</div>
        <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', color: '#8A7A68' }}>Systems · Infrastructure · <span style={{ color: '#C1440E' }}>GeoAI</span></div>
      </footer>
    </>
  )
}
