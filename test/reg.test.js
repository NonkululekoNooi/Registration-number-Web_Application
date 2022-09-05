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
  await regNo.getRegistration("CN 125-898")
  await regNo.getRegistration("CJ 130-012")
  await regNo.getRegistration("CA 802-541")
  await regNo.getRegistration("CA 802-548")
  await regNo.getRegistration("CA 102-148")


  assert.deepEqual(["identity_id": 1, "reg_numbers": "CA 802-541"},["identity_id": 1, "reg_numbers": "CA 802-548"},
   ["identity_id": 1, "reg_numbers": "CA 102-148"}],output)

})

it('should return registrations numbers that are filtered "WELLINGTON"', async function(){
  let regNo =myReg(db)
 
  let output = await regNo.filtered("Wellington")

  await regNo.getRegistration("CN 125-898")
  await regNo.getRegistration("CJ 130-012")
  await regNo.getRegistration("CA 802-541")

  assert.deepEqual([{"identity_id": 2, "reg_numbers": "CN 125-898"}], output)

})



  it("should return registration numbers that are stored",async function () {
    const regNo = myReg(db);
    await regNo.addingReg([{"reg_numbers": "CN 125-898"}])
    assert.deepEqual( [{"reg_numbers": "CN 125-898"}]
    ,await regNo.getRegistration([{"reg_numbers": "CN 125-898"}]))
  
    
  });
  
  it("should reset all the registration numbers from the database", async function (){
   
    const regNo = myReg(db);

    await regNo.storedRegistration('CJ 130-012');

    assert.equal(null,await regNo.rested());

  })

  after(function(){
    db.$pool.end
  })
})
  
