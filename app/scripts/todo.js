/**
 * Created by Administrator on 18/03/2015.
 *
 * items must look like
 */


function hideli () {
  var spanId = this.id.replace("cb_", "");
  var toDone = document.getElementById("li_" + spanId);

    if(this.status == "toDo"){
    document.getElementById("lista_C").appendChild(toDone);

    this.status = "Done";

    }else {
        document.getElementById("lista").appendChild(toDone);

        this.status = "toDo";

    }

}

function unTrack () {
  var spanId = this.id.replace("btn_", "");
  document.getElementById("li_" + spanId).style.display = "none";
}


function changeStatus () {
  var spanId = this.id.replace("span_", "");
  var toDone = document.getElementById("li_" + spanId);
  var daCb = document.getElementById("cb_" + spanId);

if(this.status != "cancelled"){

    daCb.checked = false;
    daCb.style.display = "none";
    document.getElementById("lista_S").appendChild(toDone);

    this.style.textDecoration = "line-through";
    this.status = "cancelled";

    }else {

    daCb.status = "toDo";
    daCb.style.display = "inline";
    document.getElementById("lista").appendChild(toDone);

    this.style.textDecoration = "none";
    this.status = "toDo";

    }

}



function addItem(Item, itemText) {
    var date = new Date();
    var idAN= "" + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
    var unicid = parseInt(idAN).toString(36);

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
    cross.className = "closeX";
    cross.innerText =  "X";
    cross.onclick =  unTrack;

    listItem.appendChild(checkbox);
    listItem.appendChild(span);
    listItem.appendChild(cross);
    Item.appendChild(listItem);

};

