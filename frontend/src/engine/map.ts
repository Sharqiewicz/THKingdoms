import {Field, PlayerCount} from './types';
import {PLAYER_START_FIELDS_NUMBER} from './consts'

const default_field: Field = {
    id: null,
    owner: null,
    isCounty: false,
    isActive: false
}

const default_tiles: boolean[][] = [
    [false,false,false,false,false],
    [false,false,false,false,false,false],
    [false,false,false,false,false],
    [false,false,false,false,false,false],
    [false,false,false,false,false],
    [false,false,false,false,false,false],
    [false,false,false,false,false],
]

const preparedMap: Field[][] = default_tiles.map( (row, i) => row.map( (tile, y) => ({...default_field, id: (String(i) + String(y)), isActive: true})));

const checkIfPlayerCanHaveMoreFields = (fields: number) => {
    return fields < PLAYER_START_FIELDS_NUMBER;
}

const random = (): boolean => {
    return ( Math.floor(Math.random() * 10) > 8 ? true : false);
}

const prepareField = (neighbours: Field[], current: Field, players: PlayerCount[], ownerId: number): void => {
        if(current.isActive){
            if(players[ownerId].fields === 0){
                current.isCounty = true;
            }
            else{
                const haveNeighbours = neighbours.filter( element => element.isCounty);
                const isCurrentKingdom = haveNeighbours.some(element => element.owner === ownerId);

                if(players[ownerId].fields < 1 && isCurrentKingdom){
                    current.isCounty = true;
                }
                else if(players[ownerId].fields > 1 && haveNeighbours.length === 1 && isCurrentKingdom){
                    current.isCounty = random();
                }
                else{
                    haveNeighbours.length > 0 ? (isCurrentKingdom ? current.isCounty = true: current.isCounty = random() )  : current.isCounty = false;
                }


            }

            if(current.isCounty){
                current.owner = ownerId;
            }
        }
}


export const generateMap = (players_count: number): Field[][] => {

    const playersState: PlayerCount[] = [];
    for(let z = 0; z <= players_count; z++){
        playersState.push({
            id: z,
            fields: 0,
        })
    }

    let currentPlayer = 0;

    for( let y = 0; y < default_tiles.length; y++){

        const current_tile_row: Field[] = preparedMap[y];
        for( let k = 0; k < current_tile_row.length; k++){


            if(currentPlayer <= players_count){
                if(checkIfPlayerCanHaveMoreFields(playersState[currentPlayer].fields)){

                    const neighbours: Field[] = [];

                    if(y > 0){

                        neighbours.push(
                            preparedMap[y-1][k],
                        )
                        if( k > 0){
                            neighbours.push(preparedMap[y-1][k-1],)
                        }
                        if( k < current_tile_row.length){
                            neighbours.push(
                                preparedMap[y-1][k+1])
                        }
                    }
                    if( k > 0){
                        neighbours.push(
                            preparedMap[y][k-1],
                        )
                        if( y < (preparedMap.length - 1 )){
                            neighbours.push(preparedMap[y+1][k-1])
                        }
                    }

                    if( y < (preparedMap.length - 1)){
                            neighbours.push(preparedMap[y+1][k])
                            if(k < (current_tile_row.length - 2)){
                                neighbours.push(
                                    preparedMap[y+1][k+1],
                                    preparedMap[y][k+1])
                            }
                    }


                    prepareField( neighbours.filter( n => n), preparedMap[y][k], playersState, currentPlayer)

                    if(preparedMap[y][k].isCounty){
                        playersState[currentPlayer].fields += 1;
                    }
                    if(playersState[currentPlayer].fields >= PLAYER_START_FIELDS_NUMBER){
                        currentPlayer++;
                    }
                }
            }
        }
        }
    return preparedMap;
}
