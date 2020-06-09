const axios = require('axios');
const fs = require('fs');
const jsdom = require('jsdom');
const{JSDOM} = jsdom;
const links = require('./data/LaptopLinks.json');
const specs = require('./data/Specs.json');

//gives count for iteration
let c = Object.keys(links).length;

//looping through object
async function SpecsExtractor(){
    let i = 0;
    for(x in links){ 
            console.log(x);
            console.log(i + " / " + c);
            
            await axios.get(links[x])
                        .then((response)=>{
                            let frag = JSDOM.fragment(String(response.data));

                            //Extract price
                            let price = frag.querySelector(".price").textContent;
                            
                            price = price.replace('₹','');
                            while(price.search(',') != -1){
                               price =  price.replace(",","");
                            }
                            price = parseInt(price);
                            
                            //inserting name and price
                            specs[`${i}`]= {};
                            specs[`${i}`]["Name"] = x;
                            specs[`${i}`]["Price"] = price;
                            specs[`${i}`]["Links"] = links[x];
                            let highLvlSpec;
                            for(let j = 0;;j++){
                                if(frag.querySelector(".specs-table tr")){
                                    if(frag.querySelector(".specs-table tr") == frag.querySelector(".specs-table .heading")){
                                        //storing high level specs or headings as on smartprix
                                        highLvlSpec = frag.querySelector(".specs-table tr").textContent;
                                        specs[`${i}`][`${highLvlSpec}`] = {};

                                    } else if (frag.querySelector(".specs-table tr .bold")){
                                        //storing specs line by line
                                        specs[`${i}`][`${highLvlSpec}`][`${frag.querySelector(".specs-table tr .bold").textContent}`] = frag.querySelector(".specs-table tr .bold ~ td").textContent;
                                    }
                                    frag.querySelector(".specs-table tr").remove();
                                  
                                }else{
                                    break;
                                }
                            }
                            fs.writeFileSync('data/Specs.json',JSON.stringify(specs));
                            

                           
                        }).catch((error)=>{
                            console.log(error);
                        })
            i++;
    }
}

SpecsExtractor();
module.exports = SpecsExtractor;
