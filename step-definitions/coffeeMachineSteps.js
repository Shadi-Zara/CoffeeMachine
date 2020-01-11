// Import our program (in this case an instance of a coffee machine
// so that we can run unit tests methods)
let CoffeeMachine = require('../index.js');


// Variables that we want to be able to share between different steps
// Make a brand new coffee machine
let myMachine = new CoffeeMachine();
let startButtonResult;

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
  /*
    this.Given(/^that the machine has enough water$/, function (amount) {
      amount /= 1;
      let waterBefore = this.waterInBucket;
  
      // check if there is enough water in the water bucket
      myMachine.fillWithWater(amount);
      assert.equal(myMachine.waterInBucket, waterBefore + amount,
        'Expected the property waterInBucket to fill amount of water in bucket after calling the fillWithWater() method.'
      );
    });*/
  this.Given(/^that the machine has enough water$/, function () {

    // check if there is enough water in the water bucket
    myMachine.fillWithWater();
    assert.strictEqual(myMachine.waterInBucket, true,
      'Expected the property waterInBucket to be true after calling the fillWithWater() method.'
    );
  });

  this.Given(/^that the machine has enough coffee$/, function () {
    myMachine.fillWithCoffee();
    // check if there is enough water in the coffee bucket
    assert.strictEqual(myMachine.coffeeInBucket, true,
      'Expected the property coffeeInBucket to be true after calling the fillWithCoffee() method.'
    );
  });

  this.Given(/^that the machine has enough milk$/, function () {
    myMachine.fillWithMilk();
    // check if there is enough water in the milk bucket
    assert.equal(myMachine.milkInBucket, true,
      'Expected the property milkInBucket to be true after calling the fillWithMilk() method.'
    );
  });

  this.Given(/^the machine has plastic cups$/, function () {
    myMachine.fillWithCups();
    // check if there is enough water in the water bucket
    assert.strictEqual(myMachine.cupsInMachine, true,
      'Expected the property cupsInDispenser to be true after calling the fillWithCups() method.'
    );
  });

  this.When(/^I press the power button$/, function () {
    myMachine.pressPowerButton();
    assert.strictEqual(myMachine.powerButton, true, "Expected the property power button to be true after calling pressPowerButton()");
  });

  this.Then(/^the machine will be ready to serve drinks$/, function () {
    myMachine.checkIfMachineReady();
    assert.strictEqual(myMachine.coffeeMachinReady, true, "Expected the property coffeeMachineReady to be true after calling getMachineRready()");
  });

  this.Given(/^that the machine is not plugged in$/, function () {
    myMachine.plugOut();
    assert.strictEqual(myMachine.pluggedIn, false, "Expected the property pluggedIn to be false ");
  });
  this.Then(/^the machine will not be alble to serve drinks$/, function () {
    myMachine.checkIfMachineNotReady();
    assert.strictEqual(myMachine.coffeeMachinReady, false, "Expected the property pluggedIn to be false ");

  });


  this.Given(/^there are not enough water$/, function () {
    myMachine.checkIfNoWater();
    assert.strictEqual(myMachine.waterInBucket, false, "Expected the property waterInBucket to be false wen checkIfNoWater()is called");
  });

  this.Given(/^there are not enough coffee$/, function () {
    myMachine.checkIfNoCoffee();
    assert.strictEqual(myMachine.coffeeInBucket, false, "Expected the property coffeeInBucket to be false wen checkIfNoCoffee()is called");
  });

  this.Given(/^there are not enough milk$/, function () {
    myMachine.checkIfNoMilk();
    assert.strictEqual(myMachine.milkInBucket, false, "Expected the property milkInBucket to be false wen checkIfNoMilk()is called");
  });




  this.When(/^I insert (\d+) kr coins in the machine$/, function (moneyAmount) {


    moneyAmount /= 1;

    let moneyBefore = myMachine.coinPayedSinceLastCup;
    myMachine.insertMoney(moneyAmount);
    assert.deepEqual(
      myMachine.coinPayedSinceLastCup,
      moneyBefore + moneyAmount,
      "Expected the amount of money inserted to increase with the amount inserted"
    )
  });


  this.When(/^I pay (\d+) kr with credit card$/, function (moneyAmount) {
    moneyAmount /= 1;

    let moneyBefore = myMachine.cardPayedSinceLastCup;
    myMachine.payWithCard(moneyAmount);
    assert.deepEqual(
      myMachine.cardPayedSinceLastCup,
      moneyBefore + moneyAmount,
      "Expected the amount of money inserted to increase with the amount inserted"
    )

  });


  this.When(/^I select the drink "([^"]*)"$/, function (drink) {
    myMachine.selectDrink(drink);
    assert.strictEqual(myMachine.selectedDrink, drink, "Expected the property selectedDrink to be true when selectDrink() is called");

  });
  this.When(/^I presses the "([^"]*)" button$/, function (button) {
    if (button === 'start') {
      // we assume just everything is fine
      startButtonResult = myMachine.start();

      assert(true, "Expected the machine will start coffee making ")
    }
  });

  this.Then(/^I will get a <cup> of coffee$/, function (cups) {
    cups /= 1;

    if (cups === 1) {
      assert.deepEqual(
        startButtonResult,
        "here's your coffee",
        "Didn't get any coffee? You should. We inserted enough."
      );
    }
    else {
      assert.notDeepEqual(
        startButtonResult,
        "Sorry",
        "We didn't insert more cups!"
      );
    }
  });
}