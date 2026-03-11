<template>
  <div class="map-page">

    <!-- NAV -->
    <nav class="nav">
      <div class="container nav-inner">
        <router-link to="/" class="nav-logo">💧 AguaYa</router-link>
        <div class="nav-links">
          <router-link to="/mapa" class="nav-active">Mapa</router-link>
          <router-link to="/estadisticas">Estadísticas</router-link>
          <router-link to="/reportar" class="nav-cta">Reportar</router-link>
        </div>
      </div>
    </nav>

    <!-- PAGE HEADER -->
    <section class="page-header">
      <div class="container">
        <p class="section-label">Vista en tiempo real</p>
        <h1 class="page-title">Mapa de reportes</h1>
        <p class="page-desc">Visualiza las zonas afectadas por problemas de agua en Santa Marta.</p>
      </div>
    </section>

    <!-- FILTROS -->
    <div class="filters-bar">
      <div class="container filters-inner">
        <span class="filters-label">Filtrar por:</span>
        <button
          v-for="f in filtros"
          :key="f.id"
          class="filter-btn"
          :class="{ active: filtroActivo === f.id }"
          :style="{ '--fc': f.color }"
          @click="filtroActivo = f.id"
        >
          {{ f.icon }} {{ f.label }}
        </button>
      </div>
    </div>

    <!-- LAYOUT PRINCIPAL -->
    <div class="container map-layout">

      <!-- MAPA -->
      <div class="map-wrapper">
        <div id="map"></div>
        <div class="map-legend">
          <span v-for="f in filtros.slice(1)" :key="f.id" class="legend-item">
            <i :style="{ background: f.color }"></i> {{ f.label }}
          </span>
        </div>
      </div>

      <!-- PANEL LATERAL -->
      <aside class="side-panel">
        <div class="panel-header">
          <h3>Reportes recientes</h3>
          <span class="panel-count">{{ reportesFiltrados.length }} reportes</span>
        </div>

        <div class="report-list">
          <div
            v-for="(r, i) in reportesFiltrados"
            :key="i"
            class="report-card"
            :style="{ '--rc': r.color }"
          >
            <div class="report-dot"></div>
            <div class="report-body">
              <div class="report-top">
                <strong>{{ r.barrio }}</strong>
                <span class="report-time">{{ r.tiempo }}</span>
              </div>
              <p class="report-desc">{{ r.desc }}</p>
              <span class="report-tag">{{ r.icon }} {{ r.tipo }}</span>
            </div>
          </div>
        </div>

        <div class="panel-footer">
          <router-link to="/reportar" class="btn-report">
            📍 Hacer un reporte
          </router-link>
        </div>
      </aside>

    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container footer-inner">
        <span class="nav-logo">💧 AguaYa</span>
        <p>Proyecto académico · Santa Marta, Colombia</p>
      </div>
    </footer>

  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const todosLosReportes = [
  { barrio: 'El Rodadero', desc: 'Sin agua desde ayer en el sector.', tipo: 'Sin agua',     icon: '🚱', color: '#ef4444', tiempo: 'Hace 2h',  lat: 11.205,  lng: -74.225 },
  { barrio: 'Centro',      desc: 'Baja presión en el servicio.',       tipo: 'Baja presión', icon: '📉', color: '#f97316', tiempo: 'Hace 4h',  lat: 11.244,  lng: -74.211 },
  { barrio: 'Gaira',       desc: 'Agua con sedimentos y color marrón.',tipo: 'Agua sucia',   icon: '🟤', color: '#a16207', tiempo: 'Hace 5h',  lat: 11.225,  lng: -74.195 },
  { barrio: 'Bastidas',    desc: 'Fuga visible en tubería principal.',  tipo: 'Fuga',         icon: '🔧', color: '#0ea5e9', tiempo: 'Hace 6h',  lat: 11.252,  lng: -74.185 },
  { barrio: 'Pescaíto',    desc: 'Corte total sin aviso previo.',       tipo: 'Sin agua',     icon: '🚱', color: '#ef4444', tiempo: 'Hace 7h',  lat: 11.248,  lng: -74.200 },
  { barrio: 'La Paz',      desc: 'Presión muy baja desde la mañana.',   tipo: 'Baja presión', icon: '📉', color: '#f97316', tiempo: 'Hace 9h',  lat: 11.235,  lng: -74.220 },
]

