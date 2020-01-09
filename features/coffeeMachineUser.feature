Feature:
As a coffee buyer
I want a coffee machine that
I can put 15 kr coins in or pay 10 kr with bank card
and get a cup of coffee back.


  Scenario:
    Given that the machine is plugged in
    And the power light is on
    And that the machine has enough water 
    And that the machine has enough coffee
    And that the machine has enough milk
    And the machine has plastic cups
    When I insert 15 kr coins in the machine
    And I pay 15 kr with credit card
    And I select my drink 
    And Press start button
    Then I will get a cup of coffee
    

