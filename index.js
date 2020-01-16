
class CoffeeMachine {

  constructor() {
    // properties can be things we want to change
    // without having to go throught all the code

    this.pricePerCup = 15; // sek
    this.totalMoney = 0;
    this.coinPayedSinceLastCup = 0;
    this.cardPayedSinceLastCup = 0;
    this.pluggedIn = false;
    this.waterInBucket = false;
    this.milkInBucket = false;
    this.coffeeInBucket = false;
    this.waterTempreture = 10;

    this.coffeePerCup = 0;
    this.milkInCup = 0;
    this.waterInCup = 0;
    this.cupsInMachine = 0;

    this.cupDispenser = false;
    this.coffeeDispenser = false;
    this.coffeeBlender = false;

    this.selectedDrink = false;

    this.blackCoffeeButton = false;
    this.coffeWithMilkButton = false;
    this.coppuccinoButton = false;
    this.startButton = false;
    this.cancelButton = false;
    this.moneyRefund = false;

    this.startLight = false;
    this.powerLight = false;
    this.powerButton = false;
    this.coffeeMachinReady = false;

    this.coffeeServed = false;
  }

  // Metoder är saker man gör (verb)

  plugIn() {
    this.pluggedIn = true;
    //this.shinePowerLight();
  }
  plugOut() {
    this.pluggedIn = false;
    //this.shinePowerLight();
  }

  pressPowerButton() {
    this.powerButton = true;
  }
  checkPowerOnButton() {
    this.powerButton = false;
  }
  lightPowerLight() {
    this.powerLight = true;
  }
  checkIfMachineReady() {
    this.coffeeMachinReady = true;
  }
  checkIfMachineNotReady() {
    this.coffeeMachinReady = false;
  }
  /*fillWithCoffee(amount) {
    // add amount to total amount of 
    // ground coffee in the machine
    this.coffeeInBucket += amount;
  }*/

  fillWithWater() {
    this.waterInBucket = true;
  }
  checkIfNoWater() {
    this.waterInBucket = false;
  }
  fillWithCoffee() {
    this.coffeeInBucket = true;
  }
  checkIfNoCoffee() {
    this.coffeeInBucket = false;
  }

  fillWithMilk() {
    this.milkInBucket = true;
  }
  checkIfNoMilk() {
    this.milkInBucket = false;
  }

  fillWithCups() {

    this.cupsInMachine = true;
  }
  checkIfNoCups() {
    this.cupsInMachine = false;
  }

  checkIfDrinkSelected() {
    this.selectedDrink = false;
  }

  insertMoney(amount) {
    // add inserted money to total
    // money inserted so far
    if (typeof amount !== 'number') {
      throw (new Error('You must insert money not ' + nonMoney));
    }
    this.coinPayedSinceLastCup += amount;
  }

  refundCoins() {
    let moneyInserted = this.coinPayedSinceLastCup;
    this.coinPayedSinceLastCup = 0;
    return moneyInserted;
  }

  payWithCard(amount) {
    if (this.cardPayment < this.pricePerCup) {
      throw (new Error('No enough money in your card!'));
    }
    this.cardPayedSinceLastCup += amount;

  }
  payForDrink() {
    this.insertMoney();
    this.payedByCard();
}
  refundPayWithCard() {
    let payedByCard = this.cardPayedSinceLastCup;
    this.cardPayedSinceLastCup = 0;
    return payedByCard;

  }
  refundMoney(moneyBack) {
    this.moneyRefund = true;

    this.refundCoins();
    this.refundPayWithCard();
    this.totalMoney -= moneyBack;

  }
  selectDrink(drink) {
    this.selectedDrink = drink;

  }
  lightStartLight() {
    this.startLight = true;
  }
  start() {
    //this.shineStartLight();

    if (this.coinPayedSinceLastCup >= this.pricePerCup) {
      this.totalMoney += this.coinPayedSinceLastCup;
      //this.coinPayedSinceLastCup = 0;
      this.serveCoffee();
      return "Here is your coffee";

    }

    else if (this.cardPayedSinceLastCup >= this.pricePerCup) {
      this.totalMoney += this.cardPayedSinceLastCup;
      this.serveCoffee();
      return "Here is your coffee";
    }

  }

  cancel(amount) {
    this.cancelButton = true;

    if (amount === this.coinPayedSinceLastCup) {
      this.refundCoins();
    }
    else (amount === this.payedByCard)
    this.refundPayWithCard();

    this.totalMoney -= amount; //reduce the payed amount from totalMoney

    this.selectedDrink = "";     //return selectedDrink 

  }

  brewCoffee(drinkType) {
    this.coffeeBlender = true; // start mixig coffee materials
    this.waterTempreture = 80; // degrees in selecius
    if (drinkType === 'black coffee') {
      this.coffeePerCup = 13; // amount of coffee in gram
      this.waterInCup = 2;   // amount of water in dl
    }
    else if (drinkType == 'coffeeWithMilk') {
      this.coffeePerCup = 13; // amount of coffee in gram
      this.milkInCup = 0.5;  // amount of milk in dl
      this.waterInCup = 1.5; // amount of water in dl

    }
    else (drinkType == 'coppuccino')
    this.coffeePerCup = 10;
    this.milkInCup = 1;
    this.waterInCup = 1;

  }

  serveCoffee() {
    this.selectDrink();
    this.checkIfEnoughCoffeeForACup();
    this.checkIfAnyCupsLeft()
    this.brewCoffee();
    this.dispenseCup();
    this.dispenseCoffee();

    this.coffeeServed = true;
    // Heat water, blend coffee/ water etc.


  }

  checkIfEnoughCoffeeForACup() {
    return this.coffeeInBucket >= this.coffeePerCup;
  }

  checkIfAnyCupsLeft() {
    return this.cupsInMachine >= 1;
  }

  dispenseCup() {
    if (this.cupsInMachine >= 1) {
      this.cupDispenser = true;
    }
  }
  dispenseCoffee() {
    this.coffeeDispenser = true;

  }

}



// Export the CoffeeMachine class
module.exports = CoffeeMachine;
