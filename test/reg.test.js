const assert = require("assert");
const myReg = require("../regFacFun");

// describe("Error messages", async function () {
//     it("should return an error message if registration number is not entered", function () {
//         const regNo = myReg()
  
//       let message = await regNo.errorMessages("");
  
//       assert.equal("Please type in your registration number ", message);
//     });

    
// it("should return if the registration is not from Limpopo",function(){
//   const regNo = myReg()
//   let message = regNo.errorMessages("L -252 956");

//   assert.equal("Please enter valid registration number", message);

// })

// it("should return if the registration is not from Gauteng",function(){
//   const regNo = myReg()
//   let message = regNo.errorMessages("JP -252 956 DT GP");

//   assert.equal("Please enter valid registration number", message);

// })


//});

describe("should return the registration number that are stored in an empty array", async function(){
  it("should return the registration number from Cape Town in stored an array",async function(){
    
    const regNo = myReg()
    let message = await regNo.addingReg('CA 8582')

    assert.deepEqual(['CA 8582'],await regNo.getRegistration('CA 8582'))
  })

  // it("should return the registration number from Cape Town and Paarl in stored an array", function(){
  //   const regNo = myReg()
  //   let message = regNo.addingReg("'CA 8582','CJ 123'")

  //   assert.deepEqual(["'CA 8582','CJ 123'"],regNo.getRegistration())
  // })

  // it("should return the registration number from Cape Town,Paarl and Stellenbosch in stored an array", function(){
  //   const regNo = myReg()
  //   let message = regNo.addingReg("'CA 8582','CJ 123','CL 555'")

  //   assert.deepEqual(["'CA 8582','CJ 123','CL 555'"],regNo.getRegistration())
  // })
})

// describe("the filtered registration", function () {
//   it('it should return the registration from Cape Town', function () {
//     const regNo = myReg()
//     let message = regNo.addingReg('CA-12523')

//     assert.deepEqual(['CA-12523'],regNo.filteredReg('CA'))
//   })

//   it('it should return the registration from Stellebosch', function () {
//     const regNo = myReg()
//     let message = regNo.addingReg('CL-12523')

//     assert.deepEqual(['CL-12523'],regNo.filteredReg('CL'))
//   })

//   it('it should return the registration from Paarl', function () {
//     const regNo = myReg()
//     let message = regNo.addingReg('CJ-12523')

//     assert.deepEqual(['CJ-12523'],regNo.filteredReg('CJ'))
//   })

//   it('it should return the registration from George', function () {
//     const regNo = myReg()
//      regNo.addingReg('CAW-12523')

//     assert.deepEqual(['CAW-12523'],regNo.filteredReg('CAW'))
//   })
// })

// describe('should return all the registration numbers',function(){
//   it("should return all the registration",function(){
//     const regNo = myReg()
// regNo.addingReg(['CJ-12523','CAW-12523','CA-12523','CL-12523'])
//   })
// })
