function checkNumberInString(value){
    var format = /^[0-9]+$/;
    for( i=0; i<value.length;i++){
        if(!value.match(format)) return false;
    }
    return true;
}
function checkStringInString(value){
    var format = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/u;
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
    for( i=0; i<value.length;i++){
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
function nameProductRule(value){
    return new Promise(async(resolve, reject)=>{
        if(value == ''){
            reject({
                table: 'SanPham',
                col: 'TenHang',
                message: 'TenHang cant be blank'
            });
        }
        else if(!checkStringInString(value) || isExistSpecialCharInString(value)){
            reject(
                {
                    table: 'SanPham',
                    col: 'TenHang',
                    message: 'TenHang cant exist number or special char'
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
function priceProductRule(value){
    return new Promise((resolve,reject)=>{
        if(!checkNumberInString(value)) {
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

function noteProductRule(value){
    return new Promise((resolve, reject)=>{
        if(typeof value === 'string') {
            resolve(value);
        }
        else reject({
            table: 'SanPham',
            col: 'Note',
            message: 'Wrong format for Note, Note must be a String'
        })
    })
}
async function checkRule(data){
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
async function run() {
    const data = {
        TenHang: 'Tuấn cùi',
        GiaTri: '1000',
        Note: ''
    }
    console.log(await checkRule(data));
}
run();
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

