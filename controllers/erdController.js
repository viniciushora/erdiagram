const erdView = (req, res) => {
    res.render("erd2", {
    } );
}

const erdView2 = (req, res) => {
    res.render("erd", {
    } );
}

module.exports =  {
    erdView,
    erdView2
};