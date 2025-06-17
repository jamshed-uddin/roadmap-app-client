import Link from "next/link";
import React from "react";

const roadmaps = [
  {
    id: "roadmap_fe",
    title: "Frontend Developer",
    description: "A step-by-step guide to becoming a frontend developer.",
    items: [
      {
        id: "html_css",
        title: "HTML & CSS",
        type: "topic",
        subtopicTo: null,
        items: [
          {
            id: "semantic_html",
            title: "Semantic HTML",
            type: "subtopic",
            subtopicTo: "html_css",
            items: [],
          },
          {
            id: "accessibility",
            title: "Accessibility Basics",
            type: "subtopic",
            subtopicTo: "html_css",
            items: [],
          },
        ],
      },
      {
        id: "javascript",
        title: "JavaScript",
        type: "topic",
        subtopicTo: null,
        items: [
          {
            id: "es6",
            title: "ES6+ Syntax",
            type: "subtopic",
            subtopicTo: "javascript",
            items: [],
          },
          {
            id: "async_js",
            title: "Async JavaScript",
            type: "subtopic",
            subtopicTo: "javascript",
            items: [],
          },
        ],
      },
      {
        id: "frameworks",
        title: "Frameworks",
        type: "topic",
        subtopicTo: null,
        items: [
          {
            id: "react",
            title: "React",
            type: "subtopic",
            subtopicTo: "frameworks",
            items: [],
          },
          {
            id: "vue",
            title: "Vue",
            type: "subtopic",
            subtopicTo: "frameworks",
            items: [],
          },
        ],
      },
    ],
  },

  {
    id: "roadmap_fs",
    title: "Full Stack Developer",
    description:
      "Learn both frontend and backend to become a full stack developer.",
    items: [
      {
        id: "frontend",
        title: "Frontend",
        type: "topic",
        subtopicTo: null,
        items: [
          {
            id: "react_fs",
            title: "React Fundamentals",
            type: "subtopic",
            subtopicTo: "frontend",
            items: [],
          },
          {
            id: "vue_fs",
            title: "Vue Basics",
            type: "subtopic",
            subtopicTo: "frontend",
            items: [],
          },
        ],
      },
      {
        id: "backend",
        title: "Backend",
        type: "topic",
        subtopicTo: null,
        items: [
          {
            id: "nodejs",
            title: "Node.js",
            type: "subtopic",
            subtopicTo: "backend",
            items: [],
          },
          {
            id: "express",
            title: "Express.js",
            type: "subtopic",
            subtopicTo: "backend",
            items: [],
          },
          {
            id: "auth",
            title: "Authentication",
            type: "subtopic",
            subtopicTo: "backend",
            items: [],
          },
        ],
      },
      {
        id: "database",
        title: "Databases",
        type: "topic",
        subtopicTo: null,
        items: [
          {
            id: "mongodb",
            title: "MongoDB",
            type: "subtopic",
            subtopicTo: "database",
            items: [],
          },
          {
            id: "sql",
            title: "SQL Basics",
            type: "subtopic",
            subtopicTo: "database",
            items: [],
          },
        ],
      },
    ],
  },

  {
    id: "roadmap_uiux",
    title: "UI/UX Designer",
    description: "Master the skills needed to design great user experiences.",
    items: [
      {
        id: "ux_research",
        title: "UX Research",
        type: "topic",
        subtopicTo: null,
        items: [
          {
            id: "user_persona",
            title: "User Personas",
            type: "subtopic",
            subtopicTo: "ux_research",
            items: [],
          },
          {
            id: "usability_testing",
            title: "Usability Testing",
            type: "subtopic",
            subtopicTo: "ux_research",
            items: [],
          },
        ],
      },
      {
        id: "ui_design",
        title: "UI Design",
        type: "topic",
        subtopicTo: null,
        items: [
          {
            id: "color_theory",
            title: "Color Theory",
            type: "subtopic",
            subtopicTo: "ui_design",
            items: [],
          },
          {
            id: "typography",
            title: "Typography",
            type: "subtopic",
            subtopicTo: "ui_design",
            items: [],
          },
        ],
      },
      {
        id: "tools",
        title: "Design Tools",
        type: "topic",
        subtopicTo: null,
        items: [
          {
            id: "figma",
            title: "Figma Basics",
            type: "subtopic",
            subtopicTo: "tools",
            items: [],
          },
          {
            id: "adobe_xd",
            title: "Adobe XD",
            type: "subtopic",
            subtopicTo: "tools",
            items: [],
          },
        ],
      },
    ],
  },
];

const Roadmaps = () => {
  return (
    <div>
      <h2 className="text-center text-lg mb-4">Roadmaps</h2>
      <div className="flex gap-4 justify-center flex-wrap">
        {roadmaps.map((roadmap) => (
          <Link
            href={`/roadmaps/${roadmap.id}`}
            key={roadmap.id}
            className="border border-slate-800 rounded-xl px-3 py-1.5"
          >
            <h3>{roadmap.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Roadmaps;
