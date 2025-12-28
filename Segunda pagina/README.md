# BURNEX30 - Página de Vendas
## Guia Completo de Implementação no WordPress/Elementor

---

## 📋 ÍNDICE

1. [Sobre o Projeto](#1-sobre-o-projeto)
2. [Requisitos do Sistema](#2-requisitos-do-sistema)
3. [Estrutura da Página](#3-estrutura-da-página)
4. [Instalação no WordPress](#4-instalação-no-wordpress)
5. [Importação para o Elementor](#5-importação-para-o-elementor)
6. [Configuração de Imagens](#6-configuração-de-imagens)
7. [Configuração de Links](#7-configuração-de-links)
8. [Testes e Validação](#8-testes-e-validação)
9. [Otimizações de Performance](#9-otimizações-de-performance)
10. [Solução de Problemas](#10-solução-de-problemas)
11. [Suporte e Contato](#11-suporte-e-contato)

---

## 1. SOBRE O PROJETO

**Nome:** Burnex30 - Fórmula da Redução  
**Tipo:** Página de Vendas (Sales Page / Landing Page)  
**Produto:** Programa Digital de Emagrecimento  
**Plataforma:** WordPress + Elementor  

**Características:**
- ✅ 100% Responsivo (mobile, tablet, desktop)
- ✅ Otimizado para conversão
- ✅ 2 Carrosséis interativos (WhatsApp + Antes/Depois)
- ✅ Vídeo VSL integrado (Gumlet)
- ✅ 5 Bônus digitais
- ✅ Múltiplos CTAs estratégicos
- ✅ Seção de depoimentos
- ✅ FAQ completo
- ✅ Garantia de 7 dias
- ✅ Contador regressivo
- ✅ Barra de progresso fixa

---

## 2. REQUISITOS DO SISTEMA

### WordPress:
- Versão mínima: **6.0** ou superior
- PHP: **7.4** ou superior
- MySQL: **5.7** ou superior

### Plugins Necessários:
- **Elementor** (Free ou Pro) - v3.0+
- **Contact Form 7** (para formulários - opcional)
- **WP Rocket** ou **W3 Total Cache** (para performance - recomendado)
- **Smush** ou **ShortPixel** (para otimização de imagens - recomendado)

### Plugins Opcionais:
- **Yoast SEO** (para SEO)
- **PixelYourSite** (para pixels de tracking)
- **MonsterInsights** (para Google Analytics)

---

## 3. ESTRUTURA DA PÁGINA

### Ordem das Seções:

1. **Barra de Progresso** (fixa no topo - 78%)
2. **Hero Section** (Headline + Subtítulo + CTA)
3. **Vídeo VSL** (Gumlet - autoplay)
4. **História de Transformação** (Carla)
5. **O que é o Burnex30**
6. **6 Benefícios Transformadores**
7. **Comparação** (Outras Dietas vs Burnex30)
8. **Por que é Diferente**
9. **O que você vai encontrar dentro** (6 Módulos)
10. **Depoimentos** (3 cards com avatares centralizados)
11. **Carrossel WhatsApp** (4 prints - autoplay 7s)
12. **Carrossel Antes/Depois** (7 fotos - autoplay 7s, setas)
13. **Bônus Exclusivos** (5 bônus)
14. **FAQ** (8 perguntas frequentes)
15. **Eliminando Objeções** (6 objeções)
16. **Garantia de 7 Dias**
17. **Urgência e Escassez** (Contador 48h)
18. **CTA Final** (Chamada de ação principal)
19. **Rodapé**

**IMPORTANTE:** Cada seção tem um botão CTA ao final (exceto Hero e CTA Final).

---

## 4. INSTALAÇÃO NO WORDPRESS

### Passo 1: Preparar o WordPress

1. Acesse seu painel WordPress (`seusite.com/wp-admin`)
2. Vá em **Plugins > Adicionar Novo**
3. Instale e ative o **Elementor** (Free ou Pro)
4. Vá em **Páginas > Adicionar Nova**
5. Nomeie a página: "Burnex30" ou "Oferta Burnex30"
6. Clique em **Editar com Elementor**

### Passo 2: Configurar a Página

1. No Elementor, clique no **ícone de engrenagem** (configurações da página)
2. Em **Configurações da Página**:
   - Layout: **Elementor Canvas** (sem header/footer do tema)
   - Título: "Burnex30 - Transforme Seu Corpo em 30 Dias"
3. Clique em **Publicar**

---

## 5. IMPORTAÇÃO PARA O ELEMENTOR

### Método 1: Copiar e Colar HTML (RÁPIDO)

**Para cada seção:**

1. No Elementor, adicione um widget **HTML**
2. Arraste o widget HTML para a página
3. Copie o código HTML da seção correspondente do arquivo `index.html`
4. Cole no campo do widget HTML
5. Repita para todas as seções

**Vantagens:**
- ✅ Rápido
- ✅ Mantém formatação original

**Desvantagens:**
- ⚠️ Menos flexível para edições futuras

---

### Método 2: Reconstruir com Widgets do Elementor (RECOMENDADO)

**Para cada seção:**

1. Adicione uma **Seção** no Elementor
2. Configure o layout (1 coluna, 2 colunas, etc.)
3. Adicione widgets correspondentes:
   - **Título** para headlines
   - **Texto** para parágrafos
   - **Botão** para CTAs
   - **Imagem** para fotos
   - **Vídeo** para o VSL
   - **HTML** para carrosséis (código customizado)

**Vantagens:**
- ✅ Totalmente editável no Elementor
- ✅ Mais profissional
- ✅ Fácil manutenção

**Desvantagens:**
- ⚠️ Mais trabalhoso inicialmente

---

### Estrutura Recomendada no Elementor:

**Exemplo de uma seção:**

```
SEÇÃO (Section)
  └─ CONTAINER (Container)
      └─ COLUNA (Column)
          ├─ TÍTULO (Heading Widget)
          ├─ TEXTO (Text Editor Widget)
          ├─ IMAGEM (Image Widget)
          └─ BOTÃO (Button Widget)
```

---

## 6. CONFIGURAÇÃO DE IMAGENS

### Onde Inserir Cada Tipo de Imagem:

**1. Bônus (5 imagens):**
- Localização: Seção "Bônus Exclusivos"
- Formato: PNG ou JPG
- Tamanho recomendado: 800x600px
- Onde: Widget de Imagem no Elementor

**Caminhos a substituir no código:**
```
Arquivos/MOCKUP EBOOK 1, 2, 3/1.png → Exercícios Físicos em Casa
Arquivos/MOCKUP EBOOK 1, 2, 3/2.png → Guia Secar Barriga
Arquivos/MOCKUP EBOOK 1, 2, 3/3.png → Sucos Detox
COLOQUE_AQUI_O_CAMINHO_DA_IMAGEM_BONUS_ESTILO_VIDA_KETO.jpg → Estilo de Vida Keto
COLOQUE_AQUI_O_CAMINHO_DA_IMAGEM_BONUS_CHECKLIST_NUTRICIONAL.jpg → Checklist Nutricional
```

**2. Depoimentos (3 fotos de perfil):**
- Localização: Seção "Depoimentos"
- Formato: JPG (redondas)
- Tamanho recomendado: 200x200px
- Onde: Widget de Imagem com CSS `border-radius: 50%`

**Caminhos atuais (Unsplash - substituir por fotos reais):**
```
https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80 → Maria Silva
https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80 → Carlos Mendes
https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80 → Juliana Santos
```

**3. Prints WhatsApp (4 imagens):**
- Localização: Carrossel WhatsApp
- Formato: PNG (capturas de tela)
- Tamanho: Variável (serão adaptadas automaticamente)
- Onde: Código HTML do carrossel

**Caminhos atuais (substituir se necessário):**
```
Depoimentos Burnex30/1004616303.jpg → Print WhatsApp 1
Depoimentos Burnex30/1004616311.jpg → Print WhatsApp 2
Depoimentos Burnex30/1004616330.jpg → Print WhatsApp 3
Depoimentos Burnex30/1004616342.jpg → Print WhatsApp 4
```

**4. Antes/Depois (7 imagens):**
- Localização: Carrossel Antes/Depois
- Formato: JPG
- Tamanho: Variável (serão adaptadas automaticamente)
- Onde: Código HTML do carrossel

**Caminhos atuais:**
```
Depoimentos Burnex30/dieta-do-facebook.jpg → Transformação 1
Depoimentos Burnex30/f4cb27c677382b2837661da9142dcf8d.jpg → Transformação 2
Depoimentos Burnex30/lucy-prevs-before-after-photos.jpg → Transformação 3
Depoimentos Burnex30/mulher-viciada-em-fast-food-encara-dieta-e-perde-63kg-24082020161413185.jpeg → Transformação 4
Depoimentos Burnex30/olhando-grande-foto-de-uma-mulher-antes-e-depois-de-sua-dieta_590464-1141.jpg → Transformação 5
Depoimentos Burnex30/Superação-Luana-blog-da-mimis-michelle-franzoni-destaque.png → Transformação 6
Depoimentos Burnex30/vanetza-cine-2000-330503112a4e4fdf8a572988503bfeb6.jpg → Transformação 7
```

### Como Fazer Upload no WordPress:

1. Vá em **Mídia > Adicionar Nova**
2. Faça upload de todas as imagens
3. Após o upload, clique em cada imagem
4. Copie a **URL do arquivo**
5. Substitua os placeholders no código com as URLs copiadas

**Exemplo:**
```html
<!-- ANTES -->
<img src="COLOQUE_AQUI_O_CAMINHO_DA_IMAGEM_BONUS_ESTILO_VIDA_KETO.jpg" alt="...">

<!-- DEPOIS -->
<img src="https://seusite.com/wp-content/uploads/2024/12/estilo-vida-keto.jpg" alt="...">
```

---

## 7. CONFIGURAÇÃO DE LINKS

### Links dos Botões CTA:

Todos os botões "Comprar Agora" devem apontar para:
- **Checkout da Hotmart/Eduzz/Kiwify** (link do produto)

**Como configurar:**

**Opção 1: No Elementor**
1. No Elementor, clique no botão
2. Em **Link**, cole a URL do checkout
3. Marque **Abrir em nova aba** (opcional)
4. Salve

**Opção 2: No código HTML**
```html
<a href="https://go.hotmart.com/SEU-LINK-AQUI" class="btn-cta-section" target="_blank">
    QUERO TRANSFORMAR MEU CORPO AGORA →
</a>
```

**Links a configurar:**
- Todos os botões CTA nas seções
- Botão principal do Hero
- Botão final da oferta
- Link do vídeo (se necessário)

---

## 8. TESTES E VALIDAÇÃO

### Checklist de Testes:

**DESKTOP:**
- [ ] Todas as seções carregam corretamente
- [ ] Vídeo VSL carrega e faz autoplay
- [ ] Carrossel WhatsApp funciona (autoplay 7s, pausar, continuar)
- [ ] Carrossel Antes/Depois funciona (setas, autoplay 7s, altura fixa)
- [ ] Todos os botões CTA estão centralizados
- [ ] Todos os botões CTA levam ao checkout
- [ ] Fotos dos depoimentos estão centralizadas
- [ ] Imagens dos bônus carregam
- [ ] Contador regressivo funciona
- [ ] FAQ abre e fecha corretamente
- [ ] Barra de progresso fixa no topo funciona
- [ ] Scroll suave funciona

**TABLET (768px - 1199px):**
- [ ] Layout responsivo funciona
- [ ] Botões CTA centralizados e com largura adequada
- [ ] Carrosséis funcionam (altura adaptada)
- [ ] Vídeo adapta ao tamanho da tela
- [ ] Texto legível
- [ ] Setas do carrossel Antes/Depois visíveis

**MOBILE (320px - 767px):**
- [ ] Layout mobile perfeito
- [ ] Botões CTA ocupam largura correta (calc(100% - 30px)) e centralizados
- [ ] Carrosséis funcionam com swipe
- [ ] Setas escondidas no Antes/Depois
- [ ] Vídeo responsivo
- [ ] Texto legível
- [ ] Fotos dos depoimentos centralizadas
- [ ] Barra de progresso visível

**NAVEGADORES:**
- [ ] Chrome (última versão)
- [ ] Firefox (última versão)
- [ ] Safari (última versão)
- [ ] Edge (última versão)

**DISPOSITIVOS:**
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPhone 14 (390px)
- [ ] iPhone SE (375px)
- [ ] iPhone 5 (320px)
- [ ] Samsung Galaxy S21 (360px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop 1920px
- [ ] Desktop 1440px
- [ ] Laptop 1366px

---

## 9. OTIMIZAÇÕES DE PERFORMANCE

### Após a Implementação:

**1. Otimizar Imagens:**
- Usar plugin **Smush** ou **ShortPixel**
- Comprimir todas as imagens
- Converter para WebP (com fallback JPG)
- Lazy loading ativado (já implementado no código)

**2. Minificar CSS/JS:**
- Usar plugin **WP Rocket** ou **Autoptimize**
- Minificar e combinar arquivos CSS
- Minificar e combinar arquivos JavaScript

**3. Cache:**
- Ativar cache do servidor
- Ativar cache do WordPress (WP Rocket)
- Configurar cache do navegador

**4. CDN (Opcional):**
- Cloudflare (gratuito)
- StackPath
- KeyCDN

**5. Lazy Loading:**
- ✅ Já implementado no código (`loading="lazy"`)
- ✅ Carrosséis carregam sob demanda
- ✅ Imagens otimizadas

**Meta de Performance:**
- PageSpeed Score: **85+** (mobile e desktop)
- Tempo de carregamento: **< 3 segundos**
- First Contentful Paint: **< 1.5s**

---

## 10. SOLUÇÃO DE PROBLEMAS

### Problema: Botões não centralizados em mobile

**Solução:**
```css
.btn-cta-section {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin: 0 auto !important;
    width: calc(100% - 30px) !important;
}
```

### Problema: Carrossel muda de altura

**Solução:**
Verificar se o CSS tem altura fixa no container:
```css
.whatsapp-carousel-wrapper {
    height: 600px;
    min-height: 600px;
    max-height: 600px;
}
```

### Problema: Vídeo não faz autoplay

**Solução:**
Verificar parâmetros do iframe:
```html
src="...?autoplay=true&muted=true&loop=true"
```

### Problema: Fotos dos depoimentos não centralizadas

**Solução:**
Verificar se o HTML tem o container:
```html
<div class="avatar-container">
    <img src="..." class="testimonial-avatar">
</div>
```

E o CSS:
```css
.avatar-container {
    display: flex;
    justify-content: center;
    width: 100%;
}
```

### Problema: Carrossel não funciona

**Solução:**
1. Verificar se o arquivo `script.js` está carregado
2. Verificar console do navegador (F12) para erros
3. Garantir que os IDs dos carrosséis estão corretos:
   - `whatsappCarousel`
   - `beforeAfterCarousel`

### Problema: Imagens não aparecem completas

**Solução:**
Verificar se o CSS tem `object-fit: contain`:
```css
.whatsapp-slide img,
.before-after-slide img {
    object-fit: contain;
    max-width: 95%;
    max-height: 95%;
}
```

---

## 11. SUPORTE E CONTATO

**Documentação Técnica:** Este arquivo (README.md)  
**Versão:** 1.0  
**Data:** Dezembro 2024  

**Para suporte técnico:**
1. Revisar este documento
2. Verificar console do navegador (F12) para erros
3. Testar em modo de navegação anônima
4. Verificar se todos os arquivos estão carregados (CSS, JS)

---

## ESTRUTURA DE ARQUIVOS

```
burnex30-landing-page/
│
├── index.html (página principal)
├── styles.css (estilos completos)
├── script.js (funcionalidades JavaScript)
├── README.md (esta documentação)
│
├── Arquivos/
│   └── MOCKUP EBOOK 1, 2, 3/
│       ├── 1.png (Exercícios)
│       ├── 2.png (Secar Barriga)
│       └── 3.png (Sucos Detox)
│
└── Depoimentos Burnex30/
    ├── 1004616303.jpg (WhatsApp 1)
    ├── 1004616311.jpg (WhatsApp 2)
    ├── 1004616330.jpg (WhatsApp 3)
    ├── 1004616342.jpg (WhatsApp 4)
    ├── dieta-do-facebook.jpg (Antes/Depois 1)
    ├── f4cb27c677382b2837661da9142dcf8d.jpg (Antes/Depois 2)
    ├── lucy-prevs-before-after-photos.jpg (Antes/Depois 3)
    ├── mulher-viciada-em-fast-food-encara-dieta-e-perde-63kg-24082020161413185.jpeg (Antes/Depois 4)
    ├── olhando-grande-foto-de-uma-mulher-antes-e-depois-de-sua-dieta_590464-1141.jpg (Antes/Depois 5)
    ├── Superação-Luana-blog-da-mimis-michelle-franzoni-destaque.png (Antes/Depois 6)
    └── vanetza-cine-2000-330503112a4e4fdf8a572988503bfeb6.jpg (Antes/Depois 7)
```

---

## ESPECIFICAÇÕES TÉCNICAS

### Carrosséis:

**WhatsApp:**
- Altura fixa: 600px (desktop), 500px (tablet), 400px (mobile)
- Autoplay: 7 segundos
- Transição: Slide suave (0.8s)
- Object-fit: contain (imagens completas)
- Pausa ao clicar, retoma ao sair

**Antes/Depois:**
- Altura fixa: 650px (desktop), 550px (tablet), 450px (mobile)
- Largura máxima: 800px (desktop)
- Autoplay: 7 segundos
- Transição: Slide suave (0.8s)
- Object-fit: contain (imagens completas)
- Setas de navegação (desktop/tablet)
- Pausa ao clicar, retoma ao sair
- Loop infinito

### Botões CTA:

- Largura máxima: 600px (desktop)
- Altura: 70px (desktop), 65px (tablet), 60px (mobile)
- Sempre centralizados
- Gradiente laranja (#FF6B35 → #E63946)
- Animação de pulso suave

### Depoimentos:

- 3 cards com avatares centralizados
- Fotos: 100px x 100px, circulares
- Borda laranja destacada
- Estrelas centralizadas
- Badge "Resultado Verificado"

---

## CONCLUSÃO

Esta página está pronta para implementação no WordPress/Elementor.

**Próximos Passos:**
1. ✅ Fazer upload no WordPress
2. ✅ Importar para o Elementor
3. ✅ Inserir todas as imagens
4. ✅ Configurar links dos botões
5. ✅ Testar em todos os dispositivos
6. ✅ Otimizar performance
7. ✅ Publicar e monitorar conversões

**BOA SORTE COM O LANÇAMENTO! 🚀**

---

**Última atualização:** Dezembro 2024  
**Versão:** 1.0 Final


