export const validateRegisterForm = (formData: any) => {
	const errors: { [key: string]: string } = {};
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!formData.full_name.trim()) {
		errors.full_name = "Full name is required";
	}

	if (!formData.email.trim()) {
		errors.email = "Email is required";
	} else if (!emailRegex.test(formData.email)) {
		errors.email = "Please enter a valid email";
	}

	if (!formData.password) {
		errors.password = "Password is required";
	} else if (formData.password.length < 6) {
		errors.password = "Password must be at least 6 characters";
	}

	return errors;
};
