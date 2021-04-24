export type Warior = {
    health: number;
}

export type County = {
    id: number;
    name: string;
    citizens: number;
    wealth: number;

    isActive: boolean;
}

export type Field ={
    id: string | null;
    owner: number | null;
    isCounty: boolean;
}

export type Player = {
    id: number;
    color: string;
    second_color: string;

    wariors: Warior[];
    population: number;
    money: number;

    lands: County[];

    isActive: boolean;
}

export type Combat = {
    attacker: Player;
    defender: Player;
    turn: boolean; // false - attacker, true - defender
    damage: number;
}


export type GameMap = {
    fields: County[];
}