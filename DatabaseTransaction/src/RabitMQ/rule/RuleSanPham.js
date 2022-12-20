function checkNumberInString(value){
    var format = /^[0-9]+$/;
    for( i=0; i<value.length;i++){
        if(!value.match(format)) return false;
    }
    return true;
}
function checkStringInString(value){
    var format = /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/u;
    for( i=0; i<value.length;i++){
        if(!value.match(format)) return false;
    }
    return true;
}
function checkSpecialChar(value){
    var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if( value.match(format) ){
        return true;
    }else{
        return false;
    }
}
function isExistSpecialCharInString(value){
    for(var i=0; i<value.length;i++){
        if(checkSpecialChar(value[i])) return true;
    }
    return false;
}

const listAbbreviationName = [
    {
        key: "lap",
        value: "Laptop"
    },
    {
        key: "pc",
        value: "Máy tính bàn"
    },
    {
        key: "ip 6",
        value: "Iphone 6"
    },
    {
        key: "ip 7",
        value: "Iphone 7"
    },
    {
        key: "ip 8",
        value: "Iphone 8"
    },
    {
        key: "ip 9",
        value: "Iphone 9"
    },
    {
        key: "ip 10",
        value: "Iphone 10"
    },
    {
        key: "ip 11",
        value: "Iphone 11"
    },
    {
        key: "ip 12",
        value: "Iphone 12"
    },
    {
        key: "ip 13",
        value: "Iphone 13"
    },
    {
        key: "mac",
        value: "Macbook"
    },
    {
        key: "xm",
        value: "Xe Máy"
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
function minMaxOfName(value){
    if(value.length<2 || value.length>50) return false;
    else return true;
}
async function nameProductRule(value){
    return new Promise(async(resolve, reject)=>{
        if(value == '' || !value){
            reject({
                table: 'SanPham',
                col: 'TenHang',
                message: 'TenHang cant be blank'
            });
        }
        else if(!checkStringInString ||isExistSpecialCharInString(value)){
            reject(
                {
                    table: 'SanPham',
                    col: 'TenHang',
                    message: 'TenHang cant exist special char'
                });
        }
        else if(!minMaxOfName(value)) 
            reject({
                table: 'SanPham',
                col: 'TenHang',
                message: 'TenHang must be between 2 and 50 characters'
            });
        else {
            resolve(await abbreviationName(value));
        }
    })
}
async function priceProductRule(value){
    return new Promise((resolve,reject)=>{
        if(!checkNumberInString(value) || !value) {
            reject({ 
                table: 'SanPham',
                col: 'GiaTri',
                message: 'GiaTri cant exist char or special char'
            })
        }
        else if(value == '')
            reject({ 
                table: 'SanPham',
                col: 'GiaTri',
                message: 'GiaTri cant be blank'
                });
        else if(value<1000) 
            reject({
                table: 'SanPham',
                col: 'GiaTri',
                message: 'GiaTri must greater than 1000'
            });
        else resolve(parseInt(value)); 
    })
}

class RuleSanPham{
    async checkRule(data){
        try{
            const returnData = {
                ...data,
                SanPham: await nameProductRule(data.SanPham),
                GiaTri: await priceProductRule(data.GiaTri)
            }
            return returnData;
        }
        catch (err){
            console.log(err)
            return null;
        }
    }
}
module.exports = new RuleSanPham();

