module.exports = function registration(){
    // let carNumbers = ''
    let numberPlates = [];
    let regNo = ['CA', 'CL', 'CAW','CJ']
    let validRegx =/^[A-Z \d ]+$/gm

    
    function getRegistration(){
        return numberPlates
    }

    function addingReg(regNumbers){
        
        if(numberPlates.includes(regNumbers)){
         return false
        }else{
         return numberPlates.push(regNumbers)
        }
    }
function errorReg(carNumbers){
    if(addingReg(carNumbers)== false){
        return "The registration is already existing"
    }
}
  
function errorMessages(regNumbers){
    if(regNumbers == " "){
        return "Please type in your registration number "
    
     }
    if(regNumbers !== regNo){
        return "Please enter valid registration number"
    }
    
}
function filteredReg(dropped) {
    return numberPlates.filter(function(motorNum){
        getRegistration(dropped)
        return motorNum.startsWith(dropped)
    })
}


function gettingReg(){
    return regNumbers
}


    return{
    errorMessages,
    addingReg,
    getRegistration,
    filteredReg,
    errorReg
    

    }
}