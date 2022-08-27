function check() {
   const form = document.querySelector<HTMLSelectElement>('.select__item');
   if (form) {
      form.addEventListener('change', () => console.log(form.value) )
   }
   
}
export default check;