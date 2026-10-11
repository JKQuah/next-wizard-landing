"use client";

import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "lucide-react";
import { Fragment, useState } from "react";

import {
  groupIconName,
  groupIcons,
} from "@/components/sections/curriculum/group-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { interpolate } from "@/i18n/format";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type Syllabus = Dictionary["curriculumPage"]["syllabus"];
type Ui = Syllabus["ui"];
type Level = Syllabus["levels"][number];
type Topic = Level["topics"][number];

const INTRO_PREVIEW = 2;

/** "P3 Math: Numbers" -> "Numbers"; "小三数学：数" -> "数". */
const shortTopic = (title: string) => {
  const parts = title.split(/[:：]/);
  return parts.length > 1 ? parts.slice(1).join(":").trim() : title;
};

/** Wraps case-insensitive matches of `query` in <mark>. */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return text;
  const lower = text.toLowerCase();
  const needle = query.toLowerCase();
  const parts: { value: string; hit: boolean }[] = [];
  let from = 0;
  for (
    let at = lower.indexOf(needle);
    at !== -1;
    at = lower.indexOf(needle, from)
  ) {
    if (at > from) parts.push({ value: text.slice(from, at), hit: false });
    parts.push({ value: text.slice(at, at + needle.length), hit: true });
    from = at + needle.length;
  }
  if (from < text.length) parts.push({ value: text.slice(from), hit: false });

  return parts.map((part, i) =>
    part.hit ? (
      <mark key={i} className="rounded bg-secondary-300 px-0.5 text-primary">
        {part.value}
      </mark>
    ) : (
      <Fragment key={i}>{part.value}</Fragment>
    ),
  );
}

type GroupCardProps = {
  title: string;
  skills: string[];
  query: string;
  /** Shown in search results so a skill can be traced to its topic. */
  topicLabel?: string;
};

/** Icon tile colours; picked from the title so a group keeps its colour everywhere. */
const iconTones = [
  "bg-secondary-300/60",
  "bg-primary-300/60",
  "bg-secondary-400/60",
];

function GroupCard({ title, skills, query, topicLabel }: GroupCardProps) {
  const Icon = groupIcons[groupIconName(title)];
  const tone =
    iconTones[
      [...title].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) %
        iconTones.length
    ];

  return (
    <li className="mb-4 break-inside-avoid rounded-3xl border-2 border-primary-300/50 bg-white p-5 shadow-clay">
      {topicLabel && (
        <p className="mb-2 text-xs font-extrabold tracking-wide text-muted-foreground uppercase">
          {topicLabel}
        </p>
      )}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h5 className="text-lg leading-snug font-extrabold text-primary">
          <Highlight text={title} query={query} />
        </h5>
        <span
          aria-hidden="true"
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-2xl text-primary",
            tone,
          )}
        >
          <Icon className="size-6" />
        </span>
      </div>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-primary/85"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-secondary-500 text-primary"
            >
              <CheckIcon className="size-3" strokeWidth={3.5} />
            </span>
            <span>
              <Highlight text={skill} query={query} />
            </span>
          </li>
        ))}
      </ul>
    </li>
  );
}

const groupsGrid = "columns-1 gap-4 sm:columns-2 lg:columns-3";

function TopicView({ topic }: { topic: Topic }) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h4 className="text-xl font-extrabold text-primary">{topic.title}</h4>
        {topic.description.map((text) => (
          <p
            key={text}
            className="max-w-3xl text-base leading-relaxed text-muted-foreground"
          >
            {text}
          </p>
        ))}
      </div>
      <ul className={groupsGrid}>
        {topic.groups.map((group) => (
          <GroupCard
            key={group.title}
            title={group.title}
            skills={group.skills}
            query=""
          />
        ))}
      </ul>
    </div>
  );
}

type LevelPanelProps = {
  level: Level;
  label: string;
  heading: string;
  ui: Ui;
  query: string;
};

