function timer() {
  let SECONDS = 60;
  const timerContainer = document.getElementById('timer');
  if (timerContainer) {
    const timerId = setInterval(() => {
      SECONDS -= 1;
      timerContainer.innerHTML = (SECONDS).toString();
      if (SECONDS === 0) {
        clearInterval(timerId);
        console.log('end callback');
      }
    }, 1000);
  }
}

export default timer;
