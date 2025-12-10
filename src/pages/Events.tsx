import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const Events = () => {
  const [festivals, setFestivals] = useState<any[]>([]);
  const [temples, setTemples] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [festivalsRes, templesRes, alertsRes] = await Promise.all([
      supabase.from("festivals").select("*").order("start_date", { ascending: true }),
      supabase.from("temples").select("id, name, slug").eq("is_active", true),
      supabase.from("alerts").select("*").eq("is_active", true).order("created_at", { ascending: false }),
    ]);

    if (festivalsRes.data) setFestivals(festivalsRes.data);
    if (templesRes.data) setTemples(templesRes.data);
    if (alertsRes.data) setAlerts(alertsRes.data);
    setLoading(false);
  };

  const getTempleName = (templeId: string) => {
    const temple = temples.find((t) => t.id === templeId || t.slug === templeId);
    return temple?.name || "All Temples";
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Festival: "bg-primary text-primary-foreground",
      "Special Darshan": "bg-secondary text-secondary-foreground",
      "Cultural + Spiritual": "bg-accent text-accent-foreground",
      "Daily Event": "bg-muted text-muted-foreground",
    };
    return colors[category] || "bg-primary text-primary-foreground";
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <BackButton />

      <section className="bg-gradient-peaceful py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Events & Festivals
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
            Celebrate divine occasions at sacred temples across Madhya Pradesh
          </p>
        </div>
      </section>

      {/* Announcements Section */}
      {alerts.length > 0 && (
        <section className="container mx-auto px-4 py-6">
          <h2 className="text-xl font-semibold mb-4">Latest Announcements</h2>
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert, index) => (
              <Alert key={index} variant={alert.alert_type === "Crowd High" ? "destructive" : "default"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </Alert>
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="space-y-6">
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-80 flex-shrink-0">
                  <Skeleton className="h-40 w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        ) : festivals.length > 0 ? (
          <div className="space-y-6">
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-6 min-w-max">
                {festivals.map((event, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Card className="w-80 cursor-pointer hover:shadow-lg transition-all temple-card">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-xl">{event.name}</CardTitle>
                            <Badge className={getCategoryColor(event.category)}>
                              {event.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              {new Date(event.start_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })}
                              {event.end_date && 
                                ` - ${new Date(event.end_date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric"
                                })}`
                              }
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 text-sm mb-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{getTempleName(event.temple_id)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{event.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(event.start_date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
                            {event.end_date && 
                              ` - ${new Date(event.end_date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric"
                              })}`
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{getTempleName(event.temple_id)}</span>
                        </div>
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                        <p className="text-muted-foreground pt-2">{event.description}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>

            <div className="max-w-3xl mx-auto mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center">All Festivals & Events</h2>
              <div className="grid gap-4">
                {festivals.map((event, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{event.name}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>
                              {new Date(event.start_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })}
                              {event.end_date && 
                                ` - ${new Date(event.end_date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric"
                                })}`
                              }
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{getTempleName(event.temple_id)}</span>
                          </div>
                        </div>
                        <Badge className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground mb-2">No events scheduled</p>
            <p className="text-sm text-muted-foreground">
              Admin can add events from the dashboard
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Events;
