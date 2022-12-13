

const listAbbreviationName = [
    {
        key: "lap",
        value: "Laptop"
    },
    {
        key: "pc",
        value: "Máy tính bàn"
    }
];

async function abbreviationName(name){
    for await(var item of listAbbreviationName){
        if(item.key==name.toLowerCase()){
            return item.value;
        }
    }
    return name;
}

 function nameProductRule(value){
    return new Promise(async(resolve, reject)=>{
        if(typeof value === 'string') {
            resolve(await abbreviationName(value));
        }
        else {
            reject('Wrong format for TenHang, TenHang must be a String');
        }
    })
}



function priceProductRule(value){
    return new Promise((resolve,reject)=>{
        if(Number.isInteger(value)) {
            return resolve(value);
        }
        else reject('Wrong format for GiaTri, GiaTri must be an Integer');
    })
}

function noteProductRule(value){
    return new Promise((resolve, reject)=>{
        if(typeof value === 'string') {
            return resolve(true);
        }
        else return reject({
            table: 'SanPham',
            col: 'Note',
            message: 'Wrong format for Note, Note must be a String'
        })
    })
}

class RuleSanPham{
    async checkRule(data){
        try{
            return {
                ...data,
                TenHang: await nameProductRule(data.TenHang),
                GiaTri: await priceProductRule(data.GiaTri)
            }
        }
        catch (err){
            console.log(err);
            return null;
        }
    }
    
}
module.exports = new RuleSanPham();


