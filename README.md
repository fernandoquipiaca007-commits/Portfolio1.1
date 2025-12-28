# Portfólio Fernando Júnior - Full Stack Developer

## 🚀 Deploy no Vercel

Este projeto está configurado para deploy no Vercel.

### Estrutura do Projeto

```
Portfólio/
├── Segunda pagina/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── ...
├── vercel.json
└── README.md
```

### Como fazer deploy

1. **Opção 1: Via CLI do Vercel**
   ```bash
   npm i -g vercel
   cd "Segunda pagina"
   vercel
   ```

2. **Opção 2: Via GitHub**
   - Conecte seu repositório ao Vercel
   - Configure o "Root Directory" como `Segunda pagina`
   - O Vercel detectará automaticamente e fará o deploy

3. **Opção 3: Arrastar e soltar**
   - Acesse vercel.com
   - Arraste a pasta `Segunda pagina` para o dashboard
   - O deploy será automático

### Configuração do Vercel

O arquivo `vercel.json` está configurado para:
- Servir os arquivos da pasta `Segunda pagina`
- Redirecionar todas as rotas para `index.html` (SPA)
- Cachear assets estáticos (CSS, JS, imagens)

### Solução de Problemas

**Erro NOT_FOUND:**
- Certifique-se de que o `vercel.json` está na raiz do repositório
- Verifique se o "Root Directory" no Vercel está configurado como `Segunda pagina`
- Ou mova os arquivos para a raiz do projeto

