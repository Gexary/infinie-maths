import StylizedText, { StylizedTextPatterns } from "@/components/app/stylized-text";
import Link from "next/link";

export interface NoticeProps {
  title?: string;
  description?: string;
  notice?: string;
  buttons?: boolean;
}

const stylizedTextStyle = new StylizedTextPatterns({
  "# \n": ({ children, params }) => <h1 className="mb-2 text-xl font-bold text-white">{children}</h1>,
  "-- --": ({ children, params }) => {
    const listElements = children
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    return (
      <ul className="flex list-outside list-disc flex-col gap-1 pl-4">
        {listElements.map((line, i) => (
          <li className="" key={i}>
            {line}
          </li>
        ))}
      </ul>
    );
  },
});

export default function NoticeCard({ title, description, notice, buttons = true }: NoticeProps) {
  return (
    <div className="mb-12 flex flex-col flex-wrap justify-between gap-6 rounded-xl bg-white p-4 text-gray-950 md:flex-row md:gap-8">
      <div className="md:p-4">
        {title && <h1 className="max-w-2xl text-3xl font-extrabold">{title}</h1>}
        {description && (
          <div className="mt-2 max-w-xl text-base leading-relaxed text-gray-800 flex flex-col gap-4">
            <StylizedText text={description} textStyle={stylizedTextStyle} />
          </div>
        )}
        {buttons && (
          <div className="mt-6 flex flex-row flex-wrap gap-2 md:mt-8">
            <Link href="" className="rounded-full border border-white/20 bg-orange-500 px-8 py-2 text-base font-medium text-nowrap text-gray-950">
              Commencer par la Seconde
            </Link>
            <Link href="" className="rounded-full border border-white/20 bg-orange-500 px-8 py-2 text-base font-medium text-nowrap text-gray-950">
              Aller en Première
            </Link>
          </div>
        )}
      </div>
      {notice && (
        <div className="w-full rounded-xl bg-gray-950 p-4 md:p-6 lg:max-w-md bottom-glow [&>h1:not(:first-of-type)]:mt-4 text-sm leading-relaxed text-gray-300">
          <StylizedText text={notice} textStyle={stylizedTextStyle} />
        </div>
      )}
    </div>
  );
}
