import { useState, type ChangeEvent, type FormEvent } from "react";

interface FormData {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	guess: string;
	spidrPin: string;
}

interface Errors {
	phone?: string;
	email?: string;
	spidrPin?: string;
	guess?: string;
}

export default function Form() {
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		guess: "",
		spidrPin: "",
	});
	const [errors, setErrors] = useState<Errors>({});

	const formatSpidrPin = (value: string): string => {
		const digits = value.replace(/\D/g, "").slice(0, 16);
		return digits.replace(/(.{4})/g, "$1-").replace(/-$/, "");
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "spidrPin" ? formatSpidrPin(value) : value,
		}));
	};

	const validateEmail = (email: string): boolean => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const validatePhone = (phone: string): boolean => {
		const digits = phone.replace(/\D/g, "");
		return digits.length >= 10 && digits.length <= 15;
	};

	const validateSpidrPin = (pin: string): boolean => {
		const digits = pin.replace(/\D/g, "");
		return digits.length === 16;
	};

	const validateGuess = (guess: string): boolean => {
		const num = Number(guess);
		return !isNaN(num) && num >= 0;
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newErrors: Errors = {};

		if (!validateEmail(formData.email)) {
			newErrors.email = "Please enter a valid email address.";
		}
		if (!validatePhone(formData.phone)) {
			newErrors.phone = "Please enter a valid phone number (10–15 digits).";
		}
		if (!validateSpidrPin(formData.spidrPin)) {
			newErrors.spidrPin = "PIN must be exactly 16 digits.";
		}
		if (!validateGuess(formData.guess)) {
			newErrors.guess = "Guess must be 0 or greater.";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setErrors({});
		console.log("Form Data:", formData);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white font-raleway">
			<div className="w-full max-w-3xl bg-neutral-800 bg-opacity-80 p-8 rounded-lg shadow-lg">
				<h1 className="text-3xl font-light mb-6 text-center  pb-4 text-[#56acbd]">
					Guess the Air Fryer Cost
					<span className="block w-24 h-px bg-[#56acbd] mx-auto mt-2"></span>
				</h1>
				<form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
					{/* Row 1: First Name + Last Name */}
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<label className="block text-sm mb-1">First Name</label>
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								required
								className="w-full bg-transparent border-b border-[#56acbd] focus:border-accent transition p-2 outline-none"
							/>
						</div>
						<div className="flex-1">
							<label className="block text-sm mb-1">Last Name</label>
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								required
								className="w-full bg-transparent border-b border-[#56acbd] focus:border-accent transition p-2 outline-none"
							/>
						</div>
					</div>

					{/* Row 2: Phone Number + Email */}
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<label className="block text-sm mb-1">Phone Number</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
								className={`w-full bg-transparent border-b ${
									errors.phone ? "border-red-500" : "border-[#56acbd]"
								} focus:border-accent transition p-2 outline-none`}
							/>
							{errors.phone && (
								<p className="text-red-400 text-xs mt-1">{errors.phone}</p>
							)}
						</div>
						<div className="flex-1">
							<label className="block text-sm mb-1">Email Address</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className={`w-full bg-transparent border-b ${
									errors.email ? "border-red-500" : "border-[#56acbd]"
								} focus:border-accent transition p-2 outline-none`}
							/>
							{errors.email && (
								<p className="text-red-400 text-xs mt-1">{errors.email}</p>
							)}
						</div>
					</div>

					{/* Row 3: Guess Price */}
					<div>
						<label className="block text-sm mb-1">Guess the Cost ($)</label>
						<input
							type="number"
							name="guess"
							value={formData.guess}
							onChange={handleChange}
							required
							min="0"
							className={`w-full bg-transparent border-b ${
								errors.guess ? "border-red-500" : "border-[#56acbd]"
							} focus:border-accent transition p-2 outline-none`}
						/>
						{errors.guess && (
							<p className="text-red-400 text-xs mt-1">{errors.guess}</p>
						)}
					</div>

					{/* Row 4: Very Secret Spidr PIN */}
					<div>
						<label className="block text-sm mb-1">Very Secret Spidr PIN</label>
						<input
							type="text"
							name="spidrPin"
							value={formData.spidrPin}
							onChange={handleChange}
							placeholder="####-####-####-####"
							required
							className={`w-full bg-transparent border-b ${
								errors.spidrPin ? "border-red-500" : "border-[#56acbd]"
							} focus:border-accent transition p-2 outline-none`}
						/>
						{errors.spidrPin && (
							<p className="text-red-400 text-xs mt-1">{errors.spidrPin}</p>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="mt-4 mx-auto px-3 py-1.5 text-sm font-normal text-white text-center bg-transparent border border-white rounded-none cursor-pointer transition hover:bg-[rgba(0,0,0,0.6)] hover:text-[#56acbd] hover:border-[#56acbd]"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
