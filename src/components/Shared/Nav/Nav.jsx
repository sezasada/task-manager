import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Nav.css";
import { useDispatch, useSelector } from "react-redux";
import {
	AppBar,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	Tab,
	Tabs,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import TextSnippetSharpIcon from "@mui/icons-material/TextSnippetSharp";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import NotVerifiedUser from "../../Pages/MainPage/TabComponents/NotVerified/NotVerifiedUser";
function Nav() {
	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector((store) => store.user);
	const tabIndex = useSelector((store) => store.tabIndexReducer);

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	function handleOpenNavMenu(event) {
		setAnchorElNav(event.currentTarget);
	}
	function handleOpenUserMenu(event) {
		setAnchorElUser(event.currentTarget);
	}

	function handleCloseNavMenu() {
		setAnchorElNav(null);
	}

	function handleCloseUserMenu() {
		setAnchorElUser(null);
	}

	return (
		<AppBar
			position="sticky"
			sx={{
				width: "100vw",
				backgroundColor: "#B5B292",
				alignItems: "center",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100vw",
				}}
			>
				<Box>
					<Link
						to="/home"
						onClick={() => dispatch({ type: "UNSET_TAB_INDEX" })}
					>
						<Link
							to="/home"
							onClick={() => dispatch({ type: "UNSET_TAB_INDEX" })}
						>
							<Box>
					
							</Box>
						</Link>
					</Link>
				</Box>
				<Box sx={{ flex: "1 1 auto", textAlign: "center" }}>
					{user.is_admin && user.is_verified ? (
						<Tabs
							position="absolute"
							TabIndicatorProps={{ style: { background: "#F3ECE7" } }}
							value={tabIndex}
							sx={{
								"& .MuiTab-root": {
									minWidth: "unset",
									flex: 1,
									color: "Black",
								},
							}}
						>
							<Tab
								icon={
									<GridViewSharpIcon style={{ color: "#F3ECE7" }} />
								}
								// label={<span style={{ color: "black" }}>Dashboard</span>}
								onClick={() => {
									dispatch({ type: "SET_TAB_INDEX", payload: 0 });
									history.push("/main");
								}}
							/>

							<Tab
								icon={<PersonSharpIcon style={{ color: "#F3ECE7" }} />}
								// label={<span style={{ color: "black" }}>Manage Users</span>}
								onClick={() => {
									dispatch({ type: "SET_TAB_INDEX", payload: 1 });
									history.push("/main");
								}}
							/>

							<Tab
								icon={
									<TextSnippetSharpIcon style={{ color: "#F3ECE7" }} />
								}
								// label={<span style={{ color: "black" }}>Manage Tasks</span>}
								onClick={() => {
									dispatch({ type: "SET_TAB_INDEX", payload: 2 });
									history.push("/main");
								}}
							/>
							<Tab
								icon={
									<BorderColorSharpIcon style={{ color: "#F3ECE7" }} />
								}
								// label={<span style={{ color: "black" }}>Dashboard</span>}
								onClick={() => {
									dispatch({ type: "SET_TAB_INDEX", payload: 3});
									history.push("/main");
								}}
							/>
						</Tabs>
					) : user.is_verified ? (
						<Tabs
							position="absolute"
							TabIndicatorProps={{ style: { background: "#DBD7CC" } }}
							value={tabIndex}
							sx={{
								"& .MuiTab-root": {
									minWidth: "unset",
									flex: 1,
									color: "Black",
								},
							}}
						>
							<Tab
								icon={
									<GridViewSharpIcon style={{ color: "#DBD7CC" }} />
								}
								// label={<span style={{ color: "black" }}>Dashboard</span>}
								onClick={() => {
									dispatch({ type: "SET_TAB_INDEX", payload: 0 });
									history.push("/main");
								}}
							/>
							<Tab
								icon={
									<BorderColorSharpIcon style={{ color: "rgb(187, 41, 46)" }} />
								}
								// label={<span style={{ color: "black" }}>Create New Task</span>}
								onClick={() => {
									dispatch({ type: "SET_TAB_INDEX", payload: 1 });
									history.push("/main");
								}}
							/>
							<Tab
								icon={
									<TextSnippetSharpIcon style={{ color: "#DBD7CC" }} />
								}
								// label={<span style={{ color: "black" }}>Task List</span>}
								onClick={() => {
									dispatch({ type: "SET_TAB_INDEX", payload: 2 });
									history.push("/main");
								}}
							/>
						</Tabs>
					) : (
						""
					)}
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
					>
						{/* If no user is logged in, show these links */}
						{!user.id && (
							// If there's no user, show login/registration links
							<MenuItem onClick={() => history.push("/login")}>
								<Typography>Login / Register</Typography>
							</MenuItem>
						)}

						{/* If a user is logged in, show these links */}
						{user.id && (
							<>
								<MenuItem onClick={() => history.push("/main")}>
									<Typography>Home</Typography>
								</MenuItem>

								<MenuItem onClick={() => dispatch({ type: "LOGOUT" })}>
									<Typography>Logout</Typography>
								</MenuItem>

								<MenuItem onClick={() => history.push("/about")}>
									<Typography>Profile</Typography>
								</MenuItem>
							</>
						)}
					</Menu>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<IconButton size="large" onClick={handleOpenNavMenu}>
							<AccountCircleIcon style={{ color: "#F3ECE7" }} />
						</IconButton>
					</Box>
				</Box>
			</Box>
		</AppBar>
	);
}

export default Nav;
