-- ============================================================================
-- Muhammad Taha Portfolio — Seed Data
-- Engine: SQLite (Turso/libSQL)
-- Version: 2.0
-- Purpose: Real portfolio data for Muhammad Taha
-- ============================================================================

-- ============================================================================
-- PROFILE (Singleton)
-- ============================================================================

INSERT INTO profile (id, name, title, short_bio, email, phone, location, avatar_url)
VALUES (
  1,
  'Muhammad Taha',
  'CS Student | Aspiring Full-Stack Developer',
  'Full-Stack + AI Developer specializing in React, Next.js, and modern web technologies. Building innovative digital experiences with a focus on performance and user experience.',
  'muhammadtahafarooq22@gmail.com',
  '+92 334 8010708',
  'Multan, Pakistan',
  NULL
);

-- ============================================================================
-- ABOUT (Singleton)
-- ============================================================================

INSERT INTO about (id, biography, profile_content, interests)
VALUES (
  1,
  'Computer Science undergraduate at the National University of Modern Languages (NUML), currently in the 5th semester with a CGPA of 3.43. Interested in web development, software engineering, and AI-powered applications, with a focus on building practical projects and continuously developing technical skills.',
  'I am a passionate Computer Science student at NUML with a strong foundation in web development and software engineering. I enjoy building practical projects that solve real-world problems, from student management systems to e-commerce platforms. Currently expanding my skills in full-stack development with React, Next.js, and AI-powered applications.',
  'Web Development, Software Engineering, AI-Powered Applications, Database Design, UI/UX Design'
);

-- ============================================================================
-- SKILLS
-- ============================================================================

INSERT INTO skills (id, name, category, description, sort_order)
VALUES
  (1, 'HTML', 'WEB', 'Markup language for structuring web content', 1),
  (2, 'CSS', 'WEB', 'Styling language for responsive web design', 2),
  (3, 'JavaScript', 'WEB', 'Programming language for interactive web applications', 3),
  (4, 'PHP', 'BACKEND', 'Server-side scripting language for web development', 4),
  (5, 'Laravel', 'BACKEND', 'PHP framework for web application development', 5),
  (6, 'MySQL', 'DATABASE', 'Relational database management system', 6),
  (7, 'SQL Server', 'DATABASE', 'Microsoft relational database management system', 7),
  (8, 'VS Code', 'TOOLS', 'Code editor for modern web development', 8),
  (9, 'XAMPP', 'TOOLS', 'Local development environment with Apache and MySQL', 9),
  (10, 'Git', 'TOOLS', 'Version control system for tracking changes', 10),
  (11, 'GitHub', 'TOOLS', 'Platform for version control and collaboration', 11),
  (12, 'ChatGPT', 'AI', 'AI assistant for code generation and problem solving', 12),
  (13, 'Claude', 'AI', 'AI assistant for analysis and development support', 13);

-- ============================================================================
-- TECHNOLOGIES
-- ============================================================================

INSERT INTO technologies (id, name, icon_url, category, sort_order)
VALUES
  (1, 'HTML', NULL, 'WEB', 1),
  (2, 'CSS', NULL, 'WEB', 2),
  (3, 'JavaScript', NULL, 'WEB', 3),
  (4, 'PHP', NULL, 'BACKEND', 4),
  (5, 'Laravel', NULL, 'BACKEND', 5),
  (6, 'MySQL', NULL, 'DATABASE', 6),
  (7, 'SQL Server', NULL, 'DATABASE', 7),
  (8, 'ASP.NET Web Forms', NULL, 'BACKEND', 8),
  (9, 'React', NULL, 'FRONTEND', 9),
  (10, 'Next.js', NULL, 'FRONTEND', 10),
  (11, 'TypeScript', NULL, 'FRONTEND', 11),
  (12, 'Tailwind CSS', NULL, 'FRONTEND', 12),
  (13, 'Node.js', NULL, 'BACKEND', 13),
  (14, 'VS Code', NULL, 'TOOLS', 14),
  (15, 'XAMPP', NULL, 'TOOLS', 15),
  (16, 'Git', NULL, 'TOOLS', 16),
  (17, 'GitHub', NULL, 'TOOLS', 17),
  (18, 'ChatGPT', NULL, 'AI', 18),
  (19, 'Claude', NULL, 'AI', 19);

-- ============================================================================
-- PROJECTS
-- ============================================================================

