function getScore(arr) {
    let score = 0;
    
    arr.forEach(num => {
      if (num === 5) {
        score += 5;
      } else if (num % 2 === 0) {
        score += 1;
      } else {
        score += 3;
      }
    });
  
    return score;
  }

console.log(getScore([1, 2, 3, 4, 5])); 
console.log(getScore([17, 19, 21]));   
console.log(getScore([5, 5, 5])); 
