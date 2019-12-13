
function printTriangle(width, height) {
    let resultTriangle = [];
    for(let i = 0; i < height; i++){
        resultTriangle.push([]);
    }
    for(let j = 0; j < height; j++){
        for(let i = 0; i < width - j; i++){
            if (i < j){
                resultTriangle[j].push("  ");
            } else {
                resultTriangle[j].push("* ");
            }
        }
    }

    for(let i = 1; i < resultTriangle.length; i++){
        let length = resultTriangle[i].filter(x => x === "* ").length;
        let leftIndex = Math.floor(length / 2) + 1;
        if (resultTriangle[i+1] && resultTriangle[i+1][leftIndex-1] === "  "){
            break;
        }

        let rightIndex = Math.floor(length / 2) + 2*i -1;
        if (resultTriangle[i+1] && resultTriangle[i+1][rightIndex+1] === "  "){
            break;
        }
        for(let j = leftIndex; j <= rightIndex; j++){
            resultTriangle[i][j] = "  ";
        }
    }

    for(let line of resultTriangle){
        console.log(line.join(""));
    }
    
}

printTriangle(20,5);
//printTriangle(18,9);
