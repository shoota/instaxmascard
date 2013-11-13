var Cards = require('../model/factory').Cards;

module.exports={
    //カードの一覧を表示
   index: function(req, res){
       //ViewHelper
       var ejsObj={
           title:"最近つくられたカード"
       };

       // 12件のカードを取得する
       var images=Cards.findAny();
       ejsObj.cards = images;

       res.render('cardList', ejsObj);

   },

    //特定のカードを表示
    show:function(req, res){

        //ViewHelper
        var ejsObj ={
            title: "insta X'mas card"
        };
        // cardのid=user名を受け取る
        var cardId = req.params.card;
        // カードを取得
        card = cardModel.findOne(cardId);

        if(card) {
            ejsObj.message = "さんのつくったカードです";
            ejsObj.card=card;

            res.render('cardView', ejsObj);
        }else{
            res.send(404);

        }
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