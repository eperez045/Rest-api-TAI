const data = {
  FuncName: "Tai.Backend.Qplant",
  ActiveActor: "WKU11",
  FuncParam01: "OEEMONITOR2",
  FuncParam02: "SPAIN",
  FuncParam03: "",
  FuncParam04: "",
  FuncParam05: "",
  TraceLog: "Y",
};

const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
};

const maquinas = document.getElementById('maquinas');

fetch("http://intranet.taionline.net:14036/api/loadtfunction", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    const datosDiv = document.getElementById("datos");
    let html = "";
    data.Payload.forEach((obj) => {
        html += `<div class="card mt-4 border-black">`
        html += `<h4 class="card-header border-success">${obj.sbaname} (${obj.sbacode})</h4>`;
        html += `<div class="card-body">`
        html += `<h6 class="card-text">Tiempo de produccion: <span>${obj.sbatime} segundos</span></h6>`;
        html += `<h6 class="card-text">Lugar de produccion: <span>${obj.plnname} (${obj.plncode})</span></h6>`
        html += `<p>Maquinas:</p>`;
        html += `<div class="row">`
        obj.workunits.forEach((unit) => {
            let porcentajeParos = parseInt((unit.tpar/unit.quantityrequired)*100)
            let porcentajePreparacion = parseInt((unit.tprep/unit.quantityrequired)*100)
            let porcentajeProducidos = parseInt((unit.tprod/unit.quantityrequired)*100)
            html += `<div class="col">`;
            html += `<div class="card card-machine border-black">`;
            html += `<div class="card-body">`;
            html += `<h5 class="card-header" style="border: ${unit.sitcolor} solid 1px">${unit.wkuname} <span class="badge" style="background-color: ${unit.sitcolor}">${unit.sitname}</span></h5>`;
            html += `<div class="mt-2">Velocidad: <strong>${unit.speed}</strong></div>`;
            html += `<ul class="list-inline">`;
            html += `<li class="list-inline-item">Active work order: <mark>${unit.wohnumber}</mark></li>`
            html += `<li class="list-inline-item">Product: <mark>${unit.matcode}</mark></li>`
            html += `</ul>`;
            html += `<p>Product-name: <strong>${unit.matname}</strong></p>`;
            html += `<ul class="list-inline p-1 border-black">`;
            html += `<li class="list-inline-item">Quantity Requieded: <strong>${unit.quantityrequired}</strong></li>`;
            html += `<li class="list-inline-item">Quantity Produced: <strong>${unit.quantityproduced}</strong></li>`
            html += `</ul>`;
            html += `Paros: ${unit.tpar}<div class="progress" role="progressbar" aria-valuenow="${porcentajeParos}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-danger text-dark" style="width: ${porcentajeParos}%"></div></div>`;
            html += `Produccidos: ${unit.tprod}<div class="progress" role="progressbar" aria-valuenow="${porcentajeProducidos}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-warning text-dark" style="width: ${porcentajeProducidos}%"></div></div>`;
            html += `Preparados: ${unit.tprep} <div class="progress" role="progressbar" aria-valuenow="${porcentajePreparacion}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-success text-dark" style="width: ${porcentajePreparacion}%"></div></div>`
            html += `</div>`;
            html += `</div>`;
            html += `</div>`;
        });
        html += `</div>`;
        html += `</div>`;
        html += `</div>`;
        html += `</div>`;
    });

    datosDiv.innerHTML = html;
  })
  .catch((error) => {
    console.error(error);
  });



