/**
 * Created by Administrator on 18/03/2015.
 *
 * items must look like
 */


function hideli () {
    if(this.status == "toDo"){

    var spanId = this.id.replace("cb_", "");
    var toDone = document.getElementById("li_" + spanId);
    document.getElementById("cb_" + spanId).checked = true;
    document.getElementById("lista_C").appendChild(toDone);

    this.status = "Done";
    console.log(toDone + " hide to done -- status "+this.status);

    }else {
        var spanId = this.id.replace("cb_", "");
        var toDone = document.getElementById("li_" + spanId);
        document.getElementById("lista").appendChild(toDone);

        this.status = "toDo";
        console.log(toDone + " hide to toDo -- status "+this.status);
    }

}

function unTrack () {
  var spanId = this.id.replace("btn_", "");

  document.getElementById("li_" + spanId).style.display = "none";
}


function changeStatus () {
if(this.status != "cancelled"){
    var spanId = this.id.replace("span_", "");
    var toDone = document.getElementById("li_" + spanId);
    document.getElementById("cb_" + spanId).checked = false;
    document.getElementById("cb_" + spanId).style.display = "none";
    document.getElementById("lista_S").appendChild(toDone);
    this.style.textDecoration = "line-through";

    this.status = "cancelled";

    console.log(toDone + " change to cancel -- status "+this.status);
    }else {
    var spanId = this.id.replace("span_", "");
    var toDone = document.getElementById("li_" + spanId);
    document.getElementById("cb_" + spanId).status = "toDo";
    document.getElementById("cb_" + spanId).style.display = "inline";
    document.getElementById("lista").appendChild(toDone);

    this.style.textDecoration = "none";
    this.status = "toDo";

    console.log(toDone + " change to toDo -- status "+this.status);
    }

}



function addItem(Item, itemText) {
    var date = new Date();
    var unicid= "";
    var idAN = 0;
    unicid = "" + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

    idAN = parseInt(unicid);

    unicid = idAN.toString(36);


    var listItem = document.createElement("li");
    listItem.id = "li_" + unicid;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.status = "toDo";
    checkbox.id = "cb_" + unicid;
    checkbox.onclick =  hideli;


    var span = document.createElement("span");
    span.id = "span_" + unicid;
    span.innerText =  itemText;
    span.status = "toDo";
    span.onclick =  changeStatus;

    var cross = document.createElement("button");
    cross.id = "btn_" + unicid;
    cross.style.color = "red";
    cross.style.float = "right";
    cross.innerText =  "X";
    cross.onclick =  unTrack;

    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(cross);
    Item.appendChild(listItem);

};

var inItemText = document.getElementById("inItemText");
inItemText.focus();


inItemText.onkeyup = adding;

    function adding(e) {
        //e.which (13) -> ENTER
if(e.which == 13) {

    var itemText = inItemText.value;
    if (!itemText || itemText == " ") {
        return false;
    }
    addItem(document.getElementById("lista"), itemText);
    inItemText.select();
}
};
