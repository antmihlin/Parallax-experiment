
//Checks which kind of movements buond to element
const checkMovement = (item)=>{
  let classesList = item.className.split(' ');
  let result = {speed:1, direction:null, type:null,item:item};
  
  for(let className of classesList){

    switch(className){
           case 'spin':
            result.type = className;
           break;
           case 'zoom':
            result.type = className;
           break;
           case 'top':
            result.direction = 'bottom';
           break;
           case 'bottom':
            result.direction = 'top';
           break;
           case 'left':
            result.direction = 'right';
           break;
           case 'right':
            result.direction = 'left';
           break;
           case 'item-inner':
            
           break;
           default:
            result.speed = getSpeed(className);
           break;
           }
  }
  
  return result;
};

//Zooms out element
const zoom = (item, speed,scroll )=>{
  let transformation = ( ( 100 / (scroll/10) ) * (1/speed));

  if(transformation <= 1) item.style.transform = `scale(${transformation})`;
  else item.style.transform = `scale(1)`;
};

//Spins element
const spin = (item, speed,scroll )=>{
  let rotation = ( scroll / 30 ) * speed;
  item.style.transform = `rotate(${rotation}deg)`;
};

//Moves element to a specific side
const move = (item,direction, speed,scroll)=>{
  let movementSize = (scroll/50) * speed ;
  item.style[direction] = movementSize +'px';
};

//Bind all movements to element
const bindMovementsToElement = (item, speed, direction, type, scroll)=>{
  if(type && type === 'zoom') zoom(item,speed,scroll);
  if(type && type === 'spin') spin(item,speed,scroll);
  if(direction) move(item, direction, speed, scroll);
};

//returns speed of element
const getSpeed = (className)=>{
  let speed = 1;
  let name = ''+className;

  let re = /speed/i;
  let myArray = name.match(re);

  if(myArray && myArray.length>0){
    let speedNum = name.split('-');
    speed = + speedNum[1];
  }

  return speed;
};


window.addEventListener('scroll', ()=> {
  let doc = document.getElementById('container');
  let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

  let items = document.querySelectorAll('.item-inner');
  //items[0].style.background = 'red';
  for(const item of items){
    let {speed, direction, type} = checkMovement(item);
    
    bindMovementsToElement(item, speed, direction, type, top);
  }
});