export default {
  name: 'MapaView',
  data() {
    return {
      filtroActivo: 'todos',
      filtros: [
        { id: 'todos',        label: 'Todos',       icon: '🗺️', color: '#0369a1' },
        { id: 'Sin agua',     label: 'Sin agua',    icon: '🚱', color: '#ef4444' },
        { id: 'Baja presión', label: 'Baja presión',icon: '📉', color: '#f97316' },
        { id: 'Agua sucia',   label: 'Agua sucia',  icon: '🟤', color: '#a16207' },
        { id: 'Fuga',         label: 'Fugas',       icon: '🔧', color: '#0ea5e9' },
      ],
      marcadores: [],
      map: null,
    }
  },
  computed: {
    reportesFiltrados() {
      if (this.filtroActivo === 'todos') return todosLosReportes
      return todosLosReportes.filter(r => r.tipo === this.filtroActivo)
    },
  },
  watch: {
    filtroActivo() { this.actualizarMarcadores() },
  },
  mounted() {
    this.map = L.map('map').setView([11.2408, -74.199], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.map)
    this.actualizarMarcadores()
  },
  methods: {
    actualizarMarcadores() {
      this.marcadores.forEach(m => m.remove())
      this.marcadores = []
      this.reportesFiltrados.forEach(r => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="
            background:${r.color};
            width:14px;height:14px;
            border-radius:50%;
            border:3px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        })
        const m = L.marker([r.lat, r.lng], { icon })
          .addTo(this.map)
          .bindPopup(`<strong>${r.barrio}</strong><br>${r.icon} ${r.tipo}<br><small>${r.desc}</small>`)
        this.marcadores.push(m)
      })
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.map-page {
  font-family: 'Inter', sans-serif;
  color: #0f172a;
  background: #fff;
  min-height: 100vh;
}
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ── NAV ── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  backdrop-filter: blur(14px);
  background: rgba(255,255,255,0.88);
  border-bottom: 1px solid #e2e8f0;
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}
.nav-logo {
  font-family: 'Sora', sans-serif;
  font-weight: 800;
  font-size: 18px;
  color: #0369a1;
  text-decoration: none;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}
.nav-links a {
  text-decoration: none;
  color: #334155;
  font-size: 14px;
  font-weight: 500;
  transition: color .2s;
}
.nav-links a:hover, .nav-active { color: #0369a1 !important; font-weight: 600 !important; }
.nav-cta {
  background: #0369a1 !important;
  color: white !important;
  padding: 8px 18px;
  border-radius: 20px;
}

/* ── PAGE HEADER ── */
.page-header {
  padding: 100px 0 40px;
  background: linear-gradient(160deg, #e0f2fe 0%, #f8fafc 60%);
  border-bottom: 1px solid #e2e8f0;
}
.page-header .container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.section-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #0369a1;
  margin-bottom: 10px;
}
.page-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 12px;
}
.page-desc {
  color: #64748b;
  font-size: 16px;
}

/* ── FILTROS ── */
.filters-bar {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 12px 0;
  position: sticky;
  top: 60px;
  z-index: 90;
}
.filters-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.filters-label {
  font-size: 13px;
  color: #94a3b8;
  font-weight: 500;
  margin-right: 4px;
}
.filter-btn {
  border: 1.5px solid #e2e8f0;
  background: white;
  color: #334155;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s;
  font-family: 'Inter', sans-serif;
}
.filter-btn:hover {
  border-color: var(--fc);
  color: var(--fc);
}
.filter-btn.active {
  background: var(--fc);
  border-color: var(--fc);
  color: white;
}

/* ── LAYOUT ── */
.map-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 20px;
  padding-top: 28px;
  padding-bottom: 48px;
  align-items: start;
}

/* ── MAPA ── */
.map-wrapper { position: relative; }
#map {
  height: 580px;
  border-radius: 18px;
  border: 1.5px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(3,105,161,0.1);
  z-index: 1;
}
.map-legend {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 12px;
  padding: 0 4px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #64748b;
}
.legend-item i {
  width: 10px; height: 10px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

/* ── PANEL LATERAL ── */
.side-panel {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 16px;
  border-bottom: 1px solid #f1f5f9;
}
.panel-header h3 {
  font-family: 'Sora', sans-serif;
  font-size: 15px;
  font-weight: 700;
}
.panel-count {
  font-size: 12px;
  background: #f1f5f9;
  color: #64748b;
  padding: 3px 10px;
  border-radius: 20px;
}
.report-list {
  overflow-y: auto;
  max-height: 460px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.report-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px;
  border-radius: 12px;
  border: 1.5px solid #f1f5f9;
  transition: border-color .2s, transform .2s;
  cursor: default;
}
.report-card:hover {
  border-color: var(--rc);
  transform: translateX(3px);
}
.report-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--rc);
  flex-shrink: 0;
  margin-top: 5px;
}
.report-body { flex: 1; min-width: 0; }
.report-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}
.report-top strong {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.report-time {
  font-size: 11px;
  color: #94a3b8;
  flex-shrink: 0;
}
.report-desc {
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 8px;
}
.report-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  padding: 3px 8px;
  border-radius: 20px;
  background: color-mix(in srgb, var(--rc) 12%, white);
  color: var(--rc);
  border: 1px solid color-mix(in srgb, var(--rc) 25%, white);
}
.panel-footer {
  padding: 16px;
  border-top: 1px solid #f1f5f9;
}
.btn-report {
  display: block;
  text-align: center;
  background: #0369a1;
  color: white;
  padding: 12px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: background .2s, transform .2s;
}
.btn-report:hover {
  background: #0284c7;
  transform: translateY(-1px);
}

/* ── FOOTER ── */
.footer {
  background: #0f172a;
  color: #64748b;
  padding: 24px 0;
  font-size: 13px;
}
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .map-layout { grid-template-columns: 1fr; }
  #map { height: 380px; }
}
</style>