$(document).ready(function() {
    calculator();
    assignListenersByClass();

});

var calculator = function() {
    var $newCalcDiv = $('<div>');
    $newCalcDiv.attr('id', 'calcDiv');
    $('body').append($newCalcDiv);

    var $newTable = $('<table>');
    $newCalcDiv.append($newTable);

    var $tableHead = $('<thead>');
    $newTable.append($tableHead);

    var $tableBody = $('<tbody>');
    $newTable.append($tableBody);

    var $tableData = $('<td>');
    $tableBody.append($tableData);

    var $tableHeader = $('<th>');

    var $displayForm = $('<form>');
    $tableData.append($displayForm);

    var $calcDisplay = $('<input>');
    $calcDisplay.attr('id', 'screen');
    $calcDisplay.attr('value', '0');
    $displayForm.append($calcDisplay);
    $tableHeader.append($displayForm);
    $tableBody.append($tableHeader);

  //***********************************************
  //***********************************************
  //***********************************************

  var $tableRow1 = $('<tr>');

    for (var i = 1; i <= 3; i++) {

        $tableData = $('<td>');
        $tableData.addClass('number');
        $tableData.addClass('button');
        $tableData.attr('id', i);
        $tableRow1.append($tableData);
    }

    $tableBody.append($tableRow1);
  //***********************************************
  //***********************************************
  //***********************************************

  var $tableRow2 = $('<tr>');

    for (var i = 4; i <= 6; i++) {
        $tableData = $('<td>');
        $tableData.addClass('number');
        $tableData.addClass('button');
        $tableData.attr('id', i);
        $tableRow2.append($tableData);
    }

    $tableBody.append($tableRow2);
  //***********************************************
  //***********************************************
  //***********************************************

  var $tableRow3 = $('<tr>');

    for (var i = 7; i <= 9; i++) {
        $tableData = $('<td>');
        $tableData.addClass('number');
        $tableData.addClass('button');
        $tableData.attr('id', i);
        $tableRow3.append($tableData);
    }
    $tableBody.append($tableRow3);
  //***********************************************
  //***********************************************
  //***********************************************

  var $tableRow5 = $('<tr>')

    $tableData = $('<td>C</td>');
    $tableData.addClass('clear');
    $tableData.addClass('button');
    $tableData.attr('id', 'C');
    $tableData.attr('value','C');
    $tableRow5.append($tableData)
    $tableBody.append($tableRow5);
  //***********************************************
  //***********************************************
  //***********************************************

    var $tableRow4 = $('<tr>')
        $tableData = $('<td>');
        $tableData.addClass('number');
        $tableData.addClass('button');
        $tableData.attr('id', 0);
        $tableData.attr('colspan', 3)
        $tableRow4.append($tableData);
        $tableBody.append($tableRow4);

    //***********************************************
    //***********************************************
    //***********************************************

    $tableData = $('<td>=</td>');
    $tableData.addClass('operator');
    $tableData.addClass('button');
    $tableData.attr('id', 'sum');
    $tableRow5.append($tableData)
    $tableBody.append($tableRow5);

    $tableData = $('<td>');
    $tableData.addClass('operators');
    $tableData.addClass('button');
    $tableData.attr('id', '+');

    $tableRow5.append($tableData);
    $tableBody.append($tableRow5);

  //***********************************************
  //***********************************************
  //***********************************************


var $tableRow5 = $('<tr>');

    var operatorsArr = ['-', '/', '*'];
    operatorsArr.forEach(function(v, i, a) {
        $tableData = $('<td>' + v + '</td>');
        $tableData.addClass('operators');
        $tableData.addClass('button');
        $tableData.attr('value', v);
        $tableRow5.append($tableData);

    });
        $tableBody.append($tableRow5);


//making the calculator functional
    assignListenersByClass = function() {
        displayNumberButtons();
        displayOperatorButtons();
        displayOtherButtons();
    }

    var displayNumberButtons = function() {
        //some code to display all of the number buttons
        var $numberCells = $('.number');
        $numberCells.each(function() {
                $(this).text($(this).attr('id'));
                $(this).click(function(e) {
                    if ($('#screen').attr('value') === '0') {
                        $('#screen').attr('value', '');
                    }
                    $('#screen').attr('value', $('#screen').attr('value') + $(this).attr('id'));
                });
            });

        };
        var displayOperatorButtons = function() {
            //some more code to display all of the operator buttons
            var $opCells = $('.operators');
            var operators = ['/', '*', '-', '+'];
            var i = 0;
            $opCells.each(function() {
                $(this).text(operators[i]);
                $(this).attr('val', operators[i]);

                $(this).click(function(e) {
                    var displayText = '';
                    var displayTextLast = '';
                    if ($('#screen').attr('value').length > 0) {
                        displayText = $('#screen').attr('value');
                        displayTextLast = displayText.slice(-1);
                    }

                    if (displayTextLast === '/' || displayTextLast === '*' ||
                        displayTextLast === '+' || displayTextLast === '-') {
                        // $('#screen').attr('value', displayText.slice(0, -1));
                        $('#screen').attr('value', displayText.slice(0, -1));

                    }
                    $('#screen').attr('value', $('#screen').attr('value') + $(this).attr('val'));
                });
                i++;
            });
        };


        var displayOtherButtons = function() {
            //even more code to display various other buttons

            var $clear = $('.clear');
            $clear.on('click', function(e) {
              console.log("Clear successful");
                $('#screen').attr('value', '0');
            });

            var $sum = $('#sum');
            $sum.text('=');
            $sum.click(function(e) {
                var characters = $('#screen').attr('value').split("");
                var operators = [];
                var operands = [];
                var sum = 0;
                if (isNaN(parseFloat(characters[0]))) {
                    $('#screen').attr('value', 'Error');
                    return;
                }
                var operand = '';
                for (var i = 0; i < characters.length; i++) {
                    if (characters[i] !== '/' && characters[i] !== '*' &&
                        characters[i] !== '-' && characters[i] !== '+') {
                        operand = (characters[i]);
                    } else {
                        operands.push(operand);
                        operand = '';
                        operators.push(characters[i]);
                    }
                }
                operands.push(operand);




                var multiply = function(num1, num2){
                  var total = num1 * num2;
                  console.log(total);
                  $('#screen').attr('value', total);
                };

                var divide = function(num1, num2){
                  var total = num1 / num2;
                  console.log(total);
                  $('#screen').attr('value', total);
                };

                var add = function(num1, num2){
                  var total = parseInt(num1) + parseInt(num2);
                  console.log(total);
                  $('#screen').attr('value', total);
                };

                var subtract = function(num1, num2){
                  var total = num1 - num2;
                  console.log(total);
                  $('#screen').attr('value', total);
                };


                // for (i = 0; i < operands.length; i++) {
                if (operands[1]) {
                    // var op1 = ?
                    if (operators[0] === '/') {
                        sum = divide(operands[0], operands[1]);
                    }
                      else if (operators[0] === '*') {
                        sum = multiply(operands[0], operands[1]);
                    }
                      else if (operators[0] === '-') {
                        sum = subtract(operands[0], operands[1]);
                    }
                      else if (operators[0] === '+') {
                        sum = add(operands[0], operands[1]);
                    }
                }
                // }
                $('#screen').attr('value', sum);
                console.log('Sum successful');

            });
        };

    };
