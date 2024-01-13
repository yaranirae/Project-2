const data = {
  name: "web",
  id: 1,
  description: "",
  isOpen: false,
  subData: [
    {
      name: "design",
      id:2,
      description:
        '"Design" is the process of creating and planning something with attention to both function and aesthetics.',
      isOpen: false,
      subData: [
        {
          name: "html",
          id:3,
          description:
            "HTML, or HyperText Markup Language, is a coding language for creating and structuring web pages on the internet.",
          isOpen: false,
          subData: [],
        },
        {
          name: "css",
          id:4,
          description: "CSS, Cascading Style Sheets is a language that styles and formats HTML documents, determining their visual presentation on web pages.",     
          isOpen: false,
          subData: [
            { name: "sass", id:5, description: "Sass, short for Syntactically Awesome Stylesheets, enhances CSS with features like variables, nesting, and functions for more efficient stylesheet development.", isOpen: false, subData: [] },
            { name: "bootstrap", id:6,description: "Bootstrap is a front-end framework for web development, providing pre-designed components and responsive layout tools.", isOpen: false, subData: [] },
          ],
        },
      ],
    },
    {
      name: "Development",
      id:7,
      description: "Development involves designing, coding, and creating software or systems, often emphasizing technical implementation and programming.",
      isOpen: false,
      subData: [
        { name: "Sitemap", id:8, description: "A sitemap is a file listing website URLs for search engines.", isOpen: false, subData: [] },
        { name: "Wireframes",id:9, description: "Wireframes are visual guides outlining the structure of a webpage.", isOpen: false, subData: [] },
        {
          name: "UseCaseDiagram",
          id:10,
          description: "A use case diagram illustrates interactions between a system and actors.",
          isOpen: false,
          subData: [
            { name: "ERD",id:11, description: "ERD, or Entity Relationship Diagram, models relationships between database entities.", isOpen: false, subData: [] }
          ],
        },
        {
          name: "Frontend",
          id:12,
          description: "Frontend is the user interface and client-side of web development.",
          isOpen: false,
          subData: [
            {
              name: "JavaScript",
              id:13,
              description: "JavaScript is a scripting language for web development and interactivity.",
              isOpen: false,
              subData: [
                { name: "React", id:14,description: "React is a JavaScript library for building user interfaces efficiently.", isOpen: false, subData: [] },
                {
                  name: "Angular",
                  id:15,
                  description: "Angular is a TypeScript-based web application framework for building dynamic websites.",
                  isOpen: false,
                  subData: [],
                },
                { name: "vue", id:16,description: "Vue is a progressive JavaScript framework for building user interfaces.", isOpen: false, subData: [] },
              ],
            },
          ],
        },
        {
          name: "backend",
          id:17,
          description: "Backend is the server-side of web development, handling data and logic.",
          isOpen: false,
          subData: [
            { name: "java", id:18, description: "Java is a versatile programming language for various software applications.", isOpen: false, subData: [] },
            {
              name: "javascript",
              id:19,
              description: "JavaScript is a scripting language for web development and interactivity.",
              isOpen: false,
              subData: [
                {
                  name: "nodejs",
                  id:20,
                  description:"Node.js is a JavaScript runtime for server-side application development.",
                  isOpen: false,
                  subData: [{ name: "express", id:21, description: "Express is a web application framework for Node.js, simplifying development.",isOpen: false, subData: [] }],
                },
              ],
            },
            { name: "DotNET", id:22, description: "C# is a programming language for building Windows applications and more.", isOpen: false, subData: [] },
          ],
        },
      ],
    },
  ],
};

export default data;
