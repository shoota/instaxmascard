module.exports = {
    index:function(req, res){
        res.send('this is users');
    },
    show: function(req, res){
        res.send(req.params.user);
    },

    new: function(req, res){

        res.send(200);
    }
};