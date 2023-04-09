import { chalk } from "./deps.ts";

export const handler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);

  const query = url.searchParams.get("q");

  if (query == undefined || query == null) {
    return new Response("DFPWM API. Usage: /?q=<url to download>.");
  }

  const hash = query.split("").reduce(function (a, b) {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  try {
    const cachedFile = await Deno.open(`cache/${hash}.dfpwm`, { read: true });
    console.log(chalk.green('cached: ' + query));
    const stream = cachedFile.readable;
    return new Response(
      stream,
      {
        headers: { "Content-Disposition": `attachment; filename=${hash}.dfpwm` },
      },
    );
  } catch {
    // Audio is not cached. Continue
  }

  await Deno.run(
    {
      cmd: ["yt-dlp", "-f", "bestaudio", query, "-o", `cache/${hash}`],
      stderr: "null",
      stdout: "null"
    },
  ).status();

  try {
    await Deno.stat(`cache/${hash}`);
    await Deno.run({
      cmd: ["ffmpeg", "-i", `cache/${hash}`, "-ac", "1", "-ar", "48000", "-y", `cache/${hash}.dfpwm`],
      stderr: "null",
      stdout: "null"
    }).status();
    await Deno.remove(`cache/${hash}`);
    await Deno.stat(`cache/${hash}.dfpwm`);
  } catch {
    return new Response("File conversion failed", { status: 500 });
  }

  console.log(chalk.green('downloaded: ' + query));
  const file = await Deno.open(`cache/${hash}.dfpwm`, { read: true });
  const stream = file.readable;
  return new Response(
    stream,
    {
      headers: { "Content-Disposition": `attachment; filename=${hash}.dfpwm` },
    },
  );
};
