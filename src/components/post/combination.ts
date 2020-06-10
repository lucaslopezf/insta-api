import { separator } from '../../commons/constants';

export const permutations = (messages:string[],quantity:number) :any => {

    if(quantity  < 1 || quantity == undefined){
        quantity = 1;
    }

    if(quantity == 1) return permuteArray(messages,messages);

    return permuteArray(messages,permutations(messages,quantity-1));
}

const permuteArray = (a1:string[],a2:string[]) =>{

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