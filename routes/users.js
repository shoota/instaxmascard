

module.exports = {

    /**
     *　ログイン情報を表示
     * @param req
     * @param res
     */
    index: function(req, res){

        if(req.session.oauth){
            res.render('userInfo', {});
        } else {
            res.render('userInfo');
        }
    },


    show: function(req, res){
        // ユーザ情報からカードを検索
    }
};