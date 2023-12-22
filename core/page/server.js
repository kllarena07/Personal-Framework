export const servePageHTML = async (routeName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const route = routeName == "/" ? "src" : "src/routes/" + routeName.slice(1);
  const filePath = path.join(__dirname, route);

  try {
    const file = await promises.readFile(filePath + "/index.html", {
      encoding: "utf-8",
    });

    return {
      statusCode: 200,
      contentType: "text/html",
      data: file,
    };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return {
        statusCode: 500,
        contentType: "text/plain",
        data: "Internal Server Error",
      };
    }
  }
};