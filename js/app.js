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
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                fill: false,
                borderWidth: 4
            },
            {
                label: 'Muertes',
                data:  muertos,
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                fill: false,
                borderWidth: 4
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

            result.forEach(element => {
                arrayfecha.push(formaterFecha(element.reportDate));
                confirmados.push(element.confirmed.total);
                muertos.push(element.deaths.total);
            });
                
                var myChart = new Chart(ctx, {
                    type: 'line',
                data: dataSet(arrayfecha,confirmados,muertos) ,
                options: {
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
                    <td>${casosPorPais[index].recovered}</td>
                    <td>${casosPorPais[index].deaths}</td>
                    </tr>`;
                }
                tbody.innerHTML= tr;
        // console.log(casosPorPais);
    })
    .catch(e => {console.log(e)})