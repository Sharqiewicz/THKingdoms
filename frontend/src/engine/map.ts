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



const updateNeighbours = (map: Field[][]) => {
    for( let y = 0; y < map.length; y++){
        const current_tile_row: Field[] = map[y];
        for( let x = 0; x < current_tile_row.length; x++){
                const neigbourhood = prepareNeigbourCounties(y, x, current_tile_row)
                const filteredNeigbourhood = neigbourhood.filter(n => n);
                map[y][x].neighbours = filteredNeigbourhood.filter(tile => tile.isCounty);
        }
    }
}

const prepareField = (neighbours: Field[], current: Field, players: PlayerCount[], ownerId: number): void => {

        if(current.isActive){
            if(players[ownerId].fields === 0){
                current.isCounty = true;
            }
            else{
                const haveNeighbours = neighbours.filter( element => element.isCounty);
                const isCurrentKingdom = haveNeighbours.some(element => element.owner === ownerId);

                if(haveNeighbours.length > 0 && players[ownerId].fields < 5 && isCurrentKingdom){
                    current.isCounty = true;
                }
                else if(haveNeighbours.length > 0 && players[ownerId].fields > 1 && haveNeighbours.length === 1 && isCurrentKingdom){
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


const prepareNeigbourCounties = (y: number, x:number, current_tile_row: Field[]) => {
    const neighbours: Field[] = [];

                    if(y % 2 === 0){

                        if(y < (preparedMap.length - 1)){
                            neighbours.push(preparedMap[y+1][x+1])
                        }

                        if(y > 0){
                            neighbours.push(preparedMap[y-1][x+1])
                        }

                    }
                    else{

                        if( y > 0 && x > 0){
                            neighbours.push(preparedMap[y-1][x-1],)
                        }

                        if(y < (preparedMap.length - 1)){
                            neighbours.push(preparedMap[y+1][x-1])
                        }

                    }


                    if( x > 0){
                        neighbours.push( preparedMap[y][x-1])
                    }

                    if(y > 0){
                        neighbours.push(preparedMap[y-1][x])

                    }
                    if( y < (preparedMap.length - 1 )){
                        neighbours.push(preparedMap[y+1][x])
                        if(x < current_tile_row.length){
                            neighbours.push(preparedMap[y][x+1])
                        }
                    }

        console.log("PREPAARED NEIGBOURHOOD FOR " + y + " " + x )
        console.log(neighbours)
        return neighbours;
}


const loopThroughMap = (playersState: PlayerCount[], map: Field[][]) => {

    let currentPlayer = 0;
    for( let y = 0; y < map.length; y++){
        const current_tile_row: Field[] = map[y];
        for( let x = 0; x < current_tile_row.length; x++){
                if(currentPlayer < playersState.length){
                    if(checkIfPlayerCanHaveMoreFields(playersState[currentPlayer].fields)){

                        const neighbours = prepareNeigbourCounties(y, x, current_tile_row)

                        /*console.log('%c Current tile: ', "bacxground: green; color: white;")
                        console.log(map[y][x])
                        console.log('%c Current neighbours: ', "bacxground: blue; color: white;")
                        console.log(neighbours)*/

                        prepareField( neighbours.filter( n => n), map[y][x], playersState, currentPlayer)

                        if(preparedMap[y][x].isCounty){
                            playersState[currentPlayer].fields += 1;
                        }
                        if(playersState[currentPlayer].fields >= PLAYER_START_FIELDS_NUMBER && currentPlayer < (playersState.length - 1)){
                            currentPlayer++;
                        }
                }
            }
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


    do{
        loopThroughMap(playersState, preparedMap);
        playersState.some( player => player.fields < PLAYER_START_FIELDS_NUMBER)
    }
    while(playersState.some( player => player.fields < PLAYER_START_FIELDS_NUMBER));


    updateNeighbours(preparedMap);
    return preparedMap;
}
