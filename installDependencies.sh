case $(uname -m) in
  "aarch64") 
    ffmpeg="https://www.johnvansickle.com/ffmpeg/old-releases/ffmpeg-5.1.1-arm64-static.tar.xz"
    ytdlp="https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux_aarch64"
    ;;
  "x86_64")
    ffmpeg="https://www.johnvansickle.com/ffmpeg/old-releases/ffmpeg-5.1.1-amd64-static.tar.xz"
    ytdlp="https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux"
    ;;
  *)
    echo "Unsupported platform"
    exit 1 ;;
esac

curl $ffmpeg -L -o ffmpeg.tar.xz
curl $ytdlp -L -o yt-dlp

mkdir temp
tar -xvf ffmpeg.tar.xz -C temp --strip-components 1

chmod +x yt-dlp

mkdir /root/bin
mv temp/ffmpeg /root/bin/ffmpeg
mv yt-dlp /root/bin/yt-dlp