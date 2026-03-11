<template>

<nav class="navbar">

<div class="container">

<div class="logo">
💧 AguaYa
</div>

<div class="links">

<router-link to="/" class="nav-link">
Inicio
</router-link>

<router-link to="/mapa" class="nav-link">
Mapa
</router-link>

<router-link to="/estadisticas" class="nav-link">
Estadísticas
</router-link>

<router-link to="/reportar" class="btn-report">
Reportar
</router-link>

</div>

</div>

</nav>

</template>

<style>

.navbar{
background: linear-gradient(135deg,#0077ff,#00b4ff);
padding:15px 0;
box-shadow:0 4px 10px rgba(0,0,0,0.2);
}

.container{
width:90%;
margin:auto;
display:flex;
justify-content:space-between;
align-items:center;
}

.logo{
color:white;
font-size:22px;
font-weight:bold;
}

.links{
display:flex;
align-items:center;
gap:20px;
}

.nav-link{
color:white;
text-decoration:none;
font-weight:500;
transition:0.3s;
}

.nav-link:hover{
opacity:0.7;
}

.btn-report{
background:white;
color:#0077ff;
padding:8px 16px;
border-radius:20px;
text-decoration:none;
font-weight:bold;
transition:0.3s;
}

.btn-report:hover{
background:#f2f2f2;
transform:scale(1.05);
}

</style>