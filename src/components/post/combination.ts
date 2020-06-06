import { separator } from '../../commons/constants';

export const permutaciones = (messages:string[],cantidad:number) :any => {

    if(cantidad  < 1 || cantidad == undefined){
        cantidad = 1;
    }

    if(cantidad == 1) return permutarArray(messages,messages);

    return permutarArray(messages,permutaciones(messages,cantidad-1));
}

const permutarArray = (a1:string[],a2:string[]) =>{

    let result:any = [];

    a1.forEach( e1 =>{

        var map2 = a2.map( e2 =>{
                        if(Array.isArray(e2)){
                            const itemMap = [e1].concat(e2);
                            return itemMap.join(separator);
                        }else{
                            const itemMap = [e1,e2];
                            return itemMap.join(separator);
                        }
                    });

        result = result.concat(map2);
    });

    return result;
}