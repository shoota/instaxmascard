

// FIXME stab.
module.exports.cardModel = {

    findAny: function(){
        cards = [];
        //FiXME mongoDBからデータ取得

        for(var i=0; i<12 ; i++){
            cards[i] = {
                imgsrc:"/content/img/sample.jpg",
                author:"sample"+ i.toString(),
                date: "2013/12/01",
                igsrc:"hogehgoe"
            }
        }
        return cards;
    },

    findOne: function(id) {

        if(!id) return undefined;

        return {
            imgsrc:"/img/sample.jpg",
            author:"sample",
            date: "2013/12/01",
            igsrc:"hogehgoe"
        }
    }
};




