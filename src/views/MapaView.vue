<template>
  <div class="map-page">

    <!-- PAGE HEADER -->
    <section class="page-header">
      <div class="container">
        <p class="section-label">Vista en tiempo real</p>
        <h1 class="page-title">Mapa de reportes</h1>
        <p class="page-desc">Visualiza las zonas afectadas por problemas de agua en Santa Marta.</p>
        <WeatherBanner />
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

      <!-- MAPA como componente -->
      <MapView :reportes="reportesFiltrados" />

      <!-- BOTÓN TOGGLE PANEL -->
      <button class="toggle-panel" @click="togglePanel">
        {{ mostrarPanel ? '✕ Ocultar panel' : '☰ Ver reportes' }}
      </button>

      <!-- PANEL LATERAL -->
      <aside class="side-panel" v-show="mostrarPanel">
        <div class="panel-header">
          <h3>Reportes recientes</h3>
          <span class="panel-count">{{ reportesFiltrados.length }} reportes</span>
        </div>
        <div class="report-list">
          <ReportCard
            v-for="(r, i) in reportesFiltrados"
            :key="i"
            :reporte="r"
          />
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
import { useWaterReportsStore } from '@/stores/waterReports'
import MapView       from '@/components/MapView.vue'
import ReportCard    from '@/components/ReportCard.vue'
import WeatherBanner from '@/components/WeatherBanner.vue'

export default {
  name: 'MapaView',
  components: { MapView, ReportCard, WeatherBanner },

  data() {
    return {
      filtroActivo: 'todos',
      mostrarPanel: true,
      filtros: [
        { id: 'todos',        label: 'Todos',        icon: '🗺️', color: '#0369a1' },
        { id: 'Sin agua',     label: 'Sin agua',     icon: '🚱', color: '#ef4444' },
        { id: 'Baja presión', label: 'Baja presión', icon: '📉', color: '#f97316' },
        { id: 'Agua sucia',   label: 'Agua sucia',   icon: '🟤', color: '#a16207' },
        { id: 'Fuga',         label: 'Fugas',        icon: '🔧', color: '#0ea5e9' },
      ],
    }
  },

  computed: {
    store() {
      return useWaterReportsStore()
    },
    reportesFiltrados() {
      const lista = this.store.reportesConMeta
      if (this.filtroActivo === 'todos') return lista
      return lista.filter(r => r.tipo === this.filtroActivo)
    },
  },

  methods: {
    togglePanel() {
      this.mostrarPanel = !this.mostrarPanel
    },
  },
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }
.map-page { font-family: 'Inter', sans-serif; color: #0f172a; background: #fff; min-height: 100vh; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

.page-header {
  padding: 100px 0 32px;
  background: linear-gradient(160deg, #e0f2fe 0%, #f8fafc 60%);
  border-bottom: 1px solid #e2e8f0;
}
.page-header .container { display: flex; flex-direction: column; align-items: flex-start; }
.section-label {
  display: block; font-size: 12px; font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase;
  color: #0369a1; margin-bottom: 10px;
}
.page-title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(32px, 5vw, 52px); font-weight: 800;
  line-height: 1.1; margin-bottom: 12px;
}
.page-desc { color: #64748b; font-size: 16px; margin-bottom: 20px; }

.filters-bar {
  background: white; border-bottom: 1px solid #e2e8f0;
  padding: 12px 0; position: sticky; top: 60px; z-index: 90;
}
.filters-inner { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.filters-label { font-size: 13px; color: #94a3b8; font-weight: 500; margin-right: 4px; }
.filter-btn {
  border: 1.5px solid #e2e8f0; background: white; color: #334155;
  padding: 6px 14px; border-radius: 20px; font-size: 13px;
  font-weight: 500; cursor: pointer; transition: all .2s;
  font-family: 'Inter', sans-serif;
}
.filter-btn:hover { border-color: var(--fc); color: var(--fc); }
.filter-btn.active { background: var(--fc); border-color: var(--fc); color: white; }

.map-layout {
  display: grid; grid-template-columns: 1fr 320px;
  gap: 20px; padding-top: 28px; padding-bottom: 48px; align-items: start;
}

.toggle-panel {
  display: none; grid-column: 1 / -1;
  padding: 8px 18px; background: #0369a1; color: white;
  border: none; border-radius: 20px; font-size: 13px; font-weight: 600;
  cursor: pointer; font-family: 'Inter', sans-serif;
  transition: background .2s; justify-self: start;
}
.toggle-panel:hover { background: #0284c7; }

.side-panel {
  background: white; border: 1.5px solid #e2e8f0;
  border-radius: 20px; overflow: hidden; display: flex; flex-direction: column;
}
.panel-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 20px 16px; border-bottom: 1px solid #f1f5f9;
}
.panel-header h3 { font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 700; }
.panel-count { font-size: 12px; background: #f1f5f9; color: #64748b; padding: 3px 10px; border-radius: 20px; }
.report-list { overflow-y: auto; max-height: 460px; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.panel-footer { padding: 16px; border-top: 1px solid #f1f5f9; }
.btn-report {
  display: block; text-align: center; background: #0369a1; color: white;
  padding: 12px; border-radius: 12px; text-decoration: none;
  font-size: 14px; font-weight: 600; transition: background .2s, transform .2s;
}
.btn-report:hover { background: #0284c7; transform: translateY(-1px); }

.footer { background: #0f172a; color: #64748b; padding: 24px 0; font-size: 13px; }
.footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }

@media (max-width: 768px) {
  .map-layout { grid-template-columns: 1fr; }
  .toggle-panel { display: block; }
}
</style>