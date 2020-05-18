const axios = require('axios');
const fs = require('fs');
const links = require('./LaptopLinks.json');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let pg = 1;
let spUrl= "https://www.smartprix.com/laptops/exclude_global-exclude_out_of_stock-exclude_upcoming-stock?uq=1&page="+pg;


axios.get(spUrl)
  .then(function (response) {
    // handle success
   //let dom = new JSDOM();
   let frag = JSDOM.fragment(String(response.data));
   //console.log(dom);

   //loop save an item and delete it to get next element as jsdom give only first element 
   for(let i=0;; i++){
     if(frag.querySelector(".info h2")){
      console.log(frag.querySelector(".info h2").textContent);
      console.log(frag.querySelector(".info h2 a").getAttribute("href"));
      links[`${frag.querySelector(".info h2").textContent}`] = "https://www.smartprix.com/" + frag.querySelector(".info h2 a").getAttribute("href");
      frag.querySelector(".info h2").remove();
     }else{
       break;
     }
   }
   
  fs.writeFileSync('LaptopLinks.json',JSON.stringify(links));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });