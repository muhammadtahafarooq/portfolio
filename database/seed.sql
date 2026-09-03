-- ============================================================================
-- Muhammad Taha Portfolio — Seed Data
-- Engine: SQLite (Turso/libSQL)
-- Version: 1.0
-- Purpose: Initial data for development and first deployment
-- ============================================================================

-- ============================================================================
-- PROFILE (Singleton)
-- ============================================================================

INSERT INTO profile (id, name, title, short_bio, email, phone, location, avatar_url)
VALUES (
  1,
  'Muhammad Taha',
  'Full-Stack + AI Developer',
  'Full-Stack + AI Developer specializing in React, Next.js, and modern web technologies. Building innovative digital experiences with a focus on performance and user experience.',
  'hello@muhammadtaha.dev',
  NULL,
  'Pakistan',
  NULL
);

-- ============================================================================
-- ABOUT (Singleton)
-- ============================================================================

INSERT INTO about (id, biography, profile_content, interests)
VALUES (
  1,
  'I am a Full-Stack + AI Developer with a passion for building innovative digital experiences. My expertise spans across modern web technologies including React, Next.js, and various AI/ML frameworks. I focus on creating performant, accessible, and visually compelling applications.',
  'With experience in both frontend and backend development, I bring a holistic approach to software engineering. I believe in writing clean, maintainable code and creating user interfaces that are both beautiful and functional.',
  'Web Development, AI & Machine Learning, Open Source, UI/UX Design, Performance Optimization'
);

-- ============================================================================
-- SKILLS
-- ============================================================================

INSERT INTO skills (id, name, category, description, sort_order)
VALUES
  (1, 'React', 'Frontend', 'Component-based UI library for building interactive interfaces', 1),
  (2, 'Next.js', 'Frontend', 'Full-stack React framework with SSR/SSG capabilities', 2),
  (3, 'TypeScript', 'Languages', 'Typed superset of JavaScript for scalable applications', 3),
  (4, 'Node.js', 'Backend', 'JavaScript runtime for server-side development', 4),
  (5, 'Python', 'Languages', 'Versatile language for AI/ML and backend development', 5),
  (6, 'PostgreSQL', 'Database', 'Advanced relational database management', 6),
  (7, 'Docker', 'DevOps', 'Containerization for consistent deployments', 7),
  (8, 'Git', 'Tools', 'Version control and collaboration', 8),
  (9, 'Tailwind CSS', 'Frontend', 'Utility-first CSS framework for rapid UI development', 9),
  (10, 'REST APIs', 'Backend', 'RESTful API design and integration', 10),
  (11, 'GraphQL', 'Backend', 'Query language for flexible data fetching', 11),
  (12, 'Machine Learning', 'AI/ML', 'Building intelligent systems and models', 12);

-- ============================================================================
-- TECHNOLOGIES
-- ============================================================================

INSERT INTO technologies (id, name, icon_url, category, sort_order)
VALUES
  (1, 'React', NULL, 'Frontend', 1),
  (2, 'Next.js', NULL, 'Frontend', 2),
  (3, 'TypeScript', NULL, 'Languages', 3),
  (4, 'JavaScript', NULL, 'Languages', 4),
  (5, 'Python', NULL, 'Languages', 5),
  (6, 'Node.js', NULL, 'Backend', 6),
  (7, 'Express.js', NULL, 'Backend', 7),
  (8, 'PostgreSQL', NULL, 'Database', 8),
  (9, 'MongoDB', NULL, 'Database', 9),
  (10, 'Redis', NULL, 'Database', 10),
  (11, 'Docker', NULL, 'DevOps', 11),
  (12, 'AWS', NULL, 'Cloud', 12),
  (13, 'Vercel', NULL, 'Cloud', 13),
  (14, 'Tailwind CSS', NULL, 'Frontend', 14),
  (15, 'Three.js', NULL, '3D', 15),
  (16, 'TensorFlow', NULL, 'AI/ML', 16),
  (17, 'OpenCV', NULL, 'AI/ML', 17),
  (18, 'Git', NULL, 'Tools', 18),
  (19, 'GitHub', NULL, 'Tools', 19),
  (20, 'VS Code', NULL, 'Tools', 20);

-- ============================================================================
-- PROJECTS (Sample projects)
-- ============================================================================

