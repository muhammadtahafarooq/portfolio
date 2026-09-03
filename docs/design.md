# MUHAMMAD TAHA PORTFOLIO — UI DESIGN BLUEPRINT

**Design System Version:** 1.0
**Visual Direction:** Cinematic Digital Craft
**Product:** Muhammad Taha / Taha — Full-Stack + AI Developer Portfolio
**Primary Experience:** Dark · Futuristic · Minimal · Technical · Editorial · Immersive

---

# 1. GLOBAL DESIGN CONTRACT

## 1.1 Core Visual Formula

Every public-facing screen follows:

**Near-black canvas → premium typography → editorial composition → project proof → restrained violet interaction → cinematic motion**

The interface must never resemble:

* A SaaS dashboard
* A generic AI landing page
* A gaming/cyberpunk website
* A template portfolio
* A glassmorphism-heavy interface
* A conventional centered-card portfolio

The visual identity comes primarily from **composition, typography, project imagery, whitespace and controlled motion**.

---

# 2. COLOR BLUEPRINT

## 2.1 Full Palette

| Token                | Hex       | Usage                                             |
| -------------------- | --------- | ------------------------------------------------- |
| Primary              | `#8B5CF6` | Primary CTA, active states, important interaction |
| Primary Hover        | `#A78BFA` | Hover/focus interaction                           |
| Background           | `#080808` | Main page canvas                                  |
| Background Secondary | `#111111` | Alternate sections                                |
| Surface              | `#171717` | Cards, panels, elevated areas                     |
| Surface Hover        | `#1D1D1D` | Interactive surfaces                              |
| Text Primary         | `#F5F5F5` | Headlines and essential text                      |
| Text Secondary       | `#A3A3A3` | Supporting copy                                   |
| Text Muted           | `#666666` | Metadata only                                     |
| Border               | `#262626` | Default boundaries                                |
| Border Hover         | `#404040` | Interactive boundary                              |
| Success              | `#22C55E` | Successful actions/status                         |
| Warning              | `#F59E0B` | Warning states                                    |
| Error                | `#EF4444` | Errors/validation                                 |

### Accent rule

Violet must visually occupy **less than approximately 10% of the interface**.

It is a signal, not a background theme.

Use it for:

* Primary buttons
* Active navigation
* Focus states
* Selected project indicators
* Important links
* Interactive lighting
* Small status indicators

Do not use violet for:

* Large background fields
* Large body copy
* Every border
* Every icon
* Decorative gradients throughout the page

## 2.2 Approved Ambient Treatments

**Accent atmosphere**

`radial-gradient(circle, rgba(139,92,246,.12), transparent 65%)`

**Dark atmospheric transition**

`linear-gradient(180deg, #111111 0%, #080808 100%)`

These are lighting devices, not decorative gradient backgrounds.

---

# 3. TYPOGRAPHY BLUEPRINT

## 3.1 Font Pairing

**Primary:** Inter
**Technical:** JetBrains Mono

Inter carries the premium professional voice because it is neutral, highly legible and strong at large display sizes.

JetBrains Mono provides a deliberate technical layer for:

* Technology names
* Project metadata
* Dates
* Technical labels
* Repository information
* Status indicators
* Small identifiers

## 3.2 Type Scale

| Element    | Desktop | Tablet | Mobile | Weight |
| ---------- | ------: | -----: | -----: | -----: |
| H1         |    88px |   72px |   48px |    600 |
| H2         |    64px |   52px |   40px |    600 |
| H3         |    48px |   40px |   32px |    600 |
| H4         |    32px |   28px |   24px |    600 |
| Body Large |    20px |   19px |   18px |    400 |
| Body       |    16px |   16px |   16px |    400 |
| Small      |    14px |   14px |   13px |    400 |
| Technical  |    13px |   13px |   12px |    400 |
| Button     |    14px |   14px |   14px |    500 |

### Heading behavior

Headings use:

* `line-height: 0.95–1.05`
* Negative letter spacing
* Tight grouping
* No text shadows
* No gradient-filled text

H1 should feel like a **statement**, not a marketing banner.

---

# 4. ICONOGRAPHY

## Direction

Use **Lucide-style geometric line icons** for interface controls.

Characteristics:

* 1.5–2px stroke
* Rounded but precise geometry
* Monochrome
* No filled decorative icon sets
* No oversized iconography

