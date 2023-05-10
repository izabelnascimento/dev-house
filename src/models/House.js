import {Schema, model} from "mongoose";

const HouseSchema = new Schema({
    //imagem
    thumbnail: String,
    description: String,
    price: String,
    location: String,
    status: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, 
//pedindo para retornar a variável virtual quando for requisitado
{
    toJSON:{
        virtuals: true
    }
});

//criando uma variável virtual que não será armazenada
HouseSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`;
})

export default model('House', HouseSchema);