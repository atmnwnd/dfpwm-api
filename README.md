# dfpwm-api

Server that converts any kind of stream supported by `yt-dlp` and converts it to the [DFPWM](https://wiki.vexatos.com/dfpwm) format, in order to play it with a speaker on Minecraft with the ComputerCraft mod.

Uses Deno, `yt-dlp` and `ffmpeg`. Docker script supports x86_64 and arm64 architectures (see `installDependencies.sh`).

## Usage with Docker Compose

- Clone the repo
- Run `docker compose up --build -d`

Usage inside a computer on ComputerCraft: `speaker play https://example.com/?q=<URL supported by yt-dlp>`