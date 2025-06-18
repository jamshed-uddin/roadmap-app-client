import RoadmapItems from "@/components/RoadmapItems";
import { ItemType } from "@/definition";
import React from "react";

const roadmaps: {
  id: string;
  title: string;
  description: string;
  items: ItemType[];
}[] = [
  {
    id: "roadmap_fe",
    title: "Frontend Developer",
    description:
      "A step-by-step guide to becoming a skilled frontend developer by learning the foundational web technologies and modern frameworks.",
    items: [
      {
        id: "html_css",
        title: "HTML & CSS",
        type: "topic",
        subtopicTo: null,
        description:
          "Start your frontend journey by mastering HTML and CSS, the building blocks of the web. HTML defines the structure of web content using semantic tags, while CSS controls the appearance and layout. Together, they form the core skills required to build accessible and visually appealing web pages.",
        items: [
          {
            id: "semantic_html",
            title: "Semantic HTML",
            type: "subtopic",
            subtopicTo: "html_css",
            description:
              "Semantic HTML refers to using HTML5 elements that clearly describe their meaning in a human- and machine-readable way. Elements like <article>, <section>, and <nav> help improve accessibility, SEO, and maintainable code by giving clear structure to your content.",
            items: [],
          },
          {
            id: "accessibility",
            title: "Accessibility Basics",
            type: "subtopic",
            subtopicTo: "html_css",
            description:
              "Accessibility ensures that your websites are usable by people with disabilities. It involves using semantic HTML, proper contrast ratios, alt attributes for images, keyboard navigation, and ARIA labels to create inclusive digital experiences.",
            items: [],
          },
        ],
      },
      {
        id: "javascript",
        title: "JavaScript",
        type: "topic",
        subtopicTo: null,
        description:
          "JavaScript brings interactivity to the web. It enables dynamic content updates, form validation, API requests, and more. Learning JavaScript fundamentals is crucial for understanding how websites behave and how to manipulate elements on the page.",
        items: [
          {
            id: "es6",
            title: "ES6+ Syntax",
            type: "subtopic",
            subtopicTo: "javascript",
            description:
              "ES6 introduced modern features like arrow functions, template literals, destructuring, spread/rest operators, and modules. Understanding ES6+ syntax improves code readability, reduces boilerplate, and is essential for working with modern libraries and frameworks.",
            items: [],
          },
          {
            id: "async_js",
            title: "Async JavaScript",
            type: "subtopic",
            subtopicTo: "javascript",
            description:
              "Async JavaScript includes promises, async/await, and fetch API. It allows you to handle time-consuming operations like API calls or timers without freezing the browser. Mastering async patterns is crucial for building smooth and responsive applications.",
            items: [],
          },
        ],
      },
      {
        id: "frameworks",
        title: "Frameworks",
        type: "topic",
        subtopicTo: null,
        description:
          "Frameworks simplify complex frontend development by offering structure and reusable components. They help manage state, routing, rendering, and performance. Knowing at least one major frontend framework is expected in most modern web dev jobs.",
        items: [
          {
            id: "react",
            title: "React",
            type: "subtopic",
            subtopicTo: "frameworks",
            description:
              "React is a component-based JavaScript library for building user interfaces. It uses a virtual DOM to efficiently update the UI, and hooks to manage state and lifecycle. Its popularity, ecosystem, and community make it a top choice for modern frontend development.",
            items: [],
          },
          {
            id: "vue",
            title: "Vue",
            type: "subtopic",
            subtopicTo: "frameworks",
            description:
              "Vue is a progressive framework for building user interfaces. It is approachable, integrates easily with projects, and offers features like reactive data binding, directives, and a simple component model. Ideal for both small apps and large-scale projects.",
            items: [],
          },
        ],
      },
    ],
  },
];

const RoadmapDetailPage = async ({
  params,
}: {
  params: Promise<{ roadmapId: string }>;
}) => {
  const { roadmapId } = await params;
  const roadmap = roadmaps.find((roadmap) => roadmap.id === roadmapId);

  return (
    <div>
      <div className="mb-3">
        <h4 className="text-3xl font-medium">{roadmap?.title}</h4>
        <p className="text-lg">{roadmap?.description}</p>
      </div>

      <div className="mt-10">
        <RoadmapItems items={roadmap?.items as ItemType[]} />
      </div>
    </div>
  );
};

export default RoadmapDetailPage;
