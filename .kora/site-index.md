# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: Skin Clinic NY – Advanced Skin Care & Permanent Cosmetics in Tuckahoe, NY
purpose: Landing page for Skin Clinic NY offering permanent cosmetics, aesthetic skincare, medspa services, and laser treatments.
sections:
- `#home` — Hero promotional banner
- `#about` "Welcome To Skin Clinic" — Introduction and overview of the clinic
- `#services` "Services" — Categories and lists of available treatments: Permanent Makeup, Eyebrows, Eyeliner, Lips, 3D Areola Repigmentation, Paramedical Tattooing, Laser and Saline Tattoo Removal, Aesthetic Skincare, Skincare Facials, Face & Body Waxing, Precision Brow Shaping & Tinting, Eyelash Extensions, Lash Lift & Tint, Brow Lamination, Makeup Services, Medspa Services, Botox, Fillers, Laser Services, Sclero Therapy (Spider Vein Reduction), Vivace RF Microneedling, IPL Photo Facials, Chemical Peels, PDO Threads, PRP for Face & Hair, Laser Hair Removal, Photo Facials, Laser Tattoo Removal, Non Ablative Skin Resurfacing
- `#reviews` "Client Reviews" — Customer testimonials
- `#faq` "F.A.Q" — Frequently asked questions and answers
- `#contact` "Schedule a Free Consultation" — Contact form and business location details
also: Business email address appears in the contact section and JSON-LD structured data.
also: The services grid has separate markup sections for desktop grid view and mobile carousel view, both containing identical lists of service categories and items.

## support files
Files that are not pages. A line marked [content] holds words or data a visitor reads, so a
change to the site's content can land there; the rest only make the site work or look right.
- `robots.txt` — 112 bytes — too small to hold content
- `sitemap.xml` — XML sitemap used by search engines to list the site's URLs

## shared (every page)
The header, navigation, mobile menu and footer are propagated from index.html to every other page by
`shell_propagation`. A change to any of them is made on index.html alone and copied automatically.
