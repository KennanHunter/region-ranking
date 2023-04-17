import { z } from "zod";
import { oprFromPage, topScoreFromPage } from "../scraping";

const regions = {
  Alaska: "alaska",
  Alabama: "alabama",
  Arkansas: "arkansas",
  Arizona: "arizona",
  California: "california",
  // "Southern California": "california_southern",
  // "Northern California": "california_northern",
  // "San Diego": "california_san_diego",
  Chesapeake: "chesapeake",
  Colorado: "colorado",
  Connecticut: "connecticut",
  Delaware: "delaware",
  Florida: "florida",
  Georgia: "georgia",
  Hawaii: "hawaii",
  Iowa: "iowa",
  Idaho: "idaho",
  Illinois: "illinois",
  Indiana: "indiana",
  Kentucky: "kentucky",
  Louisiana: "louisiana",
  Massachusetts: "massachusetts",
  Michigan: "michigan",
  Minnesota: "minnesota",
  Montana: "montana",
  Missouri: "missouri",
  Mississippi: "mississippi",
  "North Carolina": "north_carolina",
  "North Dakota": "north_dakota",
  "New Hampshire": "new_hampshire",
  "New Jersey": "new_jersey",
  "New Mexico": "new_mexico",
  Nevada: "nevada",
  "New York": "new_york",
  Ohio: "ohio",
  Oklahoma: "oklahoma",
  Oregon: "oregon",
  Pennsylvania: "pennsylvania",
  "Rhode Island": "rhode_island",
  "South Carolina": "south_carolina",
  Tennessee: "tennessee",
  Texas: "texas",
  Utah: "utah",
  Vermont: "vermont",
  Washington: "washington",
  Wisconsin: "wisconsin",
  Wyoming: "wyoming",
};

export const FTCStatsReturnObject = () =>
  z.object({
    name: z.string(),
    highestOPR: z.number().optional(),
    averageOPR: z.number().optional(),
    topScore: z.number().optional(),
  });
export type FTCStatsReturnObject = z.infer<
  ReturnType<typeof FTCStatsReturnObject>
>;

export const getStatsFromFTCStats = (): Promise<FTCStatsReturnObject[]> =>
  Promise.all(
    Object.entries(regions).map(async ([name, key]) => {
      const source = await fetch(
        `http://www.ftcstats.org/2023/${key}.html`
      ).then((res) => res.text());

      const opr = oprFromPage(source);

      return {
        name,
        highestOPR: opr.sort((a, b) => a - b).at(-1),
        averageOPR: opr.reduce(
          (prev, cur, _, arr) => prev + cur / arr.length,
          0
        ),
        topScore: topScoreFromPage(source),
      };
    })
  );
