import React, { useEffect, useMemo, useRef, useState } from 'react';

const PASSWORD = '10';
const PLEIADES_STORAGE_KEY = 'pleiades-viewed-v2';

const ASSETS = {
  sky: '/images/ceu-07-maio.png',
  moon: '/images/lua-07-maio.png',
  paper: '/images/papel-poema.jpeg',
  cake: '/images/bolo-naruto.png',
  party: '/images/festa-fundo.png',
};

const poemLines = [
  'Adoro como cuida de mim...',
  'E esse antigo loiro, no seu novo cabelo curto.',
  '',
  'Você se tornou o meu maior rubi...',
  'E se eu te vejo ao vivo no meu aparelho... eu surto.',
  '',
  'Adoro suas botas de vaqueira.',
  'E te adoro mais, à medida que descubro cada segredo.',
  '',
  'Eu adoro tanto tudo em você...',
  'Não sabes o bem que me faz.',
  'Às vezes... até sinto medo.',
  '',
  'Também adoro o quanto é doce...',
  'Todos os nossos dias normais...',
  'E como chora em qualquer enredo.',
  '',
  'Pra sempre vou ser seu porto seguro.',
  'Seu cais. Ou seu protetor rochedo.',
  '',
  'Eu adoro a sua risada.',
  'E também quando me faz rir.',
  '',
  'Faz tempo que não durmo sem ouvir sua respiração.',
  '',
  'Agora eu adoro saber que logo estará perto de mim...',
  'E que vou dormir ouvindo seu coração.',
  '',
  'No fim...',
  'Eu te adoro principalmente por ter me permitido te amar.',
  'Me aceitou, apesar do pesar.',
  '',
  'Daqui pra frente...',
  'Até o fim de tudo que vivenciar... cada segundo valerá.',
  'E em tudo de belo que eu observar... lá você estará.',
];

const quizOptions = [
  {
    id: 'A',
    text: 'Um céu que fala sobre expansão, desejo de liberdade e busca por propósito, mas também lembra que sonhos grandes precisam de maturidade.',
    correct: true,
  },
  {
    id: 'B',
    text: 'Um céu mais ligado ao recolhimento, ao silêncio emocional e à vontade de evitar mudanças importantes por enquanto.',
    correct: false,
  },
  {
    id: 'C',
    text: 'Um céu que simboliza intensidade, disputas internas e necessidade de agir rápido antes que as oportunidades desapareçam.',
    correct: false,
  },
  {
    id: 'D',
    text: 'Um céu voltado principalmente para rotina, estabilidade material e preservação do que já está seguro.',
    correct: false,
  },
];

const skyObjects = [
  {
    title: 'The Orion Nebula',
    kicker: 'berçário de estrelas',
    image: '/sky-objects/orion-nebula.png',
    description:
      'Uma das regiões mais famosas de formação estelar. Ela aparece como uma nuvem luminosa no céu, quase como se o universo estivesse mostrando onde novas luzes começam.',
  },
  {
    title: 'Carina Nebula',
    kicker: 'a grande joia austral',
    image: '/sky-objects/carina-nebula.png',
    description:
      'A Nebulosa de Carina, catalogada como NGC 3372, é imensa, dramática e cheia de textura. Uma das imagens mais bonitas para lembrar que o céu também tem profundidade.',
  },
  {
    title: 'Large Magellanic Cloud',
    kicker: 'uma galáxia vizinha',
    image: '/sky-objects/lmc.png',
    description:
      'A Grande Nuvem de Magalhães é uma galáxia companheira da Via Láctea. Como se uma outra ilha de estrelas também tivesse aparecido para fazer parte daquela noite.',
  },
  {
    title: 'IC 2944',
    kicker: 'Running Chicken Nebula',
    image: '/sky-objects/ic-2944.png',
    description:
      'Uma nebulosa rica em gás e formação estelar. Além do nome curioso, ela tem aquela aparência viva de nuvem cósmica onde o céu parece estar criando alguma coisa.',
  },
];

