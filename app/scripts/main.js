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
        tagName: 'li',

        events: {
            'click span.suspend': 'suspend',
            'click button.closeX': 'remove',
            'click input.done': 'done'
            //'click span#myName': 'changeName'

        },

        initialize: function(){
            _.bindAll(this, 'render', 'unrender', 'done', 'suspend', 'remove');
            this.model.bind('change', this.render);
            this.model.bind('remove', this.unrender);

        },

        render: function(){
                $(this.el).html('<input type="checkbox" class="done">' +
                                '<span class="myName">' + this.model.get('name') + '</span>' +
                                '<button class="closeX"> X </button> ' +
                                '<span class="suspend">' + this.model.get('changeIt') + '</span>' );
                return this;

        },


        unrender: function(){
            $(this.el).remove();

        },

        suspend: function(){
            if(this.model.get('changeIt') == 'suspend'){
                var resuming = { changeIt: "resume"};
                this.model.set(resuming);
                $('#lista_S').append(this.el);

            }else{
                var suspending = { changeIt: "suspend"};
                this.model.set(suspending);
                $('#lista').append(this.el);

            }

        },

        done: function(){
            if($(this.el).parent().attr('id') == 'lista'){

                $('#lista_C').append(this.el);

            }else{

                $('#lista').append(this.el);

            }

        },

        remove: function(){
            this.model.destroy();

        }

       /* changeName: function(e){
            newName = { name: $(e.currentTarget).val() }

            this.model.set(newName);

        }*/

    });


    var List = Backbone.Collection.extend({

        model: Item

    });

    var ListView = Backbone.View.extend ({
        el: $('body'),

        events: {
            'keypress input': 'addItem'

        },

        initialize: function(){
            _.bindAll(this, 'render', 'addItem', 'appendItem');

            this.collection = new List();
            this.collection.bind('add', this.appendItem);
            this.render();

        },

        render: function(){
            var self = this;
            _(this.collection.models).each(function(item){
                self.appendItem(item);
            }, this);

        },

        addItem: function(e){
            if(e.keyCode != 13) return;
            if(!$(e.currentTarget).val()) return;

            var named =  $(e.currentTarget).val();
            var item = new Item();

            item.set({name: item.get('name') + named});
            this.collection.add(item);

        },

        appendItem: function(item) {
            var itemView = new ItemView({
                model: item

            });
            $('#lista').append(itemView.render().el);

        }

    });

    var app = new ListView();

})(jQuery);
