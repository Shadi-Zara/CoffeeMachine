// Import our program (in this case an instance of a coffee machine
// so that we can run unit tests methods)
let CoffeeMachine = require('../index.js');


// Variables that we want to be able to share between different steps
 // Make a brand new coffee machine
let myMachine = new CoffeeMachine();

// Export the step-definitions (tests) so that Cucumber can read/use them
module.exports = function () {

  this.Given(/^that the machine is plugged in$/, function () {

    // tell the machine that it is plugged in
    myMachine.plugIn();
    // check if the property pluggedIn is true
    assert.strictEqual(myMachine.pluggedIn, true,
      'Expected the property pluggedIn to be true after calling the plugIn() method.'
    );
  });

  this.Given(/^the power light is on$/, function () {
    myMachine.lightPowerLight();
    // check if the property pluggedIn is true
    assert.strictEqual(myMachine.powerLight, true,
      'Expected the property powerLight to be true after calling the lightPowerLight() method.'
    );
  });




}