const pleiadesStars = [
  { id: 'alcyone', name: 'Alcyone', label: 'Seu brilho', text: 'Tem gente que ilumina chegando devagar. Você ilumina até quando nem percebe.', x: 500, y: 190, size: 18 },
  { id: 'maia', name: 'Maia', label: 'Sua delicadeza', text: 'Existe uma delicadeza em você que não parece frágil. Parece rara.', x: 368, y: 274, size: 14 },
  { id: 'electra', name: 'Electra', label: 'Sua energia', text: 'Mesmo nos dias normais, você tem um jeito de fazer tudo parecer mais vivo.', x: 606, y: 300, size: 15 },
  { id: 'merope', name: 'Merope', label: 'Sua beleza quieta', text: 'Aquela beleza que não precisa pedir atenção. Ela simplesmente fica no mundo e muda o lugar.', x: 658, y: 160, size: 13 },
  { id: 'taygeta', name: 'Taygeta', label: 'Sua coragem', text: 'Você carrega mais força do que imagina. E eu amo descobrir isso em você.', x: 250, y: 212, size: 15 },
  { id: 'celaeno', name: 'Celaeno', label: 'Seu mistério', text: 'Quanto mais eu te conheço, mais parece que ainda existe um céu inteiro em você.', x: 218, y: 382, size: 12 },
  { id: 'asterope', name: 'Asterope', label: 'Sua risada', text: 'A sua risada é uma dessas coisas pequenas que salvam um dia inteiro.', x: 752, y: 245, size: 16 },
];

const pleiadesLines = [
  ['taygeta', 'maia'],
  ['maia', 'alcyone'],
  ['alcyone', 'merope'],
  ['merope', 'asterope'],
  ['alcyone', 'electra'],
  ['maia', 'celaeno'],
  ['electra', 'asterope'],
  ['celaeno', 'taygeta'],
];

const newspaperStories = [
  {
    title: 'Uma supernova brilhou como manchete do universo',
    kicker: '07 de maio de 2007',
    body:
      'Naquele dia, uma das supernovas mais brilhantes ganhou destaque. Muita luz para uma data só. O tipo de coincidência que parece ter sido deixado no calendário de propósito.',
    image: '/news/supernova-2007.png',
    caption: 'Troque esta imagem em public/news/supernova-2007.png',
  },
  {
    title: 'A 9ª Sinfonia ecoou como se o mundo ficasse maior',
    kicker: '07 de maio de 1824',
    body:
      'Beethoven estreou uma obra que parecia maior que qualquer sala. Emoção, intensidade e beleza rara: não é pouca coisa para uma única data carregar.',
    image: '/news/beethoven-1824.png',
    caption: 'Troque esta imagem em public/news/beethoven-1824.png',
  },
  {
    title: 'Tchaikovsky nasceu para transformar sentimento em música',
    kicker: '07 de maio de 1840',
    body:
      'Drama, delicadeza e coração aberto também moram em 7 de maio. Como se o dia já viesse, desde sempre, com trilha sonora própria.',
    image: '/news/tchaikovsky-1840.png',
    caption: 'Troque esta imagem em public/news/tchaikovsky-1840.png',
  },
  {
    title: 'O Endeavour partiu levando a data para o espaço',
    kicker: '07 de maio de 1992',
    body:
      'O primeiro voo do ônibus espacial Endeavour fez a data tocar o céu de outro jeito: com coragem, aventura e aquela vontade bonita de ir além.',
    image: '/news/endeavour-1992.png',
    caption: 'Troque esta imagem em public/news/endeavour-1992.png',
  },
  {
    title: 'TRAPPIST-1 lembrou que sempre existem novos mundos',
    kicker: 'lembrança astronômica',
    body:
      'O fascínio por mundos distantes combina com uma data que já parecia ter sido escrita olhando para cima. Mais planetas, mais possibilidades, mais imaginação.',
    image: '/news/trappist-2016.png',
    caption: 'Troque esta imagem em public/news/trappist-2016.png',
  },
];

