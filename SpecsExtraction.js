const axios = require('axios');
const fs = require('fs');
const jsdom = require('jsdom');
const{JSDOM} = jsdom;
const links = require('./LaptopLinks.json');
const specs = require('./Specs.json');

//gives count for iteration
let c = Object.keys(links).length;

//looping through object
async function SpecsExtractor(){
    let i = 0;
    for(x in links){
        //limits it to just one iteration
        if(i<1){
            // console.log(links[x]); 
            console.log(x);
            
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
                            console.log(price);
                            //inserting name and price
                            // specs[`${i}`]= {};
                            // specs[`${i}`]["Name"] = x;
                            // specs[`${i}`]["Price"] = price;
                            for(let i = 0;;i++){
                                if(frag.querySelector(".specs-table tr")){
                                    if(frag.querySelector(".specs-table tr") == frag.querySelector(".specs-table .heading")){
                                        console.log("|----------------------------------------|")
                                        console.log("heading :"+frag.querySelector(".specs-table tr").textContent);
                                        
                                    } else if (frag.querySelector(".specs-table tr .bold")){
                                        console.log(frag.querySelector(".specs-table tr .bold").textContent + " : " + frag.querySelector(".specs-table tr .bold ~ td").textContent);
                                        //console.log("features : " + frag.querySelector(".specs-table tr .bold ~ td").textContent);
                                    }
                                    //console.log(frag.querySelector(".specs-table tr ").textContent)
                                    frag.querySelector(".specs-table tr").remove();
                                  
                                }else{
                                    break;
                                }
                            }
                            

                            fs.writeFileSync('Specs.json',JSON.stringify(specs));
                            

                           
                        }).catch((error)=>{
                            console.log(error);
                        })
            i++;
        }else{
            break;
        }
    }
}

SpecsExtractor();
