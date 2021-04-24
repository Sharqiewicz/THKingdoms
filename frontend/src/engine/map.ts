import {Field} from './types';


type PlayerCount = {
    fields: number;
    id: number;
}



const default_field: Field = {
    id: null,
    owner: null,
    isCounty: false
}

const default_tiles: boolean[][] = [
    [false,false,false,false],
    [false,false,false,false],
    [false,false,false,false],
    [false,false,false,false],
]

const preparedMap: Field[][] = default_tiles.map( (row, i) => row.map( (tile, y) => ({...default_field, id: (String(i) + String(y))})) )
console.log("preparedMap")
console.log(preparedMap)


const checkIfPlayerCanHaveMoreFields = (fields: number) => {
    return fields < 5;
}

const random = (): boolean => {
    return( Math.floor(Math.random() * 10) > 5 ? true : false);
}

const prepareField = (neighbours: Field[], current: Field, ownerId: number): void => {

    console.log("%c neighbours", "background: white; color: black;")
    console.log(neighbours)
    const haveNeghbours  = neighbours.some( element => element.isCounty);
    haveNeghbours ? current.isCounty = random() : current.isCounty = true;
    if(current.isCounty){
        current.owner = ownerId;
    }
}


export const generateMap = (players_count: number) => {

    const playersState: PlayerCount[] = [];
    for(let z = 0; z <= players_count; z++){
        playersState.push({
            id: z,
            fields: 0,
        })
    }

    console.log(playersState);


    for( let i = 0; i <= players_count; i++){

            for( let y = 0; y < default_tiles.length; y++){

                const current_tile_row: Field[] = preparedMap[y];

                for( let k = 0; k < current_tile_row.length; k++){


                if(checkIfPlayerCanHaveMoreFields(playersState[i].fields)){
                    console.log("%c DOING ITERATION" + k, "background: red; color: aqua")
                    console.log("%c CURRENT ITERATION", "background: pink; color: aqua")
                    console.log("player: " + i,"row: " + y, "column: " + k)
                    console.log("%c CURRENT OBJECT", "background: pink; color: aqua")
                    console.log(current_tile_row[k])
                    console.log(preparedMap)
                    console.log("PLAYERS STATE")
                    console.log(playersState)

                    const neighbours: Field[] = [
                    ];

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


                    prepareField( neighbours, preparedMap[y][k], i)
                    console.log("____________________________________________")
                    console.log(preparedMap);
                    if(preparedMap[y][k].isCounty){
                        playersState[i].fields += 1;
                    }
                }
                }
        }
}
    console.log("preparedMap")
    console.log(preparedMap)
}


/*

        for( let y = 0; y < (default_tiles.length - 1); y++){
            const current_tile_row: Field[] = preparedMap[y];
            console.log(current_tile_row)
        }

            for( let k = 0; k < (current_tile_row.length - 1 ); k++){
                const neighbours: Field[] = [
                        preparedMap[y][k+1],

                        preparedMap[y+1][k],
                        preparedMap[y+1][k+1]];
                if( y > 0 && k > 0 ){
                    neighbours.push(
                        preparedMap[y][k-1],
                        preparedMap[y-1][k-1],
                        preparedMap[y+1][k-1],
                        preparedMap[y-1][k],
                        preparedMap[y-1][k+1])
                }

                prepareField(neighbours, preparedMap[y][k])
            }


*/