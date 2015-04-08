/**
 * Created by Administrator on 27/03/2015.
 */

$(function () {
    var Rectangle = Backbone.Model.extend({});



    var RectangleView = Backbone.View.extend({



        tagName: 'div',
        className: 'rectangle',
        events: {
            'click': 'move'
        },

        render: function () {
            this.setDimensions();
            this.setPosition();
            this.setColor();
            return this;
        },

        setDimensions: function(){
            this.$el.css({

                width: this.model.get('width') + 'px',
                height: this.model.get('height') + 'px'
            });
        },

        setPosition: function(){
            var position = this.model.get('position');
            this.$el.css({
                left: position.x,
                top: position.y
            });
        },

        setColor: function () {
            this.$el.css('background-color', this.model.get('color'));
        },

        move: function () {

            this.$el.css('left', this.$el.position().left+ this.model.get('movingL'));
            this.$el.css('top', this.$el.position().top+ this.model.get('movingB'));
        }
    });
    var models = [
        new Rectangle({
            width: 120,
            height: 70,
            position: {
                x: 300,
                y: 100
            },
            color: '#ff0000',
            movingL: 10,
            movingB: 10
        }),
        new Rectangle({
            width: 100,
            height: 160,
            position: {
                x: 350,
                y: 150
            },
            color: '#00ff00',
            movingL: 30,
            movingB: 15
        }),
        new Rectangle({
            width: 140,
            height: 60,
            position: {
                x: 400,
                y: 250
            },
            color: '#0000ff',
            movingL: 50,
            movingB: 5
        })
    ];

    _(models).each(function (model) {
        $('div#canvas').append(new RectangleView({model: model}).render().el);
    });

})();
