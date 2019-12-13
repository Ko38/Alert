var fs = require('fs');
var fs = require('fs');


function findChanges(file1, file2, callback){
    let file1Content;
    let file2Content;
    fs.readFile(file1, 'utf8', function(err, data) {
        if (err) throw err;
        file1Content = data.split("\r\n");
        fs.readFile(file2, 'utf8', function(err, data) {
            if (err) throw err;
            file2Content = data.split("\r\n");
            let differences = {};
            if(file1Content.length > file2Content.length){
                for(let i = 0; i < file2Content.length; i++){
                    if(file1Content[i] !== file2Content[i]){
                        differences[i+1] = [file1Content[i], file2Content[i]]
                    }
                }
                for(let i = file2Content.length; i < file1Content.length; i++){
                    differences[i+1] = ["", file1Content[i]];
                }
            } else if (file2Content.length > file1Content.length){
                for(let i = 0; i < file1Content.length; i++){
                    if(file1Content[i] !== file2Content[i]){
                        differences[i+1] = [file1Content[i], file2Content[i]]
                    }
                }
                for(let i = file1Content.length; i < file2Content.length; i++){
                    differences[i+1] = ["", file2Content[i]];
                }
            } else {
                for(let i = 0; i < file1Content.length; i++){
                    if(file1Content[i] !== file2Content[i]){
                        differences[i+1] = [file1Content[i], file2Content[i]]
                    }
                }
            }
            
            callback(differences);
        });
    });
}

function getDifference(a, b){
    if(a.length > b.length){
        let temp = a;
        a = b;
        b = temp;
    }
    let i = 0;
    let j = 0;
    let result = "";

    while (j < b.length){
        if (a[i] != b[j] || i == a.length)
            result += b[j];
        else
            i++;
        j++;
    }
    return result;
}

findChanges("file1.txt","file2.txt", (result) => {
    for(let lineNo of Object.keys(result)){
        console.log(`\n---Line Number:${lineNo}---`);
        let content1 = result[lineNo][0];
        let content2 = result[lineNo][1];
        let diff = getDifference(content1,content2);
        let diffIndex;
        if (content1.length > content2.length){
            diffIndex = content1.indexOf(diff);
            console.log("---The first file---");
            for(let i = 0; i < content1.split("").length; i++){
                let char = content1.split("")[i];
                if(i >= diffIndex && i < diffIndex + diff.length){
                    process.stdout.write("\x1b[43m");
                } 
                process.stdout.write(`${char}`);
                process.stdout.write("\x1b[40m");
            }
            console.log("");
            console.log("---The second file---");
            process.stdout.write(`${content2}\n`);
        } else {
            diffIndex = content2.indexOf(diff);
            console.log("---The first file---");
            process.stdout.write(`${content1}\n`);
            
            console.log("---The second file---");
            
            for(let i = 0; i < content2.split("").length; i++){
                let char = content2.split("")[i];
                if(i >= diffIndex && i < diffIndex + diff.length){
                    process.stdout.write("\x1b[43m");
                } 
                process.stdout.write(`${char}`);
                process.stdout.write("\x1b[40m");
            }
            console.log("");
        }

    }
});

// console.log('\x1b[43m', 'I am cyan');  //cyan
// process.stdout.write("\x1b[43m"); //yellow
// process.stdout.write("test");
// process.stdout.write("\x1b[40m");
// process.stdout.write("test1");
//process.stdout.write