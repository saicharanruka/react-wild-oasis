import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical.jsx";
import { useLogin } from "./useLogin.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import { useNavigate } from "react-router-dom";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, isLoading } = useLogin();
	const navigate = useNavigate("/");

	function handleSubmit(e) {
		e.preventDefault();
		if (!email || !password) return;

		login(
			{ email, password },
			{
				onSettled: () => {
					setEmail("");
					setPassword("");
					navigate("/dashboard");
				},
			}
		);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label="Email address">
				<Input
					type="email"
					id="email"
					// This makes this form better for password managers
					autoComplete="username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isLoading}
				/>
			</FormRowVertical>
			<FormRowVertical label="Password">
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					disabled={isLoading}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button size="large" disabled={isLoading}>
					{isLoading ? <SpinnerMini /> : "Log in"}
				</Button>
			</FormRowVertical>
		</Form>
	);
}

export default LoginForm;
