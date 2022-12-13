

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


//đổi tên viết tắt thành viết thường
async function abbreviationName(name){
    for await(var item of listAbbreviationName){
        if(item.key==name.toLowerCase()){
            return item.value;
        }
    }
    return name;
}

// Rule TenHang
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


//Rule GiaTri
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

//-----------------------------------------------------------------
            //Check TenHang

            //  nameProductRule(data.TenHang)
            // .then((value)=>{
            //     console.log(value);
            //     console.log(data.TenHang);
            // })
            // .catch((err)=>{
            //     console.log(err);
            // })


            //Check GiaTri

            // valueProductRule(data.GiaTri)
            // .then((value)=>{
            //     console.log(value);
            //     console.log(data.GiaTri);
            // })
            // .catch((err)=>{
            //     console.log(err);
            // })

            
            // Check Note

            // noteProductRule(data.Note)
            // .then((value)=>{
            //     console.log(value);
            //     console.log(data.Note);
            // })
            // .catch((err)=>{
            //     console.log(err);
            // })

//-----------------------------------------------------------------
async function checkRule(data) {
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
async function main(){
    const data={
        MaSanPham: 0,
        TenHang: "lap",
        GiaTri: "10",
        Note: 'Laptop hãng Asus',
        MaPhieu: 0
    }
    if(await checkRule(data)){
        console.log(await checkRule(data));
    }
}
main();



// var d = "abc";
// if(Number.isInteger(d)) console.log("la so");
// else console.log("kp so");