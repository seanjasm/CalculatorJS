var isOps = false;
var lastOp = "";
var lastAmt = "";
var firstAmt = "";
var isRes = false;

function add(el)
{
    var res = document.getElementById("res");

    if(el.innerText === "="){
    if(isOps && firstAmt !== "" && lastAmt !== ""){
        doOps(res);        
        isRes = true;
        return;
    }
    }else if(el.innerText === "C"){
        res.innerText = "Result goes here";
        lastAmt = firstAmt = "";
        isOps = isRes = false;
        lastOp = "";
        res.classList.add("result-fade");
    }else if(res.innerText === "Result goes here"){
        if(setLastOps(el.innerText, res))
        {                    
            res.classList.remove("result-fade");
        }
    }
    else{
        if(!setLastOps(el.innerText, res))
        {
            doOps(res);
            lastOp = el.innerText;
            isOps = true;
            res.innerText += el.innerText;
        }
    }
}



function setLastOps(op, res)
{
    console.log(op + " " + isRes + " " + firstAmt);
    if(new RegExp("[\+\-/X]").test(op))
    {     
        if(firstAmt === ""){
            return false;
        } 
        else if(!isOps && firstAmt !== ""){
            isOps = true;
            lastOp = op;
            res.innerText += op;
            isRes = false;
            return true;

        }else if(isOps && lastAmt !== ""){
            return false;
        }
        return true;
    }
    else if(!isRes){        
        if(res.innerText === "Result goes here"){            
            firstAmt = op;
            res.innerText = op;
        }else{
            lastAmt += op; 
            res.innerText += op;
        }
    }
    
    
  return true;
}

function doOps(el)
{
    var result = 0;

    switch(lastOp)
    {
        case "+": result = parseInt(firstAmt) + parseInt(lastAmt);
            break;
        case "-":result = parseInt(firstAmt) - parseInt(lastAmt);
                    
            break;
        case "X":result = parseInt(firstAmt) * parseInt(lastAmt);

            break;
        case "/":result = parseInt(firstAmt) / parseInt(lastAmt);
            break;
                                        
    }

    el.innerText = result;
    firstAmt = result;

    lastAmt = "";
    lastOp = "";
    isOps = false;
}


