<template>

<div class="map-page">

<h1 class="title">📍 Mapa de reportes de agua</h1>

<div class="map-layout">

<div class="map-container">

<div id="map"></div>

</div>


<div class="report-panel">

<h3>Reportes recientes</h3>

<div class="report-card">
<h4>🔴 El Rodadero</h4>
<p>No hay agua desde ayer</p>
</div>

<div class="report-card">
<h4>🟠 Centro</h4>
<p>Baja presión en el servicio</p>
</div>

<div class="report-card">
<h4>🔵 Gaira</h4>
<p>Agua con sedimentos</p>
</div>

<div class="report-card">
<h4>🟡 Bastidas</h4>
<p>Fuga en tubería principal</p>
</div>

</div>

</div>

</div>

</template>


<script>

import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default {

name:"MapaView",

mounted(){

const map = L.map("map").setView([11.2408,-74.1990],13)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
maxZoom:19
}).addTo(map)


// Marcadores de ejemplo

L.marker([11.205,-74.225])
.addTo(map)
.bindPopup("Rodadero: No hay agua")

L.marker([11.244,-74.211])
.addTo(map)
.bindPopup("Centro: Baja presión")

L.marker([11.225,-74.195])
.addTo(map)
.bindPopup("Gaira: Agua sucia")

}

}

</script>


<style>

.map-page{
padding:40px;
background:#f4f8ff;
min-height:90vh;
}

.title{
text-align:center;
margin-bottom:30px;
}

.map-layout{
display:flex;
gap:25px;
justify-content:center;
align-items:flex-start;
flex-wrap:wrap;
}

.map-container{
flex:2;
}

#map{
height:500px;
border-radius:12px;
box-shadow:0 8px 20px rgba(0,0,0,0.15);
}

.report-panel{
flex:1;
background:white;
padding:20px;
border-radius:12px;
box-shadow:0 8px 20px rgba(0,0,0,0.15);
max-width:300px;
}

.report-panel h3{
margin-bottom:15px;
}

.report-card{
background:#f7f9ff;
padding:12px;
border-radius:8px;
margin-bottom:10px;
transition:0.3s;
width:100%;
box-sizing:border-box;
overflow:hidden;
}

.report-card:hover{
background:#eaf1ff;
transform:translateY(-2px);
}

.report-card h4{
margin:0;
font-size:15px;
}

.report-card p{
margin:3px 0 0;
font-size:13px;
color:#555;
}

</style>