type Warior = {
    health: number;
}

type County = {
    id: number;
    name: string;
    citizens: number;
    wealth: number;

    isActive: boolean;
}

type Player = {
    id: number;
    color: string;
    second_color: string;

    wariors: Warior[];
    population: number;
    money: number;

    lands: County[];

    isActive: boolean;
}

type Combat = {
    attacker: Player;
    defender: Player;
    turn: boolean; // false - attacker, true - defender
    damage: number;
}


type GameMap = {
    fields: County[];
}