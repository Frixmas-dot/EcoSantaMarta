<template>
  <div class="stats-page">

    <!-- NAV (igual que Home) -->
    <nav class="nav">
      <div class="container nav-inner">
        <router-link to="/" class="nav-logo">💧 AguaYa</router-link>
        <div class="nav-links">
          <router-link to="/mapa">Mapa</router-link>
          <router-link to="/estadisticas" class="nav-active">Estadísticas</router-link>
          <router-link to="/reportar" class="nav-cta">Reportar</router-link>
        </div>
      </div>
    </nav>

    <!-- HEADER -->
    <section class="page-header">
      <div class="container">
        <p class="section-label">Datos en tiempo real</p>
        <h1 class="page-title">Estadísticas del servicio</h1>
        <p class="page-desc">Resumen de reportes ciudadanos sobre el agua en Santa Marta.</p>
      </div>
    </section>

    <!-- KPI CARDS -->
    <section class="section">
      <div class="container">
        <div class="kpi-grid">
          <div v-for="(kpi, i) in kpis" :key="i" class="kpi-card" :style="{ animationDelay: i * 0.1 + 's' }">
            <div class="kpi-icon">{{ kpi.icon }}</div>
            <div class="kpi-body">
              <strong class="kpi-value">{{ kpi.value }}</strong>
              <span class="kpi-label">{{ kpi.label }}</span>
            </div>
            <div class="kpi-trend" :class="kpi.up ? 'up' : 'down'">
              {{ kpi.up ? '↑' : '↓' }} {{ kpi.trend }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CHARTS ROW -->
    <section class="section section-alt">
      <div class="container charts-row">

        <!-- BARRAS: Problemas más reportados -->
        <div class="chart-card">
          <div class="chart-header">
            <h2 class="chart-title">Problemas más reportados</h2>
            <span class="chart-period">Este mes</span>
          </div>
          <div class="bar-chart">
            <div v-for="(item, i) in barData" :key="i" class="bar-row">
              <div class="bar-meta">
                <span class="bar-icon">{{ item.icon }}</span>
                <span class="bar-name">{{ item.label }}</span>
                <span class="bar-pct">{{ item.pct }}%</span>
              </div>
              <div class="bar-track">
                <div
                  class="bar-fill"
                  :style="{ width: item.pct + '%', background: item.color, animationDelay: i * 0.15 + 's' }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- DONUT: Estado de reportes -->
        <div class="chart-card donut-card">
          <div class="chart-header">
            <h2 class="chart-title">Estado de reportes</h2>
            <span class="chart-period">Acumulado</span>
          </div>
          <div class="donut-wrapper">
            <svg class="donut-svg" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="48" fill="none" stroke="#e2e8f0" stroke-width="14"/>
              <!-- Resueltos 76% -->
              <circle cx="60" cy="60" r="48" fill="none" stroke="#0369a1" stroke-width="14"
                stroke-dasharray="229 72" stroke-dashoffset="72" stroke-linecap="round"
                class="donut-seg"/>
              <!-- Pendientes 16% -->
              <circle cx="60" cy="60" r="48" fill="none" stroke="#38bdf8" stroke-width="14"
                stroke-dasharray="48 253" stroke-dashoffset="-157" stroke-linecap="round"/>
              <!-- Sin atender 8% -->
              <circle cx="60" cy="60" r="48" fill="none" stroke="#bae6fd" stroke-width="14"
                stroke-dasharray="24 277" stroke-dashoffset="-205" stroke-linecap="round"/>
              <text x="60" y="56" text-anchor="middle" class="donut-center-val">76%</text>
              <text x="60" y="68" text-anchor="middle" class="donut-center-label">resueltos</text>
            </svg>
            <div class="donut-legend">
              <div v-for="leg in donutLegend" :key="leg.label" class="legend-row">
                <span class="legend-dot" :style="{ background: leg.color }"></span>
                <span class="legend-label">{{ leg.label }}</span>
                <span class="legend-val">{{ leg.val }}%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- TABLA: Barrios con más reportes -->
    <section class="section">
      <div class="container">
        <div class="chart-card full-width">
          <div class="chart-header">
            <h2 class="chart-title">Barrios con más reportes</h2>
            <span class="chart-period">Últimos 30 días</span>
          </div>
          <table class="barrio-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Barrio</th>
                <th>Reportes</th>
                <th>Problema principal</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in barrios" :key="i">
                <td class="rank">{{ i + 1 }}</td>
                <td class="barrio-name">{{ row.nombre }}</td>
                <td>
                  <div class="mini-bar-wrap">
                    <div class="mini-bar" :style="{ width: (row.reportes / 45 * 100) + '%' }"></div>
                    <span>{{ row.reportes }}</span>
                  </div>
                </td>
                <td><span class="tag" :style="{ '--tc': row.color }">{{ row.problema }}</span></td>
                <td><span class="status" :class="row.estado">{{ row.estadoLabel }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container footer-inner">
        <span class="nav-logo">💧 AguaYa</span>
        <p>Proyecto académico · Santa Marta, Colombia</p>
      </div>
    </footer>

  </div>
</template>

<script setup>
const kpis = [
  { icon: '📋', value: '132', label: 'Reportes este mes', trend: '12% vs mes anterior', up: true },
  { icon: '🏘️', value: '48',  label: 'Barrios afectados',  trend: '3 nuevos',             up: true },
  { icon: '✅', value: '76%', label: 'Problemas resueltos', trend: '8% vs mes anterior',  up: true },
  { icon: '⏱️', value: '2.4d', label: 'Tiempo promedio de atención', trend: '0.5d menos', up: true },
]

const barData = [
  { icon: '🚱', label: 'Sin agua',     pct: 70, color: '#ef4444' },
  { icon: '📉', label: 'Baja presión', pct: 50, color: '#f97316' },
  { icon: '🔧', label: 'Fugas',        pct: 40, color: '#0ea5e9' },
  { icon: '🟤', label: 'Agua sucia',   pct: 30, color: '#a16207' },
]

const donutLegend = [
  { color: '#0369a1', label: 'Resueltos',    val: 76 },
  { color: '#38bdf8', label: 'En proceso',   val: 16 },
  { color: '#bae6fd', label: 'Sin atender',  val: 8  },
]

const barrios = [
  { nombre: 'Pescaíto',        reportes: 45, problema: 'Sin agua',     color: '#ef4444', estado: 'critico',   estadoLabel: '🔴 Crítico'   },
  { nombre: 'Gaira',           reportes: 38, problema: 'Baja presión', color: '#f97316', estado: 'alerta',    estadoLabel: '🟠 Alerta'    },
  { nombre: 'El Rodadero',     reportes: 31, problema: 'Fugas',        color: '#0ea5e9', estado: 'proceso',   estadoLabel: '🔵 En proceso'},
  { nombre: 'La Paz',          reportes: 24, problema: 'Sin agua',     color: '#ef4444', estado: 'alerta',    estadoLabel: '🟠 Alerta'    },
  { nombre: 'Mamatoco',        reportes: 19, problema: 'Agua sucia',   color: '#a16207', estado: 'proceso',   estadoLabel: '🔵 En proceso'},
  { nombre: 'Centro Histórico',reportes: 14, problema: 'Baja presión', color: '#f97316', estado: 'resuelto',  estadoLabel: '🟢 Resuelto'  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500&display=swap');

/* ── BASE ── */
* { box-sizing: border-box; margin: 0; padding: 0; }
.stats-page {
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
  z-index: 100;
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
  padding: 120px 0 56px;
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
  margin-bottom: 14px;
}
.page-desc {
  color: #64748b;
  font-size: 17px;
}

/* ── SECTIONS ── */
.section { padding: 72px 0; }
.section-alt { background: #f8fafc; }

/* ── KPI CARDS ── */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.kpi-card {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 18px;
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  animation: fadeUp 0.5s ease both;
  transition: transform .2s, box-shadow .2s;
}
.kpi-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(3,105,161,0.1);
  border-color: #bae6fd;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.kpi-icon { font-size: 30px; flex-shrink: 0; }
.kpi-body {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.kpi-value {
  font-family: 'Sora', sans-serif;
  font-size: 30px;
  font-weight: 800;
  color: #0369a1;
  line-height: 1;
}
.kpi-label {
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
}
.kpi-trend {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
}
.kpi-trend.up   { background: #dcfce7; color: #16a34a; }
.kpi-trend.down { background: #fee2e2; color: #dc2626; }

/* ── CHART CARD ── */
.charts-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 20px;
  align-items: start;
}
.chart-card {
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 20px;
  padding: 28px;
}
.full-width { grid-column: 1 / -1; }
.chart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}
.chart-title {
  font-family: 'Sora', sans-serif;
  font-size: 16px;
  font-weight: 700;
}
.chart-period {
  font-size: 12px;
  background: #f1f5f9;
  color: #64748b;
  padding: 4px 10px;
  border-radius: 20px;
}

/* ── BAR CHART ── */
.bar-chart { display: flex; flex-direction: column; gap: 18px; }

.bar-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 7px;
}
.bar-icon { font-size: 15px; }
.bar-name { font-size: 14px; color: #334155; flex: 1; }
.bar-pct  { font-size: 13px; font-weight: 600; color: #0369a1; }
.bar-track {
  height: 10px;
  background: #f1f5f9;
  border-radius: 10px;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: 10px;
  width: 0;
  animation: growBar 0.8s ease forwards;
}
@keyframes growBar {
  from { width: 0 !important; }
}

/* ── DONUT ── */
.donut-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.donut-svg { width: 160px; height: 160px; }
.donut-seg {
  animation: spinIn 1s ease forwards;
  transform-origin: 60px 60px;
}
@keyframes spinIn {
  from { stroke-dasharray: 0 301; }
}
.donut-center-val {
  font-family: 'Sora', sans-serif;
  font-size: 22px;
  font-weight: 800;
  fill: #0369a1;
}
.donut-center-label {
  font-size: 9px;
  fill: #64748b;
  font-family: 'Inter', sans-serif;
}
.donut-legend { width: 100%; display: flex; flex-direction: column; gap: 10px; }
.legend-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}
.legend-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.legend-label { flex: 1; color: #334155; }
.legend-val { font-weight: 600; color: #0f172a; }

/* ── TABLE ── */
.barrio-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.barrio-table th {
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #94a3b8;
  padding: 0 12px 14px;
  border-bottom: 1.5px solid #e2e8f0;
}
.barrio-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}
.barrio-table tr:last-child td { border-bottom: none; }
.barrio-table tr:hover td { background: #f8fafc; }
.rank {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  color: #cbd5e1;
  font-size: 16px;
}
.barrio-name { font-weight: 600; color: #0f172a; }
.mini-bar-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}
.mini-bar {
  height: 6px;
  background: linear-gradient(90deg, #0369a1, #38bdf8);
  border-radius: 6px;
  max-width: 100px;
  min-width: 8px;
}
.mini-bar-wrap span { font-weight: 600; font-size: 13px; }
.tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
  background: color-mix(in srgb, var(--tc) 12%, white);
  color: var(--tc);
  border: 1px solid color-mix(in srgb, var(--tc) 25%, white);
}
.status {
  font-size: 12px;
  font-weight: 500;
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
  .charts-row { grid-template-columns: 1fr; }
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .barrio-table { font-size: 12px; }
}
</style>