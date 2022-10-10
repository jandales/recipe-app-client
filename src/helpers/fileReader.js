const fileReaderAsync = async (file) => {
    
    const image =  new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload  = () => {            
          resolve(reader.result);        
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });



    return image;
}

export default {
    fileReaderAsync,
}