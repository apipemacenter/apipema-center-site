# Apipema Center — Site Institucional

Site institucional estático do **Apipema Center** (Ondina, Salvador — BA), desenvolvido com **Astro**, **SCSS**, **TypeScript**, **GSAP (ScrollTrigger)**, **Anime.js v4** e **Lenis**.

## Scripts locais

```bash
npm install
npm run dev       # Servidor de desenvolvimento
npm run check     # Verificação TypeScript e Astro
npm run build     # Gera o HTML estático em dist/
npm run preview   # Visualiza o build estático localmente
```

## Publicação na Hostinger

### Opção 1 — Upload direto do HTML estático (`dist/`)
1. Execute `npm run build` (ou utilize diretamente a pasta `dist/` já compilada neste repositório).
2. No **Gerenciador de Arquivos** da Hostinger (ou via FTP), envie **todo o conteúdo de `dist/`** (incluindo o arquivo oculto `.htaccess`) para dentro de `public_html/`.

### Opção 2 — Deploy automático via Git / Frameworks Web na Hostinger
- **Comando de build:** `npm run build`
- **Diretório de saída:** `dist`
