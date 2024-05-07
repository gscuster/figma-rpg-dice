# figma-rpg-dice
A dice widget that accepts basic dice notation for custom dice rolls.

## Basic use

This dice widget accepts basic dice notation (currently a single specifier only) in an
input box on the widget. When rolling the total for the roll will be displayed on the
right of the widget. A message will pop up with the name of the user that rolled, the
dice that they rolled, the result of each die rolled, and the overall total (including a
modifier, if provided).

### Notation examples

Dice can be specified as a string with the form `{number of die}{type of die}{number of faces} + {modifier}`

Example: `1d6` would indicate 1 6-sided die. 

If you wanted to roll two six-sided die you'd input `2d6`.

If you wanted to roll two 20-sided die with a +3 modifier you'd input `2d20+3`

In addition to basic dice (type `d`), fudge dice (type `dF`) are also supported.

Example: `4dF` would indacte 4 fudge dice.
