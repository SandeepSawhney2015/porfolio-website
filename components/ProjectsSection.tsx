"use client";

import Image from "next/image";
import { useMemo } from "react";

type Project = {
  title: string;
  description: string;
  contribution: string; // what you worked on / collaborative note
  updated: string; // e.g. "Jan 2026"
  href: string; // github/demo link
  imageSrc: string; // /projects/xyz.png or .jpg

  // OPTIONAL: image that crossfades in when hovering the IMAGE only
  hoverImageSrc?: string; // e.g. "/explain_heatmap.png" (from /public)
};

function ProjectCard({ project }: { project: Project }) {
  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    // Pointer position within the card (0..1)
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Convert to -0.5..0.5
    const dx = px - 0.5;
    const dy = py - 0.5;

    // Tilt strength (tune)
    const max = 7; // degrees

    // rotateY responds to x, rotateX responds to y (inverted feels natural)
    const rotY = dx * max * 2;
    const rotX = -dy * max * 2;

    el.style.setProperty("--rx", `${rotX.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${rotY.toFixed(2)}deg`);
    el.style.setProperty("--scale", `1.02`);
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--scale", `1`);
  };

  return (
    <a
      className="projectCard"
      href={project.href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={`Open ${project.title}`}
    >
      <div className="projectText">
        <div className="projectTitle">{project.title}</div>

        <div className="projectDesc">{project.description}</div>

        <div className="projectMeta">
          <div className="projectMetaRow">
            <span className="projectMetaLabel">What I worked on:</span>
            <span className="projectMetaValue">{project.contribution}</span>
          </div>

          <div className="projectMetaRow">
            <span className="projectMetaLabel">Last updated:</span>
            <span className="projectMetaValue">{project.updated}</span>
          </div>
        </div>
      </div>

      <div className="projectImageWrap">
        {project.hoverImageSrc ? (
          <div className="projectImageSwap" aria-label={`${project.title} image preview`}>
            <Image
              src={project.imageSrc}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 900px) 100vw, 420px"
              className="projectImage projectImageBase"
            />
            <Image
              src={project.hoverImageSrc}
              alt={`${project.title} heatmap preview`}
              fill
              sizes="(max-width: 900px) 100vw, 420px"
              className="projectImage projectImageHover"
            />
          </div>
        ) : (
          <Image
            src={project.imageSrc}
            alt={`${project.title} preview`}
            width={420}
            height={260}
            className="projectImage"
          />
        )}
      </div>
    </a>
  );
}

export default function ProjectsSection() {
  const projects = useMemo<Project[]>(
    () => [
      {
        title: "Pokemon Card Identifier",
        description:
          "Taking in a test image, this pipeline is designed to pick at which card from its database is most similar to the card the user parsed in. It is ready for deployment to send packages, this will be developed soon. This uses an available testing dataset of over 13k pokemon cards.",
        contribution: "Entire project.",
        updated: "Jan 2026",
        href: "https://github.com/SandeepSawhney2015/Pokemon-Card-Identifier",
        imageSrc: "/projects/explain_overlay.png",
        // NOTE: this is in /public (root), per your message
        hoverImageSrc: "/projects/explain_heatmap.png",
      },
      {
        title: "MatchedIn",
        description:
          "A LinkedIn based product that utilizes public datasets and you resume to give you tailored connections, improving your network and possibly getting you a job!",
        contribution:
          "Built the core AI service using a KNN model technique vectorizing both you and the professionals to adequently predict and calculate top 50 most compatible profiles.",
        updated: "Jan 2026",
        href: "https://matchedin.xtracube.dev/",
        imageSrc: "/projects/MatchedIn_Logo.png",
      },
      {
        title: "Monkey Meme Classifier",
        description:
          "A developed OpenCV based model to predict if you make my favorite meme poses using mediapipe.",
        contribution:
          "I helped develop the dataset of over 1000+ images and build the AI service.",
        updated: "Dec 2025",
        href: "https://github.com/SandeepSawhney2015/MonkeyesInParis",
        imageSrc: "/projects/MonkeyesInParis.png",
      },
    ],
    []
  );

  return (
    <section id="projects" className="projectsSection sectionAnchor">
      <div className="projectsHeader">
        <h2 className="projectsTitle">Projects</h2>
        <p className="projectsSubtitle">
          A few things I’ve built—click any card to view the repo or demo.
        </p>
      </div>

      <div className="projectsGrid">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}