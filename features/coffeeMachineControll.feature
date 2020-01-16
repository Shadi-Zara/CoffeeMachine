Feature:
  As a coffee machine owner
  I want to be able that
  I can controll that the machine has enough material
  to let the users buy coffee.

  Scenario Outline:
    Given that the machine is plugged in
    And the power light is on
    And that the machine has enough <material>
    And the machine has plastic cups
    When I press the power button
    Then the machine will be ready to serve drinks

    Examples:
      | material |
      | water    |
      | coffee   |
      | milk     |


  Scenario:
    Given that the machine is not plugged in
    When I press the power button
    Then the machine will not be alble to serve drinks

  Scenario Outline:
    Given that the machine is plugged in
    And there are not enough <material>
    When I press the power button
    Then the machine will not be alble to serve drinks

    Examples:
      | material |
      | water    |
      | coffee   |
      | milk     |

  Scenario:
    Given that the machine is plugged in
    And the machine has no plastic cups
    When I press the power button
    Then the machine will not be alble to serve drinks

  Scenario:
    Given that the machine is plugged in
    When I forget to press the power button
    Then the machine will not be alble to serve drinks
