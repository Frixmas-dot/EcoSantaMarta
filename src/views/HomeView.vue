<template>

<div>

<!-- HERO -->

<section class="hero">

<div class="hero-overlay">

<div class="container hero-content">

<h1>💧 AguaYa</h1>

<p>
Plataforma ciudadana para reportar problemas del servicio
de agua en Santa Marta.
</p>

<div class="hero-buttons">

<router-link to="/reportar" class="btn-primary">
Reportar problema
</router-link>

<router-link to="/mapa" class="btn-secondary">
Ver mapa
</router-link>

</div>

</div>

</div>

</section>


<!-- PROBLEMAS -->

<section class="section">

<div class="container">

<h2 class="section-title">Problemas más comunes</h2>

<div class="problem-grid">

<div class="problem-card">
<h3>🚱 Sin agua</h3>
<p>Cortes prolongados del servicio en algunos barrios.</p>
</div>

<div class="problem-card">
<h3>💧 Baja presión</h3>
<p>El agua llega con presión muy baja.</p>
</div>

<div class="problem-card">
<h3>🟤 Agua sucia</h3>
<p>Agua con sedimentos o color extraño.</p>
</div>

<div class="problem-card">
<h3>🔧 Fugas</h3>
<p>Rupturas en tuberías o fugas visibles.</p>
</div>

</div>

</div>

</section>


<!-- COMO FUNCIONA -->

<section class="section section-light">

<div class="container">

<h2 class="section-title">¿Cómo funciona?</h2>

<div class="steps-grid">

<div class="step-card">
<h3>1</h3>
<p>Reporta un problema en tu barrio.</p>
</div>

<div class="step-card">
<h3>2</h3>
<p>El reporte aparece en el mapa.</p>
</div>

<div class="step-card">
<h3>3</h3>
<p>Otros ciudadanos pueden visualizar las zonas afectadas.</p>
</div>

</div>

</div>

</section>


<!-- CTA -->

<section class="cta">

<div class="container">

<h2>Ayuda a mejorar el servicio</h2>

<router-link to="/reportar" class="btn-report">
Hacer un reporte
</router-link>

</div>

</section>


<!-- FOOTER -->

<footer class="footer">

<div class="container">

<p>Proyecto académico - Aplicación AguaYa</p>
<p>Santa Marta, Colombia</p>

</div>

</footer>

</div>

</template>

<style>

/* CONTENEDOR GLOBAL */

.container{
max-width:1100px;
margin:auto;
padding:0 20px;
}

/* HERO */

.hero{
height:75vh;
background-image:url("https://images.unsplash.com/photo-1500375592092-40eb2168fd21");
background-size:cover;
background-position:center;
display:flex;
align-items:center;
}

.hero-overlay{
background:rgba(0,0,0,0.5);
width:100%;
height:100%;
display:flex;
align-items:center;
}

.hero-content{
color:white;
text-align:center;
}

.hero h1{
font-size:50px;
margin-bottom:15px;
}

.hero p{
font-size:18px;
margin-bottom:25px;
}

/* BOTONES */

.hero-buttons{
display:flex;
justify-content:center;
gap:15px;
}

.btn-primary{
background:white;
color:#0077ff;
padding:12px 20px;
border-radius:25px;
text-decoration:none;
font-weight:bold;
}

.btn-secondary{
border:2px solid white;
color:white;
padding:12px 20px;
border-radius:25px;
text-decoration:none;
}

/* SECCIONES */

.section{
padding:70px 0;
}

.section-light{
background:#f4f8ff;
}

.section-title{
text-align:center;
margin-bottom:40px;
}

/* PROBLEMAS */

.problem-grid{
display:flex;
gap:25px;
justify-content:center;
flex-wrap:wrap;
}

.problem-card{
background:white;
padding:25px;
width:220px;
border-radius:12px;
box-shadow:0 6px 15px rgba(0,0,0,0.1);
transition:0.3s;
}

.problem-card:hover{
transform:translateY(-5px);
}

/* PASOS */

.steps-grid{
display:flex;
gap:25px;
justify-content:center;
flex-wrap:wrap;
}

.step-card{
background:white;
padding:30px;
width:200px;
border-radius:12px;
text-align:center;
box-shadow:0 6px 15px rgba(0,0,0,0.1);
}

.step-card h3{
font-size:30px;
color:#0077ff;
}

/* CTA */

.cta{
background:#0077ff;
color:white;
text-align:center;
padding:60px 0;
}

.btn-report{
display:inline-block;
margin-top:20px;
background:white;
color:#0077ff;
padding:14px 25px;
border-radius:25px;
font-weight:bold;
text-decoration:none;
}

/* FOOTER */

.footer{
background:#111;
color:white;
text-align:center;
padding:20px 0;
font-size:14px;
}

</style>