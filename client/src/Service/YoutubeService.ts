import axios from "axios";
import IVideo from "./IVideo";

export default class YoutubeSearch {
	private static AUTOCOMPLETE_URL =
		"https://clients1.google.com/complete/search?client=youtube&gs_ri=youtube&ds=yt&q=";

	private static API_URL = "https://www.googleapis.com/youtube/v3/search";
	private static API_TOKEN = process.env.REACT_APP_YOUTUBE_API;

	public static YOUTUBE_WATCH_URL = "https://www.youtube.com/watch?v=";
	// searchYoutube: Promise<string> = async (query: string) => {
	// 	var search = "http://
	// 	return fetch()
	// }
	static search = async (query: string): Promise<IVideo[]> => {
		return axios({
			method: "get",
			url: this.API_URL,
			params: {
				part: "snippet",
				maxResults: "10",
				key: this.API_TOKEN,
				type: "video",
				q: query,
			},
		}).then((results) =>
			results.data.items.map((i: any) => ({
				videoId: i.id.videoId,
				videoUrl: `${i.id.videoId}`,
				title: i.snippet.title,
				description: i.snippet.description,
				thumbnail:
					i.snippet.thumbnails.high.url ?? i.snippet.thumbnails.default.url,
			}))
		);
	};

	static autocomplete = async (query: string): Promise<string[] | null> => {
		try {
			const response = await axios.get(`${this.AUTOCOMPLETE_URL}${query}`);

			const data: any = response.data;

			const searchSuggestions: string[] = [];
			data.split("[").forEach((ele: any, index: number) => {
				if (!ele.split('"')[1] || index === 1) return;
				return searchSuggestions.push(ele.split('"')[1]);
			});
			console.log(searchSuggestions);
			return searchSuggestions;
		} catch {
			return Promise.resolve(null);
		}
	};
}
