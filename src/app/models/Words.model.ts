export interface wordModel {
    id: number;
    difficulty: difficultyType;
    word: string;
    length: number;
    isAccent: true;
}

export type difficultyType = "easy" | "medium" | "hard"