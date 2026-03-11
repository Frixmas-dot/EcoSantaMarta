<template>

<div class="stats-page">

<h1 class="title">📊 Estadísticas del servicio de agua</h1>

<div class="stats-container">

<div class="stat-card">
<h2>132</h2>
<p>Reportes este mes</p>
</div>

<div class="stat-card">
<h2>48</h2>
<p>Barrios afectados</p>
</div>

<div class="stat-card">
<h2>76%</h2>
<p>Problemas resueltos</p>
</div>

</div>


<h2 class="subtitle">Problemas más reportados</h2>

<div class="chart">

<div class="bar-container">
<span>No hay agua</span>
<div class="bar">
<div class="bar-fill" style="width:70%"></div>
</div>
</div>

<div class="bar-container">
<span>Baja presión</span>
<div class="bar">
<div class="bar-fill" style="width:50%"></div>
</div>
</div>

<div class="bar-container">
<span>Agua sucia</span>
<div class="bar">
<div class="bar-fill" style="width:30%"></div>
</div>
</div>

<div class="bar-container">
<span>Fugas</span>
<div class="bar">
<div class="bar-fill" style="width:40%"></div>
</div>
</div>

</div>

</div>

</template>

<style>

.stats-page{
padding:50px;
background:#f4f8ff;
min-height:90vh;
}

.title{
text-align:center;
margin-bottom:40px;
}

.stats-container{
display:flex;
justify-content:center;
gap:25px;
flex-wrap:wrap;
margin-bottom:50px;
}

.stat-card{
background:white;
padding:30px;
width:200px;
text-align:center;
border-radius:12px;
box-shadow:0 6px 15px rgba(0,0,0,0.1);
transition:0.3s;
}

.stat-card:hover{
transform:translateY(-5px);
}

.stat-card h2{
font-size:40px;
color:#0077ff;
}

.subtitle{
margin-bottom:20px;
}

.chart{
max-width:600px;
margin:auto;
}

.bar-container{
margin-bottom:15px;
}

.bar{
background:#ddd;
height:20px;
border-radius:10px;
overflow:hidden;
}

.bar-fill{
background:linear-gradient(90deg,#0077ff,#00c6ff);
height:100%;
}

</style>