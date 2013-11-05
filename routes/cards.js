module.exports={

    //カードの一覧を表示
   index: function(){
       //ViewHelper
       var ejsObj={
           title:""
       };

       // 12件のカードを取得する

       res.render('cardList', ejsObj);

   },

    //特定のカードを表示
    show:function(req, res){

        //ViewHelper
        var ejsObj ={};

        // cardのid=user名を受け取る
        var user = req.params.card;
        // 画像名を取得


        res.render('cardView', ejsObj);
    },

    // カード生成(POST)
    create: function(req, res){
        var ejsObj={
            title:""
        };
        // ViewHelper

        // POSTデータを取得

        // 画像生成ロジックを生成

        //画像を生成、画像名を受け取る


        res.render('cardComp', ejsObj);

    }

};