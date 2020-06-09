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
        //limits it to just one iteration
        //if(i<1){
            // console.log(links[x]); 
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
                            //console.log(price);
                            //inserting name and price
                            specs[`${i}`]= {};
                            specs[`${i}`]["Name"] = x;
                            specs[`${i}`]["Price"] = price;
                            specs[`${i}`]["Links"] = links[x];
                            let highLvlSpec;
                            for(let j = 0;;j++){
                                if(frag.querySelector(".specs-table tr")){
                                    if(frag.querySelector(".specs-table tr") == frag.querySelector(".specs-table .heading")){
                                       // console.log("|----------------------------------------|")
                                        //console.log("heading :"+frag.querySelector(".specs-table tr").textContent);
                                        //storing high level specs or headings as on smartprix
                                        highLvlSpec = frag.querySelector(".specs-table tr").textContent;
                                        specs[`${i}`][`${highLvlSpec}`] = {};

                                    } else if (frag.querySelector(".specs-table tr .bold")){
                                       // console.log(frag.querySelector(".specs-table tr .bold").textContent + " : " + frag.querySelector(".specs-table tr .bold ~ td").textContent);
                                        //console.log("features : " + frag.querySelector(".specs-table tr .bold ~ td").textContent);
                                        
                                        //storing specs line by line
                                        specs[`${i}`][`${highLvlSpec}`][`${frag.querySelector(".specs-table tr .bold").textContent}`] = frag.querySelector(".specs-table tr .bold ~ td").textContent;
                                    }
                                    //console.log(frag.querySelector(".specs-table tr ").textContent)
                                    frag.querySelector(".specs-table tr").remove();
                                  
                                }else{
                                    break;
                                }
                            }
                            //console.log(JSON.stringify(specs));

                            fs.writeFileSync('Specs.json',JSON.stringify(specs));
                            

                           
                        }).catch((error)=>{
                            console.log(error);
                        })
            i++;
        // }else{
        //     break;
        // }
    }
}

SpecsExtractor();
module.exports = SpecsExtractor;
