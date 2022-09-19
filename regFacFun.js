module.exports = function registration(db) {


  async function getRegistration() {
    let carPlates = await db.manyOrNone(
      "SELECT reg_numbers FROM carregistration"
    );
    
    return carPlates;
  }

 
  async function addingReg() {
   let carPlates = await db.manyOrNone("SELECT Reg_Numbers FROM carregistration");
   return carPlates;
 }
    
 

  async function storedRegistration(regstraNumber) {
    let identity_id = await db.oneOrNone(
      "SELECT id FROM number_plates where registration_number =$1",
      [regstraNumber.slice(0, 2)]
    );

    let copy = await photoCopy(regstraNumber);
    if (copy === null) {
      await db.none(
        "INSERT INTO carregistration(reg_Numbers,identity_id) values($1, $2)",
        [regstraNumber, identity_id.id]
      );
    }
  }

  async function filtered(Reg) {
    let identity_id = await db.oneOrNone(
      "SELECT id FROM number_plates where locations =$1",
      [Reg]
    );

    let output = await db.manyOrNone(
      "SELECT Reg_Numbers,identity_id FROM carregistration where identity_id=$1",
      [identity_id.id]
    );
    return output;
  }

  async function duplicate(bikePlates) {
    const output = await db.oneOrNone(
      "SELECT id FROM carregistration WHERE reg_numbers = $1",[bikePlates]
    );
    return output;
  }

  async function rested() {
    return await db.none("TRUNCATE carregistration");
  }

  return {
    photoCopy,
    addingReg,
    getRegistration,
    storedRegistration,
    rested,
    filtered,
  };
};
