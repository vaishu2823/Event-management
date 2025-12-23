import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Users, Target, Heart, Zap } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We believe in bringing people together through meaningful events and shared experiences.",
    },
    {
      icon: Target,
      title: "Seamless Experience",
      description: "Our platform is designed to make event management effortless for organizers and attendees alike.",
    },
    {
      icon: Heart,
      title: "Passion Driven",
      description: "Every feature we build is crafted with passion to enhance how people discover and attend events.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge tools for modern event management.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | EventHub - Event Management Platform</title>
        <meta
          name="description"
          content="Learn about EventHub's mission to revolutionize event management and bring communities together through seamless experiences."
        />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              About <span className="gradient-text">EventHub</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're on a mission to transform how people discover, create, and experience events. 
              From intimate workshops to large conferences, EventHub makes every gathering memorable.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 text-center hover:shadow-elegant transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-[hsl(190_80%_45%)] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto glass-card rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                EventHub was born from a simple observation: organizing events shouldn't be complicated. 
                Whether you're a student hosting a study group or a professional planning a conference, 
                everyone deserves access to powerful, intuitive event management tools.
              </p>
              <p>
                Founded in 2024, we've grown from a small team of passionate developers into a platform 
                trusted by thousands of organizers worldwide. Our commitment to user experience and 
                innovation drives everything we do.
              </p>
              <p>
                Today, EventHub continues to evolve, adding new features and capabilities while staying 
                true to our core mission: making every event a success.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
