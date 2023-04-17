import { getStatsFromFTCStats } from "@/lib/client/getStatsFromFTCStats";
import { normalizeCapitalization } from "@/lib/util/normalize";
import { IconBrandGithub } from "@tabler/icons-react";

const Page = async ({ params }: { params: { metric: string } }) => {
  const metric = normalizeCapitalization(["OPR"], params.metric);
  const stats = await getStatsFromFTCStats();

  return (
    <div>
      <div className="p-4 bg-purple-600 flex justify-between">
        <h1>Rank Regions by {metric}</h1>
        <a href="https://github.com/KennanHunter/">
          <IconBrandGithub />
        </a>
      </div>
      <h1 className="">
        <pre>{JSON.stringify(Object.fromEntries(stats), null, 4)}</pre>
      </h1>
    </div>
  );
};

export default Page;
