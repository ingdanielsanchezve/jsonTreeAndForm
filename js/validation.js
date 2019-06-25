let validations = {
  required: function(value){
    return value !== '';
  },
  numeric: function(value){
    return value.match(/^\d+$/);
  },
  alphanumeric: function(value){
    return value.match(/^[a-z0-9\s]+$/i);
  },
  alpha: function(value){
    return value.match(/^[a-zA-Z\s]+$/);
  },
  min: function(value, length){
    return value.length >= length
  },
  max: function(value, length){
    return value.length <= length
  }
}

const messages = {
    'required': 'field is required',
    'numeric': 'field must be numeric',
    'alphanumeric': 'field must be Alphanumeric',
    'alpha': 'field must be Alphabetic',
    'min': 'field is shorter than min length allowed',
    'max': 'field is larger than max length allowed',
    'success': "Thanks, You're signed up!!!"
}


function validateForm() {
  let form = document.getElementById('userForm');
  let formElem = form.querySelectorAll('input');
  let errorMsgDiv = document.querySelector(".error.message");
  let successMsgDiv = document.querySelector(".success.message");
  
    let i = 0;
    while (i < formElem.length) {

      let attr = formElem[i].getAttribute('data-validation');
      let rules = attr ? attr.split(' ') : '';
      let parent = formElem[i].closest(".field");
      let j = 0;

      while (j < rules.length) {
        if(!validations[rules[j]](formElem[i].value) && 
            ((rules[j] == 'min') ? !validations[rules[j]](formElem[i].value, formElem[i].getAttribute('data-minlength')) : true) &&
            ((rules[j] == 'max') ? !validations[rules[j]](formElem[i].value, formElem[i].getAttribute('data-maxlength')) : true)
        ){   
          errorMsgDiv.className = "error message";
          errorMsgDiv.innerHTML =  formElem[i].name+' '+ messages[rules[j]];
          parent.className = "field error";
          return false;
        }
        errorMsgDiv.className = "error message hidden";
        parent.className = "field";
        j++;
      }
      i++;
    }
    successMsgDiv.innerHTML = messages.success;
    successMsgDiv.className = "success message"
  
}
