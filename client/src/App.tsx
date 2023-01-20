import "./App.css";
import Landing from "./Scenes/Landing";
import HostRoom from "./Scenes/HostRoom";
import { Navigate, Route, Routes } from "react-router-dom";
import GuestRoom from "./Scenes/GuestRoom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import { observer } from "mobx-react-lite";
import Footer from "./Components/Footer";

const App = observer(() => {
	return (
		<ChakraProvider>
			<Navbar />
			<main>
				<Routes>
					<Route path="/" element={<Navigate to="/landing" replace />} />
					<Route path="/landing" element={<Landing />} />
					<Route path="/room/guest" element={<GuestRoom />} />
					<Route path="/room/host" element={<HostRoom />} />
				</Routes>
			</main>
			<Footer />
		</ChakraProvider>
	);
});

export default App;
