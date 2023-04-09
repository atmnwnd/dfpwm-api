ARG DENO_VERSION=1.32.3
FROM ubuntu:jammy

RUN apt-get update && apt-get install -y expat ca-certificates curl wget xz-utils unzip --no-install-recommends && rm -rf /var/lib/apt/lists/*

# https://github.com/LukeChannings/deno-arm64
RUN curl -s https://gist.githubusercontent.com/LukeChannings/09d53f5c364391042186518c8598b85e/raw/ac8cd8c675b985edd4b3e16df63ffef14d1f0e24/deno_install.sh | sh
ENV DENO_INSTALL="/root/.deno"

COPY installDependencies.sh .
RUN ./installDependencies.sh

ENV PATH="$PATH:/root/bin:$DENO_INSTALL/bin"

EXPOSE 8000

WORKDIR /app

COPY src/* .
RUN deno cache main.ts

CMD [ "deno", "run", "--allow-net", "--allow-read=cache", "--allow-write=cache", "--allow-run=ffmpeg,yt-dlp", "main.ts" ]