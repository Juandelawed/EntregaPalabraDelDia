export interface InCharacter{
    id:number;
    character:string;
    state:boolean;
    focus:boolean;
    eventchar:EstadosCelda;
}

export interface OutCharacter{
    id:number;
    character:string;
}

export type EstadosCelda = "VOID-WORD" | "INCORRECT-WORD" | "YELLOW-WORD" | "CORRECT-WORD"