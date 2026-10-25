# Fernando Júnior — Portfólio

Portfólio de Fernando Júnior Grão Paim Quipiaca, engenheiro full stack sénior em Luanda, Angola.

**Online:** https://portfolio1-1-omega.vercel.app

## Stack

Site estático, sem build: HTML, CSS e JavaScript.

- **Three.js** — objeto 3D do hero (shader de ruído com iluminação)
- **GSAP + ScrollTrigger** — animações de scroll, galeria horizontal fixada
- **Lenis** — smooth scroll
- Compatível com desktop, tablet e mobile; respeita `prefers-reduced-motion`; funciona sem WebGL.

## Estrutura

```
index.html          conteúdo e SEO
css/style.css       design system e layout
js/main.js          interações e animações
js/hero3d.js        cena 3D do hero
assets/work/        capturas dos projetos (WebP)
assets/og.jpg       imagem de partilha
```

## Correr localmente

```bash
python -m http.server 5173
```

## Adicionar um projeto

Copie um `<article class="card">` dentro de `.work__track` em `index.html`, e coloque a captura em `assets/work/` (1200×750, WebP).
