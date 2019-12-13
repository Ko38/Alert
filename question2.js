function findPattern(nums){
    let patternCounts = {};
    let patterns = [];
    for(let i = 0; i < nums.length - 1; i++){
        for(let j = i+1; j < nums.length; j++){
            let patternNums = nums.slice(i,j+1);
            
            let pattern = patternNums.join(",");
            if(patternCounts[pattern]){
                patternCounts[pattern]++;
                if(patternCounts[pattern] > 1) {
                    patterns.push(patternNums);
                }
            } else {
                patternCounts[pattern] = 1;
            }

            

            if(patternNums.length > nums.length / 2){
                break;
            }
        }
    }
    let patternLengths = patterns.map(x => x.length);
    let maxIndex = patternLengths.indexOf(Math.max(...patternLengths));
    return patterns[maxIndex].join(" ");
}

console.log(findPattern([11,2,5,1,2,3,4,1,2,3,4,11,8,9,1,2,3,4]));
console.log(findPattern([9,8,4,5,3,7,4,33,3,7,4,33,8,9]));
console.log(findPattern([9,8,17,16,5,4,5,4,1,9,8,7,6,9]));
