import { observer } from "mobx-react";
import YouTube, { YouTubeProps } from "react-youtube";

interface YoutubePlayerProps extends Omit<YouTubeProps, "videoId"> {
	videoId: string | null;
}

const YoutubePlayer = observer(
	({ videoId, opts, ...rest }: YoutubePlayerProps) => {
		if (videoId == null) {
			return <p>Nothing in queue</p>;
		}

		opts["playerVars"] = {
			autoplay: 1,
		};

		return <YouTube videoId={videoId} opts={opts} {...rest} />;
	}
);

export default YoutubePlayer;
