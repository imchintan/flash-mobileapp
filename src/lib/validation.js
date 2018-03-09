let name=(n)=>{
    let data={result:true, message:''};
    let regEX = /^[a-zA-Z .]*$/;
    if(!n){
        return data={result:false,message:'Name is required!'};
    }

    if(n && !regEX.test(n)){
        return data={result:false,message:'Name contains only character!'};
    }
    return data;
}

let email=(e)=>{
    let data={result:true, message:''};
    let regEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if(!e){
        return data={result:false,message:'Email address is required!'};
    }

    if(!regEX.test(e)){
      return data={result:false,message:'Invalid email address!'};
    }
    return data;
}

let phone = (c) =>{
    let data={result:true, message:''};
    let regEX = /^[0-9+-]*$/;
    if( c && !regEX.test(c)){
      return data={result:false,message:'Contact number contains only number!'};
    }
    return data;
}


module.exports = {
    name,
    email,
    phone,
}
