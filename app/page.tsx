"use client";

import Image from "next/image";
import { useState } from "react";
import TypingText from "@/components/TypingText";
import CyclingActivities from "@/components/CyclingActivities";
import ProjectsSection from "@/components/ProjectsSection";


export default function Home() {
  // Controls the typing sequence order (name -> uni -> major -> grad -> activities label/value)
  const [step, setStep] = useState(0);

  return (
    <main className="landing">
      <section id="home" className="landing sectionAnchor">
        <div className="landingStack">
          <h1 className="landingName">
            <TypingText
              text="Sandeep Sawhney"
              sessionKey="typed_name"
              speedMs={65}
              startDelayMs={150}
              onDone={() => setStep((s) => Math.max(s, 1))}
            />
          </h1>

          <div className="landingInfo">
            {step >= 1 && (
              <div className="infoLine">
                <span className="infoLabel">University:</span>
                <span className="infoValue">
                  <TypingText
                    text="University of Michigan"
                    sessionKey="typed_university"
                    speedMs={40}
                    startDelayMs={120}
                    onDone={() => setStep((s) => Math.max(s, 2))}
                  />
                </span>
              </div>
            )}

            {step >= 2 && (
              <div className="infoLine">
                <span className="infoLabel">Major:</span>
                <span className="infoValue">
                  <TypingText
                    text="Computer Engineering"
                    sessionKey="typed_major"
                    speedMs={40}
                    startDelayMs={90}
                    onDone={() => setStep((s) => Math.max(s, 3))}
                  />
                </span>
              </div>
            )}

            {step >= 3 && (
              <div className="infoLine">
                <span className="infoLabel">Anticipated Graduation:</span>
                <span className="infoValue">
                  <TypingText
                    text="2029"
                    sessionKey="typed_grad"
                    speedMs={55}
                    startDelayMs={90}
                    onDone={() => setStep((s) => Math.max(s, 4))}
                  />
                </span>
              </div>
            )}

            {step >= 4 && (
              <div className="infoLine">
                <span className="infoLabel">Specialization:</span>
                <span className="infoValue">
                  <TypingText
                    text="AI/ML"
                    sessionKey="typed_spec"
                    speedMs={55}
                    startDelayMs={90}
                    onDone={() => setStep((s) => Math.max(s, 5))}
                  />
                </span>
              </div>
            )}

            {step >= 5 && (
              <div className="infoLine">
                <span className="infoLabel">Activities/Hobbies:</span>
                <span className="infoValue">
                  {/* Activities keeps cycling/typing once we reach this step */}
                  <CyclingActivities />
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="hackathonSection">
        <div className="hackathonLine" />

        <div className="hackathonHeader">
          <h2 className="hackathonTitle">Hackathons!</h2>
        </div>

        <div className="marquee">
          <div className="marqueeTrack">
            {/* Group A */}
            <div className="marqueeGroup">
              {Array.from({ length: 11 }).map((_, i) => (
                <img
                  key={`a-${i}`}
                  className="marqueeImg"
                  src={`/hackathons/${i + 1}.jpg`}
                  alt={`Me at a hackathon ${i + 1}`}
                />
              ))}
            </div>

            {/* Group B (duplicate of A for seamless loop) */}
            <div className="marqueeGroup" aria-hidden="true">
              {Array.from({ length: 11 }).map((_, i) => (
                <img
                  key={`b-${i}`}
                  className="marqueeImg"
                  src={`/hackathons/${i + 1}.jpg`}
                  alt=""
                />
              ))}
            </div>
          </div>
        </div>
        <div className="hackathonLine" />
      </section>


      {/* ABOUT ME */}
      <section id="about" className="aboutSection sectionAnchor">
        <div className="aboutCard">
          <div className="aboutText">
            <h2 className="aboutTitle">About Me!</h2>
            <p className="aboutPara">
              I’m a Computer Engineering student at the University of Michigan who enjoys building and understanding systems from the ground up. I’m naturally curious about how software, hardware, and data come together, and I’m especially drawn to work that blends intelligent algorithms with real-world constraints.
            </p>
            <p className="aboutPara">
              My interests span artificial intelligence and machine learning, embedded systems, and research-driven engineering. I enjoy learning by doing—experimenting, iterating, and refining ideas until they work cleanly and reliably. Whether I’m exploring new technologies, collaborating on technical projects, or thinking through complex problems, I value clarity, intentional design, and thoughtful execution.
            </p>
            <p className="aboutPara">
              Outside of academics, I care a lot about balance and growth. I enjoy staying active, working on creative side projects, and spending time on things that challenge me in different ways. I’m motivated by curiosity and a desire to build meaningful, well-crafted solutions, and I’m always excited to learn from and connect with others who share that mindset.
            </p>
          </div>
          <div className="aboutPhotoColumn">
            <div className="aboutPhotoWrap">
              <Image
                src="/me.jpg"
                alt="Photo of me"
                width={420}
                height={520}
                className="aboutPhoto"
              />
            </div>

            <a
              href="mailto:ssawhney@umich.edu"
              className="ctaButton"
            >
              Contact Me →
            </a>
          </div>
        </div>
      </section>
      {/* PROJECTS placeholder */}
      <section id="projects" className="projectsSection sectionAnchor">
        <ProjectsSection />
      </section>
    </main>
  );
}
