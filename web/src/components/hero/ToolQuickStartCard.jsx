import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiCloudUpload,
  HiCollection,
  HiCursorClick,
  HiDocument,
  HiDownload,
  HiPhotograph,
  HiArchive,
  HiRefresh,
  HiTrash,
  HiViewGrid,
} from "react-icons/hi";
import {
  HERO_COPY,
  HERO_QUICK_START_FEATURED,
  HERO_QUICK_START_STEPS,
  HERO_QUICK_START_TOOLS,
} from "../../config/heroConfig";

const PANEL =
  "w-full max-w-[26rem] rounded-2xl border border-white/[0.08] bg-[rgba(10,8,25,0.72)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_44px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-white/[0.04] backdrop-blur-md sm:max-w-[28rem] lg:max-w-[30rem]";

const TOOL_ICONS = {
  split: HiViewGrid,
  compress: HiArchive,
  images: HiPhotograph,
  rotate: HiRefresh,
  "remove-pages": HiTrash,
};

const STEP_ICONS = {
  select: HiCursorClick,
  upload: HiCloudUpload,
  download: HiDownload,
};

function PanelHeader() {
  return (
    <header className="px-5 pb-4 pt-4 text-center sm:pb-5 sm:pt-5">
      <h2
        id="hero-quick-start-title"
        className="text-lg font-semibold tracking-tight text-slate-50 sm:text-xl"
      >
        {HERO_COPY.quickStartTitle}
      </h2>
    </header>
  );
}

function FeaturedToolCard() {
  const { path, title, description, cta } = HERO_QUICK_START_FEATURED;

  return (
    <Link
      to={path}
      className="group flex items-center gap-3.5 rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-500/12 via-violet-500/5 to-transparent p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:border-violet-400/40 hover:bg-violet-500/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0819]"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/15 text-violet-300 ring-1 ring-inset ring-white/[0.06]">
        <HiCollection className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-50">{title}</span>
        <span className="mt-0.5 block text-xs leading-snug text-slate-400">
          {description}
        </span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-violet-400/25 bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold text-violet-200 transition-colors group-hover:bg-violet-500/18">
        {cta}
        <HiArrowRight className="h-3.5 w-3.5" aria-hidden />
      </span>
    </Link>
  );
}

function ToolRow({ tool }) {
  const Icon = TOOL_ICONS[tool.id] ?? HiDocument;

  return (
    <li>
      <Link
        to={tool.path}
        className="group flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-inset"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-slate-400 ring-1 ring-inset ring-white/[0.04] transition-colors group-hover:border-white/[0.1] group-hover:text-slate-300">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium text-slate-300 group-hover:text-slate-50">
            {tool.title}
          </span>
          <span className="mt-0.5 block truncate text-[11px] text-slate-500">
            {tool.hint}
          </span>
        </span>
        <HiArrowRight
          className="h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-slate-400"
          aria-hidden
        />
      </Link>
    </li>
  );
}

function WorkflowStrip() {
  return (
    <ol
      className="flex items-center justify-between gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
      aria-label="İşlem akışı"
    >
      {HERO_QUICK_START_STEPS.map((step, index) => {
        const Icon = STEP_ICONS[step.iconKey] ?? HiDocument;
        const isLast = index === HERO_QUICK_START_STEPS.length - 1;

        return (
          <li
            key={step.label}
            className="relative flex min-w-0 flex-1 flex-col items-center text-center"
          >
            {!isLast && (
              <span
                className="pointer-events-none absolute left-[calc(50%+0.9rem)] top-[0.85rem] hidden h-px w-[calc(100%-1.8rem)] bg-white/10 sm:block"
                aria-hidden
              />
            )}
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.02] text-violet-300/70">
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="mt-1.5 text-[10px] font-medium leading-tight text-slate-500/90">
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export default function ToolQuickStartCard() {
  return (
    <aside className={PANEL} aria-labelledby="hero-quick-start-title">
      <PanelHeader />

      <div className="space-y-3.5 px-4 pb-4 sm:px-5 sm:pb-5">
        <FeaturedToolCard />

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {HERO_COPY.quickStartToolsLabel}
          </p>
          <ul className="divide-y divide-white/[0.05] overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.015]">
            {HERO_QUICK_START_TOOLS.map((tool) => (
              <ToolRow key={tool.id} tool={tool} />
            ))}
          </ul>
        </div>

        <WorkflowStrip />
      </div>
    </aside>
  );
}
