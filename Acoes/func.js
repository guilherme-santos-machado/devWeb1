const form = document.getElementById("formulario");

form.addEventListener("submit", (e)=>{
    const data = formDataToJSON(new FormData(form));
    incluirLinha(data);
});

function incluirLinha({data, quantidade, valor}){
    const corpo = document.querySelector("#tabela > tbody");    
    let tr = `
        <tr>
            <td>${converterData(data)}</td>
            <td>${quantidade}</td>
            <td>${valor}</td>
            <td>${quantidade * valor}</td>
        </tr>
    `;
    var novaLinha = corpo.insertRow(0);
    novaLinha.innerHTML = tr;
}

function formDataToJSON(data){
    var object = {};
    data.forEach((value, key) => {
      object[key] = value;
    });
    return object;
}

function converterData(data){
    data = data.split("-");    
    return `${data[2]}/${data[1]}/${data[0]}`;
}