Technology/social icons may use recognizable official brand marks where required.

Icons are explanatory rather than ornamental.

### Icon placement

* Navigation: small, optional
* Buttons: 14–18px
* Metadata: 12–16px
* Social links: 18–20px
* No large decorative icon blocks

---

# 5. IMAGERY BLUEPRINT

## Priority

**Project imagery > typography > abstract atmosphere**

No stock photography.

### Project imagery

Use:

* Large application screenshots
* Carefully cropped UI details
* Browser/device frames only when context is useful
* Dark presentation environments
* Minimal framing
* High-resolution responsive images

Images should generally occupy the **largest visual area of project compositions**.

### Personal portrait

If a professional photograph is later provided:

* Editorial portrait
* Dark neutral environment
* Controlled directional lighting
* Tight or medium crop
* No circular avatar
* No profile-card treatment
* No excessive retouching

### Abstract visuals

Use:

* Fine technical grids
* Architectural frames
* Geometric structures
* Thin lines
* Small particles
* Subtle radial illumination
* Large typographic numerals

Never use literal code illustrations or cartoon developer imagery.

---

# 6. LOGO / WORDMARK DIRECTION

No separate logo is required.

The identity is the **Muhammad Taha / Taha wordmark**.

Desktop:

**Muhammad Taha**

Mobile:

**Taha**

Typography should be:

* Inter
* 500–600 weight
* Tight tracking
* White
* No icon attached by default

Optional visual detail: a very small violet active indicator may appear beside the name during navigation transitions, but it must not become a logo mark.

---

# 7. GLOBAL LAYOUT

## 7.1 Container

Desktop:

* Maximum width: `1440px`
* Horizontal padding: `32px`

Mobile:

* Horizontal padding: `20px`

## 7.2 Editorial Grid

Desktop:

`12 columns / 24px gap`

Primary compositions:

* 7/5
* 8/4
* 5/7
* 4/8

Never make every major section 50/50.

## 7.3 Section Rhythm

Desktop:

`96–160px` vertical spacing.

Mobile:

`80px` vertical spacing.

Major hero:

`minimum 90vh`

## 7.4 Section Label

Where a technical section label is useful:

* JetBrains Mono
* 12–13px
* Uppercase
* `#A3A3A3`
* Optional tiny violet marker
* Positioned above heading

Example structural treatment:

`01 / FEATURED PROJECTS`

The numbering is decorative hierarchy and must not replace accessible headings.

---

# 8. REUSABLE HEADER

## Desktop

Fixed/sticky header:

* Height: 72–80px
* Background: `rgba(8,8,8,.82)` or solid `#080808` when scrolling
* Subtle bottom border appears after scroll
* Name left
* Navigation right/center-right
* Contact CTA at far right

Structure:

**Wordmark | Navigation | Contact**

Navigation:

1. Home
2. About
3. Skills / Tech Stack
4. Projects
5. Experience
6. Education
7. Certifications / Achievements
8. Resume
9. Contact CTA

Avoid crowding. At narrower desktop widths, navigation may collapse into a menu before readability suffers.

## Active state

* White text
* Small violet underline/indicator
* No filled pill
* Transition: 200–300ms

## Mobile

Height: 64px.

Structure:

**Taha | Menu**

Menu opens as a dark full-screen/large overlay.

Overlay:

* `#080808`
* Large vertically stacked links
* Contact CTA at bottom
* Close control top-right
* Staggered entrance

No complex mobile mega-menu.

---

# 9. REUSABLE FOOTER

Footer begins with a quiet editorial divider.

Structure:

### Block A — Identity

Muhammad Taha
Full-Stack + AI Developer

### Block B — Navigation

Relevant primary links.

### Block C — Professional Links

GitHub
LinkedIn
WhatsApp

### Block D — Contact

Short CTA and Contact button.

### Bottom line

Copyright information.

Layout:

Desktop: 4-column editorial arrangement.

Mobile: stacked blocks.

Footer background:

`#080808`

Borders:

`#262626`

No large social icon wall.

---

# 10. HERO PATTERNS

## 10.1 Homepage Hero

The homepage hero is the **only major full immersive hero**.

Structure:

**Left/content zone:** approximately 5/12 columns
**Right/visual zone:** approximately 7/12 columns

On very large screens, the 3D environment may extend beyond the grid into the page background.

Content order:

