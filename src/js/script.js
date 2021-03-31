function testText(field, lng) {
	return field.value.length >= lng;
}

function testNumber(field) {
	return !isNaN(parseInt(field.value)) && field.value.length >= 9;
}

function testSelected(field) {
	return field.value != 'Select Service';
}

function toggleErrorField(field, show) {
	const errorText = field.nextElementSibling;
	if (errorText !== null) {
		if (errorText.classList.contains('form-error-text')) {
			errorText.style.display = show ? 'block' : 'none';
		}
	}
}

function markFieldAsError(field, show) {
	if (show) {
		field.classList.add('field-error');
	} else {
		field.classList.remove('field-error');
	}
}

const form = document.querySelector('form');
const inputName = form.querySelector('input[name=name]');
const inputLastName = form.querySelector('input[name=lastName]');
const inputPhoneNumber = form.querySelector('input[name=phoneNumber]');
const inputService = form.querySelector('select[name=service]');
const toogleMenuButon = document.querySelector('.mainSection__button');
const toogleMenu = document.querySelector('.mainSection__navButtons');

inputName.addEventListener('input', (e) =>
	markFieldAsError(e.target, !testText(e.target, 2)),
);
inputLastName.addEventListener('input', (e) =>
	markFieldAsError(e.target, !testText(e.target, 2)),
);
inputPhoneNumber.addEventListener('input', (e) =>
	markFieldAsError(e.target, !testNumber(e.target)),
);
inputService.addEventListener('input', (e) =>
	markFieldAsError(e.target, !testSelected(e.target)),
);

form.addEventListener('submit', (e) => {
	e.preventDefault();

	let formErrors = false;

	for (const el of [inputName, inputLastName, inputPhoneNumber, inputService]) {
		markFieldAsError(el, false);
		toggleErrorField(el, false);
	}

	if (!testText(inputName, 3)) {
		markFieldAsError(inputName, true);
		toggleErrorField(inputName, true);
		formErrors = true;
	}
	if (!testText(inputLastName, 3)) {
		markFieldAsError(inputLastName, true);
		toggleErrorField(inputLastName, true);
		formErrors = true;
	}
	if (!testNumber(inputPhoneNumber)) {
		markFieldAsError(inputPhoneNumber, true);
		toggleErrorField(inputPhoneNumber, true);
		formErrors = true;
	}
	if (!testSelected(inputService)) {
		markFieldAsError(inputService, true);
		toggleErrorField(inputService, true);
		formErrors = true;
	}

	if (!formErrors) {
		alert('The form has been sent');
		e.target.submit();
	} else {
		alert('Correct the errors in the form!');
	}
});

toogleMenuButon.addEventListener('click', () =>
	toogleMenu.style.display === 'none'
		? (toogleMenu.style.display = 'block')
		: (toogleMenu.style.display = 'none'),
);
