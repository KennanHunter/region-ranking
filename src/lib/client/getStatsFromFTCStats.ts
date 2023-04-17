import { oprFromPage, topScoreFromPage } from "../scraping";

const regions = {
  "Rhode Island": "rhode_island",
  Alaska: "alaska",
};

export const getStatsFromFTCStats = () =>
  Promise.all(
    Object.entries(regions).map(async ([name, key]) => {
      const source = await fetch(
        `http://www.ftcstats.org/2023/${key}.html`
      ).then((res) => res.text());

      const opr = oprFromPage(source);

      return [
        name,
        {
          highestOPR: opr.sort((a, b) => a - b).at(-1),
          averageOPR: opr.reduce(
            (prev, cur, _, arr) => prev + cur / arr.length,
            0
          ),
          topScore: topScoreFromPage(source),
        },
      ];
    })
  );
