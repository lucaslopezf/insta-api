export const random = (min:number, max:number) : number => {
    return min + Math.random() * (max - min);
  }

export const sleep = async (ms:number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }