export type MoradorResponse = {
    content: Morador[];
    totalPages: number;
}

export type Morador = {
    id: number;
    status: string;
    imgUrl: string;
    nome: string;
    apelidoPrincipal: string;
    anoEntradaPulis: string;
    anoSaidaPulis: string;
    dataNascimento: Date;
    cidadeNatal: string;
    anoEntradaFaculdade: string;
    universidade: string;
    curso: string;
    descricao: string;
    casas: Casa[];
}

export type Casa = {
    id: number;
    anoEntrada: number;
    anoSaida: number;
    nome: string;
    endereco: string;
    descricao: string;
}