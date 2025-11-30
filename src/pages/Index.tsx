import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import TempleCard from "@/components/TempleCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { temples } from "@/data/temples";
import { ArrowDown, Info, Calendar, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-temple.jpg";
import mahakaleshwar from "@/assets/mahakaleshwar.jpg";
import omkareshwar from "@/assets/omkareshwar.jpg";
import kalbhairav from "@/assets/kalbhairav.jpg";
import maihar from "@/assets/maihar.jpg";
import salkanpur from "@/assets/salkanpur.jpg";
import khajrana from "@/assets/khajrana.jpg";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const scrollToTemples = () => {
    document.getElementById("temples-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const templeImages: { [key: string]: string } = {
    mahakaleshwar,
    omkareshwar,
    kalbhairav,
    maihar,
    salkanpur,
    khajrana,
  };

  const filteredTemples = temples.filter((temple) =>
    temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    temple.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    temple.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const advisories = [
    {
      icon: Calendar,
      title: "Festival Bookings",
      description: "Book darshan slots early during festivals for hassle-free visit.",
    },
    {
      icon: Shield,
      title: "Dress Code",
      description: "Follow temple dress code. Traditional attire recommended.",
    },
    {
      icon: Clock,
      title: "Peak Hours",
      description: "Peak hours: 7 AM – 10 AM. Visit early morning for shorter queues.",
    },
    {
      icon: Info,
      title: "ID Verification",
      description: "Carry valid ID for special darshan and online booking verification.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden devotional-pattern">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>

        <div className="container relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Connecting Faith, Technology,
            <br />
            and the Heart of India
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-xl md:text-2xl mb-8 text-white/90"
          >
            A Smart Temple & Pilgrimage Portal for Madhya Pradesh
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Button
                size="lg"
                onClick={scrollToTemples}
                className="btn-devotional text-lg px-8 py-6"
              >
                Explore Temples
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <SearchBar onSearch={setSearchTerm} />
      </section>

      {/* Temples Section */}
      <section id="temples-section" className="container mx-auto px-4 py-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Sacred Temples of Madhya Pradesh</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the divine heritage and spiritual essence of ancient temples across the heart of India
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemples.length > 0 ? (
            filteredTemples.map((temple, index) => (
              <TempleCard
                key={temple.id}
                id={temple.id}
                name={temple.name}
                image={templeImages[temple.id]}
                district={temple.district}
                timings={temple.timings}
                type={temple.type}
                description={temple.description}
                crowdLevel={temple.crowdLevel}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <p className="text-xl text-muted-foreground">No temples found matching your search</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Advisory Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Temple Advisory & Visitor Guidelines</h2>
              <p className="text-muted-foreground">Important information for a peaceful pilgrimage</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisories.map((advisory, index) => {
              const Icon = advisory.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-card p-6 rounded-lg shadow-card-custom hover:shadow-devotional transition-all duration-300"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                      className="w-12 h-12 rounded-full bg-gradient-devotional flex items-center justify-center mb-4"
                    >
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </motion.div>
                    <h3 className="font-semibold mb-2 text-lg">{advisory.title}</h3>
                    <p className="text-sm text-muted-foreground">{advisory.description}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
