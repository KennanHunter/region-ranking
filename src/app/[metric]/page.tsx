import { getStatsFromFTCStats } from "@/lib/client/getStatsFromFTCStats";
import { Chart } from "@/lib/components/chart";
import { normalizeCapitalization } from "@/lib/util/normalize";
import { IconBrandGithub } from "@tabler/icons-react";

const Page = async ({ params }: { params: { metric: string } }) => {
  const metric = normalizeCapitalization(["OPR"], params.metric);
  const stats = await getStatsFromFTCStats();

  return (
    <div
      className="grid h-screen"
      style={{
        gridTemplateRows: "4em auto",
      }}
    >
      <div className="p-4 bg-purple-600 flex justify-between h-full">
        <h1>Rank Regions by {metric}</h1>
        <a href="https://github.com/KennanHunter/">
          <IconBrandGithub />
        </a>
      </div>
      <div className="h-full">
        <Chart
          stats={stats.sort(
            (a, b) => (a.averageOPR ?? 0) - (b.averageOPR ?? 0)
          )}
        />
      </div>
    </div>
  );
};

export default Page;
