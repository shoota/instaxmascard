/*
 /xcard/Index
 */
exports.index = function(req, res){

    res.render('index', {
        title: 'instaxcard',
        message:'hello',
        authURI: '/xmascard/auth'
    });
};