const fs = require('fs');
const ytdl = require('ytdl-core');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\x1b[33m║ ♚ YOUTUBE DOWNLOADER\n║ ♚ Creator : Akbar D Trafalgar\n║ ♚ Facebook : Akbar Cannavaro\n║ ♚ Youtube : Akbar D Tragalgar\n•> Link Video : \x1b[0m', (videoUrl) => {
  downloadVideo(videoUrl);
  rl.close();
});

const downloadVideo = async (url) => {
  try {
    const info = await ytdl.getInfo(url);
    const videoTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');

    const videoStream = ytdl(url);
    videoStream.pipe(fs.createWriteStream(`${videoTitle}.mp4`));

    videoStream.on('progress', (chunkLength, downloaded, total) => {
      const percent = Math.round((downloaded / total) * 100);
      console.log(`\x1b[34m ♚ Downloading... ${percent}%`);
    });

    videoStream.on('end', () => {
      console.log('\x1b[32m ♚ Video Berhasil Diunduh\nJangan Lupa Subscribe Youtube : Akbar D Trafalgar');
    });
  } catch (error) {
    console.error('•> Error:', error);
  }
};
