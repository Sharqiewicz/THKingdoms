export type Warior = {
    health: number;
}

export type County = {
    id: number;
    name: string;
    citizens: number;
    wealth: number;

    isActive: boolean;
    neighbours: County[];
}

export type Field ={
    id: string | null;
    owner: number | null;
    isCounty: boolean;
    isActive: boolean;
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

export type Color = {
    main: string;
    second: string;
}

export type PlayerCount = {
    fields: number;
    id: number;
}
