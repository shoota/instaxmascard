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
        card = Cards.findOne({card_id:cardId}, function(err, doc){
            //ViewHelper
            var ejsObj ={};

            if(err) res.send(500);

            if(card) {
                ejsObj = {
                    card:doc,
                    title: doc.user_name + "のクリスマスカード"
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

            //仕様する画像
            var image = postData.image;

            // POSTデータを取得、カードデータを作成
            var registerCardData = function(filePath){
                Sequence.getCardNumber(function(err, doc){
                    var createCard = new Cards({
                        card_id     : doc.seq,
                        user_name   : auth.user.username,
                        source      : postData,
                        file_path   : filePath
                    });
                    createCard.save(function(err){
                        if(err){
                            res.send(500);
                        }else{
                            var ejsObj={
                                title:"クリスマスカード完成",
                                card_img: filePath
                            };
                            res.render('cardComp', ejsObj);
                        }
                    });
                });
            };


            // 画像生成ロジックを起動
            // imageCreate(postData, registerCardData);

        }
    }


};