

export interface Product {
    _id : string;
    name : string;
    code:string
    price : number;
    stockLevel : number;
    image : {
        asset : {
            _ref : string;
            _type : string;
        }
    }
    description : string;
    slug : {
        _type :"slug"
        current : string;
    }
}


