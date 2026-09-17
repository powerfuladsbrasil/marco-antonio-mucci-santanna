# Modelo Base de Psicologia — Powerful Ads

Template oficial de landing pages para profissionais de psicologia da Powerful Ads.

## Estrutura

- `index.html` — estrutura da página
- `styles.css` — identidade visual e responsividade
- `client-data.js` — dados variáveis de cada cliente
- `script.js` — renderização, fallbacks e interações
- `assets/imagens-modelo/` — biblioteca visual padrão/fallback

## Biblioteca visual integrada

O modelo inclui fallbacks para Hero e Sobre, imagens padrão para as três áreas de cuidado, consultório genérico, imagem terapêutica conceitual e texturas para fundo geral, Hero, seções e CTA final.

### Regra de uso

- `images.hero`: priorize a foto real do profissional. Quando estiver vazio, entra `heroFallback`.
- `images.about`: priorize uma segunda foto real. Quando estiver vazio, entra `aboutFallback`.
- `services[].image`: cada serviço pode ter sua imagem própria; o modelo já contém imagens padrão.
- `images.textures`: controla os fundos decorativos do site.

Fonte oficial para replicação das próximas landing pages de Psicologia da Powerful Ads.
