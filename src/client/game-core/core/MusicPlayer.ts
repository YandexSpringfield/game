class MusicPlayer {
  tracks: Map<string, any>;

  constructor() {
    this.tracks = new Map();
  }

  addTrack(name, url) {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.2;
    audio.src = url;
    this.tracks.set(name, audio);
  }

  playTrack(name, loop?) {
    const audio = this.tracks.get(name);
    audio.play();
    audio.loop = loop;
    return audio;
  }

  stopTracks() {
    this.tracks.forEach((audio) => {
      // eslint-disable-next-line no-param-reassign
      audio.currentTime = 0;
      audio.pause();
    });
  }
}

export const musicPlayer = new MusicPlayer();