1. Small identity/technical label
2. Muhammad Taha
3. Full-Stack + AI Developer
4. Short approved value statement
5. CTA row

CTA order:

**Contact** — primary
**View Projects** — secondary

3D environment sits behind/beside the content, never underneath text at unreadable contrast.

## 10.2 Inner Page Hero

Inner heroes use a restrained editorial structure.

Structure:

**Section label → large heading → short introduction → atmospheric 2D visual**

No full-screen 3D.

Visual occupies approximately 30–40% of the hero composition and may be:

* Technical grid
* Architectural frame
* Cropped project imagery
* Abstract geometric composition

Hero height:

Approximately 55–70vh, not 90vh.

---

# 11. CARD PATTERNS

## 11.1 Project Card

Project card is an editorial panel, not a SaaS card.

Structure:

1. Large image
2. Project metadata
3. Title
4. Short value/technical statement
5. Technology tags
6. Action links

Image:

Approximately 60–70% of card height.

Technology tags:

* Small pills
* `#171717`
* Thin border
* JetBrains Mono
* 12–13px

Hover:

* Image scale 1.03
* Card moves `-2px`
* Border transitions toward `#404040`
* Metadata may shift/reveal slightly

No glow.

## 11.2 Information Card

Used for experience, education, certifications and achievements.

Structure:

**Date/metadata → title → organization/context → description → optional related link**

Flatter than project cards.

---

# 12. CTA PATTERNS

## Primary

* Background `#8B5CF6`
* Text `#F5F5F5`
* 44–48px height
* 8px radius
* 20–24px horizontal padding
* 500 weight

Hover:

* `#A78BFA`
* Translate Y `-2px`
* Very subtle glow

## Secondary

* Transparent
* 1px `#262626` border
* White text
* 8px radius

Hover:

* Border `#8B5CF6`
* Background `rgba(139,92,246,.06)`

Desktop buttons may use magnetic movement up to **4–6px**.

Mobile: no magnetic behavior.

---

# 13. GLOBAL MOTION BLUEPRINT

## Entrance

Default:

`opacity 0 → 1`
`translateY(24px) → 0`

Duration:

600–900ms.

## Heading

Use masked/reveal animation.

Large text enters vertically with slight clipping.

## Image

Use:

`opacity + translateY + scale`

No dramatic rotation.

## Page transition

Exit:

`opacity 1 → 0 / scale 1 → .985`

Enter:

`opacity 0 → 1 / translateY 12px → 0`

Duration:

400–700ms.

## Hover

150–300ms.

## Cinematic

800–1200ms.

## Reduced motion

Disable:

* 3D camera movement
* Parallax
* Mouse-follow
* Magnetic buttons
* Continuous particles
* Decorative looping animation

Keep content and functional feedback.

---

# 14. HOME PAGE BLUEPRINT

## 14.1 Navbar

**Layout:** global header.

**Hierarchy:**

1. Taha/Muhammad Taha wordmark
2. Primary navigation
3. Contact CTA

**Visual:** near-black transparent header.

**Motion:** subtle background/border transition on scroll.

---

## 14.2 Hero

### Layout

12-column grid.

Content: columns 1–6.

3D: columns 6–12 and extending into surrounding space.

### Content hierarchy

1. Small technical identity label
2. Muhammad Taha
3. Full-Stack + AI Developer
4. Approved introduction/value statement
5. Contact CTA + View Projects CTA

### Visual

Abstract 3D digital environment:

* Floating architectural geometry
* Dark spatial field
* Subtle particles
* Soft volumetric illumination
* Violet light source
* Slow camera movement

No spaceship, city, character, code wall or literal sci-fi object.

### Interaction

Desktop:

* Cursor affects camera subtly
* Lighting responds softly
* Objects shift depth slightly

Mobile:

* No mouse-follow
* Reduced particles
* Reduced geometry
* 2D atmospheric fallback if needed

### Content rule

All hero messaging remains HTML and readable independent of the 3D canvas.

---

## 14.3 Professional Introduction

### Layout

Two-column editorial composition.

Left: large section heading.

Right: profile statement and About CTA.

### Hierarchy

1. Section label
2. Large statement
3. Short profile paragraph
4. About link

### Visual

No major image.

Optional:

* Thin architectural line
* Small coordinate label
* Low-opacity grid

### Motion

Heading reveal followed by body copy.

---

## 14.4 Skills / Tech Stack Preview

