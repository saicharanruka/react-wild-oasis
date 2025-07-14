import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const { isAutheticated, isLoading } = useUser();

	useEffect(() => {
		if (!isAutheticated && !isLoading) navigate("/login");
	}, [isAutheticated, isLoading, navigate]);

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (isAutheticated) return children;

	return null;
}

export default ProtectedRoute;