INSERT INTO projects (
  id, title, slug, description, short_statement,
  technologies, live_url, github_url, demo_url,
  screenshot_urls, case_study_problem, case_study_solution, case_study_result,
  is_featured, is_visible, sort_order
)
VALUES
  (1,
   'Student Management System',
   'student-management-system',
   'A student management application focused on managing student information and database operations. Built to streamline academic record keeping and student data management.',
   'Database-driven application for managing student records and academic information',
   '["ASP.NET Web Forms", "SQL Server"]',
   NULL,
   NULL,
   NULL,
   '["https://placehold.co/1200x680/141312/D6A85F?text=Student+Management+System"]',
   'Educational institutions need efficient ways to manage student records, track academic progress, and handle database operations for large volumes of student data.',
   'Developed a web-based student management system using ASP.NET Web Forms with SQL Server database for reliable data storage and retrieval.',
   'Streamlined student data management with efficient CRUD operations and reliable database functionality.',
   1, 1, 1),

  (2,
   'BookNest — Online Bookstore',
   'booknest-online-bookstore',
   'An online bookstore project focused on book browsing, database-driven functionality, and practical web application development. Features book catalog, search, and browsing capabilities.',
   'Database-driven online bookstore with book browsing and catalog features',
   '["HTML", "CSS", "PHP", "MySQL"]',
   NULL,
   NULL,
   NULL,
   '["https://placehold.co/1200x680/141312/D6A85F?text=BookNest+Online+Bookstore"]',
   'Building an online bookstore requires efficient book catalog management, search functionality, and a user-friendly browsing experience backed by a robust database.',
   'Created a PHP-based web application with MySQL database for book catalog management, featuring search, filtering, and responsive browsing interface.',
   'Successfully delivered a functional online bookstore with database-driven book management and smooth user experience.',
   1, 1, 2),

  (3,
   'Aurora Jewels — E-Commerce Website',
   'aurora-jewels-ecommerce',
   'Designed and developed a professional jewelry business website focused on product presentation, brand identity, responsive design, and user experience.',
   'Professional jewelry e-commerce website with brand-focused design and responsive layout',
   '["HTML", "CSS", "PHP", "MySQL"]',
   NULL,
   NULL,
   NULL,
   '["https://placehold.co/1200x680/141312/D6A85F?text=Aurora+Jewels+E-Commerce"]',
   'A jewelry business needs a visually compelling online presence that showcases products beautifully while maintaining excellent user experience and brand identity.',
   'Designed and developed a responsive e-commerce website with focus on product presentation, brand aesthetics, and seamless user navigation.',
   'Delivered a professional e-commerce platform that effectively showcases jewelry products with strong brand identity and responsive design.',
   1, 1, 3),

  (4,
   'Muhammad Taha — 3D Motion Portfolio',
   'muhammad-taha-3d-portfolio',
   'Designed and developed a personal developer portfolio featuring 3D visuals, motion interactions, project showcases, and professional information.',
   'Personal developer portfolio with 3D visuals and motion interactions',
   '["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"]',
   NULL,
   NULL,
   NULL,
   '["https://placehold.co/1200x680/141312/D6A85F?text=3D+Motion+Portfolio"]',
   'A developer portfolio needs to stand out visually while effectively showcasing skills, projects, and professional information in an engaging way.',
   'Built a premium interactive portfolio using Next.js, Three.js for 3D visuals, Framer Motion for animations, and a custom CMS for content management.',
   'Created an immersive portfolio experience with 3D elements, smooth animations, and a fully functional admin CMS for content management.',
   1, 1, 4),

  (5,
   'Indias Biggest AI Quiz',
   'indias-biggest-ai-quiz',
   'Organized by CampusCrew and hosted on Unstop. A large-scale AI quiz competition that attracted participants from across the country, testing knowledge in artificial intelligence and machine learning.',
   'Large-scale AI quiz competition organized by CampusCrew, hosted on Unstop',
   '["AI", "Quiz Competition"]',
   NULL,
   NULL,
   NULL,
   '["https://placehold.co/1200x680/141312/D6A85F?text=AI+Quiz+Competition"]',
   'Organizing a large-scale AI quiz competition requires effective event management, participant engagement, and a reliable platform for hosting.',
   'Organized Indias Biggest AI Quiz in collaboration with CampusCrew, hosted on Unstop platform with certificate distribution to participants.',
   'Successfully hosted Indias Biggest AI Quiz with widespread participation, providing certificates to all participants.',
   0, 1, 5);

-- ============================================================================
-- EXPERIENCE
-- ============================================================================

