const mongoose=require('mongoose');
const gameSchema=new mongoose.Schema({
    gamename:
    {
        type:String,
        required:true
    },
    gameimgurl:
    {
        type:String,
        required:true
    },
    gamelink:
    {
        type:String,
        required:true
    },
    gamecat:
    {
        type:String,
        required:true
    }
});
const Game=mongoose.model('Game',gameSchema);
module.exports=Game;