module.exports = function myGreetedRoutes(regNo){
    // const reg = require("../regFacFun");
   
    async function home(req, res) {
        var message = await regNo.getRegistration();
        res.render("index", {
          message
        });
      }

      async function regNum (req, res) {
        let enteredReg = req.body.regPlates.toUpperCase().trim();
        let validPlates =  /[A-Z]{2,3}\s[0-9]{3}(\-|\s)?[0-9]{3}/
        
        
        if(!enteredReg){
          req.flash("error", "Please type in your registration number ");
        }
        else if(validPlates.test(enteredReg) == false){
          req.flash('error',"Invalid registration number entered");
        }
      
        else if(await regNo.photoCopy(enteredReg) !== null){
          req.flash('error', 'THIS REGISTRATION IS ALREADY EXISTING')  
        }
      
        else if(validPlates.test(enteredReg) === true){
           await regNo.getRegistration();
            await regNo.storedRegistration(enteredReg);
        } 
        res.redirect("/");
      }

      async function filter(req, res) {
        var dropdown = req.body.places
        var showed = req.body.place
        // console.log(dropdown)
        if(dropdown === " "){
        
          req.flash("error",'THERE IS NO REGISTRATION FROM THIS TOWN')
          console.log(req.flash("error",'THERE IS NO REGISTRATION FROM THIS TOWN'))
        }
        if(dropdown === "SHOW ALL"){
          var regEntered = await regNo.getRegistration() 
        
        }else {
          var regEntered = await regNo.filtered(dropdown) 
      }
      res.render("index",{
        message:regEntered
      })
      }

      async function resets (req, res) {
        await regNo.rested();      
        req.flash("error","YOU RESETED EVERYTHING");
        res.redirect("/");
      }
  
  
  
      return{
        home,
        regNum,
        filter,
        resets

        
  
      }
  }