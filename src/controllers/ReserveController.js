import House from "../models/House";
import Reserve from "../models/Reserve";

class ReserveController{

    async getAll(req, res){
        const {user_id} = req.headers;
        const reserves = await Reserve.find({user: user_id}).populate('house');
        return res.json(reserves);
    }

    async create(req, res){
        const {user_id} = req.headers;
        const {house_id} = req.params;
        const {date} = req.body;

        const house = await House.findById(house_id);
        if(!house){
            return res.status(400).json({error: "house not found"});
        }
        if(!house.status){
            return res.status(400).json({error: "house not available"});
        }
        //const user = await User.findById(user_id);
        if(String(house.user._id) === String(user_id)){
            return res.status(401).json({error: "user can't reserve your own house"});
        }

        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        });

        await reserve.populate('house');
        await reserve.populate('user');
            
        return res.json(reserve);
    }

    async delete(req, res){
        const {id} = req.body;
        await Reserve.findByIdAndDelete({_id: id});
        
        return res.send();
    }
}

export default new ReserveController();