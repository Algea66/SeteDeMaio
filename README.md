# Site Aniversário Celestial

## Como abrir no seu computador

1. Extraia este ZIP em uma pasta.
2. Abra o terminal dentro da pasta extraída.
3. Rode:

```bash
npm install
npm run dev
```

4. Abra o endereço que aparecer no terminal. Normalmente:

```txt
http://localhost:5173
```

Se o PowerShell bloquear o npm, use:

```bash
npm.cmd install
npm.cmd run dev
```

## Fluxo do site

- Tela inicial pedindo para mandar o link para o notebook.
- Botão: **Já mandei pro notebook**.
- Tela de senha de dois dígitos.
- Senha atual: `10`.
- Depois disso, o site abre completo.

## Arquivos que você pode trocar

### Céu do dia
`public/images/ceu-07-maio.png`

### Lua
`public/images/lua-07-maio.png`

### Papel do poema
`public/images/papel-poema.jpeg`

### Bolo Naruto
`public/images/bolo-naruto.png`

### Fundo da festa atrás do bolo
`public/images/festa-fundo.png`

### Fotos do álbum
Coloque suas fotos nesta pasta:

`public/photos/`

Nomes esperados:

```txt
polaroid-01.jpg
polaroid-02.jpg
polaroid-03.jpg
polaroid-04.jpg
polaroid-05.jpg
polaroid-06.jpg
polaroid-07.jpg
polaroid-08.jpg
polaroid-09.jpg
polaroid-10.jpg
```

### Vídeo bônus
Coloque o arquivo aqui:

`public/videos/video-especial.mp4`

### Música do site
Coloque o MP3 aqui com este nome exato:

`public/audio/musica.mp3`

### Imagens do jornal
Se quiser trocar as imagens do jornal:

```txt
public/news/supernova-2007.png
public/news/beethoven-1824.png
public/news/tchaikovsky-1840.png
public/news/endeavour-1992.png
public/news/trappist-2016.png
```

### Imagens dos objetos do céu
Se quiser trocar as imagens da galeria do céu:

```txt
public/sky-objects/ngc-1980.png
public/sky-objects/m43.png
public/sky-objects/orion-nebula.png
public/sky-objects/lmc.png
public/sky-objects/ic-2391.png
public/sky-objects/ic-2944.png
public/sky-objects/carina-nebula.png
```

## Onde editar textos

Abra:

`src/App.jsx`

Textos principais e dados:

- `poemLines`
- `quizOptions`
- `skyObjects`
- `pleiadesStars`
- `newspaperStories`
- `polaroids`

## Onde editar estilos

Abra:

`src/styles.css`
