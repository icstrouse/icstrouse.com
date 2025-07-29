-- Seed data for Ian's website

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, hero_image_url, published) VALUES
(
  'Building Scalable Web Applications with Next.js',
  'building-scalable-web-applications-nextjs',
  'Exploring the latest features in Next.js and how they enable developers to build performant, scalable applications.',
  '<h2>Introduction</h2><p>Next.js has revolutionized the way we build React applications. In this post, I''ll share my experience building scalable web applications and the patterns that have served me well over the years.</p><h2>Key Principles</h2><p>When building scalable applications, I focus on three main areas: performance, maintainability, and developer experience. Next.js excels in all these areas with features like automatic code splitting, server-side rendering, and the new App Router.</p><h2>Best Practices</h2><p>Here are some best practices I''ve learned:</p><ul><li>Use Server Components for better performance</li><li>Implement proper error boundaries</li><li>Optimize images and assets</li><li>Structure your code for maintainability</li></ul>',
  '/placeholder.svg?height=400&width=800',
  true
),
(
  'The Evolution of Full Stack Development',
  'evolution-full-stack-development',
  'A deep dive into how full stack development has evolved over the past decade and what it means for modern developers.',
  '<h2>The Journey</h2><p>Over my 9 years as a full stack engineer, I''ve witnessed incredible changes in the development landscape. From jQuery and PHP to React and Node.js, the tools and methodologies have evolved dramatically.</p><h2>Modern Stack</h2><p>Today''s full stack developer needs to be proficient in:</p><ul><li>Frontend frameworks like React, Vue, or Angular</li><li>Backend technologies like Node.js, Python, or Go</li><li>Database systems both SQL and NoSQL</li><li>Cloud platforms and DevOps practices</li></ul>',
  '/placeholder.svg?height=400&width=800',
  true
);

-- Insert sample portfolio projects
INSERT INTO portfolio_projects (title, slug, description, tech_stack, github_url, live_url, featured) VALUES
(
  'E-Commerce Platform',
  'ecommerce-platform',
  'A full-featured e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.',
  ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
  'https://github.com/ianstrouse/ecommerce-platform',
  'https://ecommerce-demo.vercel.app',
  true
),
(
  'Task Management App',
  'task-management-app',
  'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
  ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
  'https://github.com/ianstrouse/task-manager',
  'https://taskmanager-demo.vercel.app',
  true
),
(
  'Analytics Dashboard',
  'analytics-dashboard',
  'A comprehensive analytics dashboard for tracking web application metrics with interactive charts and real-time data visualization.',
  ARRAY['Vue.js', 'D3.js', 'Python', 'FastAPI', 'Redis'],
  'https://github.com/ianstrouse/analytics-dashboard',
  null,
  false
);

-- Insert sample project screenshots
INSERT INTO project_screenshots (project_id, image_url, alt_text, display_order) VALUES
(1, '/placeholder.svg?height=600&width=1000', 'E-commerce platform homepage', 1),
(1, '/placeholder.svg?height=600&width=1000', 'Shopping cart and checkout process', 2),
(2, '/placeholder.svg?height=600&width=1000', 'Task management kanban board', 1),
(2, '/placeholder.svg?height=600&width=1000', 'Team collaboration dashboard', 2),
(3, '/placeholder.svg?height=600&width=1000', 'Analytics dashboard with charts', 1);
