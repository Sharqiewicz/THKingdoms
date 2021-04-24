import {Field} from './types';

const PLAYER_START_FIELDS_NUMBER = 4;

type PlayerCount = {
    fields: number;
    id: number;
}

const default_field: Field = {
    id: null,
    owner: null,
    isCounty: false,
    isActive: false
}

const default_tiles:    (boolean| number)[][] = [
    [2,false,false,false,2],
    [2,false,false,false,false,false],
    [false,false,false,false,false],
    [2,false,false,false,false,false],
    [false,false,false,false,false],
    [2,false,false,false,false,false],
    [2,false,2,false,2],
]

const preparedMap: Field[][] = default_tiles.map( (row, i) => row.map( (tile, y) => (typeof(tile) === 'boolean' ? {...default_field, id: (String(i) + String(y)), isActive: true} : {...default_field, id: (String(i) + String(y))})) )

const checkIfPlayerCanHaveMoreFields = (fields: number) => {
    return fields < PLAYER_START_FIELDS_NUMBER;
}

const random = (): boolean => {
    return ( Math.floor(Math.random() * 10) > 8 ? true : false);
}

const prepareField = (neighbours: Field[], current: Field, ownerId: number): void => {
        if(current.isActive){
            const haveNeighbours  = neighbours.filter( element => element.isCounty);
            haveNeighbours.length > 2 ? current.isCounty = random() : current.isCounty = true;
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
                        if( y < (preparedMap.length -1 )){
                            neighbours.push(preparedMap[y+1][k-1])
                        }
                    }

                    if( y < (preparedMap.length - 1)){
                            neighbours.push(preparedMap[y+1][k])
                            if(k < (current_tile_row.length - 1)){
                                neighbours.push(
                                    preparedMap[y+1][k+1],
                                    preparedMap[y][k+1])
                            }
                    }


                    prepareField( neighbours.filter( n => n), preparedMap[y][k], currentPlayer)

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
