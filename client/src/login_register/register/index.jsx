import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { Row, Col } from "react-bootstrap"

export const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		phoneno: "",
		address: "",
		country: "",
		pincode: "",
	});
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};


	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1 className="py-2 font-bold">Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Log in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1 className="py-2 font-bold text-white">Create Account</h1>
						<Row>
							<Col>
								<input
									type="text"
									placeholder="First Name"
									name="firstName"
									onChange={handleChange}
									value={data.firstName}
									required
									className="py-2 px-2 rounded-lg my-2"
								/>
							</Col>
							<Col>
								<input
									type="text"
									placeholder="Last Name"
									name="lastName"
									onChange={handleChange}
									value={data.lastName}
									required
									className="py-2 px-2 rounded-lg my-2"
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<input
									type="email"
									placeholder="Email"
									name="email"
									onChange={handleChange}
									value={data.email}
									required
									className="py-2 px-2 rounded-lg my-2"
								/>
							</Col>
							<Col>
								<input
									type="number"
									placeholder="Phone No. With Code"
									name="phoneno"
									onChange={handleChange}
									value={data.phoneno}
									required
									className="py-2 px-2 rounded-lg my-2"
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<input
									type="text"
									placeholder="Address"
									name="address"
									onChange={handleChange}
									value={data.address}
									required
									className="py-2 px-2 rounded-lg my-2 w-[420px]"
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<input
									type="number"
									placeholder="Pincode"
									name="pincode"
									onChange={handleChange}
									value={data.pincode}
									required
									className="py-2 px-2 rounded-lg my-2"
								/>
							</Col>
							<Col>
								<input
									type="text"
									placeholder="Country"
									name="country"
									onChange={handleChange}
									value={data.country}
									required
									className="py-2 px-2 rounded-lg my-2"
								/>
							</Col>
						</Row>

						<div>
							<input
								type={showPassword ? "test" : "password"}
								placeholder="Password"
								name="password"
								onChange={handleChange}
								value={data.password}
								required
								className="py-2 px-2 rounded-lg my-2 w-[420px]"
							/>
							<button
								type="button"
								className={`${styles.password_toggle}`}
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? "❌" : "👁️"}
							</button>
						</div>

						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={`${styles.green_btn}`}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

