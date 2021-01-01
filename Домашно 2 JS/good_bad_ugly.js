function processData(input) {
    
    let characters = new Map();
    [...input].forEach((c)=>{
        if(characters.has(c)) {
            characters.set(c, characters.get(c) +1 );
        }
        else
            characters.set(c,1);
    });
    
    let occurences= Array.from(characters).map(([key,val])=>val);
    let maxOccurence=Math.max(...occurences);
    let minOccurence=Math.min(...occurences);
    
    if(maxOccurence===minOccurence ) console.log("GOOD");
    
    else if(maxOccurence-minOccurence===1)
    { 
        let count=0;
        occurences.forEach((occ)=> {if(occ===maxOccurence) 
                                    ++count;
                                   });
        if (count>1) console.log("UGLY");
        else console.log("BAD");
    }
    
   
 //max!=min, max-min>1 
    
    else { 
        let temp=[...occurences];  //no need for temp but I didn't want to change occurances
        temp.splice(temp.indexOf(1),1);    
        if(minOccurence===1 && (Math.min(...temp)===Math.max(...temp)))
            console.log("BAD");
        else console.log("UGLY");}
}
