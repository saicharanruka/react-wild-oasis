import { useEffect, useRef } from "react";

export function useOutsideClick({ close, listeningCapturing = true }) {
	const ref = useRef();

	useEffect(
		function () {
			function handleClick(e) {
				if (ref.current && !ref.current.contains(e.target)) close();
			}
			document.addEventListener("click", handleClick, listeningCapturing);

			return () =>
				document.removeEventListener("click", handleClick, listeningCapturing);
		},
		[close, listeningCapturing]
	);

	return ref;
}
