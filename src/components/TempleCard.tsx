import { Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface TempleCardProps {
  id: string;
  name: string;
  image: string;
  district: string;
  timings: string;
  type: string;
  description: string;
  crowdLevel: "Low" | "Medium" | "High";
}

const TempleCard = ({
  id,
  name,
  image,
  district,
  timings,
  type,
  description,
  crowdLevel,
}: TempleCardProps) => {
  const crowdColors = {
    Low: "bg-sacred-green/20 text-sacred-green border-sacred-green/30",
    Medium: "bg-secondary/20 text-secondary-foreground border-secondary/30",
    High: "bg-sacred-red/20 text-sacred-red border-sacred-red/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="temple-card group"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Type Badge */}
        <motion.div
          className="absolute top-3 left-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="badge-temple bg-primary/90 text-primary-foreground backdrop-blur-sm">
            {type}
          </Badge>
        </motion.div>
        {/* Crowd Badge */}
        <motion.div
          className="absolute top-3 right-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Badge className={`badge-temple backdrop-blur-sm ${crowdColors[crowdLevel]}`}>
            <Users className="h-3 w-3 mr-1" />
            {crowdLevel}
          </Badge>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{district}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{timings}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        <Link to={`/temple/${id}`}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="w-full btn-devotional">View Details</Button>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default TempleCard;
