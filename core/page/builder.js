import { promises } from "fs"

export const BuildPage = async () => {
  try {
    const data = await promises.readFile('./index.html', 'utf-8');
    const compPattern = /\%(.*?)\%/;

    let stage = [];
    for (const rootFileLine of data.split('\n')) {
      const trimmedLine = rootFileLine.trim();

      if (compPattern.test(trimmedLine)) {
        const componentName = trimmedLine.slice(1, -1);
        const buffer = await promises.readFile(`./src/components/${componentName}.html`);
        const strComponentData = buffer.toString();

        stage.push(`<!--${componentName}--->`)
        for (const compLine of strComponentData.split('\n')) stage.push(compLine);
        continue;
      }

      stage.push(trimmedLine);
    }

    const parsedData = stage.join('\n');
    const rootAsBuffer = Buffer.from(parsedData, 'utf-8');

    return rootAsBuffer;
  } catch (err) {
    console.error(err);
  }
};