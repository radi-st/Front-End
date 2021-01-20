/*
- Count all the numbers in the array and push the result as first element in the result array if there are more than 0 numbers found 

- If the element is a string, reverse it and push it to the result array

- If the element is an object(not a function, neither array) push a new string represeting "key: value" of the object e.g. { person: Martin } => "person: Martin" * we wont pass objects with more than a single key
- If the element is an Array
    - if the array is nested it push it flattened e.g. [1, 2, [3, 4]] => [1, 2, 3, 4] to the result array
    - if the array is not nested push the array but sorted (alphabetically)
- If the element is a function call the function with argument 42 and push the result to the result array
*/

function processData(input) {
    
    let good_input = eval(input);
    let number_count = 0;
    let result=[];
    let index=0;
    
    function reverse(string)
    {
        return [...string].reverse().join("");
    }   
    
    function processing (elem)
    {
        let type=typeof(elem)
        if(type==="number") 
        {
            ++number_count;
        }

        else if(type==="string")
            {
                result.push(reverse(elem));
            }
        
        else if(type==="object" && !Array.isArray(elem))
            {
                let obj=Object.entries(elem);
               result.push(`${obj[0][0]}: ${obj[0][1]}`); 
            }
        
        else if(Array.isArray(elem))
                {
                    if(elem.some(Array.isArray))
                    {
                        result.push(elem.reduce((acc, val) => acc.concat(val), []));
                    }
                    else result.push(elem.sort());
                }
        else if (type==="function")
        {
            result.push(elem(42));
            
        }
    
                if(index+1===good_input.length)
                {
                   
                    if(number_count)
                    {
                        result.unshift(number_count);
                    }
                    return;
                }
    
                processing(good_input[++index]);
    }
    
    processing(good_input[index]);
    console.log(JSON.stringify(result));
    return result;
    
}
    
//Given:

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
    