import { createContext, useContext } from "react";
import { SocketStore } from "./SocketStore";
import RoomStore from "./RoomStore";

export class RootStore {
	roomStore: RoomStore;
	socketStore: SocketStore;

	constructor() {
		this.socketStore = new SocketStore(this);
		this.roomStore = new RoomStore(this);
	}
}

const rootSingleton = new RootStore();
const StoresContext = createContext(rootSingleton);

export const useStores = () => useContext(StoresContext);

export const StoreProvider = ({
	children,
}: React.PropsWithChildren<unknown>): React.ReactElement => {
	return (
		<StoresContext.Provider value={rootSingleton}>
			{children}
		</StoresContext.Provider>
	);
};