const polaroids = [
  { image: '/photos/polaroid-01.jpg', caption: 'sorriso que deveria ser patrimônio público', x: '6%', y: '6%', rotate: -10, delay: '0s', size: 'large' },
  { image: '/photos/polaroid-02.jpg', caption: 'foto oficialmente insuficiente', x: '29%', y: '13%', rotate: 6, delay: '.25s', size: 'medium' },
  { image: '/photos/polaroid-03.jpg', caption: 'versão impossível de esquecer', x: '50%', y: '6%', rotate: -3, delay: '.55s', size: 'large' },
  { image: '/photos/polaroid-04.jpg', caption: 'luz que não veio do ambiente', x: '73%', y: '13%', rotate: 8, delay: '.15s', size: 'medium' },
  { image: '/photos/polaroid-05.jpg', caption: 'arquivo de pequena eternidade', x: '12%', y: '49%', rotate: 7, delay: '.45s', size: 'small' },
  { image: '/photos/polaroid-06.jpg', caption: 'essa aqui salvou o dia inteiro', x: '36%', y: '52%', rotate: -8, delay: '.1s', size: 'medium' },
  { image: '/photos/polaroid-07.jpg', caption: 'beleza em flagrante', x: '58%', y: '48%', rotate: 5, delay: '.38s', size: 'small' },
  { image: '/photos/polaroid-08.jpg', caption: 'não explica tudo, mas chega perto', x: '78%', y: '51%', rotate: -6, delay: '.7s', size: 'medium' },
  { image: '/photos/polaroid-09.jpg', caption: 'eu guardaria num potinho', x: '24%', y: '72%', rotate: -3, delay: '.85s', size: 'small' },
  { image: '/photos/polaroid-10.jpg', caption: 'lembrança que virou constelação', x: '64%', y: '72%', rotate: 4, delay: '.6s', size: 'small' },
];

function playSparkle(index = 0) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(640 + index * 45, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(980 + index * 28, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.24);
  } catch {
    // áudio opcional
  }
}

function Gate({ onEnter }) {
  const [step, setStep] = useState('notice');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submitPassword(event) {
    event.preventDefault();
    if (password.trim() === PASSWORD) {
      playSparkle(2);
      onEnter();
    } else {
      setError('Senha errada, meu bem. Tenta de novo com dois dígitos. ✨');
    }
  }

  return (
    <main className="gate cosmic-panel">
      <StarDust count={85} />
      {step === 'notice' ? (
        <div className="gate-box">
          <p className="eyebrow">antes de começar</p>
          <h1>Abra essa surpresa no notebook.</h1>
          <p>
            Copia o link dessa página e manda para o notebook. Ela foi feita para ficar mais bonita em tela grande, com as fotos, o céu, o poema e a surpresa final aparecendo do jeito certo.
          </p>
          <button onClick={() => setStep('password')}>Já mandei pro notebook</button>
        </div>
      ) : (
        <form className="gate-box password-box" onSubmit={submitPassword}>
          <p className="eyebrow">entrada secreta</p>
          <h1>Digite a senha de dois dígitos.</h1>
          <p>A dica continua a mesma: o algarismo que aparece no título do nosso primeiro filme.</p>
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value.replace(/\D/g, '').slice(0, 2));
              setError('');
            }}
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="••"
            maxLength={2}
            autoFocus
          />
          {error && <small className="password-error">{error}</small>}
          <button type="submit">Entrar no site</button>
        </form>
      )}
    </main>
  );
}

function StarDust({ count = 50 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() > 0.86 ? 3 : Math.random() > 0.55 ? 2 : 1,
        delay: `${Math.random() * 4}s`,
        duration: `${2 + Math.random() * 4}s`,
      })),
    [count]
  );

  return (
    <div className="stars-layer" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}