### Layout

12-column composition.

Heading/content: 4 columns.

Technology field: 8 columns.

### Content

1. Section heading
2. Technical capability statement
3. Key skills
4. Technologies
5. Link to full Skills / Tech Stack

### Visual

Technology labels arranged as a **structured editorial field**, not a generic icon grid.

Use:

* Typography
* Small technical labels
* Thin dividers
* Sparse monochrome technology icons

### Motion

Technology items stagger in at 50–80ms intervals.

---

## 14.5 Featured Projects

### Layout

Each project uses alternating asymmetric compositions.

Project 01:

* Image 7/12
* Information 5/12

Project 02:

* Information 4/12
* Image 8/12

Continue alternating.

### Content hierarchy

1. Project number/metadata
2. Project image
3. Title
4. Short technical/value statement
5. Technology tags
6. View Project
7. Optional Live/GitHub/Demo links

### Visual

Image-first.

No equal-height generic card grid.

### Motion

* Image reveal
* Image scale
* Metadata stagger
* Border emphasis on hover

---

## 14.6 Professional Background Preview

### Layout

Three editorial proof areas:

**Experience / Education / Certifications & Achievements**

Use horizontal or asymmetric rows rather than three SaaS cards.

### Content

1. Experience highlight
2. Education highlight
3. Certification/achievement highlight
4. Resume CTA
5. Relevant page links

### Visual

Thin timeline/grid treatment.

### Motion

Sequential vertical reveals.

---

## 14.7 Contact / Conversion

### Layout

Large horizontal statement.

Left:

Large contact statement.

Right:

CTA and professional links.

### Content

1. Short contact statement
2. Contact CTA
3. LinkedIn
4. WhatsApp
5. GitHub

### Visual

Very subtle radial violet illumination behind the CTA.

No large graphic.

### Motion

CTA has restrained magnetic interaction on desktop.

---

## 14.8 Footer

Use global footer pattern.

---

# 15. ABOUT PAGE BLUEPRINT

## 15.1 Navbar

Global header.

---

## 15.2 About Hero

### Layout

Left 7 columns:

* Section label
* About heading
* Professional identity
* Approved profile introduction

Right 5 columns:

* Restrained architectural visual

### Visual

2D technical composition:

* Fine grid
* Geometric frame
* Minimal violet light
* No literal developer illustration

### Motion

Typography reveal followed by visual line expansion.

---

## 15.3 Professional Profile

### Layout

7/5 editorial split.

Left:

Approved biography/background.

Right:

Profile information and approved interests.

### Content hierarchy

1. Biography
2. Professional background/context
3. Interests where applicable

### Visual

Optional geometric frame behind right-side information.

### CTA

Bottom of content column:

**View Projects**

**Contact**

---

## 15.4 Profile CTA

Two-button row:

Primary: **View Projects**

Secondary: **Contact**

No additional CTA.

---

## 15.5 Footer

Global footer.

---

# 16. SKILLS / TECH STACK PAGE

## 16.1 Navbar

Global header.

---

## 16.2 Skills Hero

### Layout

Large heading left.

Technical grid right.

### Content

1. Skills / Tech Stack
2. Technical capabilities introduction

### Visual

Dense-but-controlled metadata grid.

Use:

* Technology names
* Fine lines
* Small category markers
* Monochrome icons

### Motion

Heading reveal followed by metadata emergence.

---

## 16.3 Technical Skills

### Layout

Full-width editorial list.

Each skill becomes a horizontal row:

**Skill name | supporting information | optional category**

Avoid dashboard cards.

### Motion

Rows reveal sequentially.

---

## 16.4 Technologies

### Layout

Technology names arranged in structured columns.

Use small bordered tags only where needed.

No rainbow technology colors.

Official technology icons remain monochrome wherever possible.

### Motion

Subtle stagger.

---

## 16.5 Capabilities

### Layout

Large capability statements separated by thin horizontal borders.

Each item:

**Capability title → supporting approved content**

No decorative illustrations required.

---

## 16.6 Projects Proof

### Layout

Two or three relevant projects presented as large editorial project panels.

### Content

* Project visual
* Project title
* Capability demonstrated
* Project link
* Live/GitHub where available

### CTA

**View Projects**

**Contact**

---

## 16.7 Footer

Global footer.

---

# 17. PROJECTS PAGE

## 17.1 Navbar

