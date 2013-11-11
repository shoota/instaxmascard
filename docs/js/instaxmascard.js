
$(function() {

    var onsccess=function(res, status, xhr){
        var data = res.data;
        var next = res.pagination.next_url;
        data.forEach(function(media){
            if(media.type == "image"){
                var src = media.images.low_resolution.url;
                var ele = '<img src="'+src+'" class="media" >';
                $('#photo-select').append(ele);
            }
        });
        $('body').append(next);

    };

    $.ajax({
        type:"GET",
        url: 'https://api.instagram.com/v1/users/'+window.app.oauth.user.id+'/media/recent',
        data: {
            access_token: window.app.oauth.access_token
        },
        dataType:'jsonp',
        success: onsccess,
        error: function(){
            // todo error
        }
    });


//    var requestInstaImage = function(max_id){
//        var qs = {
//            access_token: window.app.oauth.access_token ,
//            max_id: max_id,
//            user_id: window.app.oauth.user.id
//        };
//        $.ajax({
//            type:"GET",
//            url: "http://anaguma.org/xmascard/photos",
//            data: qs,
//            dataType:'json',
//            success: function(res, status, xhr){
//                console.log(res);
//                if(res.pagination.next_max_id) requestInstaImage(res.pagination.next_max_id);
//            },
//            error: function(){
//                // todo error
//            }
//        });
//
//    };
//    // onload process
//    requestInstaImage();
});