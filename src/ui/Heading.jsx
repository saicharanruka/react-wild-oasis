import styled from "styled-components";

const Heading = styled.h1`
	${(props) => console.log(props.as)}
	line-height : 1.4;
`;

export default Heading;
