let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let highScore=0;

let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false)
    {
        console.log("Game Started");
        started=true;

        levelUp();
    }
    
});
function gameFlash(btn)
{
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },300);
}
function userFlash(btn)
{
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },300);
}
function levelUp()
{
    userSeq=[];
    level++;
    h2.innerText="Level "+level;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector("."+randColor);
    let gmbtn=randbtn.getAttribute("id");
    gameSeq.push(gmbtn);
    console.log(gameSeq);
    
    gameFlash(randbtn);
}

function checkAns(idx)
{
    
    // console.log(userSeq);
    //console.log(gameSeq);
    if(userSeq[idx]===gameSeq[idx])
    {
        if(userSeq.length==gameSeq.length)
        {
            
            setTimeout(levelUp,1000);
        }
    }
    else
    {
        if(level>highScore)
        {
            h2.innerHTML=`Game Over!<br><b>Congratulations,New Record High Score:</b>"${level}"</b>(Previous Highscore:${highScore}) <br>Press any key to restart`;
            highScore=level;
            let body=document.querySelector("body");
            body.style.backgroundColor="green";
            setTimeout(function(){
                body.style.backgroundColor="white";
            },200);
        }
        else{
            h2.innerHTML=`Game Over!<br>Your score was <b>"${level}"</b>(Highscore:${highScore})<br>Press any key to restart`;
            let body=document.querySelector("body");
            body.style.backgroundColor="red";
            setTimeout(function(){
                body.style.backgroundColor="white";
            },200);
        }
        
        setTimeout(reset,2000);
    }
}
function btnPress()
{
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    

    

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}
 
function reset()
{
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}