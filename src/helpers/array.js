
const remove = (arr, value) => {           
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

const exist = (arr, value) => {
    let result = false;
    for(let i = 0; i < arr.length; i++) {
      if (arr[i] == value) return result = true;
    }
    return result;   
}

export default {
    remove,
    exist,
}