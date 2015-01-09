    /**
     * Created with JetBrains WebStorm.
     * User: Heather
     * Date: 11/25/14
     * Time: 3:10 PM
     * To change this template use File | Settings | File Templates.
     */

 function createMenu()
 {

    var menu_div = document.createElement("div");
    menu_div.className = "menu_wrapper";
    var menu_box_div = document.createElement("div");
    menu_box_div.className = "menu_box";
    var radio_div = document.createElement("div");
    radio_div.className = "radio_wrapper";

    var arrayRadioButtons = ["Random", "Sphere", "Cube", "Grid", "Helix"];

    for ( var i in arrayRadioButtons) {

        var choiceSelection = document.createElement('input');
        choiceSelection.className = "button_choices";
        choiceSelection.setAttribute('id', 'button'+ i);
        choiceSelection.setAttribute('type', 'button');
        choiceSelection.setAttribute('name','button' + arrayRadioButtons[i]);
        choiceSelection.setAttribute('value', arrayRadioButtons[i]);
        radio_div.appendChild(choiceSelection );
    }

    menu_box_div.innerHTML ='<h4 class="title">Sphere Display</h4><h4 class="number_title">Number of Spheres</h4><input onclick="myFunction()" type="text" id="number_set_field"><button onclick="" id="number_button">Set Value</button><h4 class="number_title">Patterns</h4>';

    menu_box_div.appendChild(radio_div);

    menu_div.appendChild(menu_box_div);

    document.body.appendChild( menu_div );

    document.body.appendChild( renderer.domElement );
 }

    function myFunction()
    {
        document.getElementById("number_set_field").focus();
    }
