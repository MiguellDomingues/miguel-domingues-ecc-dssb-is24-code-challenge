const { v4: uuidv4, validate: uuidValidate } = require('uuid');

const mockProductNames = ["ProductA", "ProductB", "ProductC", "ProductD", "ProductE", "ProductF"];
const mockproductOwnerNames = ["Susan Woo", "Tom Harris", "Miguel Domingues PO", "Captain America", "Johnny Cage"];
const mockDevelopers = ["Tommy Styles", "Spider Man", "Miguel Domingues", "Ricky Steele", "Hanasha Caberlia", 'Elijah Wood', "Mike Ballswood"];
const mockScrumMasterNames = ["Natalie Portman", "Marilyn Monroe", "Vin Diesel", "Tom Cruise", "Brad Pitt", "Olivia Wilde", "Scarlett"];
const mockStartDates = ["1999/11/4","2000/1/10","2010/10/10","2015/11/10","2023/5/10","2021/8/16"];
const mockLocations = ["https://github.com/bcgov/EPICtrack", "https://github.com/NotifyBC", "https://github.com/climR-pnw", 
"https://github.com/jag-jobscheduler", "https://github.com/learningcurator", "https://github.com/PIMS"
];

const NUM_RECORDS = 40; //number of mock products to generate upon app init

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createRandomID(){
  return uuidv4();
}

/* light input validation for form and route params */
const validators = {
 isDeveloperNameInvalid:   (dev)=> !typeof dev === 'string' && dev.length > 0,                                                                     // must be a non-empty string
 isDevelopersInvalid:      (devs)=>!Array.isArray(devs) || !(devs.filter((e)=>typeof e === 'string' && e.length > 0).length === devs.length) ,     //must be an array of non-empty strings
 isProductNameInvalid:     (name)=>typeof name !== 'string',                                                                                            //must be a string
 isMethodologyInvalid:   (method)=>typeof method !== 'string' || !(method === "Agile" || method === "WaterFall"),                                       //must a string of Agile or Waterfall
 isProductIdInvalid:         (id)=>!uuidValidate(id),                                                                                                   //must be a v4 uuid
 isScrumMasterNameInvalid: (name)=>typeof name !== 'string',                                                                                            //must be a string                                                                   
 isStartDateInvalid:       (date)=>!!isNaN(new Date(date)),                                                                                             //must be a date in YYYY-MM-DD   
 isLocationInvalid:         (loc)=>typeof loc !== 'string',                                                                                             //must be a string     
}

const data = Array(NUM_RECORDS).fill(0).map(()=>{  //for each product, generate random data for each key from an array
  return {
        productId:              createRandomID(),          
        productName:            mockProductNames[randomIntFromInterval(0,mockProductNames.length-1)],
        productOwnerName:       mockproductOwnerNames[randomIntFromInterval(0,mockproductOwnerNames.length-1)],  
        Developers:             Array(randomIntFromInterval(0,5)).fill(0).map(()=>mockDevelopers[randomIntFromInterval(0,mockDevelopers.length-1)]),
        scrumMasterName:        mockScrumMasterNames[randomIntFromInterval(0,mockScrumMasterNames.length-1)],
        startDate:              mockStartDates[randomIntFromInterval(0,mockStartDates.length-1)], 
        methodology:            (()=>randomIntFromInterval(0,1) === 1 ? "Agile" : "WaterFall")(),
        location:               mockLocations[randomIntFromInterval(0,mockLocations.length-1)],	
  }
})

module.exports = {data, createRandomID, validators};