Global header.

---

## 17.2 Projects Hero

### Layout

Large heading occupies approximately 7 columns.

Editorial project visual occupies 5 columns.

### Content

1. Projects
2. Short portfolio/project introduction

### Visual

High-quality project image cropped as an editorial artifact.

### Motion

Typography mask reveal.

---

## 17.3 Project Listing

### Layout

Vertical exhibition.

Each project occupies a large horizontal composition.

Alternate:

**7 image / 5 information**

then:

**4 information / 8 image**

### Information hierarchy

1. Project number/status
2. Project title
3. Value/technical statement
4. Technologies
5. Metadata
6. View Project
7. Live/GitHub/Demo if available

### Visibility

Only publicly visible projects render.

### Hover

* Image scale 1.03
* Card translation -2px
* Border emphasis
* Optional metadata reveal

### Motion

Each project enters on scroll.

No filtering UI is added because it is not in the sitemap.

---

## 17.4 Contact CTA

Full-width quiet CTA.

**Contact Muhammad Taha**

---

## 17.5 Footer

Global footer.

---

# 18. INDIVIDUAL PROJECT DETAILS PAGE

## 18.1 Navbar

Global header.

---

## 18.2 Project Hero

### Layout

Large project title and statement in upper area.

Dominant project visual below/alongside.

### Content hierarchy

1. Project title
2. Short statement
3. Metadata
4. Technologies
5. Primary project visual

### Visual

Large screenshot, approximately full container width.

### Motion

Cinematic text entrance + image reveal.

---

## 18.3 Project Overview

### Layout

7/5.

Left:

Project description/core information.

Right:

Metadata and technologies.

### No card-heavy presentation.

Use thin separators.

---

## 18.4 Visual Showcase

### Layout

Large editorial image compositions.

Use:

* Full-width screenshot
* Cropped interface detail
* Secondary screenshot
* Asymmetric image placement where multiple approved visuals exist

### Motion

Controlled reveal/parallax.

No continuous image animation.

---

## 18.5 Technologies

### Layout

Structured technical list.

Each technology:

**Icon/name → optional approved metadata**

Use JetBrains Mono for technical labels.

---

## 18.6 Problem / Context

### Layout

Large heading left.

Approved case-study content right.

### Visual

Optional thin architectural frame.

No invented metrics or claims.

---

## 18.7 Solution / Implementation

### Layout

Reverse 5/7 editorial composition.

Left:

Supporting visual where available.

Right:

Implementation information.

---

## 18.8 Result / Key Details

### Layout

Large result statement followed by metadata.

Approved metrics, details or outcomes only.

If metrics are unavailable, do not create artificial numerical highlights.

---

## 18.9 External Project Links

Horizontal CTA group:

Primary where applicable:

**Live Project**

Secondary:

**GitHub**

Optional:

**Demo**

Unavailable links are omitted rather than disabled-looking placeholders.

---

## 18.10 Next Project

Large visual preview.

Structure:

**Next Project → project visual → title → View Project**

Use cinematic transition into the next project.

---

## 18.11 Contact CTA

**Contact Muhammad Taha**

---

## 18.12 Footer

Global footer.

---

# 19. EXPERIENCE PAGE

## 19.1 Navbar

Global header.

---

## 19.2 Experience Hero

### Layout

Large heading left.

Architectural timeline treatment right.

### Content

1. Experience
2. Short professional-background introduction

### Visual

Thin vertical/horizontal timeline geometry.

---

## 19.3 Professional Experience

### Layout

Full-width vertical timeline.

Each entry:

**Date → Role → Organization/context → approved description/details**

Date uses JetBrains Mono.

Timeline line uses `#262626`.

Current/important point may use restrained violet.

### Motion

Entries reveal sequentially.

No animated timeline that requires scrolling to understand content.

---

## 19.4 Related Proof

### Layout

Relevant projects in asymmetric project panels.

Content:

* Project
* Capability demonstrated
* Technologies
* Project link

---

## 19.5 Resume CTA

Quiet horizontal CTA:

**View / Access Resume**

---

## 19.6 Contact CTA

**Contact Muhammad Taha**

---

## 19.7 Footer

Global footer.

---

# 20. EDUCATION PAGE

## 20.1 Navbar

Global header.

---

## 20.2 Education Hero

### Layout

Large heading + short introduction.

Right-side technical/editorial composition.

---