INSERT INTO experience (id, role, organization, description, start_date, end_date, is_current, sort_order)
VALUES
  (1,
   'CS Student & Developer',
   'National University of Modern Languages (NUML)',
   'Currently pursuing Bachelor of Science in Computer Science at NUML, 5th semester. Building practical projects in web development and software engineering while maintaining a CGPA of 3.43.',
   '2024-09',
   NULL,
   1,
   1),
  (2,
   'Full-Stack Developer',
   'Freelance',
   'Developing web applications including student management systems, e-commerce platforms, and online bookstores using PHP, MySQL, ASP.NET, and modern frontend technologies.',
   '2024-01',
   NULL,
   1,
   2);

-- ============================================================================
-- EDUCATION
-- ============================================================================

INSERT INTO education (id, institution, qualification, program, description, start_date, end_date, sort_order)
VALUES
  (1,
   'National University of Modern Languages (NUML)',
   'Bachelor of Science',
   'Computer Science',
   '5th Semester | CGPA 3.43. Studying computer science with focus on web development, software engineering, and AI-powered applications.',
   '2024-09',
   '2028-06',
   1);

-- ============================================================================
-- CERTIFICATIONS
-- ============================================================================

INSERT INTO certifications (id, name, issuer, date, description, sort_order)
VALUES
   (1,
   'Indias Biggest AI Quiz',
   'CampusCrew',
   '2025-01',
   'Organized by CampusCrew and hosted on Unstop. Certificate received for participation in Indias Biggest AI Quiz competition.',
   1);

-- ============================================================================
-- ACHIEVEMENTS
-- ============================================================================

INSERT INTO achievements (id, title, description, date, sort_order)
VALUES
  (1,
   'Indias Biggest AI Quiz Organizer',
   'Organized Indias Biggest AI Quiz in collaboration with CampusCrew, hosted on Unstop platform.',
   '2025-01',
   1),
  (2,
   'Multiple Web Applications',
   'Successfully developed and delivered multiple web applications including student management systems, e-commerce platforms, and online bookstores.',
   '2025-06',
   2);

-- ============================================================================
-- RESUME (Singleton)
-- ============================================================================

INSERT INTO resume (id, content, pdf_url)
VALUES (
  1,
  '{
    "summary": "CS Student at NUML with a CGPA of 3.43, passionate about web development, software engineering, and AI-powered applications.",
    "experience": [
      {
        "role": "CS Student & Developer",
        "company": "National University of Modern Languages (NUML)",
        "period": "2024 - Present",
        "highlights": [
          "5th semester BS Computer Science",
          "CGPA: 3.43",
          "Building practical web development projects"
        ]
      },
      {
        "role": "Full-Stack Developer",
        "company": "Freelance",
        "period": "2024 - Present",
        "highlights": [
          "Student Management System with ASP.NET and SQL Server",
          "BookNest Online Bookstore with PHP and MySQL",
          "Aurora Jewels E-Commerce Website"
        ]
      }
    ],
    "education": [
      {
        "degree": "Bachelor of Science in Computer Science",
        "school": "National University of Modern Languages (NUML)",
        "year": "2024 - 2028",
        "cgpa": "3.43"
      }
    ],
    "skills": ["HTML", "CSS", "JavaScript", "PHP", "Laravel", "MySQL", "SQL Server", "ASP.NET", "React", "Next.js", "TypeScript", "Tailwind CSS", "Git", "GitHub"],
    "certifications": ["Indias Biggest AI Quiz - CampusCrew"]
  }',
  NULL
);

-- ============================================================================
-- SOCIAL LINKS
-- ============================================================================

INSERT INTO social_links (id, platform, url, is_visible, sort_order)
VALUES
  (1, 'Email', 'mailto:muhammadtahafarooq22@gmail.com', 1, 1),
  (2, 'Phone', 'tel:+923348010708', 1, 2),
  (3, 'Location', 'https://maps.google.com/?q=Multan,Pakistan', 1, 3);

-- ============================================================================
-- HOMEPAGE CONTENT (Singleton)
-- ============================================================================

INSERT INTO homepage_content (id, hero_introduction, featured_project_ids, contact_statement)
VALUES (
  1,
  'Full-Stack + AI Developer building innovative digital experiences with modern technologies.',
  '[1, 2, 3, 4]',
  'Have a project in mind? Let'\''s build something amazing together.'
);

-- ============================================================================
-- SITE SETTINGS (Singleton)
-- ============================================================================

INSERT INTO site_settings (id, site_title, site_description, analytics_enabled, animation_intensity, three_d_enabled)
VALUES (
  1,
  'Muhammad Taha',
  'CS Student | Aspiring Full-Stack Developer',
  0,
  'standard',
  1
);

-- ============================================================================
-- ADMIN USERS
-- Password: admin123 (bcrypt hash - CHANGE IN PRODUCTION)
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
