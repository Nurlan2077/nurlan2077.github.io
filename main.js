
const canvas = new fabric.Canvas("canvas", 
{
    width: 1280,
    height: 600,

}
)

is_drawLine_activated = false


// Методы для отрисовки линии по зажатию мыши.
function activateDrawingLine(){
    is_drawLine_activated = true;
    canvas.on('mouse:down', startAddingLine);
    canvas.on('mouse:move', startDrawingLine);
    canvas.on('mouse:up', stopDrawingLine)

}


let line;
let mouseDown = false;
let color = "#000000"


// Добавляет линию на холст.
function startAddingLine(o){
    if (is_drawLine_activated){
        mouseDown = true;
        canvas.selection = false;


        let pointer = canvas.getPointer(o.e)

        line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
            stroke: color,
            strokeWidth: 3
        })

        canvas.add(line)
    }
}


// Рисует линия по мере движения мыши.
function startDrawingLine(o){
    if (mouseDown == true){
        let pointer = canvas.getPointer(o.e);

        line.set({
            x2: pointer.x,
            y2: pointer.y
        })
    }

    canvas.requestRenderAll()
}


// Останавливает рисование по отпусканию зажатой мыши.
function stopDrawingLine(o){
    mouseDown = false;
    canvas.selection = true;
    is_drawLine_activated = false;

}


// Добавляет круг на холст.
function addCircle(){
    circle = new fabric.Circle({
        originX: "center",
        originY: "center",
        radius: 50,
        fill: color,
        left: canvas.getCenter().left,
        top: canvas.getCenter().top

    })

    canvas.add(circle)
}



// Удаляет выбранные объекты.
function deleteObjects(){
    canvas.getActiveObjects().forEach(element => {
        canvas.remove(element);
    });

}




// Если фигура "прямая", то выводит на экран уравнение прямой при выделении.
canvas.on({
    'selection:updated': HandleElement,
    'selection:created': HandleElement
  });
  
  function HandleElement(obj){
    var obj = canvas.getActiveObject();

    // Если линия, то выводит на экран уравнение прямой.
    if (obj.isType("line")){

        let equation_field = document.getElementById("line_equation");
        equation_field.textContent = (obj.y1 - obj.y2) + "x + " + "(" + (obj.x2 - obj.x1) + ")" + "y + (" +  
                                                                                (obj.x1 * obj.y2 - obj.x2 * obj.y1) + ") = 0"

    }
    
  }



canvas.renderAll();

const setColorListener = () => {
    const picker = document.getElementById('colorPicker')

    picker.addEventListener('change', (event) => {
        color = event.target.value;
    })
}

setColorListener();