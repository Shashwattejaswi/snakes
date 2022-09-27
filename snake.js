window.addEventListener('DOMContentLoaded',()=>{

    const divarray=[]; //this for storing all child div of main div that used in making path
    var position=0;     // for storing array position of snake head div
    totalDiv=0;
    var snakeBody=[0];
    var randam=67;
    var oldIndex=0;
    var arrowbtn;   //storing arrow btn name
    var stopSnake;  // id of the setInterval that help to stop that interval
    var arrowManage={  // this object for prevent same or opposite arrow press consicutivily
        ArrowRight:1,
        ArrowUp:2,
        ArrowLeft:3,
        ArrowDown:4,
        setArrow:function(currentKey) {  //this function return the sum of just before pressed key or current key
           return(this[arrowbtn]+this[currentKey]) ;
        }
    }
    var field=document.querySelector('#field');
    while (totalDiv<400) {
        let currentdiv=document.createElement("div");
        currentdiv.classList.add("snakePath");
        divarray[totalDiv]=currentdiv;
        field.appendChild(currentdiv);
        totalDiv++;

    }

   
    divarray[0].classList.add("snakeBody");
    divarray[randam].classList.add("snakeFood");

    document.addEventListener('keydown',(event)=>{
        arrowNumber=arrowManage.setArrow(event.key);
           if(arrowNumber%2!=0)
           {
                arrowbtn=event.key;
                clearInterval(stopSnake);
                stopSnake=setInterval(moveSnake,150);
           }
        
    })

    function moveSnake() 
    {          //this function change next field div class and current snake div class to snakeDiv class and  field div class respectivily
        for (let i = 0; i < snakeBody.length; i++) 
        {
            divarray[snakeBody[i]].classList.remove("snakeBody");
            divarray[snakeBody[i]].classList.remove("snakeBody");
            positionSet(arrowbtn,i);
            
            if(i==0 && snakeBody[0]==randam)
                eatFood();
        
            divarray[snakeBody[i]].classList.add("snakeBody");
            if(i==0)
            {
                for (let m = 4; m < snakeBody.length; m++) 
                {
                    if (snakeBody[0]==snakeBody[m]) 
                    {
                        clearInterval(stopSnake);
                        console.log('end games'); 
                    } 
                }
            } 
        }
    }

    function eatFood() {  //this change the snakeFood place and add  ele in snakeBody array
       
     
       snakeBody.push(snakeBody.length);
       divarray[randam].classList.remove("snakeFood");
       randam= Math.floor(Math.random()*399);
       divarray[randam].classList.add("snakeFood");
       
    }

    function positionSet(nameOfKey,i) { // this function update the position value with respect to arrowname.
       
        if(i==0)
        {
        oldIndex=snakeBody[0];
        switch (nameOfKey) {
            case 'ArrowDown':
                if (snakeBody[0]>=380&&snakeBody[0]<=399) {
                    snakeBody[0]=snakeBody[0]-380;
                }else{snakeBody[0]=snakeBody[0]+20;}
                break;
            case 'ArrowUp':
                if (snakeBody[0]>=0&&snakeBody[0]<=19) {
                    snakeBody[0]=snakeBody[0]+380;
                }else{snakeBody[0]=snakeBody[0]-20;}
                break;
            case 'ArrowLeft':
                if (snakeBody[0]%20==0) {
                    snakeBody[0]=snakeBody[0]+19;
                }else{snakeBody[0]=snakeBody[0]-1;}
                break;
            case 'ArrowRight':
                if ((snakeBody[0]+1)%20==0) {
                    snakeBody[0]=snakeBody[0]-19;
                }else{snakeBody[0]=snakeBody[0]+1;}
                break;
            default:
                break;
        }
    }else{
        let bef;
        bef=snakeBody[i];
        snakeBody[i]=oldIndex;
        oldIndex=bef;
    }
    }
})