## 20.3 Education

### Layout

Vertical editorial entries.

Each entry:

1. Institution
2. Qualification/program
3. Dates/details where available
4. Approved supporting information

Use horizontal separators rather than cards.

---

## 20.4 Certifications / Achievements Link

A single editorial navigation row.

**Explore Certifications & Achievements →**

Violet appears only on interaction.

---

## 20.5 Resume CTA

**Access Resume**

---

## 20.6 Contact CTA

**Contact Muhammad Taha**

---

## 20.7 Footer

Global footer.

---

# 21. CERTIFICATIONS / ACHIEVEMENTS PAGE

## 21.1 Navbar

Global header.

---

## 21.2 Hero

### Layout

Heading left.

Credential/metadata composition right.

### Visual

Small technical labels, lines and geometric framing.

No certificate-stock imagery.

---

## 21.3 Certifications

### Layout

Vertical credential list.

Each entry:

**Certification → issuer/context → date/details**

Use subtle separators.

---

## 21.4 Achievements

### Layout

Editorial list matching certification structure.

Each entry:

**Achievement → supporting approved information**

No fake ranking, badge or trophy imagery.

---

## 21.5 Resume CTA

**Access Resume**

---

## 21.6 Contact CTA

**Contact Muhammad Taha**

---

## 21.7 Footer

Global footer.

---

# 22. RESUME PAGE

## 22.1 Navbar

Global header.

---

## 22.2 Resume Hero

### Layout

Large heading and professional introduction.

Right:

Minimal document/editorial treatment.

### Visual

Abstract document grid, not a fake browser window.

---

## 22.3 Resume Presentation

### Layout

Primary resume content/reference occupies approximately 8 columns.

Supporting metadata/actions occupy 4 columns.

No unnecessary decorative cards.

---

## 22.4 Resume Action

Primary CTA:

**Download / Access Resume**

Only use the finalized implementation behavior.

CTA should remain immediately visible without scrolling through the entire document.

---

## 22.5 Contact CTA

**Contact Muhammad Taha**

---

## 22.6 Professional Links

Horizontal/stacked links:

* LinkedIn
* GitHub
* WhatsApp where applicable

---

## 22.7 Footer

Global footer.

---

# 23. CONTACT PAGE

## 23.1 Navbar

Global header.

The Contact navigation state is active.

---

## 23.2 Contact Hero

### Layout

Large heading left.

Ambient architectural visual right.

### Content

1. Contact
2. Short communication statement

### Visual

Low-intensity violet radial light + thin geometry.

No 3D.

---

## 23.3 Contact Information

### Layout

Two-column editorial section.

Left:

Approved contact information.

Right:

Professional/social links.

Links:

* LinkedIn
* WhatsApp
* GitHub
* Other approved professional/social links

---

## 23.4 Contact Form

### Layout

Form width approximately 7 columns.

Supporting empty space/ambient visual occupies 5 columns.

### Field order

Only finalized required fields are rendered.

Each field follows:

**Label → input → helper/error**

Message field is larger than standard inputs.

Submit button at bottom.

### States

Default
Focus
Filled
Error
Loading
Success
Disabled

### Error behavior

* Red border
* Explicit error message
* Error icon if useful
* Never rely only on red

### Success behavior

Replace or update form feedback with a clear success confirmation.

---

## 23.5 Contact Confirmation

Visible success message after successful submission.

Use:

* Success color `#22C55E`
* Clear text
* Minimal check icon
* No confetti
* No excessive animation

---

## 23.6 Footer

Global footer.

---

# 24. ADMIN DESIGN BLUEPRINT

The admin must **not inherit the cinematic public layout**.

It uses the same tokens but prioritizes speed, clarity and density.

---

# 25. ADMIN AUTHENTICATION GATE

## Layout

Centered functional authentication panel.

Background:

`#080808`

Panel:

`#111111`

Border:

`#262626`

Radius:

12px.

### Hierarchy

1. Taha identity
2. Administrator authentication
3. Required authentication controls
4. Submit
5. Loading/error feedback

No 3D.

No cinematic page transition.

---

# 26. ADMIN SHELL

## Desktop

Persistent left sidebar.

Approximate width:

240–280px.

Main content:

remaining viewport width.

Sidebar:

* Background `#111111`
* Border-right `#262626`

### Navigation order

