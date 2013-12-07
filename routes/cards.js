var factory = require('../model/factory')
   ,Cards = factory.Card
   ,Sequence = factory.Sequence;

var MAX=12;

module.exports={

    /**
     * /xmascard/cards
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

    /**
     * /xmascard/show/:id
     * 特定のカードを表示
     * @param req
     * @param res
     */
    show:function(req, res){
        // cardのid
        var cardId = req.params.card;
        // カードを取得
        Cards.findOne({card_id:cardId}, function(err, doc){
            //ViewHelper
            var ejsObj ={};

            if(err) res.send(500);

            if(doc) {
                ejsObj = {
                    card:doc,
                    title: doc.user.username + "のクリスマスカード"
                };
                res.render('cardView', ejsObj);
            }else{
                res.send(404);
            }
        });

    },

    // カード生成(POST)
    create: function(req, res){

        if( !req.session.oauth ){
            res.send(500);
        } else {

            // request
            var postData = req.body;
            // session
            var auth = req.session.oauth;

            // POSTデータを取得、カードデータを作成
            Sequence.getCardNumber(function(err, doc){
                if(err) res.send(500);

                var createCard = new Cards({
                    card_id     : doc.seq,
                    user        : auth.user,
                    source      : postData
                });
                createCard.save(function(err){
                    if(err){
                        res.send(500);
                    }else{
                        res.send('cards/'+doc.seq);
                    }
                });
            });
        }
    }


};