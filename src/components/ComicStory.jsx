import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Shield, Zap, Sparkles, Radio, Heart } from 'lucide-react';
import { playClickSound, playStoryTransitionSound, startCinematicTheme } from '../utils/soundService';

const STORY_CHAPTERS = [
  {
    id: 'ch-1',
    num: '1. A SAFER TOMORROW',
    title: 'A SAFER TOMORROW',
    subtitle: 'THE SEED OF HOPE',
    caption: 'KAIROS was born from a simple belief — that safety is a right, not a privilege.',
    quote: '“In a world of growing uncertainty, we stand as a global guardian network, uniting people, technology and compassion.”',
    tag: 'NEO-VERIDIA // CHAPTER 01',
    image: '/story/scene1-guardian-overlook.jpg',
    icon: Sparkles
  },
  {
    id: 'ch-2',
    num: '2. THE FIRST SIGNAL',
    title: 'THE FIRST SIGNAL',
    subtitle: 'VOICES IN THE DARK',
    caption: 'Every emergency starts with a whisper before it becomes an emergency.',
    quote: '“When standard channels faltered, one faint human signal echoed through the static. The Guardian receptor grid locked on.”',
    tag: 'TRANSMISSION // DETECTED',
    image: '/story/scene2-guardian-portrait.jpg',
    icon: Zap
  },
  {
    id: 'ch-3',
    num: '3. A GLOBAL MOVEMENT',
    title: 'A GLOBAL MOVEMENT',
    subtitle: 'NEIGHBORS STANDING TOGETHER',
    caption: 'From a single sector to a worldwide community shield.',
    quote: '“Safety is not built by fortresses, but by people connected through unwavering empathy and rapid response.”',
    tag: 'GUARDIAN GRID // EXPANDING',
    image: '/story/scene3-guardian-shield.jpg',
    icon: Heart
  },
  {
    id: 'ch-4',
    num: '4. THE GUARDIAN RISES',
    title: 'THE GUARDIAN RISES',
    subtitle: 'THE VIGILANT SHIELD',
    caption: 'Not to control people. To stand beside them.',
    quote: '“Obsidian armor forged with temporal energy conduits. KAIROS awakens at the decisive turning point of every crisis.”',
    tag: 'MOMENT CORE // ONLINE',
    image: '/story/scene1-guardian-overlook.jpg',
    icon: Shield
  },
  {
    id: 'ch-5',
    num: '5. TOGETHER, ALWAYS',
    title: 'TOGETHER, ALWAYS',
    subtitle: 'AN ENDURING PROMISE',
    caption: 'No citizen faces the dark alone.',
    quote: '“A stronger tomorrow begins with a kinder today. KAIROS remains on perpetual watch across all sectors.”',
    tag: 'DAWN // CONTINUOUS FEED',
    image: '/story/scene3-guardian-shield.jpg',
    icon: Radio
  }
];

export default function ComicStory({ onOpenSignal }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(3); // Chapter 4 "The Guardian Rises" default
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectChapter = (index) => {
    playClickSound();
    playStoryTransitionSound();
    startCinematicTheme();
    setActiveChapterIndex(index);
  };

  const handleExploreClick = () => {
    playClickSound();
    startCinematicTheme();
    if (onOpenSignal) onOpenSignal();
  };

  const currentChapter = STORY_CHAPTERS[activeChapterIndex];
  // Subtle parallax translation
  const parallaxOffset = (scrollY * 0.04) % 40;

  return (
    <section id="comic-story" className="section cinematic-story-section" aria-labelledby="story-heading">
      {/* 
        Full-Bleed Panoramic KAIROS Artwork Layer with Low Opacity,
        Cinematic Dark Gradient Overlays, Soft Blur, and Parallax Shift
      */}
      <div
        className="story-fullbleed-backdrop"
        style={{
          backgroundImage: `url(${currentChapter.image})`,
          transform: `translateY(${parallaxOffset}px) scale(1.04)`
        }}
        aria-hidden="true"
      >
        <div className="story-backdrop-vignette"></div>
      </div>

      <div className="container relative-content">
        <div className="story-layout-grid">
          {/* Left Column: Story Manifesto */}
          <div className="story-text-column">
            <div className="story-eyebrow">
              <BookOpen size={14} aria-hidden="true" />
              <span>OUR STORY</span>
            </div>

            <h2 id="story-heading" className="story-headline">
              A WORLD THAT<br />CHOSE TO CARE
            </h2>

            <p className="story-manifesto-para">
              KAIROS was born from a simple belief — that safety is a right, not a privilege. In a world of growing uncertainty, we stand as a global guardian network, uniting people, technology and compassion.
            </p>

            <button
              type="button"
              className="btn btn-primary-blue story-cta-btn"
              onClick={handleExploreClick}
              aria-label="Explore KAIROS story and send signal"
            >
              <span>EXPLORE THE STORY</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>

          {/* Center Column: Cinematic Graphic Novel Visual Panel */}
          <div className="story-art-column">
            <div className="story-art-card glass-card">
              {/* Scene Artwork Backdrop with subtle zoom transition */}
              <div
                className="story-panel-art-bg"
                style={{ backgroundImage: `url(${currentChapter.image})` }}
                aria-hidden="true"
              >
                <div className="panel-inner-vignette"></div>
              </div>

              {/* Script Calligraphy Quote matching reference */}
              <div className="story-script-overlay">
                <span className="script-line">Real People</span>
                <span className="script-line">Real Stories</span>
                <span className="script-line accent">A Safer Tomorrow</span>
              </div>

              {/* Active Chapter Live Text Overlay */}
              <div className="story-panel-caption-box">
                <span className="caption-tag">{currentChapter.tag}</span>
                <h4 className="caption-heading">{currentChapter.title}</h4>
                <p className="caption-quote">{currentChapter.quote}</p>
              </div>
            </div>
          </div>

          {/* Right Column: 5-Chapter Playlist matching reference */}
          <div className="story-playlist-column" role="tablist" aria-label="Story Chapters Navigation">
            {STORY_CHAPTERS.map((ch, idx) => {
              const isActive = activeChapterIndex === idx;

              return (
                <button
                  key={ch.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`story-chapter-card glass-card ${isActive ? 'active-chapter' : ''}`}
                  onClick={() => handleSelectChapter(idx)}
                >
                  <div
                    className="chapter-thumb-art"
                    style={{ backgroundImage: `url(${ch.image})` }}
                    aria-hidden="true"
                  >
                    <span className="thumb-visor-glow"></span>
                  </div>
                  <div className="chapter-meta">
                    <span className="chapter-title">{ch.num}</span>
                    {isActive && <span className="chapter-active-label">ACTIVE CHRONICLE</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
