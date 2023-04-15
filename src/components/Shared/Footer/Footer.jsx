import { Typography } from "@mui/material";
import React from "react";
import "./Footer.css";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
	return (
		<footer>
			<Typography>&copy; Farm in the Dell of the Red River Valley</Typography>
		</footer>
	);
}

export default Footer;
