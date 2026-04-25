import { defineStore } from 'pinia'


export const useWaterReportsStore = defineStore('waterReports', {
  state: () => ({
    reportes: [
      { id: 1, barrio: 'El Rodadero', tipo: 'Sin agua',     desc: 'Sin agua desde ayer en el sector.',   urgencia: 'alta',  lat: 11.205, lng: -74.225, fecha: new Date(Date.now() - 2  * 3600000) },
      { id: 2, barrio: 'Centro',      tipo: 'Baja presión', desc: 'Baja presión en el servicio.',         urgencia: 'media', lat: 11.244, lng: -74.211, fecha: new Date(Date.now() - 4  * 3600000) },
      { id: 3, barrio: 'Gaira',       tipo: 'Agua sucia',   desc: 'Agua con sedimentos y color marrón.',  urgencia: 'media', lat: 11.225, lng: -74.195, fecha: new Date(Date.now() - 5  * 3600000) },
      { id: 4, barrio: 'Bastidas',    tipo: 'Fuga',         desc: 'Fuga visible en tubería principal.',   urgencia: 'alta',  lat: 11.252, lng: -74.185, fecha: new Date(Date.now() - 6  * 3600000) },
      { id: 5, barrio: 'Pescaíto',    tipo: 'Sin agua',     desc: 'Corte total sin aviso previo.',        urgencia: 'alta',  lat: 11.248, lng: -74.200, fecha: new Date(Date.now() - 7  * 3600000) },
      { id: 6, barrio: 'La Paz',      tipo: 'Baja presión', desc: 'Presión muy baja desde la mañana.',    urgencia: 'baja',  lat: 11.235, lng: -74.220, fecha: new Date(Date.now() - 9  * 3600000) },
    ],

    metaTipo: {
      'Sin agua':     { icon: '🚱', color: '#ef4444' },
      'Baja presión': { icon: '📉', color: '#f97316' },
      'Agua sucia':   { icon: '🟤', color: '#a16207' },
      'Fuga':         { icon: '🔧', color: '#0ea5e9' },
    },

    // Mapeo de ids del formulario al nombre real del tipo
    idToTipo: {
      'sin-agua':     'Sin agua',
      'baja-presion': 'Baja presión',
      'agua-sucia':   'Agua sucia',
      'fuga':         'Fuga',
    },
  }),

  getters: {
    reportesConMeta(state) {
      return state.reportes.map(r => ({
        ...r,
        ...state.metaTipo[r.tipo],
        tiempo: this.tiempoRelativo(r.fecha),
      }))
    },

    total(state) {
      return state.reportes.length
    },
  },

  actions: {
    tiempoRelativo(fecha) {
      const mins = Math.floor((Date.now() - new Date(fecha)) / 60000)
      if (mins < 60)   return `Hace ${mins}m`
      if (mins < 1440) return `Hace ${Math.floor(mins / 60)}h`
      return `Hace ${Math.floor(mins / 1440)}d`
    },

    // Llama a Nominatim para obtener coordenadas reales del barrio
    async geocodificar(barrio) {
      const query = encodeURIComponent(`${barrio}, Santa Marta, Colombia`)
      const url   = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`

      try {
        const res  = await fetch(url, {
          headers: { 'Accept-Language': 'es' }
        })
        const data = await res.json()

        if (data && data.length > 0) {
          return {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          }
        }
      } catch (e) {
        console.warn('Nominatim no respondió, usando coordenadas aproximadas')
      }

      // Fallback: punto aleatorio cerca del centro de Santa Marta
      return {
        lat: 11.2408 + (Math.random() - 0.5) * 0.06,
        lng: -74.199 + (Math.random() - 0.5) * 0.06,
      }
    },

    async agregarReporte({ barrio, tipoId, desc, urgencia }) {
      const tipo = this.idToTipo[tipoId] || tipoId
      const { lat, lng } = await this.geocodificar(barrio)

      this.reportes.unshift({
        id:      Date.now(),
        barrio,
        tipo,
        desc,
        urgencia,
        lat,
        lng,
        fecha:   new Date(),
      })
    },
  },
})