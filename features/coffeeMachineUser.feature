Feature:
  As a coffee buyer
  I want a coffee machine that
  I can put 15 kr coins in or pay 10 kr with bank card
  and get a cup of coffee back.

  Scenario Outline:
    Given that the machine is plugged in
    And the power light is on
    And that the machine has enough water
    And that the machine has enough coffee
    And that the machine has enough milk
    And the machine has plastic cups
    When I insert 15 kr coins in the machine
    And I select the drink "<drink>"
    And I presses the "start" button
    Then I will get a <cup> of coffee

    Examples:
      | drink            | coin 1 | coin 2 | coin 3 | cup |
      | black coffee     | 10     | 5      | 0      | 1    |
      | coffee with milk | 5      | 5      | 5      | 1    |
      | coppuccino       | 0      | 10     | 5      | 1    |
      | no drink         | byxknapp | 1    | 5      | 0    |

      
    

  Scenario Outline:
    Given that the machine is plugged in
    And the power light is on
    And that the machine has enough water
    And that the machine has enough coffee
    And that the machine has enough milk
    And the machine has plastic cups
    And I pay 15 kr with credit card
    And I select the drink "<drink>"
    And I presses the "start" button
    Then I will get a <cup> of coffee

    Examples:
      | drink            |
      | black coffee     |
      | coffee with milk |
      | coppuccino       |
