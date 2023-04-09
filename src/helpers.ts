const areDependenciesInstalled = (): boolean => {
  try {
    Deno.run({ cmd: ["yt-dlp"], stderr: "null", stdout: "null" });
    Deno.run({ cmd: ["ffmpeg"], stderr: "null", stdout: "null" });
  } catch {
    return false;
  }
  return true;
};

export { areDependenciesInstalled };
