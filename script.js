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

let selectedColor= "black";
let selectedOption= "brush";

const clrPicker = document.getElementById("color-picker")
const toolBtn = document.querySelectorAll("[data-tool")

const sketchPad = document.getElementById("sketch-pad");

const resolutiionPicker = document.getElementById("resolution-picker");

toolBtn.forEach( (button) => {
    button.addEventListener("click", changeToolSelection);
    
});

clrPicker.addEventListener("change", changeColor);

resolutiionPicker.addEventListener("change", createGrid);

function displaySelectedTool(selectedTool){
    toolBtn.forEach( (button)=>{
        button.classList.remove("btn-selected");
        if(selectedTool === button.getAttribute("data-tool")){
            button.classList.add("btn-selected");
        }
    });

}

function changeColor(){
    if(toolBtn.item(0).getAttribute("class") ===  "btn-selected"){
       
         selectedColor = clrPicker.value;
        
        
    }
}

function changeToolSelection(){
    const selectedTool = (this.getAttribute("data-tool"));

    displaySelectedTool(selectedTool);
    console.log(selectedTool);
    switch(selectedTool){
        case "solid-color":
            changeColor();
            selectedOption = "brush"
            break;

        case "shadow":
            selectedColor = "rgb(255,255,255)";
            selectedOption = "shadow";
            break;
        case "rainbow":
            selectedOption = "rainbow";
            break;
        case "erasor":
            selectedOption = "erasor"
            selectedColor = "white";
            break;
    }
}



function createGrid(){

    while(sketchPad.firstChild){
        sketchPad.removeChild(sketchPad.firstChild);
    }
    size = resolutiionPicker.value;
    

    console.log("ello")
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


function generateRandNum(start, end){
    
    return Math.floor(Math.random()*(end-start+1)+start)
}

function getRainbowClr(){
    const red= generateRandNum(0,255);
    const green = generateRandNum(0,255);
    const blue =  generateRandNum(0,255);
    return `rgb(${red},${green},${blue})`;
}

function getShadowClr(){
    let shadowClr = (selectedColor.split(","))[1];
    console.log(shadowClr);
    shadowClr -= Math.floor(255/10);
    if(shadowClr < 0){
        shadowClr = 255;
    }
    
    
    return `rgb(${shadowClr},${shadowClr},${shadowClr})`;
}

function changeBgClr(){
    switch(selectedOption){
        case "shadow":
            selectedColor = getShadowClr();
            break;  
        case "rainbow":
            selectedColor = getRainbowClr();
            console.log(selectedColor);
            break;
        
        case "brush":
            changeColor();
            
            break;
    }
    this.style.backgroundColor = selectedColor;

}

createGrid(16);
