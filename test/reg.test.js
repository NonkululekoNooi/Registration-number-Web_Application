const assert = require("assert");
const myReg = require("../regFacFun");
const pgp = require("pg-promise")();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://codex:pg123@localhost:5432/registrations";

  const config = {
    connectionString: DATABASE_URL,
  };
const db = pgp(config);

describe("Registrations from different town", async function () {
  this.beforeEach(async function () {
      await db.none('DELETE FROM carregistration');
  });


it("should return registration number from Paarl", async function () {
  const regNo = myReg(db);
  await regNo.storedRegistration("CJ 130-012");

  assert.deepEqual([{reg_numbers: 'CJ 130-012'}], await regNo.getRegistration());
});

it("should return registration number from CAPE TOWN", async function () {
  let regNo = myReg(db);
  await regNo.storedRegistration("CA 802-541");
  

  assert.deepEqual([{reg_numbers: 'CA 802-541'}], await regNo.getRegistration());
});

it("should return registration number from Wellington", async function () {
  let regNo = myReg(db);
  await regNo.storedRegistration("CN 125-898");
  

  assert.deepEqual([{reg_numbers: 'CN 125-898'}], await regNo.getRegistration());
});

});


describe("should be able to return all the filtered towns", async function(){

it('should return registrations numbers that are filtered "CAPE TOWN"', async function(){
  let regNo =myReg(db)
 
  let output = await regNo.filtered("CAPE TOWN")


  assert.deepEqual([],output)

})

it('should return registrations numbers that are filtered "WELLINGTON"', async function(){
  let regNo =myReg(db)
 
  let output = await regNo.filtered("Wellington")

  await regNo.getRegistration("CN 125-898")
  await regNo.getRegistration("CJ 130-012")
  await regNo.getRegistration("CA 802-541")

  assert.deepEqual([{"identity_id": 3, "reg_numbers": "CN 125-898"}], output)

})
after(function(){
      db.$pool.end
    })
// it('should return registrations numbers that are filtered "SHOW ALL"', async function(){
//   let regNo =myReg(db)
 
//   let output = await regNo.filtered("SHOW ALL")

//   await regNo.getRegistration("CN 125-898")
//   await regNo.getRegistration("CJ 130-012")
//   await regNo.getRegistration("CA 802-541")

//   assert.deepEqual([{"identity_id": 3, "reg_numbers": "CN 125-898"}], output)

// })
})

describe("All the registration numbers that are added", function () {
it("should return registration numbers that are stored",async function () {
  const regNo = myReg(db);
  await regNo.addingReg([{"reg_numbers": "CN 125-898"}])
  assert.deepEqual( [{"reg_numbers": "CN 125-898"}]
  ,await regNo.getRegistration([{"reg_numbers": "CN 125-898"}]))

  
});
after(function(){
  db.$pool.end
})
});

describe("All the registration number should be reseted", async function (){
  it("should reset all the registration numbers from the database", async function (){
   
    const regNo = myReg(db);

    await regNo.storedRegistration('CJ 130-012');

    assert.equal(null,await regNo.rested());

    after(function(){
      db.$pool.end
    })

  })
})






 