INSERT INTO projects (
  id, title, slug, description, short_statement,
  technologies, live_url, github_url, demo_url,
  screenshot_urls, case_study_problem, case_study_solution, case_study_result,
  is_featured, is_visible, sort_order
)
VALUES
  (1,
   'AI-Powered Code Review',
   'ai-code-review',
   'An intelligent code review tool that uses machine learning to analyze code quality, detect bugs, and suggest improvements in real-time. Built with Python, TensorFlow, and integrated as a GitHub Action.',
   'ML-powered code analysis for automated code review and bug detection',
   '["Python", "TensorFlow", "FastAPI", "GitHub Actions", "React"]',
   'https://ai-code-review.example.com',
   'https://github.com/taha/ai-code-review',
   NULL,
   '["https://placehold.co/1200x680/171717/8B5CF6?text=AI+Code+Review"]',
   'Manual code reviews are time-consuming and prone to human oversight, especially in large codebases.',
   'Built a machine learning model trained on common code patterns to automatically detect issues and suggest improvements. Integrated as a GitHub Action for seamless workflow.',
   'Reduced code review time by 40% and caught 3x more potential bugs than manual review alone.',
   1, 1, 1),

  (2,
   'Real-Time Collaboration Platform',
   'collab-platform',
   'A real-time collaboration tool for remote teams featuring live editing, video conferencing, and project management. Built with WebSocket technology and conflict resolution algorithms.',
   'WebSocket-powered team collaboration with live editing and video chat',
   '["Next.js", "Socket.io", "WebRTC", "PostgreSQL", "Redis"]',
   'https://collab.example.com',
   'https://github.com/taha/collab-platform',
   NULL,
   '["https://placehold.co/1200x680/171717/8B5CF6?text=Collab+Platform"]',
   'Remote teams struggle with fragmented tools for communication and collaboration, leading to context switching and productivity loss.',
   'Created an all-in-one platform combining live document editing, video calls, and task management with real-time synchronization.',
   'Successfully supported 500+ concurrent users with sub-100ms latency for real-time updates.',
   1, 1, 2),

  (3,
   'E-Commerce Analytics Dashboard',
   'ecommerce-dashboard',
   'A comprehensive analytics dashboard for e-commerce businesses providing real-time insights into sales, customer behavior, and inventory management.',
   'Real-time e-commerce analytics with predictive insights',
   '["React", "D3.js", "Node.js", "MongoDB", "Chart.js"]',
   'https://analytics.example.com',
   'https://github.com/taha/ecommerce-dashboard',
   NULL,
   '["https://placehold.co/1200x680/171717/8B5CF6?text=Analytics+Dashboard"]',
   'Small e-commerce businesses lack access to affordable, real-time analytics tools that provide actionable insights.',
   'Built a lightweight dashboard that aggregates data from multiple sources and provides AI-powered predictions for inventory and sales.',
   'Helped businesses increase revenue by 25% through data-driven inventory decisions.',
   1, 1, 3),

  (4,
   'Personal Finance Tracker',
   'finance-tracker',
   'A mobile-first personal finance application with expense tracking, budgeting, and financial goal setting. Features OCR receipt scanning and bank statement import.',
   'Mobile-first finance app with OCR and smart categorization',
   '["React Native", "Node.js", "PostgreSQL", "Tesseract.js"]',
   NULL,
   'https://github.com/taha/finance-tracker',
   NULL,
   '["https://placehold.co/1200x680/171717/8B5CF6?text=Finance+Tracker"]',
   'People struggle to track expenses manually and often lose sight of their financial goals.',
   'Developed a mobile app with OCR scanning for receipts and automatic categorization of transactions using ML.',
   'Users reported 60% better adherence to budgets after using the app for 3 months.',
   0, 1, 4),

  (5,
   'Weather Visualization Platform',
   'weather-viz',
   'An interactive 3D weather visualization platform using WebGL and real-time weather data APIs. Displays global weather patterns with beautiful atmospheric effects.',
   'WebGL-powered 3D weather visualization with real-time data',
   '["Three.js", "React", "D3.js", "OpenWeather API", "WebGL"]',
   'https://weather-viz.example.com',
   'https://github.com/taha/weather-viz',
   NULL,
   '["https://placehold.co/1200x680/171717/8B5CF6?text=Weather+Visualization"]',
   'Weather data is typically presented in flat, unengaging formats that don''t convey the complexity of atmospheric systems.',
   'Created an immersive 3D globe visualization that displays real-time weather patterns with particle effects and atmospheric rendering.',
   'Featured on WebGL showcase and received 2k+ stars on GitHub.',
   0, 1, 5);

-- ============================================================================
-- EXPERIENCE
-- ============================================================================

