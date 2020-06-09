const axios = require('axios');
const fs = require('fs');
const links = require('./data/LaptopLinks.json');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
//Scrapes links to specifications pages
let totalCount
let totalpgs=3;
let pg = 1;
let spUrl;
async function LinksExtractor(){
  while(pg != totalpgs){
    spUrl= "https://www.smartprix.com/laptops/exclude_global-exclude_out_of_stock-exclude_upcoming-stock?uq=1&page="+String(pg);
    console.log(spUrl);
    await axios.get(spUrl)
      .then(function (response) {
        // handle success
      let frag = JSDOM.fragment(String(response.data));
      console.log("pages : "+pg);
      if(pg == 1){

        totalCount = parseInt(frag.querySelector(".section-header strong").getAttribute("data-count"));
        console.log(totalCount);
        totalpgs = Math.ceil(totalCount/20)+1;
        
      }
        //loop save an item and delete it to get next element as jsdom give only first element 
      for(let i=0;; i++){
        if(frag.querySelector(".info h2")){
          //console.log(frag.querySelector(".info h2").textContent);
        // console.log(frag.querySelector(".info h2 a").getAttribute("href"));
          links[`${frag.querySelector(".info h2").textContent}`] = "https://www.smartprix.com" + frag.querySelector(".info h2 a").getAttribute("href");
          frag.querySelector(".info h2").remove();
        }else{
          break;
        }
      }
      
      fs.writeFileSync('data/LaptopLinks.json',JSON.stringify(links));
      pg = pg + 1;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      
  }
}

LinksExtractor();
module.exports = LinksExtractor;