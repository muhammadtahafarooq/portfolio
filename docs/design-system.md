Muhammad Taha — Implementable Design System

Version: 1.0
Design Direction: Cinematic Digital Craft
Brand: Muhammad Taha / Taha
Positioning: Full-Stack + AI Developer

1. BRAND
Visual Personality

The interface should feel like a premium digital studio created by a technically sophisticated developer.

Attribute	Direction
Overall	Dark, cinematic, immersive
Personality	Confident, intelligent, precise
Visual density	Low–medium
UI character	Architectural, minimal
Technology expression	Sophisticated, not flashy
Emotional tone	Premium, focused, futuristic
Interaction	Tactile, deliberate
3D	Experiential, subordinate to content
Primary visual hierarchy	Typography → project imagery → interaction
Design Principles

01 — Content is the hero
Motion and 3D enhance content; they never compete with it.

02 — Dark by default
Near-black surfaces create the cinematic foundation.

03 — One signature accent
Violet is reserved for meaningful interaction and emphasis.

04 — Typography carries identity
Large, confident typography replaces the need for an elaborate logo.

05 — Editorial over dashboard
Projects should feel like artifacts/exhibits rather than CRUD cards.

06 — Motion has purpose
Every animation must communicate hierarchy, continuity, feedback, or depth.

07 — Depth through restraint
Use spacing, contrast, lighting and subtle borders instead of heavy shadows/glassmorphism.

08 — 2D first, 3D selectively
The content architecture must remain complete without WebGL.

09 — Performance is part of the visual system
Visual complexity adapts according to device capability.

10 — Professional before futuristic
Never allow the interface to resemble a gaming website.

Brand Keywords

Cinematic · Technical · Premium · Minimal · Futuristic · Editorial · Precise · Immersive · Confident · Intelligent

2. COLOR

Use semantic tokens rather than hard-coding colors throughout components.

Core Palette
Token	Value	Usage
primary	#8B5CF6	Primary CTA/accent
primary-hover	#A78BFA	Accent hover
background	#080808	Main page background
background-secondary	#111111	Alternate sections
surface	#171717	Cards/panels
surface-hover	#1D1D1D	Interactive surface
text	#F5F5F5	Primary text
text-secondary	#A3A3A3	Secondary text
text-muted	#666666	Metadata/de-emphasis
border	#262626	Default borders
border-hover	#404040	Interactive borders
success	#22C55E	Success states
warning	#F59E0B	Warning states
error	#EF4444	Error states
Accent Usage

The violet accent should generally occupy less than 10% of the visual interface.

Use it for:

Primary CTAs
Active navigation state
Important links
Selected project states
Focus indicators
Interactive 3D lighting
Subtle cursor illumination
Important status indicators

Do not use it for:

Large text blocks
Entire backgrounds
Every border
Every icon
Decorative gradients everywhere
Gradient Tokens
--gradient-accent:
  linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%);