function MusicDock({ enabled }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!enabled || !audioRef.current) return;
    const audio = audioRef.current;
    audio.volume = 0.4;
    const tryPlay = () => audio.play().catch(() => {});
    tryPlay();
    window.addEventListener('click', tryPlay, { once: true });
    return () => window.removeEventListener('click', tryPlay);
  }, [enabled]);

  return (
    <div className="music-dock">
      <div>
        <small>trilha sonora</small>
        <strong>toque aqui se quiser deixar a música rolando</strong>
      </div>
      <audio ref={audioRef} controls loop preload="metadata">
        <source src="/audio/musica.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

function AppShell({ entered }) {
  return (
    <>
      <Nav />
      <MusicDock enabled={entered} />
      <IntroSection />
      <SkySection />
      <MoonSection />
      <PleiadesSection />
      <NewspaperSection />
      <PhotoJourneySection />
      <PoemSection />
      <VideoSection />
      <FinalCakeSection />
    </>
  );
}

function Nav() {
  return (
    <nav className="site-nav">
      <a href="#intro">Início</a>
      <a href="#sky">Céu</a>
      <a href="#moon">Lua</a>
      <a href="#pleiades">Plêiades</a>
      <a href="#newspaper">Jornal</a>
      <a href="#photos">Fotos</a>
      <a href="#poem">Poema</a>
      <a href="#video">Bônus</a>
      <a href="#cake">Final</a>
    </nav>
  );
}

function SectionHeading({ eyebrow, title, text, compact = false }) {
  return (
    <div className={`section-heading ${compact ? 'compact-heading' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function IntroSection() {
  return (
    <section id="intro" className="section intro-section cosmic-panel">
      <StarDust count={140} />
      <div className="intro-glow intro-glow-left" />
      <div className="intro-glow intro-glow-right" />
      <div className="intro-content">
        <p className="eyebrow">07 de maio</p>
        <h1>Antes da Lua nascer, você já havia chegado iluminando tudo.</h1>
        <p className="intro-subtitle">Alguns astros não precisam estar no céu para trazer luz às nossas vidas :)</p>
        <p className="intro-text">
          A vida se encarregou de deixar que você fosse o primeiro astro a brilhar naquela noite. Às 20h05, a Lua ainda estava abaixo do horizonte.
        </p>
        <p className="intro-text">
          Ela só apareceu quase duas horas depois, às 21h54, como se tivesse ficado com inveja de todo o brilho que você já estava espalhando sozinha.
        </p>
      </div>
    </section>
  );
}

function SkySection() {
  return (
    <section id="sky" className="section sky-section">
      <SectionHeading
        eyebrow="mapa vivo"
        compact
        title="O céu no dia em que você nasceu."
        text="Uma tentativa de transformar aquele pedaço de noite em imagem. Como se fosse possível olhar para cima e voltar para 07 de maio de 2007."
      />
      <div className="sky-image-wrap">
        <img src={ASSETS.sky} alt="Céu visível em 07 de maio de 2007" />
      </div>
      <p className="sky-note">
        Júpiter, Saturno e Vênus estavam lá. Sagitário desenhava o céu com linhas discretas. E a Lua brilhava forte, mas mesmo ela chegou depois. A história mais bonita daquela noite tinha começado aqui embaixo.
      </p>
      <SkyQuiz />
      <div className="sky-objects-block celestial-details">
        <h3>Detalhes escondidos no alto</h3>
        <div className="sky-objects-grid">
          {skyObjects.map((item) => (
            <article className="space-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div className="space-card-body">
                <small>{item.kicker}</small>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkyQuiz() {
  const [choice, setChoice] = useState(null);
  const selected = quizOptions.find((item) => item.id === choice);

  return (
    <div className="quiz-card">
      <p className="eyebrow">quiz do céu</p>
      <h3>Ao observar a Lua crescente em Sagitário, com Júpiter, Saturno e Vênus visíveis no céu, qual interpretação combina melhor com essa cena?</h3>
      <div className="quiz-options">
        {quizOptions.map((option) => (
          <button
            key={option.id}
            className={choice === option.id ? 'quiz-option active' : 'quiz-option'}
            onClick={() => setChoice(option.id)}
          >
            <b>{option.id})</b>
            <span>{option.text}</span>
          </button>
        ))}
      </div>
      {selected && (
        <div className={selected.correct ? 'quiz-feedback correct' : 'quiz-feedback'}>
          <strong>{selected.correct ? 'Acertou ✨' : 'Quase, meu amor.'}</strong>
          <p>
            A melhor leitura é a <b>A</b>: um céu de expansão, vontade de crescer, explorar e buscar sentido, mas com o lembrete lindo de que grandes sonhos ficam ainda mais fortes quando encontram maturidade, estrutura e tempo certo.
          </p>
        </div>
      )}
    </div>
  );
}

function MoonSection() {
  return (
    <section id="moon" className="section moon-section cosmic-panel">
      <StarDust count={70} />
      <div className="moon-layout">
        <div className="moon-visual">
          <img src={ASSETS.moon} alt="Lua em fase crescente" />
        </div>
        <div className="moon-text-side">
          <h2>Sobre a Lua no dia em que você nasceu.</h2>
          <p>
            A Lua estava em Sagitário, em fase crescente, com 72% de iluminação. Uma lua de expansão, preparação, amadurecimento e intensificação. E que essa sua nova possa te trazer tudo isso meu amor!
          </p>
          <div className="phase-bar" aria-label="fase da lua 72 por cento">
            <span style={{ width: '72%' }} />
            <i style={{ left: '72%' }} />
          </div>
          <div className="phase-caption"><span>Fase crescente</span><b>72% de iluminação</b></div>
          <div className="moon-facts">
            <div><span>Constelação</span><b>Sagitário</b></div>
            <div><span>Magnitude</span><b>-12.25</b></div>
            <div><span>Distância</span><b>391.191 km</b></div>
            <div><span>Fase</span><b>0.72</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PleiadesSection() {
  const [activeId, setActiveId] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PLEIADES_STORAGE_KEY) || '[]');
      if (Array.isArray(saved)) setCompleted(saved);
    } catch {
      // segue sem localstorage
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PLEIADES_STORAGE_KEY, JSON.stringify(completed));
    } catch {
      // ok
    }
  }, [completed]);

  const starById = Object.fromEntries(pleiadesStars.map((star) => [star.id, star]));
  const activeStar = pleiadesStars.find((star) => star.id === activeId);
  const allCompleted = completed.length === pleiadesStars.length;

  function handleClick(star, index) {
    setActiveId(star.id);
    setCompleted((current) => (current.includes(star.id) ? current : [...current, star.id]));
    playSparkle(index);
  }

  const popupStyle = activeStar
    ? {
        left: `${(activeStar.x / 1000) * 100}%`,
        top: `${(activeStar.y / 620) * 100}%`,
      }
    : undefined;

  return (
    <section id="pleiades" className="section pleiades-section cosmic-panel">
      <StarDust count={90} />
      <SectionHeading
        eyebrow="constelação interativa"
        compact
        title="Características que brilham em você."
        text="As Plêiades são delicadas e muito bonitas. Achei justo esconder ali umas coisinhas suas que eu adoro. Clica nas estrelas para abrir."
      />
      <div className="constellation-wrap">
        <svg viewBox="0 0 1000 620" className="constellation-svg">
          <defs>
            <filter id="starGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {pleiadesLines.map(([from, to]) => {
            const a = starById[from];
            const b = starById[to];
            const done = completed.includes(from) && completed.includes(to);
            const active = activeId === from || activeId === to;
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={active ? 'constellation-line active' : done ? 'constellation-line done' : 'constellation-line'}
              />
            );
          })}
          {pleiadesStars.map((star, index) => {
            const isActive = activeId === star.id;
            const isDone = completed.includes(star.id);
            return (
              <g key={star.id} className="constellation-star" onClick={() => handleClick(star, index)}>
                <circle cx={star.x} cy={star.y} r={star.size + 24} fill="transparent" />
                <circle cx={star.x} cy={star.y} r={star.size + 14} className={isActive ? 'star-aura active' : isDone ? 'star-aura done' : 'star-aura'} filter="url(#starGlow)" />
                <path
                  d={`M ${star.x} ${star.y - star.size * 2.3} L ${star.x + star.size * 0.62} ${star.y - star.size * 0.62} L ${star.x + star.size * 2.3} ${star.y} L ${star.x + star.size * 0.62} ${star.y + star.size * 0.62} L ${star.x} ${star.y + star.size * 2.3} L ${star.x - star.size * 0.62} ${star.y + star.size * 0.62} L ${star.x - star.size * 2.3} ${star.y} L ${star.x - star.size * 0.62} ${star.y - star.size * 0.62} Z`}
                  className={isActive ? 'star-shape active' : isDone ? 'star-shape done' : 'star-shape'}
                  filter="url(#starGlow)"
                />
              </g>
            );
          })}
        </svg>
        {activeStar && (
          <div className="mini-window" style={popupStyle}>
            <div className="window-top">
              <span />
              <span />
              <span />
              <b>{activeStar.name}</b>
              <button onClick={() => setActiveId(null)}>×</button>
            </div>
            <small>característica encontrada</small>
            <h3>{activeStar.label}</h3>
            <p>{activeStar.text}</p>
          </div>
        )}
      </div>
      {allCompleted && (
        <p className="pleiades-final">
          Eu dei nomes de estrelas para coisas suas porque, de algum jeito, foi isso que você virou em mim: um céu inteiro de detalhes que eu não quero esquecer.
        </p>
      )}
    </section>
  );
}

function NewspaperSection() {
  const [lead, second, third, fourth, fifth] = newspaperStories;

  return (
    <section id="newspaper" className="section newspaper-section">
      <div className="newspaper-paper">
        <header className="newspaper-header">
          <div className="newspaper-tag">edição especial</div>
          <h2>Gazeta do Céu</h2>
          <div className="newspaper-tag">07 de maio</div>
        </header>
        <div className="newspaper-subhead">Urandi, Bahia · edição comemorativa · luz, música, espaço e coincidências bonitas</div>

        <div className="newspaper-frontpage">
          <article className="lead-story">
            <div className="newspaper-image">
              <img src={lead.image} alt={lead.title} />
            </div>
            <div className="story-copy">
              <p className="story-kicker">{lead.kicker}</p>
              <h3>{lead.title}</h3>
              <p>{lead.body}</p>
            </div>
          </article>

          <aside className="side-stories">
            {[second, third].map((story) => (
              <article key={story.title} className="side-story">
                <div className="newspaper-image small">
                  <img src={story.image} alt={story.title} />
                </div>
                <p className="story-kicker">{story.kicker}</p>
                <h4>{story.title}</h4>
                <p>{story.body}</p>
              </article>
            ))}
          </aside>
        </div>

        <div className="newspaper-columns">
          {[fourth, fifth].map((story) => (
            <article key={story.title} className="column-story">
              <div className="newspaper-image medium">
                <img src={story.image} alt={story.title} />
              </div>
              <p className="story-kicker">{story.kicker}</p>
              <h4>{story.title}</h4>
              <p>{story.body}</p>
            </article>
          ))}
          <article className="column-story quote-story">
            <span className="quote-mark">✦</span>
            <h4>Tantos eventos importantes relacionados a astros e coisas bonitas nessa data...</h4>
            <p>
              Talvez seja por isso que já faz um tempo que toda luz bonita que eu observo me lembra você.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function PhotoJourneySection() {
  return (
    <section id="photos" className="section photo-section cosmic-panel">
      <StarDust count={140} />
      <div className="photo-galaxy left" />
      <div className="photo-galaxy right" />
      <header className="photo-title only-title">
        <h2>Seu Album de Fotos</h2>
      </header>
      <div className="polaroid-stage">
        {polaroids.map((item) => (
          <figure
            key={item.caption}
            className={`polaroid ${item.size}`}
            style={{ left: item.x, top: item.y, '--rotate': `${item.rotate}deg`, '--delay': item.delay }}
          >
            <div className="polaroid-photo"><img src={item.image} alt={item.caption} /></div>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function PoemSection() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const writtenLines = poemLines.filter((line) => line.trim()).length;

  useEffect(() => {
    const onScroll = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setProgress(passed / Math.max(total, 1));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  let lineIndex = -1;

  return (
    <section id="poem" ref={ref} className="poem-section cosmic-panel">
      <StarDust count={80} />
      <div className="poem-sticky">
        <div className="poem-intro special-poem-title">
          <p className="eyebrow">nosso poema reformulado</p>
          <h2><span>10 mil coisas</span><em>que adoro em você</em></h2>
        </div>
        <div className="paper-sheet" style={{ backgroundImage: `url(${ASSETS.paper})` }}>
          <div className="paper-inner">
            {poemLines.map((line, index) => {
              const isBlank = line.trim() === '';
              if (isBlank) return <div className="poem-blank" key={`blank-${index}`} />;
              lineIndex += 1;
              const start = 0.04 + lineIndex * (0.9 / writtenLines);
              const end = start + 0.9 / writtenLines;
              const reveal = Math.min(Math.max((progress - start) / (end - start), 0), 1);
              return <InkLine key={`${line}-${index}`} line={line} reveal={reveal} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function InkLine({ line, reveal }) {
  return (
    <div className="ink-wrap">
      <p style={{ clipPath: `inset(0 ${100 - reveal * 100}% 0 0)`, opacity: reveal > 0 ? 0.25 + reveal * 0.75 : 0 }}>{line}</p>
      {reveal > 0 && reveal < 1 && <span style={{ left: `${reveal * 100}%` }} />}
    </div>
  );
}

function VideoSection() {
  return (
    <section id="video" className="section video-section cosmic-panel">
      <StarDust count={65} />
      <div className="video-box">
        <p className="eyebrow">bônus</p>
        <h2 className="special-serif-title video-title">Um vídeo especial</h2>
        <p className="video-subtitle">pode morar aqui</p>
        <div className="video-frame">
          <video controls playsInline preload="metadata" poster="/images/ceu-07-maio.png">
            <source src="/videos/video-especial.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

function FinalCakeSection() {
  const [blown, setBlown] = useState(false);
  const [burst, setBurst] = useState(false);
  const [message, setMessage] = useState(false);
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 240 - 120,
        y: -(Math.random() * 130 + 40),
        size: 5 + Math.random() * 9,
        delay: Math.random() * 0.18,
        duration: 1 + Math.random() * 0.7,
        rot: Math.random() * 360,
      })),
    [burst]
  );

  function blow() {
    if (blown) return;
    setBlown(true);
    setBurst(true);
    setTimeout(() => setMessage(true), 550);
    setTimeout(() => setBurst(false), 1800);
    playSparkle(5);
  }

  function reset() {
    setBlown(false);
    setBurst(false);
    setMessage(false);
  }

  return (
    <section id="cake" className="section cake-section">
      <div className="party-bg"><img src={ASSETS.party} alt="Família e amigos cantando parabéns" /></div>
      <div className="cake-overlay" />
      <div className="cake-content">
        <p className="eyebrow">você tá sempre de parabéns, meu amor. então...</p>
        <h2 className="special-serif-title cake-title"><span>Faça um pedido</span><em>e sopre o Rasengan</em></h2>
        <p>Pense em um desejo bonito. Depois clique no botão de soprar sua vela e tenho certeza que logo a vida vai te presentear com tudo que precisa.</p>
        <div className="cake-stage">
          <img className="cake-img" src={ASSETS.cake} alt="Bolo de aniversário temático de Naruto" />
          <div className={blown ? 'rasengan gone' : 'rasengan active'}>
            <span />
            <i />
          </div>
          {blown && <div className="rasengan-poof" />}
          {burst && particles.map((p) => <em key={p.id} className="chakra-particle" style={{ '--tx': `${p.x}px`, '--ty': `${p.y}px`, '--size': `${p.size}px`, '--delay': `${p.delay}s`, '--duration': `${p.duration}s`, '--rot': `${p.rot}deg` }} />)}
        </div>
        <div className="cake-actions">
          <button onClick={blow} disabled={blown}>{blown ? 'Rasengan soprado ✨' : 'Soprar Rasengan'}</button>
          {blown && <button onClick={reset} className="ghost-button">Repetir</button>}
        </div>
        {message && (
          <div className="final-message">
            <h3 className="special-serif-title final-title">Feliz aniversário, meu amor ✨</h3>
          </div>
        )}
      </div>
    </section>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  return entered ? <AppShell entered={entered} /> : <Gate onEnter={() => setEntered(true)} />;
}
