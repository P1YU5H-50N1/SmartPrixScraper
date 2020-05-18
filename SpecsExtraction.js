const axios = require('axios');
const fs = require('fs');
const jsdom = require('jsdom');
const{JSDOM} = jsdom;
const links = require('./LaptopLinks.json');

//gives count for iteration
let c = Object.keys(links).length;
//looping through object
async function SpecsExtractor(){
    let i = 1;
    for(x in links){
        //limits it to just one iteration
        if(i<2){
            console.log(links[x]); 
            console.log(x);
            await axios.get(links[x])
                        .then((response)=>{
                            let frag = JSDOM.fragment(String(response.data));
                            
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
