//create function to create grid
    //use 2 loops 
        //one for creation of row
        //add class to each row
            //second for creation of blocks
            //add class to each block
            //append block to row
        //append row to 
        
//create function that adds functionality to each block
    //event listener => if clicked, change color

const sketchPad = document.getElementById("sketch-pad");
let selectedColor = "red";

function createGrid(size){

    for(let i = 0; i < size; i++){
        const sketchRow = document.createElement("div");
        sketchRow.classList.add("sketch-row");
        for(let j = 0; j < size; j++){
            const sketchBlock = document.createElement("div");
            sketchBlock.classList.add("sketch-block");
            sketchBlock.addEventListener("mouseover", changeBgClr)

            sketchRow.appendChild(sketchBlock);
        }
        sketchPad.appendChild(sketchRow);
    }
}

createGrid(16);

function changeBgClr(){
    this.style.backgroundColor = selectedColor;
}