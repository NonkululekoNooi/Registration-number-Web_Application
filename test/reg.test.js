const assert = require("assert");
const myReg = require("../regFacFun");
const pgp = require("pg-promise")();

const DATABASE_URL =
  process.env.DATABASE_URL ||

  "postgresql://postgres:pg123@localhost:5432/registrations_tests";




  const config = {
    connectionString: DATABASE_URL,
  };
const db = pgp(config);

describe("Factory Function tests ", async function () {
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

it('should return registrations numbers that are filtered "CAPE TOWN"', async function(){
  let regNo =myReg(db)
 

  let output = await regNo.filtered("CAPE TOWN")

  await regNo.storedRegistration("CN 125-898")
  await regNo.storedRegistration("CJ 130-012")
  await regNo.storedRegistration("CA 802-541")
  await regNo.storedRegistration("CA 802-548")
  await regNo.storedRegistration("CA 102-148")

      


assert.deepEqual([{"reg_numbers": "CA 802-541", identity_id: 2},
  {"reg_numbers": "CA 802-548", identity_id: 2},
  {"reg_numbers": "CA 102-148", identity_id: 2} ], await regNo.filtered("CAPE TOWN"))




})

it('should return registrations numbers that are filtered "WELLINGTON"', async function(){
  let regNo =myReg(db)
 
  await regNo.storedRegistration("CN 125-898")
  await regNo.storedRegistration("CJ 130-012")
  await regNo.storedRegistration("CA 802-541")
  await regNo.storedRegistration("CA 802-548")
  await regNo.storedRegistration("CA 102-148")

  assert.deepEqual([{"reg_numbers": "CN 125-898", identity_id: 3}], await regNo.filtered("Wellington"))

  await regNo.addingReg("CN 125-898")
  await regNo.addingReg("CJ 130-012")
  await regNo.addingReg("CA 802-541")

  


})

it('should return registrations numbers that are filtered "PAARL"', async function(){
  let regNo =myReg(db)
 
 

  await regNo.storedRegistration("CN 125-898")
  await regNo.storedRegistration("CJ 130-012")
  await regNo.storedRegistration("CA 802-541")
  await regNo.storedRegistration("CA 802-548")
  await regNo.storedRegistration("CA 102-148")

  assert.deepEqual([{"reg_numbers": "CJ 130-012", identity_id: 4}], await regNo.filtered("PAARL"))

})

it('should return registrations numbers that are filtered "PAARL"', async function(){
  let regNo =myReg(db)
 
 

  await regNo.storedRegistration("CN 125-898")
  await regNo.storedRegistration("CJ 130-012")
  await regNo.storedRegistration("CA 802-541")
  await regNo.storedRegistration("CA 802-548")
  await regNo.storedRegistration("CA 102-148")

  assert.deepEqual([], await regNo.filtered("SHOW ALL"))

})
 
  
  it("should reset all the registration numbers from the database", async function (){
   
    const regNo = myReg(db);

    await regNo.storedRegistration('CJ 130-012');

    assert.equal(null,await regNo.rested());

  })

  after(function(){
    db.$pool.end
  })
})