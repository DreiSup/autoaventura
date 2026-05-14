<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Mobile-first — REGLA MÁS IMPORTANTE

La mayoría del tráfico de Autoaventura llega desde móvil. El móvil es el dispositivo prioritario.

- Diseña y revisa cada feature en móvil primero (~390px), luego adapta a desktop
- Toda la web debe ser 100% responsive desde el principio
- Usa breakpoints mobile-first en Tailwind: base = mobile, `md:` = tablet/desktop
- Antes de reportar cualquier feature como terminada, verifica que funciona en móvil
- iPad y desktop también deben funcionar, pero son secundarios
<!-- END:nextjs-agent-rules -->
