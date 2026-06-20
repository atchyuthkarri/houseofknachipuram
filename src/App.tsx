import { useEffect, useRef, useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Plus, 
  Minus, 
  Star, 
  Smartphone, 
  Download, 
  MapPin, 
  Phone, 
  Clock 
} from 'lucide-react';
import { cn } from './lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Import assets from src/assets
import img3834 from './assets/IMG_3834.JPG.jpeg';
import img3835 from './assets/IMG_3835.JPG.jpeg';
import img3837 from './assets/IMG_3837.JPG.jpeg';
import img3838 from './assets/IMG_3838.JPG.jpeg';
import img3839 from './assets/IMG_3839.JPG.jpeg';
import img3840 from './assets/IMG_3840.JPG.jpeg';
import img3841 from './assets/IMG_3841.JPG.jpeg';
import img3842 from './assets/IMG_3842.JPG.jpeg';
import img3843 from './assets/IMG_3843.JPG.jpeg';
import img3844 from './assets/IMG_3844.JPG.jpeg';
import img3845 from './assets/IMG_3845.JPG.jpeg';

const BRAND = "House of Kanchipuram";

// Custom offset-aware smooth scrolling helper connected to Lenis
const scrollToSection = (e: React.MouseEvent<HTMLElement>, id: string, lenisRef?: React.RefObject<Lenis | null>) => {
  e.preventDefault();
  if (id === '#') {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = window.innerWidth < 640 ? 64 : 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(offsetPosition, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }
};


const Navbar = ({ lenisRef }: { lenisRef: React.RefObject<Lenis | null> }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll);

    // IntersectionObserver to highlight navigation links dynamically as sections pass the viewport
    const sections = ['heritage', 'collections', 'process', 'showrooms', 'consultation'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "" : "bg-gradient-to-b from-black/60 via-black/25 to-transparent"
    )}>
      {/* Top Announcement Bar (Hidden on Mobile, collapses on scroll) */}
      <div className={cn(
        "hidden sm:flex bg-[#6a282b] text-[#f8f5f0] px-6 justify-between items-center text-xs tracking-wider border-b border-white/10 w-full transition-all duration-300 overflow-hidden",
        isScrolled ? "h-0 py-0 opacity-0 border-none" : "h-9 py-2 opacity-100"
      )}>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Phone size={12} /> +91 44 2722 9876</span>
          <span>info@houseofkanchipuram.com</span>
        </div>
        <div className="font-serif italic animate-pulse">
          ❖ Free Insured Domestic Shipping Above ₹5,000 ❖
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Pinterest</a>
        </div>
      </div>
      
      {/* Main Navbar */}
      <div className={cn(
        "px-6 py-4 flex justify-between items-center transition-all duration-300 relative h-16 sm:h-[64px]",
        isScrolled 
          ? "bg-white shadow-sm border-b border-gray-100" 
          : "bg-black/15 backdrop-blur-[2px] shadow-none"
      )}>
        <div 
          onClick={(e) => scrollToSection(e, '#', lenisRef)} 
          className={cn(
            "text-xl md:text-2xl font-serif font-bold tracking-tight select-none cursor-pointer transition-colors duration-300",
            isScrolled ? "text-[#6a282b]" : "text-white"
          )}
        >
          {BRAND}
        </div>
         <nav className="hidden md:flex gap-8 items-center font-medium text-sm tracking-wide">
          <a 
            href="#" 
            onClick={(e) => scrollToSection(e, '#', lenisRef)} 
            className={cn("transition-colors duration-300 relative py-1", 
              isScrolled ? "text-gray-700 hover:text-[#6a282b]" : "text-white hover:text-[#c49a6c]",
              activeSection === 'home' && (isScrolled ? "text-[#6a282b]" : "text-[#c49a6c]")
            )}
          >
            Home
            {activeSection === 'home' && (
              <span className={cn("absolute bottom-0 left-0 w-full h-[1px]", isScrolled ? "bg-[#6a282b]" : "bg-[#c49a6c]")} />
            )}
          </a>
          <a 
            href="#heritage" 
            onClick={(e) => scrollToSection(e, 'heritage', lenisRef)} 
            className={cn("transition-colors duration-300 relative py-1", 
              isScrolled ? "text-gray-700 hover:text-[#6a282b]" : "text-white hover:text-[#c49a6c]",
              activeSection === 'heritage' && (isScrolled ? "text-[#6a282b]" : "text-[#c49a6c]")
            )}
          >
            Our Heritage
            {activeSection === 'heritage' && (
              <span className={cn("absolute bottom-0 left-0 w-full h-[1px]", isScrolled ? "bg-[#6a282b]" : "bg-[#c49a6c]")} />
            )}
          </a>
          <a 
            href="#collections" 
            onClick={(e) => scrollToSection(e, 'collections', lenisRef)} 
            className={cn("flex items-center gap-1 transition-colors duration-300 relative py-1", 
              isScrolled ? "text-gray-700 hover:text-[#6a282b]" : "text-white hover:text-[#c49a6c]",
              activeSection === 'collections' && (isScrolled ? "text-[#6a282b]" : "text-[#c49a6c]")
            )}
          >
            Collections <ChevronDown size={14}/>
            {activeSection === 'collections' && (
              <span className={cn("absolute bottom-0 left-0 w-[80%] h-[1px]", isScrolled ? "bg-[#6a282b]" : "bg-[#c49a6c]")} />
            )}
          </a>
          <a 
            href="#process" 
            onClick={(e) => scrollToSection(e, 'process', lenisRef)} 
            className={cn("transition-colors duration-300 relative py-1", 
              isScrolled ? "text-gray-700 hover:text-[#6a282b]" : "text-white hover:text-[#c49a6c]",
              activeSection === 'process' && (isScrolled ? "text-[#6a282b]" : "text-[#c49a6c]")
            )}
          >
            The Craft
            {activeSection === 'process' && (
              <span className={cn("absolute bottom-0 left-0 w-full h-[1px]", isScrolled ? "bg-[#6a282b]" : "bg-[#c49a6c]")} />
            )}
          </a>
          <a 
            href="#showrooms" 
            onClick={(e) => scrollToSection(e, 'showrooms', lenisRef)} 
            className={cn("transition-colors duration-300 relative py-1", 
              isScrolled ? "text-gray-700 hover:text-[#6a282b]" : "text-white hover:text-[#c49a6c]",
              activeSection === 'showrooms' && (isScrolled ? "text-[#6a282b]" : "text-[#c49a6c]")
            )}
          >
            Showrooms
            {activeSection === 'showrooms' && (
              <span className={cn("absolute bottom-0 left-0 w-full h-[1px]", isScrolled ? "bg-[#6a282b]" : "bg-[#c49a6c]")} />
            )}
          </a>
          <a 
            href="#consultation" 
            onClick={(e) => scrollToSection(e, 'consultation', lenisRef)} 
            className={cn("transition-colors duration-300 relative py-1", 
              isScrolled ? "text-gray-700 hover:text-[#6a282b]" : "text-white hover:text-[#c49a6c]",
              activeSection === 'consultation' && (isScrolled ? "text-[#6a282b]" : "text-[#c49a6c]")
            )}
          >
            Book Consultation
            {activeSection === 'consultation' && (
              <span className={cn("absolute bottom-0 left-0 w-full h-[1px]", isScrolled ? "bg-[#6a282b]" : "bg-[#c49a6c]")} />
            )}
          </a>
        </nav>
        
        <div className="flex gap-5 items-center">
          <Search size={20} className={cn("cursor-pointer transition-colors duration-300", isScrolled ? "text-gray-700 hover:text-[#6a282b]" : "text-white hover:text-[#c49a6c]")}/>
          <User size={20} className={cn("cursor-pointer transition-colors duration-300", isScrolled ? "text-gray-700 hover:text-[#6a282b]" : "text-white hover:text-[#c49a6c]")}/>
          <ShoppingBag size={20} className={cn("cursor-pointer transition-colors duration-300", isScrolled ? "text-gray-700 hover:text-[#6a282b]" : "text-white hover:text-[#c49a6c]")}/>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={cn("md:hidden transition-colors duration-300 focus:outline-none", isScrolled ? "text-gray-700 hover:text-[#6a282b]" : "text-white hover:text-[#c49a6c]")}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-100 flex flex-col py-4 px-6 gap-4 text-gray-800 md:hidden z-50">
            <a href="#" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, '#', lenisRef); }} className="hover:text-[#6a282b] font-medium border-b pb-2">Home</a>
            <a href="#heritage" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, 'heritage', lenisRef); }} className="hover:text-[#6a282b] font-medium border-b pb-2">Our Heritage</a>
            <a href="#collections" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, 'collections', lenisRef); }} className="hover:text-[#6a282b] font-medium border-b pb-2">Collections</a>
            <a href="#process" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, 'process', lenisRef); }} className="hover:text-[#6a282b] font-medium border-b pb-2">The Craft</a>
            <a href="#showrooms" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, 'showrooms', lenisRef); }} className="hover:text-[#6a282b] font-medium border-b pb-2">Showrooms</a>
            <a href="#consultation" onClick={(e) => { setMobileMenuOpen(false); scrollToSection(e, 'consultation', lenisRef); }} className="hover:text-[#6a282b] font-medium border-b pb-2">Book Consultation</a>
          </div>
        )}
      </div>
    </header>
  );
};

