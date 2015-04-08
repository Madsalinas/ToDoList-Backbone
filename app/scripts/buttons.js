/**
 * Created by Administrator on 06/04/2015.
 */
var MyView = Backbone.View.extend({
    el: '#view-container',
    events: {
        "click #the-button" : "buttonClicked"
    },
    buttonClicked: function() {
        toastr.info("You clicked the button");
        alert("clicked");
    }
});

var myView = new MyView();
