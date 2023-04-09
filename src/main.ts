import { areDependenciesInstalled } from "./helpers.ts";
import { chalk, serve } from "./deps.ts";
import { handler } from "./server.ts";

if (!areDependenciesInstalled()) {
    console.log(chalk.red("Either ffmpeg or yt-dlp is not installed. Please install those and try again."));
    Deno.exit(-1);
}

try {
    Deno.mkdirSync("cache");
} catch {
    // Ignore errors
}

serve(handler);