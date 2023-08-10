

let selectedColor= "black";
let selectedOption= "brush";
let isMouseDown = false;


const clrPicker = document.getElementById("color-picker")
const toolBtn = document.querySelectorAll("[data-tool")

const sketchPad = document.getElementById("sketch-pad");

const resolutionPicker = document.getElementById("resolution-picker");

window.onmousedown = ()=>{
    isMouseDown=true;
}

window.onmouseup = () => {
    isMouseDown=false;
};

toolBtn.forEach( (button) => {
    button.addEventListener("click", changeToolSelection);
    
});

clrPicker.addEventListener("change", changeColor);

resolutionPicker.addEventListener("change", createGrid);

function displaySelectedTool(){
    toolBtn.forEach( (button)=>{
        button.classList.remove("btn-selected");
        if(selectedOption === button.getAttribute("data-tool")){
            button.classList.add("btn-selected");
        }
    });

}

function changeColor(){
    if(selectedOption == "brush"){
         selectedColor = clrPicker.value;
    }
}

function changeToolSelection(){
    selectedOption = (this.getAttribute("data-tool"));

    displaySelectedTool();
}



function createGrid(){

    while(sketchPad.firstChild){
        sketchPad.removeChild(sketchPad.firstChild);
    }
    size = resolutionPicker.value;

    for(let i = 0; i < size; i++){
        const sketchRow = document.createElement("div");
        sketchRow.classList.add("sketch-row");
        for(let j = 0; j < size; j++){
            const sketchBlock = document.createElement("div");
            sketchBlock.classList.add("sketch-block");
            sketchBlock.addEventListener("mouseover", changeBgClr);
            sketchBlock.addEventListener("mousedown", ()=> isMouseDown = true);
            sketchBlock.addEventListener("mousedown", changeBgClr);
            

            sketchRow.appendChild(sketchBlock);
        }
        sketchPad.appendChild(sketchRow);
    }
}


function generateRandNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function getRainbowClr(){
    const min = 80;
    const max = 255;
    const red= generateRandNum(min,max);
    const blue =  generateRandNum(min,max);
    const green = generateRandNum(min,max);
    return `rgb(${red},${green},${blue})`;
}

function getShadowClr(){
    let shadowClr = (selectedColor.split(","))[1];
    if(!shadowClr){
        shadowClr = 230;
    }

    shadowClr -= Math.floor(255/10);
    if(shadowClr < 10){
        shadowClr = 230;
    }
    
    
    return `rgb(${shadowClr},${shadowClr},${shadowClr})`;
}

function changeBgClr(){
    console.log(isMouseDown)
    if(!isMouseDown){
        return;
    } 

    switch(selectedOption){
        case "shadow":
            selectedColor = getShadowClr();
            break;  
        case "rainbow":
            selectedColor = getRainbowClr();
            break;
        
        case "brush":
            changeColor();
            break;
        case "erasor":
            selectedColor = "white";
            break;
    }
    this.style.backgroundColor = selectedColor;

}

createGrid(16);
