import React from "react";
import styles from "../About.module.css";

export interface BoardMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image?: string; // optional image path
  initials?: string; // fallback if no image
}

const members: BoardMember[] = [
  {
    id: 1,
    name: "Sarah Ahmed",
    title: "President",
    bio: "Leads strategic direction and oversees all organizational initiatives.",
    initials: "SA",
  },
  {
    id: 2,
    name: "Omar Khaled",
    title: "Vice President",
    bio: "Supports executive vision, coordination across core teams, and innovation.",
    initials: "OK",
  },
  {
    id: 3,
    name: "Layla Hassan",
    title: "Operations Lead",
    bio: "Optimizes processes and drives operational excellence across chapters.",
    initials: "LH",
  },
  {
    id: 4,
    name: "Youssef Nabil",
    title: "Finance Director",
    bio: "Champions sustainable budgeting and transparent financial stewardship.",
    initials: "YN",
  },
  {
    id: 5,
    name: "Maya Farouk",
    title: "Marketing Head",
    bio: "Crafts the narrative and elevates the brand through storytelling.",
    initials: "MF",
  },
  {
    id: 6,
    name: "Karim Said",
    title: "Projects Lead",
    bio: "Guides impactful social projects from ideation to measurable outcomes.",
    initials: "KS",
  },
  {
    id: 7,
    name: "Nour Adel",
    title: "HR & Talent",
    bio: "Focuses on people growth, culture, and leadership development.",
    initials: "NA",
  },
];

interface BoardWheelProps {
  radius?: number; // circle radius in px
  rotateSeconds?: number; // full rotation duration
}

const BoardWheel: React.FC<BoardWheelProps> = ({
  radius = 210,
  rotateSeconds = 35,
}) => {
  return (
    <div
      className={styles.wheelWrapper}
      style={{ ["--wheel-duration" as any]: `${rotateSeconds}s` }}
    >
      <ul
        className={styles.wheel}
        style={{ ["--radius" as any]: `${radius}px` }}
      >
        {members.map((m, idx) => {
          const angle = (360 / members.length) * idx;
          return (
            <li
              key={m.id}
              className={styles.member}
              style={{ ["--angle" as any]: `${angle}deg` }}
            >
              <div className={styles.card}>
                <div className={styles.avatar} aria-hidden="true">
                  {m.image ? (
                    <img src={m.image} alt={m.name} />
                  ) : (
                    <span>{m.initials}</span>
                  )}
                </div>
                <div className={styles.caption}>
                  <h3>{m.name}</h3>
                  <h4>{m.title}</h4>
                  <p>{m.bio}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BoardWheel;
