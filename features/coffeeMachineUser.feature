Feature:
  As a coffee buyer
  I want a coffee machine that
  I can put 15 kr coins in or pay 10 kr with bank card
  and get a cup of coffee back.

  Background: 
    Given that the machine is plugged in
    And the power light is on
    And that the machine has enough water
    And that the machine has enough coffee
    And that the machine has enough milk
    And the machine has plastic cups

  Scenario Outline:
    
    When I insert <coins 1> kr in the machine
    When I insert <coins 2> kr in the machine
    When I insert <coins 3> kr in the machine
    And I select the drink "<drink>"
    And I presses the "start" button
    Then I will get a <cup> cup of coffee

    Examples:
      | drink            | coins 1 | coins 2 | coins 3 | cup |
      | black coffee     | 10      | 5       | 0         | 1    |
      | coffee with milk | 5       | 5       | 5         | 1    |
      | coppuccino       | 0       | 10      | 5         | 1    |


      
  Scenario Outline:
    Given that the machine is plugged in
    And the power light is on
    And that the machine has enough water
    And that the machine has enough coffee
    And that the machine has enough milk
    And the machine has plastic cups
    When I insert "<non money>" in the machine
    Then the machine will not be alble to serve drinks
  
    Examples:
      |non money|
      |byxknapp |
      |false coin|
    

  Scenario Outline:
    Given that the machine is plugged in
    And the power light is on
    And that the machine has enough water
    And that the machine has enough coffee
    And that the machine has enough milk
    And the machine has plastic cups
    And I pay 15 kr with credit card
    And I select the drink "<drink>"
    When I presses the "start" button
    Then I will get a cup of coffee

    Examples:
      | drink    |        
      | black coffee |    
      | coffee with milk |
      | coppuccino |    


  Scenario:
    Given I pay 15 kr with credit card  
    When I press cancel
    Then I will get my money back
    And the machine will not be alble to serve drinks

  Scenario Outline: 
    Given I do not pay enough <money 1> kr
    Given I do not pay enough <money 2> kr
    Given I do not pay enough <money 3> kr
    Then the machine will not be alble to serve drinks

    Examples:
    | money 1 | money 2 | money 3 |
    |  1      |  2      |  5      |
    |  10     |  1      |  2      |

  Scenario:
    Given I pay 15 kr with credit card
    When I do not select a drink
    And I presses the "start" button
    And the machine will not be alble to serve drinks