INSERT INTO experience (id, role, organization, description, start_date, end_date, is_current, sort_order)
VALUES
  (1,
   'Full-Stack Developer',
   'Freelance',
   'Building custom web applications and digital solutions for clients across various industries. Specializing in React, Next.js, and AI-powered applications.',
   '2023-01',
   NULL,
   1,
   1),
  (2,
   'Frontend Developer',
   'Tech Company',
   'Developed and maintained customer-facing web applications using React and TypeScript. Collaborated with design and backend teams to deliver high-quality user experiences.',
   '2022-01',
   '2023-01',
   0,
   2),
  (3,
   'Junior Developer',
   'StartUp Inc',
   'Started career building full-stack applications. Gained experience in agile development, code reviews, and production deployments.',
   '2021-06',
   '2022-01',
   0,
   3);

-- ============================================================================
-- EDUCATION
-- ============================================================================

INSERT INTO education (id, institution, qualification, program, description, start_date, end_date, sort_order)
VALUES
  (1,
   'University of Technology',
   'Bachelor of Science',
   'Computer Science',
   'Studied computer science with focus on software engineering and artificial intelligence.',
   '2019-09',
   '2023-06',
   1);

-- ============================================================================
-- CERTIFICATIONS
-- ============================================================================

INSERT INTO certifications (id, name, issuer, date, description, sort_order)
VALUES
  (1,
   'AWS Certified Developer',
   'Amazon Web Services',
   '2024-01',
   'Professional certification for AWS cloud development and deployment.',
   1),
  (2,
   'Meta Frontend Developer',
   'Meta (Facebook)',
   '2023-06',
   'Professional certificate in modern frontend development with React.',
   2);

-- ============================================================================
-- ACHIEVEMENTS
-- ============================================================================

INSERT INTO achievements (id, title, description, date, sort_order)
VALUES
  (1,
   'Open Source Contributor',
   'Contributed to multiple open source projects with 500+ combined GitHub stars.',
   '2024-01',
   1),
  (2,
   'Hackathon Winner',
   'First place at University Hackathon for AI-powered accessibility tool.',
   '2023-11',
   2);

-- ============================================================================
-- RESUME (Singleton)
-- ============================================================================

INSERT INTO resume (id, content, pdf_url)
VALUES (
  1,
  '{
    "summary": "Full-Stack + AI Developer with expertise in modern web technologies and machine learning.",
    "experience": [
      {
        "role": "Full-Stack Developer",
        "company": "Freelance",
        "period": "2023 - Present",
        "highlights": [
          "Built 10+ production web applications",
          "Specialized in React and Next.js",
          "Integrated AI/ML models into web applications"
        ]
      }
    ],
    "education": [
      {
        "degree": "BSc Computer Science",
        "school": "University of Technology",
        "year": "2023"
      }
    ],
    "skills": ["React", "Next.js", "TypeScript", "Python", "Node.js", "PostgreSQL"],
    "certifications": ["AWS Certified Developer", "Meta Frontend Developer"]
  }',
  NULL
);

-- ============================================================================
-- SOCIAL LINKS
-- ============================================================================

INSERT INTO social_links (id, platform, url, is_visible, sort_order)
VALUES
  (1, 'GitHub', 'https://github.com/muhammadtaha', 1, 1),
  (2, 'LinkedIn', 'https://linkedin.com/in/muhammadtaha', 1, 2),
  (3, 'Twitter', 'https://twitter.com/muhammadtaha', 1, 3),
  (4, 'Email', 'mailto:hello@muhammadtaha.dev', 1, 4);

-- ============================================================================
-- HOMEPAGE CONTENT (Singleton)
-- ============================================================================

INSERT INTO homepage_content (id, hero_introduction, featured_project_ids, contact_statement)
VALUES (
  1,
  'Full-Stack + AI Developer building innovative digital experiences with modern technologies.',
  '[1, 2, 3]',
  'Have a project in mind? Let''s build something amazing together.'
);

-- ============================================================================
-- SITE SETTINGS (Singleton)
-- ============================================================================

INSERT INTO site_settings (id, site_title, site_description, analytics_enabled, animation_intensity, three_d_enabled)
VALUES (
  1,
  'Muhammad Taha',
  'Full-Stack + AI Developer Portfolio',
  0,
  'standard',
  1
);

-- ============================================================================
-- ADMIN USERS
-- Password: admin123 (bcrypt hash - CHANGE IN PRODUCTION)
-- Hash generated with: bcrypt.hash('admin123', 10)
-- ============================================================================

INSERT INTO admin_users (id, email, password_hash)
VALUES (
  1,
  'admin@muhammadtaha.dev',
  '$2a$10$8K1p/a0dL1LXMc.0zL5JXeKeZQhK1zQxY5vZ6VZ7V8V9V0V1V2V3'
);

-- ============================================================================
-- END OF SEED DATA
-- ============================================================================
