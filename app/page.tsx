"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Leaf, Droplets, Hammer, Sparkles, Facebook, Instagram, Menu, X } from "lucide-react"

export default function HomePage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("[data-section]")
    sections.forEach((section) => observer.observe(section))

    const timer = setTimeout(() => setHeroLoaded(true), 100)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false) // Close mobile menu after clicking
  }

  const services = [
    { icon: Leaf, title: "Landscaping", description: "Beautiful garden design and installation" },
    { icon: Droplets, title: "Garden Care", description: "Expert plant care and maintenance" },
    { icon: Hammer, title: "Outdoor Maintenance", description: "Complete yard and property upkeep" },
    { icon: Sparkles, title: "Pressure Washing", description: "Clean driveways, patios, and more" },
  ]

  const galleryImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g8.jpg-nBzJAmlM52fzf3BsE94oRkAxMDraCd.jpeg", // Person in yellow gear digging soil
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g2.jpg-xdovOJO5Otml9gnxd9Jne9b0IudVPt.jpeg", // Hands planting colorful flowers
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g1.jpg-BlNK63xCeCHTkfasOeIZEn7xcrBJFa.jpeg", // Professional hedge trimming
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g7.jpg-zOqXw2EV6UHhMZhs23jj0rGbLBNtjq.jpeg", // Hands in yellow gloves planting
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g4.jpg-idCjat2CdyZkViIIuvUI2wWwiFeNFQ.jpeg", // Person planting pink flowers
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g3.jpg-Zdqw4kNPGflNEY57fZwlxg2UjCGBpn.jpeg", // Hands holding plant with roots
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g8.jpg-nBzJAmlM52fzf3BsE94oRkAxMDraCd.jpeg", // Person in yellow gear digging soil (repeated for grid)
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/g2.jpg-xdovOJO5Otml9gnxd9Jne9b0IudVPt.jpeg", // Hands planting colorful flowers (repeated for grid)
  ]

  const navItems = [
    { label: "Home", href: "hero" },
    { label: "About", href: "about" },
    { label: "Services", href: "services" },
    { label: "Gallery", href: "gallery" },
    { label: "Contact", href: "contact" },
  ]

  return (
    <div className="min-h-screen">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes zoomIn {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.05);
          }
        }
        
        .hero-content {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .hero-heading {
          animation: fadeInUp 1s ease-out 0.2s both;
        }
        
        .hero-subheading {
          animation: fadeInUp 1s ease-out 0.4s both;
        }
        
        .hero-button {
          animation: fadeInUp 1s ease-out 0.6s both;
        }
        
        .scroll-arrow {
          animation: bounce 2s infinite;
        }
        
        .hero-bg {
          animation: zoomIn 20s ease-out infinite alternate;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors duration-300"
              >
                Cathy's Garden
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                asChild
              >
                <a href="tel:904-896-8574">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border bg-background">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-4 w-fit"
                  asChild
                >
                  <a href="tel:9048968574">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </a>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        data-section
        className={`relative h-screen flex items-center justify-center text-center overflow-hidden bg-[#FFD54F] ${visibleSections.has("hero") ? "visible" : ""}`}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-[#1D1D1B] ${heroLoaded ? "hero-heading" : "opacity-0"}`}
          >
            Free Weeds, You Pull 'em!
          </h1>

          <div className={`${heroLoaded ? "hero-subheading" : "opacity-0"}`}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#4CAF50]">Got Weeds?</p>
            <p className="text-lg md:text-xl lg:text-2xl font-normal mb-8 max-w-3xl mx-auto text-[#1D1D1B]/80">
              Serving Atlantic Beach & Jacksonville with Professional Landscaping & Garden Care.
            </p>
          </div>

          <Button
            size="lg"
            className={`bg-[#4CAF50] hover:bg-[#1D1D1B] text-white hover:text-white font-semibold text-lg px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg border-0 ${heroLoaded ? "hero-button" : "opacity-0"}`}
            asChild
          >
            <a href="tel:9048968574">
              <Phone className="mr-2 h-5 w-5" />
              Call Now – 904-896-8574
            </a>
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div
            className={`scroll-arrow cursor-pointer ${heroLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 delay-1000`}
            onClick={() => scrollToSection("about")}
          >
            <svg
              className="w-8 h-8 text-[#1D1D1B]/70 hover:text-[#1D1D1B] transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section
        id="about"
        data-section
        className={`py-20 px-6 fade-in ${visibleSections.has("about") ? "visible" : ""}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">Meet Catherine McRae</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With years of experience in landscaping and garden maintenance, Catherine brings a personal touch to
                every project. She believes in building lasting relationships with her clients while transforming
                outdoor spaces into beautiful, thriving environments.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Based in Atlantic Beach and proudly serving the Jacksonville community, Catherine's friendly approach
                and attention to detail have made her a trusted name in landscape maintenance.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abutusc.jpg-FTWeuioqb1YQvskcQA3fhhBjsMXTOQ.jpeg"
                alt="Professional landscaper in orange safety shirt and green work pants using professional equipment to trim hedges"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        data-section
        className={`py-20 px-6 bg-muted fade-in ${visibleSections.has("services") ? "visible" : ""}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From landscaping to pressure washing, we provide comprehensive outdoor maintenance services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg hover:bg-[#FFD54F] transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <service.icon className="h-12 w-12 text-secondary group-hover:text-[#1D1D1B] mx-auto mb-4 transition-colors duration-300" />
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-[#1D1D1B] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground group-hover:text-[#1D1D1B]/80 transition-colors duration-300">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg mb-6 text-foreground">
              <strong>Additional Services:</strong> Palm Trees & Pavers Installation
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300 bg-transparent"
            >
              View Full Service List
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section
        id="gallery"
        data-section
        className={`py-20 px-6 fade-in ${visibleSections.has("gallery") ? "visible" : ""}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Work</h2>
            <p className="text-lg text-muted-foreground">
              See the beautiful transformations we've created for our clients
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Professional landscaping work - ${
                    index === 0 || index === 6
                      ? "soil preparation and digging"
                      : index === 1 || index === 7
                        ? "colorful flower planting"
                        : index === 2
                          ? "professional hedge trimming"
                          : index === 3
                            ? "careful plant installation"
                            : index === 4
                              ? "garden bed flower planting"
                              : "plant transplanting and care"
                  }`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300 bg-transparent"
            >
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-primary py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Your yard deserves expert care.
          </h2>
          <Button
            size="lg"
            variant="secondary"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <a href="tel:9048968574">Call Catherine today – 904-896-8574</a>
          </Button>
        </div>
      </section>

      {/* Contact Form */}
      <section
        id="contact"
        data-section
        className={`py-20 px-6 fade-in ${visibleSections.has("contact") ? "visible" : ""}`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">Ready to transform your outdoor space? Contact us today!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Contact Information</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-secondary mr-3" />
                  <a href="tel:9048968574" className="text-lg hover:text-secondary transition-colors">
                    904-896-8574
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-lg">Atlantic Beach, FL</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-secondary mr-3" />
                  <span className="text-lg">Serving Jacksonville Area</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300 bg-transparent"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300 bg-transparent"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Your Name" className="bg-input" />
                <Input placeholder="Phone Number" type="tel" className="bg-input" />
              </div>
              <Input placeholder="Email Address" type="email" className="bg-input" />
              <Textarea placeholder="Tell us about your project..." rows={5} className="bg-input resize-none" />
              <Button
                type="submit"
                size="lg"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold transition-colors duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-4 text-[#FFD54F]">Cathy's Garden and Landscape Maintenance</h3>
                <p className="text-background/80 mb-6 leading-relaxed">
                  Professional landscaping and garden maintenance services serving Atlantic Beach and Jacksonville. We
                  transform outdoor spaces with expert care and attention to detail.
                </p>
                <div className="flex space-x-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-colors duration-300 bg-transparent"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-colors duration-300 bg-transparent"
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#FFD54F]">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#about" className="text-background/80 hover:text-[#FFD54F] transition-colors duration-300">
                      About Catherine
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="text-background/80 hover:text-[#FFD54F] transition-colors duration-300"
                    >
                      Our Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#gallery"
                      className="text-background/80 hover:text-[#FFD54F] transition-colors duration-300"
                    >
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-background/80 hover:text-[#FFD54F] transition-colors duration-300"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#FFD54F]">Contact Info</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Phone className="h-4 w-4 text-[#4CAF50] mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <a
                        href="tel:9048968574"
                        className="text-background/80 hover:text-[#FFD54F] transition-colors duration-300 font-medium"
                      >
                        904-896-8574
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-[#4CAF50] mr-3 mt-1 flex-shrink-0" />
                    <div className="text-background/80">
                      <p>Atlantic Beach, FL</p>
                      <p className="text-sm">Serving Jacksonville Area</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-4 w-4 text-[#4CAF50] mr-3 mt-1 flex-shrink-0" />
                    <div className="text-background/80">
                      <p className="text-sm">Available for consultations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services & Hours */}
            <div className="grid md:grid-cols-2 gap-8 mb-12 pt-8 border-t border-background/20">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#FFD54F]">Our Services</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-background/80">• Landscaping</span>
                  <span className="text-background/80">• Garden Care</span>
                  <span className="text-background/80">• Outdoor Maintenance</span>
                  <span className="text-background/80">• Pressure Washing</span>
                  <span className="text-background/80">• Palm Tree Installation</span>
                  <span className="text-background/80">• Paver Installation</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#FFD54F]">Service Areas</h4>
                <div className="text-sm text-background/80">
                  <p className="mb-2">• Atlantic Beach</p>
                  <p className="mb-2">• Jacksonville</p>
                  <p className="mb-2">• Neptune Beach</p>
                  <p>• Surrounding Areas</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-background/20 text-center">
              <p className="text-sm text-background/60 mb-2">
                © 2024 Catherine McRae - Cathy's Garden and Landscape Maintenance. All rights reserved.
              </p>
              <p className="text-xs text-background/50">
                Professional landscaping services • Licensed & Insured • Free Estimates
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
