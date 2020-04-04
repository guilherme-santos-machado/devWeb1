var fs=require('fs');
var plotly = require('plotly')("guilherme448", "C9WrUni7LDnvyxGEDBmg")  // Key Plotly para autenticação - https://chart-studio.plotly.com/settings/api
var data=fs.readFileSync('base.json', 'utf8');          // lendo arquivo json
var casos=JSON.parse(data);                             // obtendo json como objeto
var casoCount = [];                                     // iniciando array final da contagem dos casos

// array para o eixo X de datas do gráfico
var arrDates = ["1/22/20","1/23/20","1/24/20","1/25/20","1/26/20","1/27/20","1/28/20","1/29/20",
                "1/30/20","1/31/20","2/1/20","2/2/20","2/3/20","2/4/20","2/5/20","2/6/20","2/7/20",
                "2/8/20","2/9/20","2/10/20","2/11/20","2/12/20","2/13/20","2/14/20","2/15/20","2/16/20",
                "2/17/20","2/18/20","2/19/20","2/20/20","2/21/20","2/22/20","2/23/20","2/24/20","2/25/20",
                "2/26/20","2/27/20","2/28/20","2/29/20","3/1/20","3/2/20","3/3/20","3/4/20","3/5/20",
                "3/6/20","3/7/20","3/8/20","3/9/20","3/10/20","3/11/20","3/12/20","3/13/20","3/14/20",
                "3/15/20","3/16/20","3/17/20","3/18/20","3/19/20","3/20/20","3/21/20","3/22/20","3/23/20",
                "3/24/20","3/25/20","3/26/20","3/27/20","3/28/20","3/29/20"]



calculaCasos()                                          // chamada do procedimento de manipulação do json

function calculaCasos() {
    for( var key in casos ){                            // percorre o array com os objetos
        
        let slicedDate = separaDatas( key, casos )      // chamada da extração das datas

        let totalCases = somaCasos( slicedDate )        // chamada da contagem dos casos

        casoCount.push({                                // armazena cada caso como um novo objeto no casoCount 
            country:        casos[key].country_region,  // país
            totalCases:     totalCases,                 // total de casos
            geo:{
                lat:        casos[key].lat,             // latitude
                long:       casos[key].long             // longitude
            },
            dates:          slicedDate                  // data extraída
        })  
    }
}

function separaDatas( key, casos ) {                      // faz a extração das datas
    let newArrCopy = casos[key];
    const slicedDate = Object.keys( newArrCopy ).slice( 4, newArrCopy.length ).reduce(( result, key ) => {
        result[key] = newArrCopy[key];

        return result;
    }, {});
    return slicedDate;
}

function somaCasos( slicedDate ) {                         // faz a soma dos casos
    let totalCases = 0;
    for( var element in slicedDate ) {
        if( slicedDate.hasOwnProperty( element ) ) {
            
            totalCases += parseFloat( slicedDate[element] );
        }
    }
    return totalCases
}

function casosDiarios( slicedDate, arrDailyCases ) {        // implementa o array de casos diários por País
    for( var element in slicedDate ) {
        if( slicedDate.hasOwnProperty( element ) ) {  

            arrDailyCases.push( parseFloat( slicedDate[element] ) );

        }
    }
    return arrDailyCases
}

generateChart()                                                     // chamada para gerar o gráfico

function generateChart() {                                          // gera o gráfico
    var data = [];
    
    for( var key in casos ) {                                       // percorre o array de casos
        let arrDailyCases = []
        let slicedDate = separaDatas( key, casos )                  // chamada da extração das datas

        arrDailyCases = casosDiarios( slicedDate, arrDailyCases  )  // chamada da contagem dos casos diários

        let country_name;                                           // inicia o nome do país

        if (casos[key].province_state != '') {                      // define o nome do país caso tenha uma província
            country_name = casos[key].province_state+' - '+casos[key].country_region
        } else {
            country_name = casos[key].country_region
        }

        let myLine = {                                              // implementa o array de casos ( X: Datas, Y: Núm de Casos )
            x: arrDates,
            y: arrDailyCases,
            type: 'scatter',
            name: country_name
          };

        data.push(myLine)                                           // insere o array de casos no array geral de cada país
    }

      //função do plotly para gerar o gráfico
      var graphOptions = {filename: "date-axes", fileopt: "overwrite"};
      plotly.plot(data, graphOptions, function (err, msg) {
          console.log(msg);
      });


    
            
 }