import lighthouse, { type Result } from 'lighthouse';

export const runLighthouse = async (url: string, port: number): Promise<Result | undefined> => {
  const result = await lighthouse(url, { port, logLevel: 'warn', onlyCategories: ['performance'] });

  return result?.lhr;
};
