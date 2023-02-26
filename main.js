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

const createMachineCard = (unit) => {
  const { sitcolor, wkuname, sitname, wohnumber, matcode, tpar, quantityrequired, tprep, tprod, speed, matname, quantityproduced } = unit;
  const porcentajeParos = parseInt((tpar / quantityrequired) * 100);
  const porcentajePreparacion = parseInt((tprep / quantityrequired) * 100);
  const porcentajeProducidos = parseInt((tprod / quantityrequired) * 100);

  return `
    <div class="col">
      <div class="card card-machine border-black">
        <div class="card-body">
          <h5 class="card-header" style="border: ${sitcolor} solid 1px">${wkuname} <span class="badge" style="background-color: ${sitcolor}">${sitname}</span></h5>
          <div class="mt-2">Velocidad: <strong>${speed}</strong></div>
          <ul class="list-inline">
            <li class="list-inline-item">Active work order: <mark>${wohnumber}</mark></li>
            <li class="list-inline-item">Product: <mark>${matcode}</mark></li>
          </ul>
          <p>Product-name: <strong>${matname}</strong></p>
          <ul class="list-inline border-black">
            <li class="list-inline-item">Quantity Requiered: <strong>${quantityrequired}</strong></li>
            <li class="list-inline-item">Quantity Produced: <strong>${quantityproduced}</strong></li>
          </ul>
          Paros: ${tpar}
          <div class="progress" role="progressbar" aria-valuenow="${porcentajeParos}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-danger" style="width: ${porcentajeParos}%"></div>
          </div>
          Produccidos: ${tprod}
          <div class="progress" role="progressbar" aria-valuenow="${porcentajeProducidos}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-warning" style="width: ${porcentajeProducidos}%"></div>
          </div>
          Preparados: ${tprep}
          <div class="progress" role="progressbar" aria-valuenow="${porcentajePreparacion}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-success" style="width: ${porcentajePreparacion}%"></div>
          </div>
        </div>
      </div>
    </div>
  `;
};

fetch("http://intranet.taionline.net:14036/api/loadtfunction", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    const datosDiv = document.getElementById("datos");
    const html = data.Payload
      .map((obj) => {
        const machineCardsHtml = obj.workunits.map(createMachineCard).join("");
        return `
          <div class="card mt-4 border-black">
            <h4 class="card-header border-success">${obj.sbaname} (${obj.sbacode})</h4>
            <div class="card-body">
              <h6 class="card-text">Tiempo de produccion: <span>${obj.sbatime} segundos</span></h6>
              <h6 class="card-text">Lugar de produccion: <span>${obj.plnname} (${obj.plncode})</span></h6>
              <p>Maquinas:</p>
              <div class="row">
                ${machineCardsHtml}
              </div>
            </div>
          </div>
        `;
      })
      .join("");
    datosDiv.innerHTML = html;
  })
  .catch((error) => {
    console.error(error);
  });
