export function generateId(length: number) {
	var result = "";
	var characters = "ABCDEGHJKLMNOPQRTUVWXYZ";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
