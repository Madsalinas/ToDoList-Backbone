/**
 * Created by Administrator on 07/04/2015.
 */
(function ($){

    Backbone.sync = function(method, model, success, error){
        success();
    }


    var Item = Backbone.Model.extend({
        defaults: {
            name: '',
            changeIt: 'suspend'

        }
    });

    var ItemView = Backbone.View.extend({
        tagName: 'li', // name of (orphan) root tag in this.el

        events: {
            'click span.suspend': 'suspend',
            'click input.done': 'done',
            'click button.closeX': 'remove'

        },


        initialize: function(){
            _.bindAll(this, 'render', 'unrender', 'done', 'suspend', 'remove');// every function that uses 'this' as the current object should be in here

            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);
        },

        render:function(){
            var date = new Date();
            var idAN= "" + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
            var unicid = parseInt(idAN).toString(36);

            $(this.el).html(
                '<input type="checkbox" class="done" id="cb'+unicid+'+">'+
                '<span id="taskname">'+this.model.get('name')+
                '</span> &nbsp; &nbsp;  <button class="closeX">X</button> <span class="suspend">['+ this.model.get('changeIt')+ ']</span>');
            return this;  // for chainable calls, like .render().el
        },

        unrender: function(){
            $(this.el).remove();

        },

        /*  suspend: function(){

         if(this.model.get('changeIt').value == "suspend") {
         var changed = {
         changeIt: 'resume'};
         console.log('passing for suspended');
         $('#lista_S').append(this.el);

         }else{
         var change ={changeIt: 'suspend'};
         $('#lista').append(this.el);
         console.log(this.model.get('changeIt'));
         }

         this.model.set(change);

         }, */

        suspend: function(){
            if(this.model.get('changeIt') == "suspend") {
                var resuming = {

                    changeIt: "resume"

                };


                this.model.set(resuming);
                $('#lista_S').append(this.el);
                $(this.el).children( ".done" ).css( "display", "none");
                $(this.el).children( "#taskname" ).css({ "color": "gray","font-weight": "bold" });


            }else{
                var suspending = {

                    changeIt: "suspend"
                };


                this.model.set(suspending);
                $('#lista').append(this.el);

            }
        },

        done: function (){

            if($(this.el).parent().attr('id') == 'lista') {

                $(this.el).children(".closeX").css("display", "none");
                $(this.el).children( "#taskname" ).css({ "color": "green","textDecoration": "line-through" });
                $('#lista_C').append(this.el);
            }else {

                $(this.el).children(".closeX").css("display", "block");
                $('#lista').append(this.el);
            }



        },

        remove: function(){
            this.model.destroy();

        }

    });


    var List = Backbone.Collection.extend({
        model: Item
    });



    var ListView =Backbone.View.extend({
        el: $('body'), //attaches this.el to an exixting element

        events: {
            'keypress input': 'addItem'
        },

        initialize: function(){

            _.bindAll(this, 'render', 'addItem', 'appendItem'); // every function that uses 'this' as the current object should be in here

            this.collection = new List();
            this.collection.bind('add', this.appendItem); // collection event binder
            this.render();
        },

        render: function(){

            var self = this;

            _(this.collection.models).each(function(item){ // in case collection is not empty
                self.appendItem(item);
            }, this);
        },

        addItem: function(e){

            if (e.keyCode != 13) return;
            if (!$(e.currentTarget).val()) return;
            var named = $(e.currentTarget).val();
            var item = new Item();
            item.set({

                name: item.get('name') + named //modify item defaults

            });
            this.collection.add(item);// add item to collection; view is updated via event 'add'
        },

        appendItem: function(item){
            var itemView = new ItemView({
                model: item
            });
            $('#lista').append(itemView.render().el);
        }


    });

    var listView = new ListView();
})(jQuery);
