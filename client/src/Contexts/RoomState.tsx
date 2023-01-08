import { createContext, ReactElement, useContext } from "react";
import Room from "../Models/Room";

export class RoomStateStore {
	room: Room;

	constructor() {
		this.room = new Room();
	}
}

interface ChildrenProps<T> {
	children: (value: T) => React.ReactElement<unknown>;
}

export const roomStateSingleton = new RoomStateStore();

export const RoomStateStoreContext = createContext(roomStateSingleton);

export const useRoomState = (): RoomStateStore =>
	useContext(RoomStateStoreContext);

export const SocketConsumer = ({
	children,
}: ChildrenProps<RoomStateStore>): ReactElement => (
	<>{() => children(roomStateSingleton)}</>
);

export const Provider = ({
	children,
}: React.PropsWithChildren<unknown>): React.ReactElement => {
	return (
		<RoomStateStoreContext.Provider value={{ ...roomStateSingleton }}>
			{children}
		</RoomStateStoreContext.Provider>
	);
};