function LevelPanel({ level, label, heading, ui, query }: LevelPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const { topics, intro } = level;

  const needle = query.trim().toLowerCase();
  const matches = needle
    ? topics.flatMap((topic) =>
        topic.groups
          .map((group) => {
            // A hit on the group name keeps all of that group's skills.
            const groupHit = group.title.toLowerCase().includes(needle);
            const skills = groupHit
              ? group.skills
              : group.skills.filter((skill) =>
                  skill.toLowerCase().includes(needle),
                );
            return { topic, group, skills };
          })
          .filter((match) => match.skills.length > 0),
      )
    : [];
  const matchCount = matches.reduce((n, match) => n + match.skills.length, 0);

  const visibleIntro = expanded ? intro : intro.slice(0, INTRO_PREVIEW);

  return (
    <div className="animate-in space-y-8 fade-in-0 slide-in-from-bottom-2 duration-300">
      <div className="space-y-5 rounded-3xl bg-white p-6 shadow-clay ring-1 ring-primary-300/50 md:p-8">
        <div>
          <h3 className="text-2xl font-black text-primary md:text-3xl">
            {interpolate(heading, { level: label })}
          </h3>
        </div>

        {intro.length > 0 && !needle && (
          <div className="space-y-3 border-l-4 border-secondary-500 pl-4 text-base leading-relaxed text-muted-foreground">
            {visibleIntro.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {intro.length > INTRO_PREVIEW && (
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded((value) => !value)}
                className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg font-extrabold text-primary underline decoration-secondary-500 decoration-2 underline-offset-4 hover:text-secondary-500 focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                {expanded ? ui.readLess : ui.readMore}
                <ChevronDownIcon
                  aria-hidden="true"
                  className={cn(
                    "size-4 transition-transform duration-200",
                    expanded && "rotate-180",
                  )}
                />
              </button>
            )}
          </div>
        )}
      </div>

      {needle ? (
        <div className="space-y-5">
          <p aria-live="polite" className="text-base font-bold text-primary">
            {matchCount > 0
              ? interpolate(ui.results, { count: matchCount, level: label })
              : interpolate(ui.noResults, { query: query.trim() })}
          </p>
          {matchCount > 0 && (
            <ul className={groupsGrid}>
              {matches.map(({ topic, group, skills }) => (
                <GroupCard
                  key={`${topic.title}-${group.title}`}
                  title={group.title}
                  skills={skills}
                  query={needle}
                  topicLabel={
                    topics.length > 1 ? shortTopic(topic.title) : undefined
                  }
                />
              ))}
            </ul>
          )}
        </div>
      ) : topics.length > 1 ? (
        <Tabs defaultValue="t0" className="gap-6">
          <TabsList
            aria-label={ui.topicNav}
            className="group-data-horizontal/tabs:h-auto h-auto w-full flex-wrap justify-start gap-2 rounded-none bg-transparent p-0"
          >
            {topics.map((topic, i) => (
              <TabsTrigger
                key={topic.title}
                value={`t${i}`}
                className={[
                  "h-auto min-h-11 flex-none cursor-pointer gap-2 rounded-full border-2 px-4 py-2 text-base font-bold whitespace-normal",
                  "border-primary-300/60 bg-white text-primary transition-[background-color,border-color,color,transform] duration-200 ease-out hover:bg-accent hover:text-primary active:scale-[0.97]",
                  "data-active:border-primary-500 data-active:bg-primary-500 data-active:text-white data-active:hover:bg-primary-500 data-active:hover:text-white",
                  "focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:ring-offset-2 after:hidden",
                ].join(" ")}
              >
                {shortTopic(topic.title)}
              </TabsTrigger>
            ))}
          </TabsList>

          {topics.map((topic, i) => (
            <TabsContent
              key={topic.title}
              value={`t${i}`}
              className="outline-none"
            >
              <div className="animate-in fade-in-0 slide-in-from-bottom-1 duration-200">
                <TopicView topic={topic} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        topics.map((topic) => <TopicView key={topic.title} topic={topic} />)
      )}
    </div>
  );
}

export function SyllabusExplorer({
  syllabus,
  levelLabels,
}: {
  syllabus: Syllabus;
  levelLabels: string[];
}) {
  const { ui, levels, heading } = syllabus;
  const [query, setQuery] = useState("");

  return (
    <Tabs defaultValue="p1" className="gap-6">
      <TabsList className="group-data-horizontal/tabs:h-auto grid h-auto w-full grid-cols-2 gap-3 rounded-none bg-transparent p-0 sm:grid-cols-3 lg:grid-cols-6">
        {levelLabels.map((label, i) => {
          return (
            <TabsTrigger
              key={label}
              value={`p${i + 1}`}
              className={[
                "group/tab h-auto min-h-14 cursor-pointer justify-start gap-3 rounded-2xl border-2 px-3 py-2.5 text-left text-base font-extrabold whitespace-normal",
                "border-primary-300/60 bg-white text-primary shadow-clay",
                "transition-[transform,box-shadow,background-color,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-500/50 hover:bg-accent hover:text-primary hover:shadow-clay-hover",
                "active:translate-y-0 active:scale-[0.98]",
                "data-active:border-primary-500 data-active:bg-primary-500 data-active:text-white group-data-[variant=default]/tabs-list:data-active:shadow-clay-hover data-active:hover:bg-primary-500 data-active:hover:text-white",
                "focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:ring-offset-2 after:hidden",
              ].join(" ")}
            >
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary-500 text-base font-black text-primary"
              >
                {i + 1}
              </span>
              <span className="min-w-0 leading-tight">{label}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      <div role="search" className="relative">
        <label htmlFor="syllabus-search" className="sr-only">
          {ui.searchLabel}
        </label>
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-primary/60"
        />
        <input
          id="syllabus-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={ui.searchPlaceholder}
          autoComplete="off"
          className="block w-full rounded-full border-2 border-primary-300/60 bg-white py-3 pr-12 pl-12 text-base text-primary shadow-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-ring/25"
        />
        {query && (
          <button
            type="button"
            aria-label={ui.clear}
            onClick={() => setQuery("")}
            className="absolute top-1/2 right-2 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-primary hover:bg-accent focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            <XIcon aria-hidden="true" className="size-5" />
          </button>
        )}
      </div>

      {levels.map((level, i) => (
        <TabsContent
          key={levelLabels[i]}
          value={`p${i + 1}`}
          className="outline-none"
        >
          <LevelPanel
            level={level}
            label={levelLabels[i]}
            heading={heading}
            ui={ui}
            query={query}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
