function minMaxOfName(value){
    if(value.length<2 || value.length>100) return false;
    else return true;
}

function isExistSpecialCharInString(value){
    for( i=0; i<value.length;i++){
        if(checkSpecialChar(value[i])) return true;
    }
    return false;
}

function checkSpecialChar(value){
    var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if( value.match(format) ){
        return true;
    }else{
        return false;
    }
}

function checkStringInString(value){
    var format = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
    for( i=0; i<value.length;i++){
        if(!value.match(format) ) return false;
    }
    return true;
}


function nameRule(value){
    return new Promise(async(resolve, reject)=>{
        if( value=='' ){
            reject('Ten cant be blank');
        }
        if(!checkStringInString(value) || isExistSpecialCharInString(value) ){
            reject({
                table: 'KhachHang',
                col: 'DiaChi',
                message: 'Ten cant exist number or special char'
            });
        }
        else if(!minMaxOfName(value)) reject(
            {
                table: 'KhachHang',
                col: 'DiaChi',
                message: 'Ten must be between 2 and 50 characters'
            });
        else {
            resolve(value);
        }
    })
}

function ngaysinhRule(value){
    var dateFormat = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
    return new Promise((resolve,reject)=>{
        if(value.match(dateFormat)) {
            return resolve(value);
        }
        else return reject({
            table: 'KhachHang',
            col: 'NgaySinh',
            message:  'Wrong format date'
        })
    })
}

function sdtRule(value){
    var phonenumber = /^\d{10}$/;
    return new Promise((resolve,reject)=>{
        if(value.match(phonenumber) ) {
            return resolve(value);
        }
        else reject({
            table: 'KhachHang',
            col: 'Sdt',
            message:  'Wrong format must be 10 number'
        });
    })

}

function cmndRule(value){
    var cmnd = /^(\d{9}|\d{12})$/;
    return new Promise((resolve,reject)=>{
        if(typeof value == 'string' && value.match(cmnd) ) {
            return resolve(value);
        }
        else reject({
            table: 'KhachHang',
            col: 'Cmnd',
            message:  'Wrong format must be string and must be 9- 12 number'
        });
    })
}

function diachiRule(value){
    return new Promise((resolve,reject)=>{
        if(!minMaxOfName(value))  reject(
            {
                table: 'KhachHang',
                col: 'DiaChi',
                message:  'Diachi must be between 2 and 100 characters'
            });
        else return resolve(value)
    })
}

class RuleKhachHang{
    async checkRule(data) {
        try {
            const returnData = {
                HoVaTen: await nameRule(data.HoVaTen),
                NgaySinh: await ngaysinhRule(data.NgaySinh),
                DiaChi: await diachiRule(data.DiaChi),
                SoDienThoai: await sdtRule(data.SoDienThoai),
                CMND: await cmndRule(data.CMND),
            }
            return returnData;
        } catch (err) {
            console.log(err)
            return null;
        }
    }
}
module.exports = new RuleKhachHang();