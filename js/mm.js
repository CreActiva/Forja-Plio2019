// Activar contador
var contador = new CountDown('#clock', 'Aug 11 2020 15:00:00 GMT-0400', '¡Comenzamos!', true);
// ================
// Carousel
var carouselHTML = document.querySelector('.carousel');
var boolControl = true;
var boolIndicator = true;
var numSlideItem = [1, 1, 1, 2, 2];
var breakPoint = [0, 576, 768, 992, 1200];
var boolNumIndicator = false;
var carousel = new Carousel(carouselHTML, boolControl, boolIndicator, numSlideItem, breakPoint, boolNumIndicator);

carouselHTML = document.querySelector('.carousel--participantes');
// var carousel = new Carousel(carouselHTML, boolControl, boolIndicator, numSlideItem, breakPoint, boolNumIndicator);
// ========
var input = document.querySelector("#master-input-3");
var iti = window.intlTelInput(input, {
  initialCountry: 've',
  nationalMode: false,
  utilsScript: './vendors/intl-tel-input/js/utils.js',
  preferredCountries: ['ve', 'us'],
  preventInvalidDialCodes: true,
  customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
    selectedCountryPlaceholder = selectedCountryPlaceholder.replace(/ |-|(|)/g, '');
    return selectedCountryPlaceholder;
  },
  // separateDialCode: true
});
// Verificar y luego realizar envio en formulario
var form = document.forms['FormularioMasterMind'];
form.addEventListener('submit', e => {
  e.preventDefault();
  input.value = input.value.replace(/ |-|(|)/g, '');
  form.submit();
});
// =============================================
// Validación de campo numérico
var errorMap = ["Número no valido", "Código de país no valido", "Número muy corto", "Número muy largo", "Número no valido"];
var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("d-none");
  validMsg.classList.add("d-none");
};
var validMsg = document.querySelector("#valid-msg");
var errorMsg = document.querySelector("#error-msg");
var inputSubmit = document.querySelector("#inputSubmit");
input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.classList.remove("d-none");
      inputSubmit.disabled = false;
    } else {
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("d-none");
      inputSubmit.disabled = true;
    }
  }
});
// ============================

// Escucha formulario numérico no mayor a 30 caracteres
var input = form.elements[2];
input.addEventListener('input', function() {
  if (this.value.length > 30) this.value = this.value.slice(0, 30);
  // Verifica el primer caracter
  // if(!(/^\+/.test(this.value)) && (this.value.length <= 1)) this.value = this.value.slice(0,(this.value.length - 1));
  if (this.value.length <= 1) this.value = "+";
  // Verifica el segundo caracter
  if (!(/^\+(\d*$)/.test(this.value)) && (this.value.length > 1)) this.value = this.value.slice(0, (this.value.length - 1));
});
// ====================================================