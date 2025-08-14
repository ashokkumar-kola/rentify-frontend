import { useState } from "react";
import { confirmEmail } from "../../services/AuthService";

const useConfirmEmail = () => {
	const [otp, setOtp] = useState("");
	const [loading, setLoading] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertVisible, setAlertVisible] = useState(false);

	const handleConfirmEmail = async (email: string) => {
		if (!otp.trim()) {
			setAlertMessage("OTP is required");
			setAlertVisible(true);
			return { success: false };
		}

		setLoading(true);
		try {
			await confirmEmail(email, otp);
			return { success: true };
		} catch (error: any) {
			const msg = error.response?.data?.message || "Invalid OTP";
			setAlertMessage(msg);
			setAlertVisible(true);
			return { success: false };
		} finally {
			setLoading(false);
		}
	};

	return {
		otp,
		setOtp,
		loading,
		alertVisible,
		setAlertVisible,
		alertMessage,
		handleConfirmEmail,
	};
};

export default useConfirmEmail;