1. Dashboard
2. Projects
3. GitHub Sync
4. Profile
5. About
6. Skills
7. Experience
8. Education
9. Certifications
10. Achievements
11. Resume
12. Social Links
13. Contact Messages
14. Homepage
15. Settings
16. Logout

### Active state

Dark surface + restrained violet indicator.

No large violet navigation pills.

---

## Mobile Admin

Sidebar becomes a drawer.

Top bar contains:

**Menu → Page title → relevant action**

---

# 27. ADMIN DASHBOARD

## Dashboard Overview

### Layout

Top:

Page title + status.

Middle:

Compact operational summary blocks.

Information includes:

* Portfolio/content status
* Project status
* Contact message access
* GitHub synchronization status
* Basic site status/settings
* Analytics where implemented

### Design

Functional information blocks.

No charts unless analytics actually exist.

No decorative 3D.

---

# 28. PROJECT MANAGEMENT

## Project Listing

Dense table/list.

Columns where applicable:

* Project
* Visibility
* Featured
* Technologies
* Updated/status
* Actions

Mobile:

Stacked project rows or horizontally scrollable table.

## Create/Edit Project

Form divided into logical groups:

### Basic information

* Title
* Description
* Project metadata

### Technologies

Managed technology selection.

### Visibility

Public/private control.

### Featured

Featured status.

### External links

* Live URL
* GitHub URL
* Demo URL

### Media

Screenshot/media management.

### Case study

Approved case-study information.

### Save

Primary CTA.

No decorative 3D.

---

# 29. GITHUB SYNC

## Layout

Operational control screen.

Sections:

1. Repository discovery
2. Repository/project association
3. Imported repository information
4. Portfolio visibility control
5. Synchronization state
6. Feedback

Actions must communicate:

* Loading
* Success
* Error
* Disabled

No visual spectacle.

---

# 30. PROFILE MANAGEMENT

Functional form layout.

Groups:

1. Profile identity
2. Professional positioning
3. Contact information
4. Save/update action

Use standard admin form primitives.

---

# 31. ABOUT MANAGEMENT

Functional content editor.

Fields correspond only to approved About content:

* Biography
* Profile content
* Interests where applicable

Save state appears immediately after action.

---

# 32. SKILLS MANAGEMENT

Manage:

* Technical skills
* Technologies
* Technical capabilities

Use compact repeatable rows.

Actions:

* Add
* Edit
* Remove
* Save

No decorative cards.

---

# 33. EXPERIENCE MANAGEMENT

Repeatable experience entries.

Each entry contains only approved fields.

Use:

* Role
* Organization/context
* Description/details
* Dates where available

Entries displayed vertically.

---

# 34. EDUCATION MANAGEMENT

Repeatable entries:

* Institution
* Qualification/program
* Dates/details where available
* Supporting information

---

# 35. CERTIFICATIONS MANAGEMENT

Repeatable credential entries.

Use:

* Certification information
* Date/details where available

---

# 36. ACHIEVEMENTS MANAGEMENT

Repeatable entries.

Use:

* Achievement title/information
* Supporting approved content

---

# 37. RESUME MANAGEMENT

Functional controls for:

* Resume content/reference
* Finalized resume implementation
* Resume availability/access

Do not expose arbitrary visual design controls.

---

# 38. SOCIAL LINKS MANAGEMENT

Manage:

* GitHub
* LinkedIn
* WhatsApp
* Other approved links

Each row:

**Platform → URL/value → status → edit**

---

# 39. CONTACT MESSAGES

## Layout

Message list.

Columns/fields:

* Sender/contact information
* Message
* Submission information
* Status where implemented

Selecting a message opens a functional detail panel/modal.

Modal:

* `#111111`
* `#262626` border
* 12px radius
* Focus trap
* Escape to close

No unnecessary animation.

---

# 40. HOMEPAGE MANAGEMENT

Functional management of approved homepage content:

* Homepage content
* Featured projects
* Approved homepage-managed information

Project selection should use existing project records rather than duplicating project data.

---

# 41. SETTINGS

Only practical controls.

Potential controls include:

* Basic site settings
* Finalized animation settings
* Finalized 3D settings

Do not expose:

* Arbitrary color editor
* Arbitrary typography editor
* Free-form visual-production controls
* Unrestricted 3D scene editor

The public visual system remains governed by this blueprint.

---

# 42. ADMIN FEEDBACK SYSTEM

