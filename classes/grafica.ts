

export class GraficaData {
    private opciones: number[] = [0, 1, 2, 3];
    private labels: string[] = [];
    private valores: number[] = [0, 0, 0, 0];

    constructor() { }

    setLabels( labels: string[] ) {
        this.labels = labels;
    }

    public get dataGrafica() {
        return [
            { data: this.valores, label: 'Preguntas' }
        ]
    }

    public incrementarValor( opcion: number, valor: number ) {
        // opcion = opcion.toLowerCase().trim();

        // for (let i in this.opciones) {
        //     if ( this.opciones[i] === opcion ) {
        //         this.valores[i] += valor;
        //         break;
        //     }
        // }

        this.valores[opcion] += valor;

        return this.dataGrafica;

    }

}