--gradient-dark:
  linear-gradient(180deg, #111111 0%, #080808 100%);

--gradient-ambient:
  radial-gradient(
    circle at center,
    rgba(139, 92, 246, 0.12) 0%,
    rgba(139, 92, 246, 0) 65%
  );

Gradients should be ambient and subtle, never rainbow/neon.

3. TYPOGRAPHY
Font System

Primary: Inter
Technical/metadata: JetBrains Mono

Fallback:

font-family:
  "Inter",
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;

Technical:

font-family:
  "JetBrains Mono",
  "SFMono-Regular",
  Consolas,
  monospace;
Type Scale
Token	Desktop	Tablet	Mobile	Weight
H1	88px	72px	48px	600
H2	64px	52px	40px	600
H3	48px	40px	32px	600
H4	32px	28px	24px	600
Body large	20px	19px	18px	400
Body	16px	16px	16px	400
Small	14px	14px	13px	400
Technical	13px	13px	12px	400
Button	14px	14px	14px	500
Heading Rules
h1 {
  font-size: clamp(3rem, 7vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.045em;
  font-weight: 600;
}

h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1;
  letter-spacing: -0.04em;
}

h3 {
  font-size: clamp(2rem, 3.5vw, 3rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
}
Body

Body text should have comfortable reading width:

max-width: 68ch;

Use #A3A3A3 for secondary body copy and #F5F5F5 for primary copy.

Technical Text

Use JetBrains Mono for:

Technology labels
Project metadata
Dates
Small technical identifiers
GitHub-related information
Section labels
Optional coordinates/status information
4. LAYOUT
Container
--container-max: 1440px;
--container-padding: 32px;

Desktop:

max-width: 1440px;
margin-inline: auto;
padding-inline: 32px;

Mobile:

padding-inline: 20px;

Maximum readable text width should remain approximately 65–70ch.

Grid

Primary editorial grid:

12 columns

grid-template-columns: repeat(12, minmax(0, 1fr));
gap: 24px;

At mobile:

grid-template-columns: 1fr;
gap: 16px;
Recommended Project Composition

Use asymmetric spans such as:

7 / 12 visual
5 / 12 information

or:

8 / 12 visual
4 / 12 information

Avoid making every project a symmetrical 50/50 block.

Spacing Scale

Use a 4px base:

Token	Value
space-1	4px
space-2	8px
space-3	12px
space-4	16px
space-5	20px
space-6	24px
space-8	32px
space-10	40px
space-12	48px
space-16	64px
space-20	80px
space-24	96px
space-32	128px
space-40	160px
Section Spacing

Desktop:

padding-block: clamp(96px, 10vw, 160px);

Major hero sections:

min-height: 90vh;

Mobile:

padding-block: 80px;
5. RESPONSIVE BREAKPOINTS
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
Behavior

< 640px

Single column
Minimal/no 3D
No mouse-follow
Reduced parallax
Smaller typography
Simplified navigation

640–1023px

Reduced 3D
Simplified grid
Reduced animation complexity

1024–1279px

Full editorial layouts
Medium 3D
Mouse interactions enabled where appropriate

1280px+

Full cinematic experience
Maximum approved 3D complexity
Full asymmetric compositions
6. COMPONENT SYSTEM
Navbar
Desktop
Transparent/near-black background
Fixed or sticky
Height: 72–80px
Logo/name left
Navigation center/right
Contact CTA right
Mobile
Height: 64px
Name/wordmark
Menu trigger
Full-screen or large overlay navigation
States

default → hover → active → focus

Active navigation uses violet subtly, not a large background.

7. BUTTONS
Primary
Background: #8B5CF6
Text: #F5F5F5
Radius: 8px
Height: 44–48px
Padding: 0 20–24px

Hover:

Translate Y: -2px
Background: #A78BFA
Subtle shadow/glow
Secondary
Background: transparent
Border: 1px solid #262626
Text: #F5F5F5
Radius: 8px

Hover:

Border: #8B5CF6
Background: rgba(139,92,246,0.06)
Button Interaction

Desktop primary CTA:

Magnetic range: approximately 24–40px
Maximum translation: 4–6px

Never allow magnetic movement to impair clicking.

8. INPUTS
Height: 48–52px
Background: #111111
Border: #262626
Radius: 8px
Text: #F5F5F5
Placeholder: #666666

Focus:

border-color: #8B5CF6;
box-shadow: 0 0 0 3px rgba(139,92,246,.12);

Error:

border-color: #EF4444;

Inputs should never rely on color alone to communicate errors.

9. CARDS

Cards should be used sparingly.

Project Card
Background: #111111
Border: 1px solid #262626
Radius: 10–14px

Image occupies the visual majority.

Hover:

Image scale: 1.02–1.04
Card translation: -2px
Border subtly brightens
Metadata can reveal
No aggressive glow
Information Card

Use for:

Experience
Education
Certifications
Achievements

Keep them flatter and more editorial than conventional SaaS cards.

10. MODALS

Use only when necessary.

Overlay:
rgba(0,0,0,0.72)

Panel:
#111111

Border:
#262626

Radius:
12px

Animation:

opacity: 0 → 1
scale: .98 → 1
translateY: 8px → 0

Duration: 250–400ms.

Keyboard:

Escape closes
Focus trapped inside
Focus restored to trigger
11. TABLES

Primarily relevant to admin.

Header background: #111111
Row background: #080808
Border: #262626
Text: #F5F5F5
Secondary text: #A3A3A3

Row hover:

background: #111111;

Mobile tables should become:

Horizontally scrollable, or
Stacked information blocks

Never allow critical content to become inaccessible because of overflow.

12. DROPDOWNS
Trigger:
#111111
border: #262626
radius: 8px

Menu:
#171717
border: #262626
radius: 8px

Menu item:

padding: 10px 12px;

Hover/active:

background: rgba(139,92,246,.08);

Keyboard navigation must support:

Arrow keys
Enter
Escape
Tab
13. FORMS

Form hierarchy:

Label
Input
Helper/error text

Recommended spacing:

label → input: 8px
field → field: 20–24px
section → section: 32–40px

Contact form should remain visually simple.

The goal is communication, not visual spectacle.

14. FOOTER

Dark, quiet and editorial.

Include:

Muhammad Taha / Taha
Professional positioning
Relevant navigation
GitHub
LinkedIn
WhatsApp
Contact CTA
Copyright

Avoid a huge collection of social icons.

Footer accent usage should be minimal.

15. MOTION SYSTEM
Motion Principles

Motion should feel:

Weighted · Cinematic · Smooth · Controlled · Intentional

Avoid:

Bounce
Excessive elastic motion
Constant floating
Rapid UI movement
Gaming-style HUD effects
Motion Tokens
--duration-fast: 150ms;
--duration-standard: 300ms;
--duration-smooth: 500ms;
--duration-cinematic: 800ms;
--duration-slow: 1200ms;
Easing

Standard:

cubic-bezier(0.22, 1, 0.36, 1)

Cinematic:

cubic-bezier(0.16, 1, 0.3, 1)
16. PAGE TRANSITIONS

Use:

Exit:
opacity 1 → 0
scale 1 → .985

Enter:
opacity 0 → 1
translateY: 12px → 0

Duration:

400–700ms

Do not delay navigation unnecessarily.

17. HOVER

Standard hover:

150–300ms

Typical transformations:

translateY(-2px)
scale(1.01–1.03)
opacity adjustment
border emphasis

Project imagery:

scale(1 → 1.03)

Never use dramatic rotations on professional content.

18. SCROLL MOTION

Use scroll-triggered animation for:

Section entrances
Text reveals
Project imagery
Decorative lines
Metadata

Default reveal:

opacity: 0 → 1
translateY: 24px → 0

Duration:

600–900ms

Stagger:

50–100ms

Only animate when elements enter the viewport.

19. MOUSE-FOLLOW

Desktop only.

Possible behaviors:

Ambient cursor light
Subtle project image movement
3D camera influence
Magnetic buttons

Keep movement extremely small.

Example:

Cursor influence: ±10–20px

Disable below the desktop interaction breakpoint.

20. CURSOR INTERACTIONS

Default cursor remains standard.

Optional custom cursor:

Small neutral dot
Expands slightly over interactive elements
Violet interaction state

Never replace essential pointer semantics.

Do not use a custom cursor on touch devices.

21. LOADING
Initial Loading

Prefer content-first loading.

Priority:

HTML/content
Typography
Critical imagery
UI
Motion
3D enhancement

3D must not block the primary portfolio content.

3D Loading State

Use a subtle:

Loading visual environment…

or minimal progress indicator.

Avoid a long branded splash screen that delays access to content.

22. MICRO-INTERACTIONS

Approved examples:

Button press feedback
Link underline expansion
Image scale
Icon movement
Copy confirmation
Form success state
Navigation indicator
Project metadata reveal
Subtle border transitions

Interaction should generally complete within:

150–500ms.

23. REDUCED MOTION

Respect:

@media (prefers-reduced-motion: reduce)

Disable or dramatically reduce:

Page transitions
Parallax
Mouse-follow
Magnetic buttons
Continuous particles
Camera movement
Decorative looping animations

Keep:

Content
Navigation
Buttons
Project links
Forms
Essential state feedback

Animations may become simple opacity transitions where useful.

24. 2D VISUAL SYSTEM
Decorative Elements

Approved visual language:

Fine technical lines
Thin grid structures
Small coordinate/metadata labels
Soft radial lighting
Subtle grain
Architectural frames
Minimal dots/particles
Large typographic numbers

Decorations should remain low contrast.

Shapes

Primary shapes:

Rectangles
Thin lines
Circles
Cropped geometric forms
Subtle arcs

Avoid excessive blobs and playful organic shapes.

25. 2D ILLUSTRATIONS

Illustrations should be:

Abstract
Geometric
Technical
Minimal
Monochrome with restrained violet
Integrated into the dark environment

They should support technology/digital craftsmanship rather than depict literal programming clichés.

Avoid:

Cartoon developer characters
Generic stock-style coding illustrations
Excessive neon cyberpunk imagery
26. 2D GRADIENTS

Use primarily:

Ambient radial
radial-gradient(
  circle,
  rgba(139,92,246,.12),
  transparent 65%
)
Vertical atmospheric
linear-gradient(
  180deg,
  #111111 0%,
  #080808 100%
)

Gradients are atmospheric rather than decorative focal points.

27. 3D SYSTEM
3D Usage

Yes — selectively.

Primary location:

Homepage Hero

This receives the highest 3D complexity.

Secondary usage:

Selected project visual moments
Transition environments
Subtle background visual layers

Avoid 3D throughout every content section.

Admin interface remains entirely 2D.

28. 3D SCENE STYLE

The approved visual direction is an:

Abstract digital environment

Use:

Floating geometric structures
Architectural forms
Dark spatial environment
Soft volumetric lighting
Subtle violet light
Small particle field
Controlled depth

Avoid literal:

Spaceships
Cyberpunk cities
Game environments
Sci-fi rooms
Character models

The environment represents systems, technology and digital craftsmanship abstractly.

29. 3D CAMERA

Camera movement should be slow and cinematic.

Idle

Very subtle movement:

position interpolation
± small X/Y movement
Mouse

Mouse controls should influence:

Camera position
Camera rotation
Object depth

with heavy smoothing.

Never directly map raw cursor coordinates to aggressive camera movement.

30. 3D INTERACTION

Interactive objects may:

Rotate subtly
Respond to cursor proximity
Change lighting
Shift depth
React to scroll

Interaction must remain discoverable but not mandatory.

All meaningful information must exist in normal HTML/UI.

31. 3D PERFORMANCE FALLBACK

Three experience levels:

Level A — Full

Desktop/high-capability devices.

Full geometry
Particles
Lighting
Camera interaction
Level B — Reduced

Tablet/medium hardware.

Lower geometry
Fewer particles
Simplified lighting
Reduced interaction
Level C — 2D fallback

Mobile/low-capability devices or failed WebGL.

Static/animated gradient
2D lighting
Image/video-like atmospheric layer
CSS motion only

The fallback must still look intentionally designed.

32. ACCESSIBILITY

Although the SRS leaves the formal WCAG target open, the implementation should use production-grade accessibility practices by default.

Contrast

Target at least WCAG AA-level contrast for normal interface text.

Do not use:

#666666

for essential body text against #080808 if contrast is insufficient.

Muted text is for secondary information only.

Focus

Every interactive element must have a visible focus state.

Recommended:

outline: 2px solid #8B5CF6;
outline-offset: 3px;

Never use:

outline: none;

without an equivalent accessible focus treatment.

33. KEYBOARD

All essential functionality must work without a mouse.

Keyboard support required for:

Navigation
Buttons
Links
Forms
Dropdowns
Modals
Admin controls
Project actions

3D interaction is optional enhancement, never required functionality.

34. SEMANTIC ACCESSIBILITY

Use semantic elements:

<header>
<nav>
<main>
<section>
<article>
<footer>
<button>
<a>
<form>
<label>

Use appropriate heading hierarchy.

Do not use clickable <div> elements when a button/link is appropriate.

35. IMAGE ACCESSIBILITY

Meaningful project screenshots:

alt="..."

Decorative visual assets:

alt=""

3D canvas should have an accessible fallback/context where appropriate.

Project information must remain available outside the canvas.

36. DESIGN TOKENS — IMPLEMENTATION BASELINE

A codebase should centralize the system approximately like this:

:root {
  /* Colors */
  --color-primary: #8B5CF6;
  --color-primary-hover: #A78BFA;

  --color-background: #080808;
  --color-background-secondary: #111111;

  --color-surface: #171717;
  --color-surface-hover: #1D1D1D;

  --color-text: #F5F5F5;
  --color-text-secondary: #A3A3A3;
  --color-text-muted: #666666;

  --color-border: #262626;
  --color-border-hover: #404040;

  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 14px;

  /* Layout */
  --container-max: 1440px;

  /* Motion */
  --duration-fast: 150ms;
  --duration-standard: 300ms;
  --duration-smooth: 500ms;
  --duration-cinematic: 800ms;

  --ease-standard:
    cubic-bezier(0.22, 1, 0.36, 1);

  --ease-cinematic:
    cubic-bezier(0.16, 1, 0.3, 1);
}
37. COMPONENT STATE MODEL

Every interactive component should explicitly support:

default
hover
active
focus
disabled
loading
error
success

Where applicable.

For example:

Button

Default → Hover → Active
             ↓
           Focus
             ↓
          Loading

Input

Default → Focus
        → Filled
        → Error
        → Disabled

This prevents inconsistent interaction behavior across the site.

38. PAGE-LEVEL DESIGN PATTERN

The public site should repeatedly use this storytelling structure:

Statement

Large typography establishes context.

↓

Visual

Project image, 3D environment or atmospheric visual.

↓

Proof

Technologies, metrics/metadata, experience or project information.

↓

Action

GitHub, live deployment, resume or contact.

This becomes the portfolio's core UX pattern.

39. PROJECT DESIGN SYSTEM

Projects are the primary proof of capability.

Each project should visually prioritize:

01. Project visual
02. Project title
03. Short value/technical statement
04. Technology stack
05. Case-study information
06. Live deployment
07. GitHub/demo

Project Detail

Recommended structure:

Project Hero
↓
Project Overview
↓
Visual Showcase
↓
Technologies
↓
Problem / Context
↓
Solution / Implementation
↓
Result / Key Details
↓
Live Project + GitHub
↓
Next Project

This structure remains compatible with the confirmed structured project/case-study requirements without turning the project page into a generic blog article.

40. ADMIN DESIGN SYSTEM

The admin is intentionally different from the public experience.

Public

Cinematic · immersive · editorial

Admin

Functional · clear · dense · efficient

Admin should use:

Same color tokens
Same typography
Same accent
Same component primitives

But no unnecessary 3D or cinematic transitions.

Primary admin navigation:

Dashboard
Projects
GitHub Sync
Profile
About
Skills
Experience
Education
Certifications
Achievements
Resume
Social Links
Contact Messages
Homepage
Settings

Only expose animation/3D controls that have clear operational value.

41. CONTENT PRIORITY

The visual hierarchy should consistently follow:

Tier 1 — Identity

Muhammad Taha
Full-Stack + AI Developer

Tier 2 — Proof

Projects
Live deployments
GitHub

Tier 3 — Capability

Skills
Technologies

Tier 4 — Credibility

Experience
Education
Certifications
Achievements
Resume

Tier 5 — Conversion

Contact
LinkedIn
WhatsApp
GitHub

This prevents the immersive experience from obscuring the professional objective.

42. PERFORMANCE DESIGN RULES

The implementation should follow these rules:

Do not load heavy 3D before essential content.
Lazy-load non-critical project imagery.
Optimize project screenshots.
Use responsive image sizes.
Avoid unnecessary continuous animation.
Pause/reduce off-screen visual effects.
Reduce particle count according to capability.
Disable mouse interaction on touch devices.
Prefer transforms/opacity for animation.
Keep the 3D layer independently degradable.
Never make WebGL a dependency for navigation/content.
Prefer a beautiful 2D fallback over a struggling 3D experience.
43. DESIGN SYSTEM GOVERNANCE
Do
Use tokens.
Reuse primitives.
Maintain consistent spacing.
Keep accent usage restrained.
Prefer composition over decoration.
Treat project imagery as premium content.
Use motion to communicate hierarchy.
Preserve accessibility without motion/3D.
Don't
Introduce additional accent colors casually.
Use excessive glassmorphism.
Use rainbow gradients.
Turn every section into a 3D scene.
Add animation merely because it is possible.
Create dashboard-like project grids.
Hide information behind hover-only interactions.
Require mouse interaction to understand content.
Sacrifice performance for visual spectacle.
44. FINAL VISUAL FORMULA
CINEMATIC DIGITAL CRAFT

#080808 canvas
        +
#F5F5F5 typography
        +
#A3A3A3 secondary information
        +
#8B5CF6 signature accent
        +
editorial 12-column composition
        +
large premium typography
        +
high-quality project imagery
        +
precise minimalist UI
        +
cinematic 2D motion
        +
selective abstract 3D
        +
adaptive performance
        +
accessibility-first content
The governing principle

Make the technology feel sophisticated without making the website feel like a technology demo.

This system gives the implementation team concrete tokens, component states, responsive behavior, motion rules, 2D/3D boundaries, accessibility behavior, and performance rules while staying within the approved premium personal developer portfolio + lightweight admin CMS scope.