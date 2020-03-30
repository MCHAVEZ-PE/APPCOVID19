const interfaz = new Intefaz();
var array = [];

interfaz.rellenarSelect()
.then(data=>{
    var resultado = data.countries;

    var select = document.getElementById("country");
    
    resultado.forEach(element => {
        var option = document.createElement("option");
        option.value= element.iso2;
        option.appendChild(document.createTextNode(element.name));
        select.appendChild(option);
    });
    // console.log(resultado)


})
.catch(e=>console.log(e));


fechaActualizada = (fecha)=>{
    var result;
    var data =   fecha.substring(0,19);
    arrdata = data.split("T");
   return result =  `${arrdata[0]} ${arrdata[1]}`;
}



interfaz.resultadoActualTotal()
    .then(data=>{
        var that = this;
        var ultimaActualizacion,
            confirmados,
            recuperados,
            muertes,
            pfecha;
           var fecha = fechaActualizada(data.lastUpdate);
            
            
        ultimaActualizacion = document.getElementById("lastUpdate");
            pfecha   = document.getElementById("pfecha")
        confirmados = document.getElementById("confirmed");
        recuperados = document.getElementById("recovered");
        muertes = document.getElementById("death");

        ultimaActualizacion.appendChild(document.createTextNode(fecha));
        pfecha.append(fecha);
        confirmados.innerHTML =data.confirmed.value;
        recuperados.innerHTML = data.recovered.value;
        muertes.innerHTML=data.deaths.value;

        // console.log(data)
    })
    .catch(e=>console.log(e));

    onSelected=()=>{
        var country = document.getElementById("country").value;
        // console.log(country);
        
        interfaz.resultadoActualPais(country)
        .then(data=>{   

            var confirmados,
                recuperados,
                muertes;
                // console.log(data);
                confirmados = document.getElementById("confirmed");
                recuperados = document.getElementById("recovered");
                muertes = document.getElementById("death");

                confirmados.innerHTML = data.confirmed.value;
                recuperados.innerHTML = data.recovered.value;
                muertes.innerHTML= data.deaths.value;    
        })
        .catch(e=>console.log(e));  

    
    }

var ctx = document.getElementById('myChart').getContext('2d'); 


dataSet =  (fecha,confirmados,muertos)=>{

      return  data = {
            labels:  fecha,
            datasets: [
            {
                label: 'Confirmado',
                data:  confirmados,
                backgroundColor:  'transparent' ,
                borderColor: 
                    'green',
                // pointBorderColor:'transparent',
                pointRadius:2,
                pointBorderWidth:1,
                lineTension:0,
                fill: false,
                borderWidth: 2
            },
            {
                label: 'Muertes',
                data:  muertos,
                backgroundColor: 'transparent',
                borderColor:  'red',
                pointRadius:2,
                pointBorderWidth:1,
                lineTension:0,
                fill: false,
                borderWidth: 2
            }
            
        ]
        }
    }
    
 interfaz.resultadoDarioCasos()
    .then(data=>{
            var result = data;
            var arrayfecha = [],
                muertos= [],
                confirmados= [];
            console.log(result.length); 


            for (let i = 30; i < result.length; i++) {
                // const element = result[index];
                arrayfecha.push(formaterFecha(result[i].reportDate));
                confirmados.push(result[i].confirmed.total);
                muertos.push(result[i].deaths.total);
                
            
            }
            //     result.forEach(element => {
            // });
                
                var myChart = new Chart(ctx, {
                    type: 'line',
                data: dataSet(arrayfecha,confirmados,muertos) ,
                options: {
                    legend:{
                        labels:{
                            fontColor:'Black'
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            // console.log(array.reportDate);
        })
        .catch(e=>console.log(e))


formaterFecha=(fecha)=>{
    // var f = "2020-03-12";
    var data = fecha.split("-");
    return `${data[1]}/${data[2]}`;
}

interfaz.CasosPorPaises()
    .then(data =>{
        var result = data.response;
        // console.log(result)
        var casosPorPais=[];
        result.forEach((element,key) => {
            var obj = {};
            obj.country = element.country;
            obj.confirmed = element.cases.total;
            obj.recovered = element.cases.recovered;
            obj.deaths = element.deaths.total;
            casosPorPais.push(obj);
        });

        casosPorPais.sort((a,b)=>{

            return  b.confirmed - a.confirmed;
        })
           var tbody = document.getElementById("tBody");
           var tr ="";
        for (let index = 1; index <= 10; index++) {
                tr +=`<tr>
                    <td>${casosPorPais[index].country}</td>
                    <td>${casosPorPais[index].confirmed}</td>
                    <td class='celda'>${casosPorPais[index].recovered}</td>
                    <td>${casosPorPais[index].deaths}</td>
                    </tr>`;
                }
                tbody.innerHTML= tr;
        // console.log(casosPorPais);
    })
    .catch(e => {console.log(e)})