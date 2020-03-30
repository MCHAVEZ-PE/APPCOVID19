class Intefaz{
    constructor(){
        this.init();
    }

    init(){
        this.rellenarSelect();
        this.resultadoActualTotal();
    }

    rellenarSelect=()=>{
        var data = fetch('../resources/countries.json')
        .then(data =>{
            return data.json();
        })
        .catch(e=>{console.log(e)});
        
        return data;
    }
    resultadoActualTotal=()=>{
        var data = fetch("https://covid19.mathdro.id/api/")
        .then(data=>{
            return data.json();
        })
        .catch(error=>
            {return error;
        });

        return data;
    }

    resultadoActualPais=(country)=>{
        

           var url =  (country=="all") ?  "https://covid19.mathdro.id/api/" : 'https://covid19.mathdro.id/api/countries/'+country;
           
            // console.log(url)
            if(url == undefined  || url == null){
                resultadoActualPais(country);
            }
            var data = fetch(url)
            .then(data=>{return data.json()})
            .catch(e =>{ return error.text()});
            return data;
        }

    resultadoDarioCasos=()=>{
        var data = fetch("https://covid19.mathdro.id/api/daily") 
                    .then(data=>{
                         return data.json(); 
                    })
                    .catch(error=>{
                        return error;
                    });

            
            return data;

    }

    CasosPorPaises=()=>{
        var myHeaders = new Headers();
            myHeaders.append("x-rapidapi-host", "covid-193.p.rapidapi.com");
            myHeaders.append("x-rapidapi-key", "f9e5fac483msh2e927c10f84f67dp187b76jsne006ef56dae8");
        var data = fetch("https://covid-193.p.rapidapi.com/statistics",{    
            'headers':myHeaders
        })
                .then(data=>{return data.json();})
                .catch(e=>{return e})
            
        return data;
            }


}