<template>

<div class="report-page">

<div class="report-card">

<h2 class="title">💧 Reportar problema de agua</h2>

<p class="subtitle">
Ayuda a mejorar el servicio reportando problemas en tu barrio
</p>

<form>

<div class="form-group">
<label>Barrio</label>
<input type="text" placeholder="Ej: El Rodadero">
</div>

<div class="form-group">
<label>Tipo de problema</label>

<select>

<option>No hay agua</option>
<option>Baja presión</option>
<option>Agua sucia</option>
<option>Fuga de agua</option>

</select>

</div>

<div class="form-group">
<label>Comentario</label>

<textarea rows="3"
placeholder="Describe el problema...">
</textarea>

</div>

<button class="btn-report">
Enviar reporte
</button>

</form>

</div>

</div>

</template>

<style>

.report-page{
min-height:90vh;
display:flex;
align-items:center;
justify-content:center;
background:linear-gradient(135deg,#eef6ff,#dff1ff);
padding:40px;
}

.report-card{
background:white;
padding:40px;
border-radius:12px;
width:420px;
box-shadow:0 8px 20px rgba(0,0,0,0.15);
}

.title{
text-align:center;
margin-bottom:10px;
}

.subtitle{
text-align:center;
color:#666;
margin-bottom:25px;
font-size:14px;
}

.form-group{
display:flex;
flex-direction:column;
margin-bottom:15px;
}

label{
font-weight:600;
margin-bottom:5px;
}

input,
select,
textarea{
padding:10px;
border-radius:6px;
border:1px solid #ccc;
font-size:14px;
transition:0.3s;
}


</style>