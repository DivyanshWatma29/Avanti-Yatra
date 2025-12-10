import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import TempleCard from "@/components/TempleCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface Temple {
  id: string;
  name: string;
  slug: string;
  district: string;
  type: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean | null;
}

const Temples = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    const { data, error } = await supabase
      .from("temples")
      .select("*")
      .eq("is_active", true)
      .order("name");

    if (data) {
      setTemples(data);
    }
    setLoading(false);
  };

  const districts = Array.from(new Set(temples.map((t) => t.district)));
  const types = Array.from(new Set(temples.map((t) => t.type)));

  const filteredTemples = temples.filter((temple) => {
    const matchesSearch =
      temple.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      temple.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      temple.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = districtFilter === "all" || temple.district === districtFilter;
    const matchesType = typeFilter === "all" || temple.type === typeFilter;

    return matchesSearch && matchesDistrict && matchesType;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <BackButton />

      {/* Header */}
      <section className="bg-gradient-peaceful py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Explore Sacred Temples
          </h1>
          <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover divine destinations across Madhya Pradesh
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <SearchBar onSearch={setSearchTerm} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Temples Grid */}
      <section className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredTemples.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemples.map((temple) => (
              <TempleCard
                key={temple.id}
                id={temple.slug}
                name={temple.name}
                image={temple.image_url || "/placeholder.svg"}
                district={temple.district}
                timings="5:00 AM - 11:00 PM"
                type={temple.type}
                description={temple.description || "A sacred temple in Madhya Pradesh"}
                crowdLevel="Medium"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              {temples.length === 0 
                ? "No temples available. Admin can add temples from the dashboard."
                : "No temples found matching your filters"}
            </p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Temples;
