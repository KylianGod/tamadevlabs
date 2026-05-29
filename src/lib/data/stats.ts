export type Stat = {
  value: number;
  suffix: string;
  label: string;
  index: string;
};

export const STATS: Stat[] = [
  {
    value: 50,
    suffix: "+",
    label: "Projects shipped for startups and growing teams",
    index: "01",
  },
  {
    value: 20,
    suffix: "+",
    label: "Happy clients across AI, SaaS, and full-stack work",
    index: "02",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client satisfaction on post-project surveys",
    index: "03",
  },
  {
    value: 10,
    suffix: " wks",
    label: "Average time to launch an MVP",
    index: "04",
  },
];
