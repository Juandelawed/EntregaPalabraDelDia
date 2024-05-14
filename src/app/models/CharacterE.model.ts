export interface InCharacter{ // le envia el padre(tablero) al hijo(celda)
    id:number;
    character:string;
    state:boolean;
    focus:boolean;
    eventchar:string;
}

export interface OutCharacter{ // sale de celda a tablero
    id:number;
    character:string;
}