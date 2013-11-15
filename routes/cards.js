var Cards = require('../model/factory').Cards;

var MAX=12;

module.exports={

    /**
     * /app_root/cards
     * @param req
     * @param res
     */
    index: function(req, res){
        //ViewHelper
        var ejsObj={
            title:"最近つくられたカード"
        };

        // 12件のカードを取得する
        Cards.find({},null,{limit: MAX}, function(images){
            ejsObj.cards = images;
            res.render('cardList', ejsObj);
        });

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
        card = Cards.findOne({card_id:cardId}, function(err, doc){
            if(err) res.send(500);

            if(card) {
                ejsObj.card=doc;
                res.render('cardView', ejsObj);
            }else{
                res.send(404);
            }
        });

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

        //MongoDBに登録




        res.render('cardComp', ejsObj);

    }
};