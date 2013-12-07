var MediaModel = Backbone.Model.extend({
});

var MediaCollection = Backbone.Collection.extend({
    model: MediaModel
});

var MediaView = Backbone.View.extend({

    tagName: "li",

    template: _.template('<img src="<%= images.thumbnail.url %>" class="media" >'),

    events: {
        "click": "selected"
    },

    selected: function(){
        console.log(this.model);
        console.log(this.model.get('images'));
    },


    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var InstagramView = Backbone.View.extend({
    el: $("#photo-select"),
    events: {
        "click #more": "getMedia"
    },
    initialize: function(){
        this.listenTo(this.collection, 'add', this.render, this);
        this.getMediaUrl = 'https://api.instagram.com/v1/users/'+window.app.oauth.user.id+'/media/recent';

//        var dgEvents = {};
//        this.delegateEvents(dgEvents);
    },
    getMedia: function(){
        if(!this.getMediaUrl) alert('これ以上はみつかりません');
        // disable button

        //ajax
        var url = this.getMediaUrl;
        var callback = this.onMedia;
        $.ajax({
            context: this,
            type:"GET",
            url: url,
            data: {
                access_token: window.app.oauth.access_token
            },
            dataType:'jsonp',
            success: callback,
            error: function(){
                // todo error
            }
        });
    },
    onMedia: function(res, status, xhr){
        var data = res.data;
        this.collection.add(data);
        //set next_uri
        this.getMediaUrl = res.pagination.next_url;
    },

    render: function(mediaModel){
        var view = new MediaView({model: mediaModel});
        var html = view.render().el;
        this.$('#photo-list').append(html).css({display:'none'}).fadeIn('slow');
    }

});


$(function() {
    window.instagramView = new InstagramView({collection: new MediaCollection()});
    window.instagramView.getMedia();
});
