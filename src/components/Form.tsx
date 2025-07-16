import { useState, type ChangeEvent, type FormEvent } from "react";

interface FormData {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	guess: string;
	spidrPin: string;
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

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form Data:", formData);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white font-raleway">
			<div className="w-full max-w-lg bg-neutral-800 bg-opacity-80 p-8 rounded-lg shadow-lg">
				<h1 className="text-3xl font-light mb-6 text-center border-b border-[#56acbd] pb-4 text-[#56acbd]">
					Guess the Air Fryer Cost
				</h1>
				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
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
					<div>
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
					<div>
						<label className="block text-sm mb-1">Phone Number</label>
						<input
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							required
							className="w-full bg-transparent border-b border-[#56acbd] focus:border-accent transition p-2 outline-none"
						/>
					</div>
					<div>
						<label className="block text-sm mb-1">Email Address</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full bg-transparent border-b border-[#56acbd] focus:border-accent transition p-2 outline-none"
						/>
					</div>
					<div>
						<label className="block text-sm mb-1">Guess the Cost ($)</label>
						<input
							type="number"
							name="guess"
							value={formData.guess}
							onChange={handleChange}
							required
							className="w-full bg-transparent border-b border-[#56acbd] focus:border-accent transition p-2 outline-none"
						/>
					</div>
					<div>
						<label className="block text-sm mb-1">Very Secret Spidr PIN</label>
						<input
							type="text"
							name="spidrPin"
							value={formData.spidrPin}
							onChange={handleChange}
							placeholder="####-####-####-####"
							required
							className="w-full bg-transparent border-b border-[#56acbd] focus:border-accent transition p-2 outline-none"
						/>
					</div>
					<button
						type="submit"
						className="w-full mt-4 py-2 bg-accent text-[#56acbd] font-medium rounded hover:bg-accent-dark transition"
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
