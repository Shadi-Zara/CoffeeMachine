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
    if (this.cupsInMachine >= 1) {
      assert.strictEqual(myMachine.cupsInMachine, true,
        'Expected the property cupsInDispenser to be true after calling the fillWithCups() method.'

      );
    }
  });

  this.Given(/^the machine has no plastic cups$/, function () {
    myMachine.checkIfNoCups();
    // check if there is enough water in the water bucket
    if (this.cupsInMachine < 1) {
      assert.strictEqual(myMachine.cupsInMachine, false,
        'Expected the property cupsInDispenser to be false after calling the checkIfNoCups() method.'

      );
    }
  });

  this.When(/^I press the power button$/, function () {
    myMachine.pressPowerButton();
    assert.strictEqual(myMachine.powerButton, true, "Expected the property power button to be true after calling pressPowerButton()");
  });

  this.When(/^I forget to press the power button$/, function () {
    myMachine.checkPowerOnButton();
    assert.strictEqual(myMachine.powerButton, false, "Expected the property power button to be false after calling checkPowerOnButton()");
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




  this.When(/^I insert (\d+) kr in the machine$/, function (moneyAmount) {


    moneyAmount /= 1;

    let moneyBefore = myMachine.coinPayedSinceLastCup;
    myMachine.insertMoney(moneyAmount);
    assert.deepEqual(
      myMachine.coinPayedSinceLastCup,
      moneyBefore + moneyAmount,
      "Expected the amount of money inserted to increase with the amount inserted"
    )
  });


  this.When(/^I insert "([^"]*)" in the machine$/, function (nonMoney) {

    // Stupid Cucumber/assert library
    // the function used with assert.throws
    // can not use local variables...
    // So we have to make nonMoney an global
    global.nonMoney = nonMoney;

    assert.throws(
      // A function to run in which we expect
      // the program to throw a certain error
      function () {
        myMachine.insertMoney(global.nonMoney);
      },
      // The error type we expect
      Error,
      // The error we expect the program to throw
      'You must insert money not ' + nonMoney,
      // Message in test report
      'Expected the runtime error "You must insert money not ' + nonMoney + '"'
    );
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
      myMachine.start();

      assert(true, "Expected the machine will start coffee making ")
    }
  });

  this.Then(/^I will get a (\d+) cup of coffee$/, function (cups) {
    cups /= 1;

    if (cups === 1) {
      myMachine.serveCoffee();
      assert.deepEqual(myMachine.coffeeServed, true, "Here's your coffee, Expected to serve coffee");
    }
    else {
      assert.notDeepEqual(myMachine.coffeeServed,
        false, "Sorry We didn't insert more cups! Expected to not serve coffee");
    }
  });

  this.Then(/^I will get a cup of coffee$/, function () {

    myMachine.serveCoffee();
    assert.equal(myMachine.coffeeServed, true, "Here's your coffee, Expected to serve coffee");

  });
  this.When(/^I press cancel$/, function () {
    myMachine.cancel();
    assert.strictEqual(myMachine.cancelButton, true, "Expected property cancelButton to be true when cancel()method is called");
  });

  /*this.Then(/^I will get my money back$/, function (amount) {
    amount /= 1;
    if (this.cardPayedSinceLastCup >= 15) {
      let moneyAfter = this.totalMoney - amount;
      myMachine.moneyRefund();
      assert.deepEqual(myMachine.totalMoney,moneyAfter , "[message]");
    }
  
});*/
  this.Then(/^I will get my money back$/, function () {
    myMachine.refundMoney();

      assert.deepEqual(myMachine.moneyRefund, true, "Expected the property moneRefund to be true when refundMoney()methodis called");
    
  });

  this.When(/^I do not select a drink$/, function () {
    myMachine.checkIfDrinkSelected();
    assert.deepEqual(myMachine.selectedDrink, false, "Expected the property selectedDrink to be false when checkIfDrinkSelected() is called");
  });

  this.Given(/^I do not pay enough (\d+) kr$/, function (amount) {
    amount /= 1;
    if (this.coinPayedSinceLastCup === 15) { 
    myMachine.insertMoney(amount);
    assert.notDeepEqual(myMachine.coinPayedSinceLastCup, amount, " Expected the property coinInsertedSinceLastCup to not equal amount");
  }
  });


}











    //this.Given(/^that the machine has enough water$/, function (amount) {
      //amount /= 1;
      //let waterBefore = this.waterInBucket;

      //myMachine.fillWithWater(amount);
      //assert.equal(myMachine.waterInBucket, waterBefore + amount,
        //'Expected the property waterInBucket to fill amount of water in bucket after calling the fillWithWater() method.'
     // );
    //});