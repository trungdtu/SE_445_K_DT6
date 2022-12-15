function mkhRule(value){
    return new Promise((resolve, reject)=>{
        if(typeof value === 'string') {
            return resolve(true);
        }
        else return reject({
            table: 'KhachHang',
            col: 'MaKhachHang',
            message: 'Wrong format must be string'
        })
    })
}

function nameHo(value){
    return new Promise((resolve, reject)=>{
        if(typeof value === 'string') {
            return resolve(true);
        }
        else return reject({
            table: 'KhachHang',
            col: 'Ho',
            message:  'Wrong format must be string'
        })
    })
}

function nameTen(value){
    return new Promise((resolve, reject)=>{
        if(typeof value === 'string') {
            return resolve(true);
        }
        else return reject({
            table: 'KhachHang',
            col: 'Ten',
            message:  'Wrong format must be string'
        })
    })
}

function ngaysinhRule(value){
    return new Promise((resolve,reject)=>{
        if(typeof value === 'string') {
            return resolve(true);
        }
        else return reject({
            table: 'KhachHang',
            col: 'NgaySinh',
            message:  'Wrong format must be string'
        })
    })
}

function sdtRule(value){
    return new Promise((resolve,reject)=>{
        if(Number.isInteger(value)) {
            return resolve(value);
        }
        else reject('Wrong format for SDT must be an Integer');
    })
}

function cmndRule(value){
    return new Promise((resolve,reject)=>{
        if(Number.isInteger(value)) {
            return resolve(value);
        }
        else reject('Wrong format for CMND must be an Integer');
    })
}

function diachiRule(value){
    return new Promise((resolve,reject)=>{
        if(typeof value === 'string') {
            return resolve(true);
        }
        else return reject({
            table: 'KhachHang',
            col: 'DiaChi',
            message:  'Wrong format must be string'
        })
    })
}


class RuleKhachHang{
    async checkRule(data){
        try{
            return {
                ...data,
                Sdt: await nameProductRule(data.Sdt),
                DiaChi: await priceProductRule(data.DiaChi)
            }
        }
        catch (err){
            console.log(err);
            return null;
        }
    }
    
}
module.exports = new RuleKhachHang();