const Hero = ({ lenisRef }: { lenisRef: React.RefObject<Lenis | null> }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split Mask Reveal for luxury feel
      gsap.from(".hero-reveal", {
        yPercent: 100,
        opacity: 0,
        duration: 1.4,
        stagger: 0.25,
        ease: "power4.out",
        delay: 0.2 // snappy reveal on load
      });

      gsap.from(".hero-fade", {
        opacity: 0,
        y: 20,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.8
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen mt-0 bg-[#d3bcad] overflow-hidden flex items-center justify-end px-6 sm:px-12 lg:px-32 pt-24 lg:pt-32 pb-12">
      <div className="absolute inset-0 z-0">
        <img 
          src={img3838} 
          alt="Royal Wedding Kanchipuram Saree" 
          className="w-full h-full object-cover object-center opacity-90 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/75"></div>
      </div>
       <div ref={textRef} className="relative z-10 max-w-4xl text-right text-white space-y-6">
        <div className="hero-fade flex items-center justify-end gap-3 text-[#c49a6c]">
          <span className="h-[1px] w-10 bg-[#c49a6c]/60"></span>
          <span className="font-semibold tracking-[0.25em] text-xs sm:text-sm uppercase">
            ❖ Luxury Silk & Zari Weaves ❖
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-serif leading-[1.1] font-light overflow-hidden py-1 tracking-wide">
          <span className="hero-reveal block">Woven in <span className="italic text-[#c49a6c]">Pure Gold</span> & Silk,</span>
          <span className="hero-reveal block">Crafted for <span className="italic">Generations</span>.</span>
        </h1>
        <p className="hero-fade text-sm sm:text-base lg:text-lg font-light tracking-wide text-[#f8f5f0]/80 max-w-2xl ml-auto leading-relaxed">
          Discover the timeless artistry of authentic Kanchipuram handlooms—where 
          generations of dual-loom heritage and genuine gold zari meet contemporary bridal elegance.
        </p>
        <div className="hero-fade flex justify-end gap-4 pt-4">
          <button 
            onClick={(e) => scrollToSection(e, 'collections', lenisRef)}
            className="bg-[#6a282b] border border-[#6a282b] text-[#f8f5f0] px-7 sm:px-9 py-4 text-xs font-bold tracking-widest uppercase hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 shadow-lg cursor-pointer focus:outline-none"
          >
            Shop The Collection
          </button>
          <button 
            onClick={(e) => scrollToSection(e, 'heritage', lenisRef)}
            className="border border-white/40 text-white px-7 sm:px-9 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer focus:outline-none"
          >
            Our Legacy
          </button>
        </div>
      </div>
    </section>
  );
};

const HeritageStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split Text mask reveal
      gsap.from(".story-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      });

      // Text block fade reveal
      gsap.from(".story-fade", {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 1.0,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Parallax scroll on image inside overflow wrapper
      gsap.fromTo(imgRef.current, 
        { scale: 1.15, yPercent: -8 },
        {
          scale: 1.0,
          yPercent: 8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          },
          ease: "none"
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="heritage" ref={sectionRef} className="py-24 px-6 lg:px-12 bg-[#f8f5f0] text-gray-800 overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={textRef} className="space-y-6">
          <div className="text-[#6a282b] font-medium tracking-widest text-sm uppercase story-fade">
            ❖ Generations of Artistry ❖
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#6a282b] leading-tight overflow-hidden py-1">
            <span className="story-reveal block">The Legend & Heritage of</span>
            <span className="story-reveal block">Kanchipuram Weaving</span>
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed font-light story-fade">
            <p>
              In the sacred temple town of Kanchipuram, Tamil Nadu, master weavers have turned silk thread and pure gold into wearable canvases for over four centuries. Every single saree at the <strong>House of Kanchipuram</strong> is woven using the ancient dual-loom technique, which locks the borders to the body with unparalleled strength.
            </p>
            <p>
              Our artisans meticulously interlock pure, double-warp mulberry silk with pure silver thread plated with 22-carat gold (Zari) to create motifs inspired by the sculptures, pillars, and myths of Dravidian temples. To drape a Kanchipuram saree is to wrap yourself in living Indian history.
            </p>
            <div className="pt-4 flex items-center gap-6">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-[#6a282b] font-bold">100%</span>
                <span className="text-[10px] tracking-wider uppercase text-gray-500 font-semibold">Pure Silk Mark Certified</span>
              </div>
              <div className="w-[1px] h-12 bg-gray-300"></div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-[#6a282b] font-bold">400+</span>
                <span className="text-[10px] tracking-wider uppercase text-gray-500 font-semibold">Weaving Families Supported</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative group overflow-hidden">
          {/* Decorative Gold Frame Border */}
          <div className="absolute -inset-4 border border-[#c49a6c] rounded opacity-70 group-hover:scale-102 transition-transform duration-500 pointer-events-none"></div>
          <div className="relative h-[320px] sm:h-[480px] overflow-hidden shadow-2xl bg-gray-100">
            <img 
              ref={imgRef}
              src={img3840} 
              alt="Artisanal Saree Detail" 
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-[#6a282b] text-[#f8f5f0] p-6 shadow-xl max-w-xs font-serif hidden sm:block">
            <p className="text-sm italic">"A single saree takes our weavers anywhere between 15 to 45 days of intense precision."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const PromoBanners = ({ lenisRef }: { lenisRef: React.RefObject<Lenis | null> }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Lift cards on scroll
      gsap.from(".promo-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">
      <div 
        onClick={(e) => scrollToSection(e, 'collections', lenisRef)}
        className="promo-card relative h-72 overflow-hidden group cursor-pointer bg-[#8a6856] shadow-lg"
      >
        <img 
          src={img3834} 
          className="w-full h-full object-cover mix-blend-overlay group-hover:scale-105 transition-transform duration-700" 
          alt="Promo 1"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
          <div className="text-xs font-bold tracking-widest uppercase mb-1 text-[#c49a6c]">Classic Edit</div>
          <div className="text-3xl font-serif mb-2">The Royal Silks</div>
          <span className="text-xs uppercase tracking-widest border-b border-white/50 w-max pb-1">Shop Now</span>
        </div>
      </div>
      
      <div 
        onClick={(e) => scrollToSection(e, 'collections', lenisRef)}
        className="promo-card relative h-72 overflow-hidden group cursor-pointer bg-[#5E1724] shadow-lg"
      >
        <img 
          src={img3842} 
          className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-105 transition-transform duration-700" 
          alt="Promo 2"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
          <div className="text-xs font-bold tracking-widest uppercase mb-1 text-[#c49a6c]">Luxury Bridal</div>
          <div className="text-3xl font-serif mb-2">Bridal Heritage</div>
          <span className="text-xs uppercase tracking-widest border-b border-white/50 w-max pb-1">Explore Couture</span>
        </div>
      </div>
      
      <div 
        onClick={(e) => scrollToSection(e, 'collections', lenisRef)}
        className="promo-card relative h-72 overflow-hidden group cursor-pointer bg-[#332824] shadow-lg"
      >
        <img 
          src={img3845} 
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
          alt="Promo 3"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors"></div>
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
          <div className="text-xs font-bold tracking-widest uppercase mb-1 text-[#c49a6c]">Modern Handloom</div>
          <div className="text-3xl font-serif mb-2">Contemporary Drapes</div>
          <span className="text-xs uppercase tracking-widest border-b border-white/50 w-max pb-1">View Collection</span>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="bg-[#6a282b] text-[#f8f5f0] py-6 overflow-hidden flex whitespace-nowrap border-y border-[#c49a6c]/20">
      <div className="animate-marquee inline-block font-serif text-lg sm:text-xl tracking-widest uppercase">
        <span className="mx-8">❖ Wedding Saree</span>
        <span className="mx-8">❖ Pure Mulberry Silk</span>
        <span className="mx-8">❖ Handloom Brocade</span>
        <span className="mx-8">❖ Genuine Gold Zari</span>
        <span className="mx-8">❖ Korvai Weave</span>
        <span className="mx-8">❖ Temple Borders</span>
      </div>
      <div className="animate-marquee inline-block font-serif text-lg sm:text-xl tracking-widest uppercase" aria-hidden="true">
        <span className="mx-8">❖ Wedding Saree</span>
        <span className="mx-8">❖ Pure Mulberry Silk</span>
        <span className="mx-8">❖ Handloom Brocade</span>
        <span className="mx-8">❖ Genuine Gold Zari</span>
        <span className="mx-8">❖ Korvai Weave</span>
        <span className="mx-8">❖ Temple Borders</span>
      </div>
    </div>
  );
};

const ProductShowcase = ({ 
  id, 
  title, 
  subtitle, 
  products, 
  showFilters 
}: { 
  id?: string, 
  title: string, 
  subtitle: string, 
  products: { name: string, price: string, image: string, label?: string }[], 
  showFilters?: boolean 
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const gridRef = useRef<HTMLDivElement>(null);
  
  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.label?.toLowerCase() === activeFilter.toLowerCase());

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card lift fade-in
      gsap.from(".showcase-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, gridRef);

    return () => ctx.revert();
  }, [activeFilter]); // Trigger re-animation on filter switch for consistency

  return (
    <section id={id} className="py-24 px-6 lg:px-12 max-w-7xl mx-auto text-center font-sans">
      <div className="mb-4 text-[#c49a6c] text-lg">❖ ❖ ❖</div>
      <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-3">{title}</h2>
      <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mb-12 font-light">{subtitle}</p>
      
      {showFilters && (
        <div className="flex justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {['All', 'Pure Silk', 'Tissue Zari', 'Brocade'].map((filter) => (
            <button 
              key={filter} 
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2.5 rounded-full border text-[10px] sm:text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer focus:outline-none",
                activeFilter === filter 
                  ? "bg-[#6a282b] text-white border-[#6a282b] shadow-md" 
                  : "border-gray-200 text-gray-600 hover:border-[#6a282b] hover:text-[#6a282b]"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product, i) => (
          <div key={i} className="showcase-card group text-left cursor-pointer relative">
            <div className="relative overflow-hidden mb-4 bg-[#f8f5f0] aspect-[3/4] shadow-md border border-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              {product.label && (
                <div className="absolute top-3 left-3 bg-[#6a282b] text-white text-[9px] tracking-widest uppercase px-3 py-1 font-semibold rounded">
                  {product.label}
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="bg-white text-gray-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Quick View
                </button>
              </div>
            </div>
            <h3 className="font-serif text-lg text-gray-900 group-hover:text-[#6a282b] transition-colors">{product.name}</h3>
            <p className="text-gray-600 mt-1 font-medium font-sans">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const WeavingProcess = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered card reveals
      gsap.from(".process-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Mulberry Silk Dyeing",
      desc: "Pure mulberry silk threads are boiled and dyed in vibrant colors using rich, skin-safe colors and washed in hot water to set the color."
    },
    {
      num: "02",
      title: "Zari Thread Spinning",
      desc: "Genuine silver threads are spun around silk cores, which are then gilded with 22-carat gold to produce authentic, heavy Kanchipuram zari."
    },
    {
      num: "03",
      title: "Adai Motif Design",
      desc: "Traditional templates (Adai) are created to plot motifs like temple spires, rudraksha, and peacocks onto paper blueprints for the loom."
    },
    {
      num: "04",
      title: "The Korvai Loom Weave",
      desc: "Two weavers sit on a manual loom, locking the body silk and border silk with the interlocking Korvai technique to finish the weave."
    }
  ];

  return (
    <section id="process" ref={sectionRef} className="py-24 bg-[#6a282b] text-[#f8f5f0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <div className="mb-4 text-[#c49a6c] text-lg">❖ ❖ ❖</div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#f8f5f0] mb-4">The Journey of a Handloom Saree</h2>
        <p className="text-sm sm:text-base text-[#f8f5f0]/80 max-w-2xl mx-auto mb-16 font-light">
          A traditional Kanchipuram saree is a masterclass in slow craftsmanship. Here is the path our sarees take from cocoon to couture.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 process-grid font-sans">
          {steps.map((step, idx) => (
            <div key={idx} className="process-card bg-[#5E1724]/40 border border-[#c49a6c]/20 p-8 text-left space-y-4 hover:border-[#c49a6c]/60 transition-colors relative group">
              <div className="absolute top-4 right-6 text-5xl font-serif text-[#c49a6c]/20 group-hover:text-[#c49a6c]/40 transition-colors font-bold select-none">
                {step.num}
              </div>
              <h3 className="text-xl font-serif text-[#f8f5f0] border-b border-[#c49a6c]/30 pb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-[#f8f5f0]/80 leading-relaxed font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Refactored to Horizontal Scrolling Segment with Pinning transitions
const FestiveDrapes = ({ lenisRef }: { lenisRef: React.RefObject<Lenis | null> }) => {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinContainer = pinContainerRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!pinContainer || !scrollContainer) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;
      const xVal = -(scrollWidth - clientWidth);

      gsap.to(scrollContainer, {
        x: xVal,
        ease: "none",
        scrollTrigger: {
          trigger: pinContainer,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${Math.abs(xVal)}`,
          invalidateOnRefresh: true,
        }
      });
    }, pinContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="festive" ref={pinContainerRef} className="relative bg-[#f8f5f0] overflow-hidden border-y border-gray-200">
      <div ref={scrollContainerRef} className="flex flex-row items-center h-screen px-12 md:px-24 gap-12 w-max">
        {/* Detail Callout Card */}
        <div className="w-[300px] sm:w-[420px] flex-shrink-0 space-y-6 pr-8">
          <div className="text-[#6a282b] font-medium tracking-widest text-xs uppercase">
            ❖ Lightweight Splendor ❖
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#6a282b] leading-tight">
            The Festive Drapes Collection
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
            Curated especially for pujas, close celebrations, and pre-wedding functions. These sarees feature lighter double-warp silk without heavy zari, offering high comfort and timeless elegance.
          </p>
          <div className="pt-2">
            <button 
              onClick={(e) => scrollToSection(e, 'consultation', lenisRef)}
              className="bg-[#6a282b] text-white px-8 py-3.5 text-xs font-semibold tracking-wider hover:bg-[#4a1b1d] transition-colors shadow cursor-pointer focus:outline-none"
            >
              Book Personal Draping
            </button>
          </div>
        </div>

        {/* Saree Card 1 */}
        <div className="w-[280px] sm:w-[350px] bg-white p-4 shadow-lg border border-gray-100 flex-shrink-0 group cursor-pointer text-left transition-all duration-300 hover:shadow-xl">
          <div className="h-[360px] sm:h-[400px] overflow-hidden bg-gray-50 mb-4 aspect-[3/4] relative">
            <img 
              src={img3844} 
              alt="Festive Brocade Saree" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-serif text-base sm:text-lg text-gray-900 group-hover:text-[#6a282b] transition-colors">Vasantam Mustard Saree</h4>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">₹34,900</p>
            </div>
            <span className="text-[10px] bg-[#c49a6c]/20 text-[#6a282b] uppercase tracking-widest px-2 py-0.5 font-bold">New</span>
          </div>
        </div>

        {/* Saree Card 2 */}
        <div className="w-[280px] sm:w-[350px] bg-white p-4 shadow-lg border border-gray-100 flex-shrink-0 group cursor-pointer text-left transition-all duration-300 hover:shadow-xl">
          <div className="h-[360px] sm:h-[400px] overflow-hidden bg-gray-50 mb-4 aspect-[3/4]">
            <img 
              src={img3845} 
              alt="Golden Zari Saree" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-serif text-base sm:text-lg text-gray-900 group-hover:text-[#6a282b] transition-colors">Marakata Emerald Silk</h4>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">₹42,000</p>
            </div>
            <span className="text-[10px] bg-[#c49a6c]/20 text-[#6a282b] uppercase tracking-widest px-2 py-0.5 font-bold">Pure Silk</span>
          </div>
        </div>

        {/* Saree Card 3 */}
        <div className="w-[280px] sm:w-[350px] bg-white p-4 shadow-lg border border-gray-100 flex-shrink-0 group cursor-pointer text-left transition-all duration-300 hover:shadow-xl">
          <div className="h-[360px] sm:h-[400px] overflow-hidden bg-gray-55 mb-4 aspect-[3/4]">
            <img 
              src={img3835} 
              alt="Vaikuntha Brocade" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-serif text-base sm:text-lg text-gray-900 group-hover:text-[#6a282b] transition-colors">Vaikuntha Brocade Saree</h4>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">₹62,000</p>
            </div>
            <span className="text-[10px] bg-[#c49a6c]/20 text-[#6a282b] uppercase tracking-widest px-2 py-0.5 font-bold">Loom Drop</span>
          </div>
        </div>

        {/* Saree Card 4 */}
        <div className="w-[280px] sm:w-[350px] bg-white p-4 shadow-lg border border-gray-100 flex-shrink-0 group cursor-pointer text-left transition-all duration-300 hover:shadow-xl mr-12 md:mr-24">
          <div className="h-[360px] sm:h-[400px] overflow-hidden bg-gray-55 mb-4 aspect-[3/4]">
            <img 
              src={img3837} 
              alt="Rudraksha Zari Saree" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-serif text-base sm:text-lg text-gray-900 group-hover:text-[#6a282b] transition-colors">Rudraksha Zari Weave</h4>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">₹54,000</p>
            </div>
            <span className="text-[10px] bg-[#c49a6c]/20 text-[#6a282b] uppercase tracking-widest px-2 py-0.5 font-bold">Temple border</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const CinematicBanner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        },
        yPercent: 18,
        ease: "none"
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className="relative h-[65vh] w-full overflow-hidden bg-black flex items-center justify-center">
      <img 
        ref={imgRef}
        src={img3841} 
        className="absolute top-[-15%] left-0 w-full h-[130%] object-cover opacity-70" 
        style={{ willChange: 'transform' }}
        alt="Cinematic Saree Details"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none"></div>
      
      <div className="relative z-10 text-center text-white px-6 space-y-4 max-w-2xl">
        <span className="text-[#c49a6c] font-semibold tracking-widest text-sm uppercase">Pure Gold Thread (22K)</span>
        <h2 className="text-3xl sm:text-5xl font-serif">Handwoven with Zari of Pure Gold & Silver</h2>
        <div className="w-16 h-[1px] bg-[#c49a6c] mx-auto my-6"></div>
        <p className="text-xs sm:text-base font-light tracking-wide text-white/80">
          Our sarees carry the heritage of generational craft, designed to last as heirloom fabrics.
        </p>
      </div>
    </section>
  );
};

const InfoBar = () => {
  return (
    <section className="bg-[#6a282b] text-[#f8f5f0] py-8 px-6 lg:px-12 flex flex-col md:flex-row justify-center items-center gap-12 text-center text-[10px] sm:text-xs tracking-widest uppercase font-semibold border-y border-[#c49a6c]/20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-[#f8f5f0]/30 flex items-center justify-center text-[#c49a6c]">❖</div>
        <span>Free Shipping Across India</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-[#f8f5f0]/30 flex items-center justify-center text-[#c49a6c]">❖</div>
        <span>Handloom Mark Certified</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-[#f8f5f0]/30 flex items-center justify-center text-[#c49a6c]">❖</div>
        <span>Blouse Stitching Available</span>
      </div>
    </section>
  );
};

const StoreLocations = ({ lenisRef }: { lenisRef: React.RefObject<Lenis | null> }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal showroom cards staggered
      gsap.from(".store-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="showrooms" ref={containerRef} className="py-24 px-6 lg:px-12 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-4 text-[#c49a6c] text-lg">❖ ❖ ❖</div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#6a282b] mb-4">Visit Our Heritage Showrooms</h2>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mb-16 font-light">
          Step in to experience the weight, luxury, and sheen of our handwoven silks in person. Our advisors await your arrival.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
          {/* Store 1: Kanchipuram */}
          <div className="store-card bg-[#f8f5f0] border border-gray-100 p-8 sm:p-10 text-left space-y-6 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="absolute top-6 right-6 text-gray-300">
              <MapPin size={40} className="stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-serif text-[#6a282b] border-b border-[#c49a6c]/30 pb-3">Kanchipuram Flagship Store</h3>
            <div className="space-y-4 text-xs sm:text-sm text-gray-600 font-light">
              <p className="flex items-start gap-3">
                <MapPin size={18} className="text-[#6a282b] mt-0.5 flex-shrink-0" />
                <span>No. 12-A, Gandhi Road, near Kamakshi Amman Temple, Kanchipuram, Tamil Nadu - 631501</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={18} className="text-[#6a282b] flex-shrink-0" />
                <span>+91 44 2722 9876 / +91 98450 12345</span>
              </p>
              <p className="flex items-center gap-3">
                <Clock size={18} className="text-[#6a282b] flex-shrink-0" />
                <span>10:00 AM - 9:00 PM (Open All 7 Days)</span>
              </p>
            </div>
            <div className="pt-4 flex flex-wrap gap-3">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-[#6a282b] text-white px-6 py-2.5 text-xs font-semibold tracking-wider hover:bg-[#4a1b1d] transition-colors"
              >
                Get Directions
              </a>
              <button 
                onClick={(e) => scrollToSection(e, 'consultation', lenisRef)}
                className="border border-[#6a282b] text-[#6a282b] bg-transparent px-6 py-2.5 text-xs font-semibold tracking-wider hover:bg-[#6a282b] hover:text-white transition-all duration-300 cursor-pointer focus:outline-none"
              >
                Book Styling Session
              </button>
            </div>
          </div>

          {/* Store 2: Chennai */}
          <div className="store-card bg-[#f8f5f0] border border-gray-100 p-8 sm:p-10 text-left space-y-6 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="absolute top-6 right-6 text-gray-300">
              <MapPin size={40} className="stroke-[1.5]" />
            </div>
            <h3 className="text-2xl font-serif text-[#6a282b] border-b border-[#c49a6c]/30 pb-3">Chennai Signature Boutique</h3>
            <div className="space-y-4 text-xs sm:text-sm text-gray-600 font-light">
              <p className="flex items-start gap-3">
                <MapPin size={18} className="text-[#6a282b] mt-0.5 flex-shrink-0" />
                <span>Grounded Elegance, Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu - 600006</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={18} className="text-[#6a282b] flex-shrink-0" />
                <span>+91 44 4899 5432 / +91 98450 67890</span>
              </p>
              <p className="flex items-center gap-3">
                <Clock size={18} className="text-[#6a282b] flex-shrink-0" />
                <span>10:30 AM - 8:30 PM (Open All 7 Days)</span>
              </p>
            </div>
            <div className="pt-4 flex flex-wrap gap-3">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-[#6a282b] text-white px-6 py-2.5 text-xs font-semibold tracking-wider hover:bg-[#4a1b1d] transition-colors"
              >
                Get Directions
              </a>
              <button 
                onClick={(e) => scrollToSection(e, 'consultation', lenisRef)}
                className="border border-[#6a282b] text-[#6a282b] bg-transparent px-6 py-2.5 text-xs font-semibold tracking-wider hover:bg-[#6a282b] hover:text-white transition-all duration-300 cursor-pointer focus:outline-none"
              >
                Book Styling Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Chennai Boutique',
    date: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade reveal form container
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', location: 'Chennai Boutique', date: '', notes: '' });
    }, 4000);
  };

  return (
    <section id="consultation" className="py-24 px-6 lg:px-12 bg-[#6a282b] text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c49a6c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
      
      <div ref={formRef} className="max-w-4xl mx-auto text-center space-y-12 relative z-10 font-sans">
        <div className="space-y-4">
          <div className="text-[#c49a6c] font-medium tracking-widest text-xs uppercase">❖ Pure Luxury Service ❖</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif">Book a Private Bridal Draping Consultation</h2>
          <p className="text-xs sm:text-sm text-[#f8f5f0]/80 max-w-xl mx-auto font-light">
            Enjoy an exclusive 1-on-1 draping session at our showrooms. Explore our premium silk racks and design customization options with our style advisor.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#5E1724]/60 border border-[#c49a6c]/40 p-10 text-center space-y-4 max-w-xl mx-auto">
            <h3 className="text-2xl font-serif text-[#c49a6c]">Request Submitted Successfully</h3>
            <p className="text-xs sm:text-sm font-light text-[#f8f5f0]/90">
              Our styling concierge will call you within 24 hours to confirm your booking and coordinate your visit. We look forward to welcome you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto bg-[#5E1724]/40 p-6 sm:p-12 border border-[#c49a6c]/20 shadow-xl">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-wider uppercase font-semibold text-[#c49a6c]">Your Name *</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="bg-transparent border-b border-[#f8f5f0]/30 focus:border-[#c49a6c] outline-none py-2 text-xs sm:text-sm font-light placeholder-white/30 text-[#f8f5f0]" 
                placeholder="Enter full name"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-wider uppercase font-semibold text-[#c49a6c]">Contact Number *</label>
              <input 
                type="tel" 
                required 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="bg-transparent border-b border-[#f8f5f0]/30 focus:border-[#c49a6c] outline-none py-2 text-xs sm:text-sm font-light placeholder-white/30 text-[#f8f5f0]" 
                placeholder="Enter Mobile/Phone"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-wider uppercase font-semibold text-[#c49a6c]">Email ID</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="bg-transparent border-b border-[#f8f5f0]/30 focus:border-[#c49a6c] outline-none py-2 text-xs sm:text-sm font-light placeholder-white/30 text-[#f8f5f0]" 
                placeholder="Enter email address"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] tracking-wider uppercase font-semibold text-[#c49a6c]">Select Showroom *</label>
              <select 
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="bg-[#6a282b] border-b border-[#f8f5f0]/30 focus:border-[#c49a6c] outline-none py-2 text-xs sm:text-sm font-light text-[#f8f5f0] cursor-pointer"
              >
                <option value="Chennai Boutique">Chennai Showroom (K.N.K Road)</option>
                <option value="Kanchipuram Store">Kanchipuram Flagroom (Gandhi Road)</option>
                <option value="Virtual Consultation">Virtual Call (WhatsApp/Zoom)</option>
              </select>
            </div>

            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="text-[10px] tracking-wider uppercase font-semibold text-[#c49a6c]">Preferred Date *</label>
              <input 
                type="date" 
                required 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-transparent border-b border-[#f8f5f0]/30 focus:border-[#c49a6c] outline-none py-2 text-xs sm:text-sm font-light text-[#f8f5f0] cursor-pointer"
              />
            </div>

            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="text-[10px] tracking-wider uppercase font-semibold text-[#c49a6c]">Custom Design Requirements / Comments</label>
              <textarea 
                value={formData.notes}
                onChange={e => setFormData({...formData, notes: e.target.value})}
                rows={2} 
                className="bg-transparent border-b border-[#f8f5f0]/30 focus:border-[#c49a6c] outline-none py-2 text-xs sm:text-sm font-light placeholder-white/30 text-[#f8f5f0] resize-none" 
                placeholder="Let us know about wedding dates or color preferences..."
              />
            </div>

            <div className="md:col-span-2 pt-6 text-center">
              <button 
                type="submit" 
                className="bg-[#c49a6c] text-[#6a282b] hover:bg-[#b0885c] px-10 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer w-full md:w-auto focus:outline-none"
              >
                Request Concierge Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      q: "What makes a Kanchipuram Silk Saree different from other silk sarees?",
      a: "Kanchipuram sarees are woven from pure mulberry silk thread and real metallic zari. They use a double-warp structure (heavyweight silk threads), and are known for their Korvai border technique, where the body and border are woven separately and interlocked securely by hand."
    },
    {
      q: "How can I verify the authenticity of a House of Kanchipuram Saree?",
      a: "Every saree we weave carries the official Silk Mark label issued by the Silk Mark Organisation of India, which certifies the purity of both the mulberry silk threads and the zari alloys used."
    },
    {
      q: "Do you offer custom sizing and embroidery for blouses?",
      a: "Yes! We have an in-house boutique stitching service. When you buy a saree, you can consult with our stylists virtually or in-store to select borders, custom sleeve embroidery (Aari work), and styling coordinates."
    },
    {
      q: "How should I store and maintain a premium handloom silk saree?",
      a: "We recommend dry clean only. Store the saree wrapped in pure white muslin cloth away from direct light. Do not hang it on metal hangers for extended periods; fold it gently, and change the folding lines every 3 months to prevent damage to the zari."
    },
    {
      q: "Do you ship worldwide?",
      a: "Yes, we ship globally. Domestic shipping within India is free for orders above ₹5,000. For international orders, shipping is computed at checkout based on weight and country destination."
    }
  ];

  return (
    <section ref={containerRef} className="py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start bg-white font-sans">
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl sm:text-4xl font-serif text-[#6a282b] mb-4">Frequently Asked Questions</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-md font-light">Find answers to the most common queries regarding silk purity, loom weaves, ordering, and garment care.</p>
        <div className="relative aspect-video shadow-lg overflow-hidden group">
          <img src={img3839} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" alt="FAQ Image"/>
          <div className="absolute inset-0 bg-[#6a282b]/30 pointer-events-none"></div>
          <div className="absolute bottom-6 left-6 bg-white/95 px-6 py-4 backdrop-blur-sm shadow border-l-4 border-[#6a282b]">
            <h3 className="font-serif text-xl sm:text-2xl text-[#6a282b] font-semibold">{BRAND}</h3>
            <p className="text-[9px] tracking-widest text-[#c49a6c] uppercase font-bold mt-1">Authentic Handloom Heritage</p>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 space-y-4 pt-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-200 pb-4">
            <button 
              onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
              className="flex justify-between items-center w-full text-left font-serif text-base sm:text-lg text-gray-900 hover:text-[#6a282b] transition-colors focus:outline-none"
            >
              <span className="pr-4">{i + 1}. {faq.q}</span>
              {openIndex === i ? <Minus size={16} className="text-[#6a282b] flex-shrink-0" /> : <Plus size={16} className="text-[#6a282b] flex-shrink-0" />}
            </button>
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out text-gray-600 font-light",
              openIndex === i ? "max-h-56 sm:max-h-48 mt-4 opacity-100" : "max-h-0 opacity-0"
            )}>
              <p className="text-xs sm:text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const AppPromo = () => {
  return (
    <section className="relative h-[480px] my-12 overflow-hidden flex items-center font-sans">
      <div className="absolute inset-0 bg-black z-0">
        <img 
          src={img3844} 
          className="w-full h-full object-cover opacity-40 grayscale" 
          alt="App Promo"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#6a282b]/80 via-transparent to-transparent z-10 pointer-events-none"></div>
      <div className="relative inset-0 flex flex-col items-start justify-center text-left text-white px-6 sm:px-12 lg:px-32 max-w-3xl z-20 space-y-6">
        <span className="text-[#c49a6c] font-semibold tracking-widest text-xs uppercase">Connoisseur Experience</span>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif max-w-2xl leading-tight">
          Explore Weave Collections on Our Mobile App
        </h2>
        <p className="text-xs sm:text-base font-light text-[#f8f5f0]/80 max-w-md">
          Track weavers, browse exclusive collections before launching, join virtual styling previews, and track your bridal blouse stitching.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <button className="flex items-center gap-3 bg-black/50 backdrop-blur-sm border border-white/20 px-6 py-3 hover:bg-[#c49a6c] hover:text-[#6a282b] hover:border-[#c49a6c] transition-all duration-300 cursor-pointer">
            <Smartphone size={24} />
            <div className="text-left">
              <div className="text-[10px] tracking-wide">GET IT ON</div>
              <div className="font-bold text-xs uppercase font-sans">Google Play</div>
            </div>
          </button>
          <button className="flex items-center gap-3 bg-black/50 backdrop-blur-sm border border-white/20 px-6 py-3 hover:bg-[#c49a6c] hover:text-[#6a282b] hover:border-[#c49a6c] transition-all duration-300 cursor-pointer">
            <Download size={24} />
            <div className="text-left">
              <div className="text-[10px] tracking-wide">Download on the</div>
              <div className="font-bold text-xs uppercase font-sans">App Store</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    { name: "Divya R. (Chennai)", text: "The pure silk border weight and the Korvai weave are exactly what Kanchipuram is legendary for.", image: img3834 },
    { name: "Anjali S. (Bangalore)", text: "Stitched my bridal blouse perfectly using customized zari motifs. Absolute royal experience.", image: img3842 },
    { name: "Pooja K. (Mumbai)", text: "Highly recommend their virtual viewing! Received my saree in beautiful secure wooden box.", image: img3840 },
    { name: "Lavanya M. (Hyderabad)", text: "Stunning gold sheen. Authentic handloom silk mark certified. Will buy again.", image: img3843 }
  ];
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade reveal reviews staggered
      gsap.from(".review-card", {
        scrollTrigger: {
          trigger: reviewsRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, reviewsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={reviewsRef} className="py-24 px-6 lg:px-12 max-w-7xl mx-auto text-center font-sans">
      <div className="mb-4 text-[#c49a6c] text-lg">❖ ❖ ❖</div>
      <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-3">Reviews from Our Brides</h2>
      <p className="text-sm sm:text-base text-gray-500 mb-16 font-light">Read testimonies from beautiful brides across India who draped our heritage threads.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review, i) => (
          <div key={i} className="review-card relative group overflow-hidden bg-gray-950 text-white aspect-[3/4] flex flex-col justify-end p-6 shadow-md hover:shadow-xl transition-all duration-555">
            <img 
              src={review.image} 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 group-hover:scale-102 transition-all duration-700" 
              alt={review.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
            <div className="relative z-10 text-left">
              <div className="flex text-[#c49a6c] mb-3">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" className="stroke-none" />)}
              </div>
              <p className="font-serif italic mb-4 text-xs leading-relaxed text-[#f8f5f0]/90">"{review.text}"</p>
              <div className="font-semibold text-[10px] sm:text-xs tracking-widest uppercase border-l-2 border-[#c49a6c] pl-2">{review.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = ({ lenisRef }: { lenisRef: React.RefObject<Lenis | null> }) => {
  return (
    <footer className="bg-[#2a0c0e] text-[#f8f5f0] border-t border-[#c49a6c]/20 font-sans">
      {/* Brands Associated Row */}
      <div className="bg-[#3d1416] py-6 px-6 sm:px-12 flex justify-between items-center overflow-x-auto gap-8 text-xs sm:text-sm font-serif tracking-widest text-[#c49a6c] border-b border-[#c49a6c]/20">
        <span className="flex-shrink-0">❖ SILK MARK INDIA</span>
        <span className="flex-shrink-0">❖ HANDLOOM INDIA</span>
        <span className="flex-shrink-0">❖ CRAFT COUNCIL</span>
        <span className="flex-shrink-0">❖ HERITAGE WEAVES</span>
      </div>
      
      <div className="px-6 lg:px-12 py-20 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16">
        <div className="space-y-6">
          <div className="text-2xl font-serif text-[#c49a6c] font-bold tracking-tight">{BRAND}</div>
          <p className="text-xs text-gray-300 leading-relaxed font-light">
            Weaving premium, 100% pure mulberry silk and authentic gold zari thread. Supporting more than 400 weaving families in Tamil Nadu.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6a282b] hover:text-white transition-colors text-[10px]">Insta</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6a282b] hover:text-white transition-colors text-[10px]">Pin</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6a282b] hover:text-white transition-colors text-[10px]">Fb</a>
          </div>
        </div>
        
        <div>
          <h4 className="font-serif text-lg mb-6 text-[#c49a6c]">Collections</h4>
          <ul className="space-y-3 text-xs text-gray-300 font-light">
            <li><a href="#collections" onClick={(e) => scrollToSection(e, 'collections', lenisRef)} className="hover:text-white transition-colors">Pure Silk Wedding Sarees</a></li>
            <li><a href="#collections" onClick={(e) => scrollToSection(e, 'collections', lenisRef)} className="hover:text-white transition-colors">Traditional Brocades</a></li>
            <li><a href="#collections" onClick={(e) => scrollToSection(e, 'collections', lenisRef)} className="hover:text-white transition-colors">Royal Tissue Zari</a></li>
            <li><a href="#process" onClick={(e) => scrollToSection(e, 'process', lenisRef)} className="hover:text-white transition-colors">Temple Motif Classics</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-serif text-lg mb-6 text-[#c49a6c]">Store Locations</h4>
          <ul className="space-y-3 text-xs text-gray-300 font-light">
            <li><a href="#showrooms" onClick={(e) => scrollToSection(e, 'showrooms', lenisRef)} className="hover:text-white transition-colors">Kanchipuram Flagship</a></li>
            <li><a href="#showrooms" onClick={(e) => scrollToSection(e, 'showrooms', lenisRef)} className="hover:text-white transition-colors">Chennai Signature Boutique</a></li>
            <li><a href="#consultation" onClick={(e) => scrollToSection(e, 'consultation', lenisRef)} className="hover:text-white transition-colors">Book Styling Session</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-serif text-lg mb-6 text-[#c49a6c]">Newsletter</h4>
          <p className="text-xs text-gray-300 mb-4 font-light">Subscribe to get notifications about new loom drops, design collections, and events.</p>
          <div className="flex border-b border-gray-600 pb-2">
            <input type="email" placeholder="Enter your email" className="bg-transparent flex-grow outline-none text-xs text-white" />
            <button className="text-xs font-semibold hover:text-[#c49a6c] uppercase tracking-wider focus:outline-none font-sans">Subscribe</button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-[#c49a6c]/10 px-6 lg:px-12 py-8 text-[11px] text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <p>&copy; 2026 {BRAND}. All rights reserved. Handwoven with pride in India.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Loom Certification</a>
        </div>
      </div>
    </footer>
  );
};

const products1 = [
  { name: "Madhurya Korvai Silk Saree", price: "₹48,500", image: img3834, label: "Pure Silk" },
  { name: "Vaikuntha Brocade Saree", price: "₹62,000", image: img3835, label: "Brocade" },
  { name: "Mayilpeeli Temple Border", price: "₹39,900", image: img3837, label: "Pure Silk" },
  { name: "Rudraksha Zari Weave", price: "₹54,000", image: img3839, label: "Brocade" }
];

const products2 = [
  { name: "Aishwarya Gold Tissue Saree", price: "₹84,000", image: img3840, label: "Tissue Zari" },
  { name: "Kalyani Crimson Bridal Saree", price: "₹92,000", image: img3841, label: "Pure Silk" },
  { name: "Swarnamurthy Mustard Saree", price: "₹76,500", image: img3842, label: "Tissue Zari" },
  { name: "Rani Pink Royal Brocade Saree", price: "₹69,000", image: img3843, label: "Brocade" }
];

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll layout
    const lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // luxury exponential easing curve
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenisInstance;

    // Sync Lenis scroll tick with ScrollTrigger recalculations
    lenisInstance.on('scroll', ScrollTrigger.update);

    const tickerUpdate = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white w-full overflow-x-hidden selection:bg-[#6a282b] selection:text-white">
      <Navbar lenisRef={lenisRef} />
      <Hero lenisRef={lenisRef} />
      <HeritageStory />
      <PromoBanners lenisRef={lenisRef} />
      <Marquee />
      <ProductShowcase id="collections" title="The Royal Kanchipuram Collection" subtitle="Explore our heirloom drapes handwoven for special celebrations." products={products1} showFilters={true} />
      <WeavingProcess />
      <CinematicBanner />
      <InfoBar />
      <ProductShowcase title="The Bridal Couture Edit" subtitle="Intricate pure gold zari weaves designed for the modern bride." products={products2} showFilters={false} />
      <FestiveDrapes lenisRef={lenisRef} />
      <StoreLocations lenisRef={lenisRef} />
      <ConsultationForm />
      <FAQ />
      <AppPromo />
      <Reviews />
      <Footer lenisRef={lenisRef} />
    </div>
  );
}

export default App;
