function narcissistic(value) {
  // Code me to return true or false
  let myString="";
  let myArray=parseInt(myString)
  for(i=0;i<=length;i++){
    let newArr = myArray.map(function(x){
    return x*x;
    })
    let arr = newArr.reduce(function(a, b){return a + b});
    
    let string = arr.join()
     
    if(string === myString){
    return true}
    else{
    return false}
}
}
