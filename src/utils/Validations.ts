export const IsValidEmail = (email: string) => {
	// if (!email.length) {
	// 	return true;
	// }
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (password: string) => {
	if (!password.length) {
		return true;
	}
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password);
};

export const isValidComparedPassword = (newPassword: string, reEnterPassword: string) => {
	if (reEnterPassword.length) {
		if (newPassword != reEnterPassword) {
			return true;
		}
		return false;
	}
	return false;
};

export const isValidname = (text: string) => {
	if (text.length <= 2) {
		return true;
	}
	return false;
};

export const isFieldEmpty = (text: string) => {
	if (text == '') {
		return true;
	}
	return false;
};

export const isValidPhoneNumber = (phoneNo: string) => {
	const reg = /^[0-9]+$/;
	if (reg.test(phoneNo) != true) {
		return true;
	}
	if (phoneNo && phoneNo.length > 6 && phoneNo.length < 14) {
		return false;
	}
	return true;
};

export const isString = (val: string) => {
	if (val.includes('.')) {
		return true;
	}
	if (val.length <= 2) {
		return false;
	}
	if (val.length === 1 && val === ' ') {
		return false;
	}
	if (val[val.length - 1] === ' ' && val[val.length - 1] !== val[val.length - 2]) {
		return true;
	}
	if (val[val.length - 1]?.trim()?.toLowerCase() !== val[val.length - 1]?.trim()?.toUpperCase() || val === '') {
		return true;
	}
	return false;
};

export const isNumber = (value: string) => {
	if (!value.length) {
		return true;
	}
	return !isNaN(parseFloat(value[value.length - 1])) && isFinite(parseInt(value[value.length - 1]));
};

export const isValidAlphaNumeric = (text: any) => {
	const reg = /[^A-Za-z0-9]/g;
	if (reg.test(text) != true) {
		return true;
	}
	return false;
};
