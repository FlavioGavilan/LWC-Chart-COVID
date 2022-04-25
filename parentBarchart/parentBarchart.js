import { LightningElement, wire } from 'lwc';
import getValoresCovid from '@salesforce/apex/ControllerCalloutCovid19.getValoresCovid'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ParentBarchart extends LightningElement {
    chartConfigurationCases;
    chartConfigurationDeaths;
    chartConfigurationSuspects;
    chartConfigurationRefuses;
    estado = '';

    @wire(getValoresCovid)        

    getValoresCovid({ error, data }) {
        if (error) {
            this.error = error;
            this.chartConfiguration = undefined;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading Chart',
                    message: error.message,
                    variant: 'error',
                })
            );
        } else if (data) {                           

            let chartCases = [];
            let chartDeaths = [];
            let chartSuspects = [];
            let chartRefuses = [];
            let chartUF = [];
            
            data.forEach(covid => {
                chartCases.push(covid.cases);
                chartDeaths.push(covid.deaths);
                chartSuspects.push(covid.suspects);
                chartRefuses.push(covid.refuses);
                chartUF.push(covid.uf);                

            });

            data.forEach(v=>{
                console.log('valor de data: ', v.datasets)
            });

            this.chartConfigurationCases = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'cases',
                        backgroundColor: "green",
                        data: chartCases,
                    },
                    /*{
                        label: 'deaths',
                        backgroundColor: "orange",
                        data: chartDeaths,
                    },
                    {
                        label: 'suspects',
                        backgroundColor: "blue",
                        data: chartSuspects,
                    },
                    {
                        label: 'refuses',
                        backgroundColor: "purple",
                        data: chartRefuses,
                    },*/
                ],
                    labels: chartUF,
                },
                options: {},
            };

            this.chartConfigurationDeaths = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'deaths',
                        backgroundColor: "orange",
                        data: chartDeaths,
                    },                    
                ],
                    labels: chartUF,
                },
                options: {},
            };

            this.chartConfigurationSuspects = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'suspects',
                        backgroundColor: "blue",
                        data: chartSuspects,
                    },                    
                ],
                    labels: chartUF,
                },
                options: {},
            };

            this.chartConfigurationRefuses = {
                type: 'bar',
                data: {
                    datasets: [{
                        label: 'refuses',
                        backgroundColor: "purple",
                        data: chartRefuses,
                    },                    
                ],
                    labels: chartUF,
                },
                options: {},
            };
            console.log('data => ', data);
            this.error = undefined;
        }
    }  
    
    get lMounth(){
        return [
            { label: 'Janeiro', value: '01' },{ label: 'Fevereiro', value: '02' },{ label: 'Março', value: '03' },
            { label: 'Abril', value: '04' },{ label: 'Maio', value: '05' },{ label: 'Junho', value: '06' },
            { label: 'Julho', value: '07' },{ label: 'Agosto', value: '08' },{ label: 'Setembro', value: '09' },
            { label: 'Outubro', value: '10' },{ label: 'Novembro', value: '11' },{ label: 'Dezembro', value: '12' },            
        ];
    }

    get lYear(){
        return[
            { label: '2021', value: '2021' }, { label: '2020', value: '2020' },
        ];
    }
    
    estadoSelecionado(event){
        this.estado = event.target.value;
        
        returnCityByState({estado:this.estado}).then(result =>{
            this.condicao = result;
            this.error = undefined;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Sucesso',
                    message: 'Cidade encontrada com sucesso.',
                    variant: 'sucess',                       
                }),  
            );
        })
        .catch(error=>{
            this.result = undefined;
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Erro',
                    message: 'Cidade não foi encontrada.',
                    variant: 'error',                       
                }), 
            );
        })
    }
}