var MediaModel = Backbone.Model.extend({
});

var MediaCollection = Backbone.Collection.extend({
    model: MediaModel
});

var MediaView = Backbone.View.extend({
    template: _.template('<img src="<%= images.thumbnail.url %>" class="media" >'),

    render: function(){
        return this.template(this.model.toJSON());
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

        this.delegateEvents({"click .media": "onImageClick"});
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
        console.log(res);
        var data = res.data;
        this.collection.add(data);
        //set next_uri
        this.getMediaUrl = res.pagination.next_url;
    },

    onImageClick: function(){
        // TODO handling user select
        alert(this.model.id);
    },
    render: function(mediaModel){
        var view = new MediaView({model: mediaModel});
        console.log(this.getMediaUrl);
        var html = view.render();
        console.log(view.el);
        $(this.el).append(html);
    }

});


$(function() {
    window.instagramView = new InstagramView({collection: new MediaCollection()});
    window.instagramView.getMedia();
});