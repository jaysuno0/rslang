function timer() {
   let SECONDS = 60;
   const timer = document.getElementById('timer');
   if (timer) {
      const timerId = setInterval(() =>{
         SECONDS -= 1
         timer.innerHTML = (SECONDS).toString();
         if (SECONDS === 0) {
            clearInterval(timerId)
         }
      }, 1000)
   }
  
}

export default timer