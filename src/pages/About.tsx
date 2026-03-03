import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <BackButton />

      <section className="bg-gradient-peaceful py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">About DarshanEase</h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
            Bridging ancient spirituality with modern technology
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 space-y-16">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-devotional flex items-center justify-center">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                DarshanEase is dedicated to preserving and promoting the rich spiritual heritage of
                Madhya Pradesh by seamlessly integrating technology with tradition. We aim to make
                temple visits and pilgrimages more accessible, organized, and meaningful for devotees
                across the globe.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Vision Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-devotional flex items-center justify-center">
              <Eye className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Our Vision</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                To become the leading digital platform for temple management and pilgrimage planning,
                creating a harmonious blend of faith and technology that enhances the spiritual
                journey of millions while preserving the sanctity of ancient traditions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What We Offer Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-devotional flex items-center justify-center">
              <Lightbulb className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">What We Offer</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-3">Smart Temple Management</h3>
                <p className="text-muted-foreground">
                  Real-time crowd prediction, online darshan booking, and digital queue management
                  for a seamless temple experience.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-3">Virtual Darshan</h3>
                <p className="text-muted-foreground">
                  Live streaming of temple rituals and aartis, bringing divine blessings to devotees
                  worldwide.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-3">Comprehensive Information</h3>
                <p className="text-muted-foreground">
                  Detailed temple histories, festivals, travel information, and accommodation
                  guidance.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-3">Community Support</h3>
                <p className="text-muted-foreground">
                  24/7 helpline, emergency services, and a supportive community for all pilgrims.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                DarshanEase was born from a deep reverence for the spiritual heritage of Madhya
                Pradesh and a vision to make temple pilgrimages more accessible and organized. The
                state, known as the "Heart of India," is home to some of the most sacred shrines,
                including the revered Jyotirlingas of Mahakaleshwar and Omkareshwar.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Recognizing the challenges faced by pilgrims in planning their visits, managing
                crowds, and accessing accurate information, we developed this comprehensive platform
                that brings together ancient traditions and modern technology.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, DarshanEase serves thousands of devotees, helping them connect with their
                faith while ensuring a smooth, respectful, and enriching pilgrimage experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
