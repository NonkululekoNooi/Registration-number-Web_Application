module.exports = function registration(db) {
  let carPlates = {};

  async function getRegistration() {
    let carPlates = await db.manyOrNone(
      "SELECT reg_numbers FROM carregistration"
    );
    console.log(carPlates);
    return carPlates;
  }

 
  async function addingReg(regNumbers) {
    if (carPlates.includes(regNumbers)) {
      return false;
    } else {
      return carPlates.push(regNumbers);
    }
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
      "SELECT id FROM number_plates where location =$1",
      [Reg]
    );

    let output = await db.manyOrNone(
      "SELECT reg_numbers,identity_id FROM carregistration where identity_id=$1",
      [identity_id.id]
    );
    return output;
  }

  async function photoCopy(bikePlates) {
    const output = await db.oneOrNone(
      "SELECT id FROM carregistration WHERE reg_numbers = $1",[bikePlates]
    );
    return output;
  }

  async function rested() {
    return await db.none("DELETE FROM carregistration");
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
