import * as cheerio from "cheerio";

export const oprFromPage = (
  page: string,
  {
    onlyActive,
  }: {
    onlyActive: boolean;
  } = {
    onlyActive: false,
  }
): number[] => {
  const $ = cheerio.load(page);

  return $("#opr")
    .children("tbody")
    .children(onlyActive ? '[style="color:#000;"]' : "tr")
    .map((i, el) => Number.parseFloat($($(el).children().get(3)).text()))
    .toArray();
  // .children('style="color:#888;"');
};

export const topScoreFromPage = (page: string): number => {
  const $ = cheerio.load(page);

  return $("strong").first().text() as any;
};
