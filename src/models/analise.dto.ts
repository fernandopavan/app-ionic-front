import { RefDTO } from "./ref.dto";

export interface AnaliseDTO {
    id: string;
    usuario: RefDTO;
    ph: number;
    turbidez: number;
    condutividade: number;
    temperatura: number;
    dataLeitura: string;
    phP: number;
    phN: number;
    cloro: number;
    decantador: number;
    sanilidade: number;
    dataTratamento: string;

}
