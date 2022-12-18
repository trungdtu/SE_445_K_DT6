function hoVaTenRule(value){
    return new Promise((resolve, reject)=>{
        if(typeof value === 'string') {
            return resolve(value);
        }
        else return reject({
            table: 'KhachHang',
            col: 'Ten',
            message:  'Wrong format must be string'
        })
    })
}
function sdtRule(value){
    var phonenumber = /^\d{10}$/;
    return new Promise((resolve,reject)=>{
        if(typeof value == 'string' && value.match(phonenumber) ) {
            return resolve(value);
        }
        else reject({
            table: 'KhachHang',
            col: 'Sdt',
            message:  'Wrong format must be string and must be 10 number'
        });
    })
}
function cmndRule(value){
    var cmnd = /^\d{12}$/;
    return new Promise((resolve,reject)=>{
        if(typeof value == 'string' && value.match(cmnd) ) {
            return resolve(value);
        }
        else reject({
            table: 'KhachHang',
            col: 'Cmnd',
            message:  'Wrong format must be string and must be 12 number'
        });
    })
}
function diachiRule(value){
    return new Promise((resolve,reject)=>{
        if(value == 'string') {
            return resolve(value);
        }
        else return reject({
            table: 'KhachHang',
            col: 'Diachi',
            message:  'Wrong format must be String'
        })
    })
}
function ngaysinhRule(value){
    var dateFormat = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/
    return new Promise((resolve,reject)=>{
        if(value.match(dateFormat)) {
            return resolve(true);
        }
        else return reject({
            table: 'KhachHang',
            col: 'NgaySinh',
            message:  'Wrong format must be Date'
        })
    })
}
async function testRule() {
    try {
        const data = await ngaysinhRule('31/11/2000')
        console.log(data);
    } catch (e) {
        console.log(e)
    }
}
class RuleKhachHang{
        async checkRule(data){
            try{
            return {
                ...data,
                HoVaTen: await hoRule(data.HoVaTen),
                NgaySinh: await ngaysinhRule(data.NgaySinh),
                DiaChi: await diachiRule(data.DiaChi),
                SoDienThoai: await sdtRule(data.SoDienThoai),
                CMND: await cmndRule(data.CMND)
            }
        }
        catch (err){
            console.log(err);
            return null;
        }
    }
}
module.exports = new RuleKhachHang();
