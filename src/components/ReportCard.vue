<template>
  <div class="report-card" :style="{ '--rc': reporte.color }">
    <div class="report-dot"></div>
    <div class="report-body">
      <div class="report-top">
        <strong>{{ reporte.barrio }}</strong>
        <span class="report-time">{{ reporte.tiempo }}</span>
      </div>
      <p class="report-desc">{{ reporte.desc }}</p>
      <span class="report-tag">{{ reporte.icon }} {{ reporte.tipo }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportCard',
  props: {
    reporte: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.report-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px;
  border-radius: 12px;
  border: 1.5px solid #f1f5f9;
  transition: border-color .2s, transform .2s;
  cursor: default;
  background: white;
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
.report-time { font-size: 11px; color: #94a3b8; flex-shrink: 0; }
.report-desc { font-size: 12px; color: #64748b; line-height: 1.5; margin-bottom: 8px; }
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
</style>