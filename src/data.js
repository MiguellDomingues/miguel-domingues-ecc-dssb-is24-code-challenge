 
 function makeRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

export function createRandomID(){
    return makeRandomString(randomIntFromInterval(16,16))
}


export const _products = Array(5).fill(0).map(()=>{ 
     return {
        productId:              makeRandomString(randomIntFromInterval(16,16)),          
        productName:            makeRandomString(randomIntFromInterval(9,18)),
        productOwnerName:       makeRandomString(randomIntFromInterval(10,15)),     
        Developers:             Array(randomIntFromInterval(1,5)).fill(0).map(()=>makeRandomString(randomIntFromInterval(10,15))),
        scrumMasterName:        makeRandomString(randomIntFromInterval(10,15)),	
        startDate:              "YYYY/MM/DD",	
        methodology:            (()=>randomIntFromInterval(0,1) === 1 ? "Agile" : "WaterFall")(),
        location:               makeRandomString(randomIntFromInterval(10,15)),	
     }
})

