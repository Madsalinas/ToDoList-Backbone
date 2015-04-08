/**
 * Created by Administrator on 18/03/2015.
 *
 * items must look like
 */
var Todo = Backbone.Model.extend({
    defaults: {
        completed: false
    },
    validate: function(attribs){
        if(attribs.title === undefined){
            return "Remember to set a title for your todo.";
        }
    },
    initialize: function(){
        console.log('This model has been initialized.');
        this.on("invalid", function(model, error){
            console.log(error);
        });
    }
});
var myTodo = new Todo();
myTodo.set('completed', true, {validate: true});
// logs: Remember to set a title for your todo.
console.log('completed: ' + myTodo.get('completed')); // completed: false

var TodoView = Backbone.View.extend({
    tagName: 'li',
    // Cache the template function for a single item.
    todoTpl: _.template( "An example template" ),
    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },
    // Rerender the titles of the todo item.
    render: function() {
        this.$el.html( this.todoTpl( this.model.toJSON() ) );
        this.input = this.$('.edit');
        return this;
    },
    edit: function() {
        // executed when todo label is double-clicked
    },
    close: function() {
        // executed when todo loses focus
    },
    updateOnEnter: function( e ) {
        // executed on each keypress when in todo edit mode,
        // but we'll wait for enter to get in action
    }
});
var todoView = new TodoView();
// log reference to a DOM element that corresponds to the view instance
console.log(todoView.el); // logs <li></li>
