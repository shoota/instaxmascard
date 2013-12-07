IstxcApp = {};

IstxcApp.MediaModel = Backbone.Model.extend({
});

IstxcApp.MediaCollection = Backbone.Collection.extend({
    model: IstxcApp.MediaModel
});

IstxcApp.MediaView = Backbone.View.extend({

    tagName: "li",

    template: _.template('<img src="<%= images.thumbnail.url %>" class="media" >'),

    events: {
        "click": "selected"
    },

    selected: function(){
        IstxcApp.mediator.trigger('select', this.model);
    },


    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

IstxcApp.InstagramView = Backbone.View.extend({
    el: $("#board"),
    events: {
        "click #more": "getMedia",
        "click #create": "post"
    },

    initialize: function(){

        this.listenTo(this.collection, 'add', this.render, this);
        this.getMediaUrl = 'https://api.instagram.com/v1/users/'+window.app.oauth.user.id+'/media/recent';
        // global events
        IstxcApp.mediator = {};
        _.extend(IstxcApp.mediator, Backbone.Events);
        IstxcApp.mediator.on('select', this.selectImage, this);
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
        var view = new IstxcApp.MediaView({model: mediaModel});
        var html = view.render().el;
        this.$('#photo-list').append(html).css({display:'none'}).fadeIn('slow');
    },

    selectImage: function(model) {
        this.media = model;
    },

    post: function(){
        if(!this.media){
            alert('写真を選択してください');
            return;
        }

        var source = {};
        source.images = this.media.get('images');

        if(confirm('これでつくりますか？')){
            var form={};
            form.images = this.media.get('images');
            $.ajax({
                type: 'post',
                url: '/xmascard/cards/',
                async:false,
                data: form,
                success: function(location){
                    console.log('success: '+ location);
//                    location.href =
                }
            });

        }
    }

});


$(function() {
    var instagramView = new IstxcApp.InstagramView({collection: new IstxcApp.MediaCollection()});
    instagramView.getMedia();
});