All admin mutations must support:

### Loading

Button changes to loading state without changing layout dimensions.

### Success

Small inline success confirmation.

### Error

Explicit error message adjacent to affected operation.

### Disabled

Reduced contrast while retaining readable text.

### Validation

Errors appear next to the relevant field.

No toast-only critical errors.

---

# 43. RESPONSIVE BLUEPRINT

## <640px

* One-column layouts
* 48px H1
* 20px page padding
* No mouse-follow
* No magnetic interaction
* Minimal/no 3D
* Reduced parallax
* Project imagery remains large
* Mobile navigation overlay
* Stacked CTAs
* Timeline becomes vertical
* Project compositions become image-first vertical sections

## 640–1023px

* Simplified editorial grid
* Reduced 3D
* Reduced particles
* Reduced animation
* Two-column compositions only where comfortable

## 1024–1279px

* Full editorial compositions
* Medium 3D
* Desktop interaction available
* Asymmetric project layouts enabled

## 1280px+

* Full 12-column editorial system
* Full approved 3D complexity
* Mouse-follow
* Magnetic CTA
* Maximum cinematic composition

---

# 44. MOBILE PROJECT COMPOSITION

Every project transforms into:

1. Metadata
2. Large image
3. Title
4. Value statement
5. Technologies
6. Actions

Never squeeze the desktop 7/5 grid into a narrow viewport.

Images should remain visually dominant.

---

# 45. ACCESSIBILITY CONTRACT

Every generated page must provide:

* Semantic landmarks
* Logical heading hierarchy
* Keyboard navigation
* Visible focus
* Accessible labels
* Meaningful image alt text
* Decorative image `alt=""`
* Accessible form errors
* Keyboard-operable menus/modals
* Reduced-motion behavior

Focus:

`2px solid #8B5CF6`

with approximately `3px` offset.

3D canvas never contains essential information.

---

# 46. PERFORMANCE CONTRACT

Loading order:

**Content → Typography → Critical imagery → UI → Motion → 3D enhancement**

3D must be independently removable.

Capability levels:

### A — Full

Desktop/high capability.

### B — Reduced

Tablet/medium capability.

### C — 2D fallback

Mobile/low capability/WebGL failure.

The 2D fallback must use the same:

* Dark canvas
* Violet atmosphere
* Geometric language
* Cinematic movement

Therefore it should look intentional rather than like an error state.

---

# 47. UI GENERATOR IMPLEMENTATION RULES

The generator must:

1. Use the exact color tokens.
2. Use Inter + JetBrains Mono.
3. Use a 12-column editorial grid on desktop.
4. Avoid generic centered hero layouts.
5. Avoid generic card grids.
6. Prioritize project imagery.
7. Keep violet below approximately 10% visual coverage.
8. Use asymmetric compositions.
9. Use 3D primarily in the homepage hero.
10. Keep all essential information outside 3D.
11. Use motion only for hierarchy, depth or feedback.
12. Never introduce additional accent colors.
13. Never introduce glassmorphism as a default surface treatment.
14. Never introduce rainbow/neon gradients.
15. Never create unapproved sections.
16. Never create unapproved pages.
17. Never invent project metrics, biography claims or credentials.
18. Never hide essential content behind hover.
19. Never require mouse interaction.
20. Preserve the complete content experience when motion/3D is disabled.

---

# 48. FINAL PAGE COMPOSITION RULE

Every public page should visually read as:

**Statement → Visual → Proof → Action**

Where applicable:

* **Statement:** large typography establishes context.
* **Visual:** project image, architectural 2D treatment or approved 3D.
* **Proof:** skills, technologies, experience, education, project details or credentials.
* **Action:** project, resume or contact CTA.

The composition should always feel like a **curated digital exhibition of technical work**, not a collection of website sections.

---

# 49. FINAL CREATIVE DECISION

The defining experience is:

**A quiet black canvas containing extremely precise typography and project artifacts, with violet appearing only when the interface wants the user's attention.**

The homepage earns the immersive quality through the abstract 3D environment.

The rest of the portfolio earns credibility through:

**large project imagery + editorial composition + technical metadata + concise writing + restrained motion.**

The admin removes the theatrical layer entirely and becomes a fast, dense management tool.

The final implementation should make a visitor think:

**“This developer builds sophisticated digital products.”**

It should never make them think:

**“This website is showing off its effects.”**
